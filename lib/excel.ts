import * as XLSX from "xlsx";
import fs from "fs/promises";
import { existsSync, readdirSync } from "fs";
import path from "path";

// Define types for merged cells
export interface MergedCell {
    value: any;
    rowspan: number;
    colspan: number;
}

export interface MergedReference {
    isMerged: true;
    mergedWith: { r: number; c: number };
}

export type CellData = any | MergedCell | MergedReference;

export interface UniversityFee {
    universityName: string;
    courses: {
        name: string;
        title: CellData[];
        description: CellData[];
        data: CellData[][];
    }[];
}

/**
 * Finds the Excel file for a university
 */
function findExcelFile(universityName: string): string | null {
    const feesDir = path.join(process.cwd(), "data", "fee");
    if (!existsSync(feesDir)) return null;

    const normalized = universityName.replace(/_/g, "-");
    const files = readdirSync(feesDir);
    const possiblePatterns = `${normalized}-fee.xlsx`;

    const match = files.find(
        (file) => file.toLowerCase() === possiblePatterns.toLowerCase()
    );

    return match ? path.join(feesDir, match) : null;
}

/**
 * Processes merged cells in Excel data
 */
function processMergedCells(
    data: any[][],
    mergedCells: XLSX.Range[]
): CellData[][] {
    // Create a processed data structure that includes merged cell information
    const processedData: CellData[][] = data.map((row) => {
        // For array rows, convert to array with same length
        if (Array.isArray(row)) {
            return [...row] as CellData[];
        }
        return row as CellData[];
    });

    // Add merged cell information to the data
    mergedCells.forEach((range) => {
        const { s, e } = range; // s: start, e: end

        // Get value from the top-left cell of the merged range
        const topLeftRow = processedData[s.r];
        const value = Array.isArray(topLeftRow) ? topLeftRow[s.c] : null;

        // Mark this cell as spanning multiple rows/columns
        if (
            Array.isArray(topLeftRow) &&
            value !== undefined &&
            value !== null
        ) {
            // Add rowspan and colspan attributes to the data
            topLeftRow[s.c] = {
                value: value,
                rowspan: e.r - s.r + 1,
                colspan: e.c - s.c + 1,
            } as MergedCell;

            // Clear the content of the other cells in the merged range
            for (let r = s.r; r <= e.r; r++) {
                if (!processedData[r]) continue;
                const currentRow = processedData[r];

                if (Array.isArray(currentRow)) {
                    for (let c = s.c; c <= e.c; c++) {
                        // Skip the top-left cell
                        if (r === s.r && c === s.c) continue;
                        // Mark other cells in the range as part of a merged cell
                        currentRow[c] = {
                            isMerged: true,
                            mergedWith: { r: s.r, c: s.c },
                        } as MergedReference;
                    }
                }
            }
        }
    });

    return processedData;
}

/**
 * Checks if a cell is a merged cell with rowspan > 1
 */
function isMergedCellWithMultipleRows(cell: any): boolean {
    return (
        typeof cell === "object" &&
        cell !== null &&
        "rowspan" in cell &&
        (cell as MergedCell).rowspan > 1
    );
}

/**
 * Finds the maximum rowspan in a row of cells
 */
function findMaxRowspan(row: CellData[]): number {
    let maxRowspan = 1;
    row.forEach((cell) => {
        if (typeof cell === "object" && cell !== null && "rowspan" in cell) {
            const rowspan = (cell as MergedCell).rowspan;
            maxRowspan = Math.max(maxRowspan, rowspan);
        }
    });
    return maxRowspan;
}

/**
 * Determines header row information and data start index
 */
function processHeaderRows(processedData: CellData[][]): {
    title: CellData[];
    description: CellData[];
    dataStartIndex: number;
} {
    let title: CellData[] = [];
    let description: CellData[] = [];
    let dataStartIndex = 0;

    if (processedData.length > 0) {
        title = processedData[0];
        dataStartIndex = 1;

        // Check if first row is part of a merged cell that spans multiple rows
        const hasTitleMergedCells = title.some(isMergedCellWithMultipleRows);

        if (hasTitleMergedCells) {
            // Find the max rowspan in the first row to determine how many rows to skip
            const maxRowspan = findMaxRowspan(title);
            dataStartIndex = maxRowspan;
        } else if (processedData.length > 1) {
            // If no merged cells in first row, extract second row as description
            description = processedData[1];
            dataStartIndex = 2;

            // Check if second row has merged cells that span multiple rows
            const hasDescriptionMergedCells = description.some(
                isMergedCellWithMultipleRows
            );

            if (hasDescriptionMergedCells) {
                // Find the max rowspan in the description row
                const maxDescriptionRowspan = findMaxRowspan(description);

                // Add the description row span to the data start index
                // Subtract 1 because we already counted the description row itself
                dataStartIndex = 1 + maxDescriptionRowspan;
            }
        }
    }

    return { title, description, dataStartIndex };
}

/**
 * Processes a worksheet to extract course data
 */
function processWorksheet(
    worksheet: XLSX.WorkSheet,
    sheetName: string
): {
    name: string;
    title: CellData[];
    description: CellData[];
    data: CellData[][];
} {
    // Get the raw data
    const data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
    }) as any[][];

    // Process merged cells
    const mergedCells = worksheet["!merges"] || [];
    const processedData = processMergedCells(data, mergedCells);

    // Extract header rows and determine data start index
    const { title, description, dataStartIndex } =
        processHeaderRows(processedData);

    // Return data without the title and description rows
    return {
        name: sheetName,
        title,
        description,
        data: processedData.slice(dataStartIndex),
    };
}

export async function getUniversityFees(
    universityName: string
): Promise<UniversityFee | null> {
    try {
        const filePath = findExcelFile(universityName);

        if (!filePath) {
            console.error(`File not found for university: ${universityName}`);
            return null;
        }

        // Read the file as buffer
        const buffer = await fs.readFile(filePath);
        const workbook = XLSX.read(buffer);
        const sheets = workbook.SheetNames;

        const courses = sheets.map((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            return processWorksheet(worksheet, sheetName);
        });

        return {
            universityName,
            courses,
        };
    } catch (error) {
        console.error(`Error reading Excel file for ${universityName}:`, error);
        return null;
    }
}

export function getAvailableUniversities(): string[] {
    try {
        const feesDir = path.join(process.cwd(), "data", "fee");

        // Check if directory exists
        if (!existsSync(feesDir)) {
            console.error(`Fees directory not found: ${feesDir}`);
            return [];
        }

        const files = readdirSync(feesDir);
        return files
            .filter((file: string) => file.toLowerCase().includes("-fee.xlsx"))
            .map((file: string) => {
                // Extract university name from filename
                const name = file.replace(/[-]fee\.xlsx$/i, "");
                return name;
            });
    } catch (error) {
        console.error("Error reading universities:", error);
        return [];
    }
}

export function getHillUniversities(): string[] {
    const universities = getAvailableUniversities();
    //Because all universities are hill universities now
    return universities;
    // return universities.filter((university) =>
    //     university.toLowerCase().includes("gehu")
    // );
}
