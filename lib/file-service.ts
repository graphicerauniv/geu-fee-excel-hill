import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FEE_DIR = path.join(DATA_DIR, "fee");
const HISTORY_DIR = path.join(DATA_DIR, "history");

/**
 * Ensures that the necessary directories exist
 */
export function ensureDirectories() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(FEE_DIR)) {
        fs.mkdirSync(FEE_DIR, { recursive: true });
    }

    if (!fs.existsSync(HISTORY_DIR)) {
        fs.mkdirSync(HISTORY_DIR, { recursive: true });
    }
}

/**
 * Saves an uploaded file and maintains version history
 */
export async function saveFile(
    fileName: string,
    fileBuffer: Buffer,
    username?: string
) {
    ensureDirectories();

    const filePath = path.join(FEE_DIR, fileName);

    // If the file already exists, move it to history with timestamp and username
    if (fs.existsSync(filePath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileExt = path.extname(fileName);
        const fileNameWithoutExt = path.basename(fileName, fileExt);

        // Include username in the filename if provided
        const usernameSuffix = username ? `-by-${username}` : "";
        const historicalFileName = `${fileNameWithoutExt}-${timestamp}${usernameSuffix}${fileExt}`;
        const historicalFilePath = path.join(HISTORY_DIR, historicalFileName);

        fs.copyFileSync(filePath, historicalFilePath);
    }

    // Write the new file
    fs.writeFileSync(filePath, fileBuffer);

    return { success: true, filePath };
}

/**
 * Gets all files in the fee directory
 */
export function getLatestFiles() {
    ensureDirectories();

    const files = fs
        .readdirSync(FEE_DIR)
        .filter((file) => file.endsWith(".xlsx") || file.endsWith(".xls"))
        .map((fileName) => ({
            name: fileName,
            path: path.join(FEE_DIR, fileName),
            lastModified: fs.statSync(path.join(FEE_DIR, fileName)).mtime,
        }));

    return files;
}

/**
 * Gets all historical files from the history directory
 */
export function getHistoricalFiles() {
    ensureDirectories();

    if (!fs.existsSync(HISTORY_DIR)) {
        return [];
    }

    const files = fs
        .readdirSync(HISTORY_DIR)
        .filter((file) => file.endsWith(".xlsx") || file.endsWith(".xls"))
        .map((fileName) => ({
            name: fileName,
            path: path.join(HISTORY_DIR, fileName),
            lastModified: fs.statSync(path.join(HISTORY_DIR, fileName)).mtime,
        }))
        .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

    return files;
}
