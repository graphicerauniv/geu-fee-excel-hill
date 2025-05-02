"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { DownloadButton } from "./DownloadButton";
import { CellData, MergedCell } from "@/lib/excel";

// Array of text patterns that should be center-aligned and have larger fonts
const SPECIAL_TEXT_PATTERNS = [
    "All India Candidates",
    "Uttarakhand State Candidates",
];

// Helper function to check if cell content includes any of the special patterns
const hasSpecialPattern = (content: string): boolean => {
    return SPECIAL_TEXT_PATTERNS.some((pattern) => content.includes(pattern));
};

// Helper function to format cell value
export const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) return "";

    // If the value is a number, round it using Math.ceil
    if (typeof value === "number") {
        return String(Math.round(value));
    }

    // Otherwise convert to string
    return String(value);
};

export function FeeStructureCard({
    course,
    courseParam,
    universityName,
}: {
    course: {
        name: string;
        title: CellData[];
        description: CellData[];
        data: CellData[][];
    };
    courseParam: string;
    universityName: string;
}) {
    const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
    const [firstColWidth, setFirstColWidth] = useState(0);
    const tableRef = useRef<HTMLTableElement>(null);

    // Calculate the width of the first column after render
    useEffect(() => {
        const calculateFirstColumnWidth = () => {
            if (tableRef.current) {
                const firstCells = tableRef.current.querySelectorAll(
                    "tr td:first-child, tr th:first-child"
                );
                if (firstCells.length > 0) {
                    const width = firstCells[0].getBoundingClientRect().width;
                    setFirstColWidth(width);
                }
            }
        };

        calculateFirstColumnWidth();
        window.addEventListener("resize", calculateFirstColumnWidth);

        return () => {
            window.removeEventListener("resize", calculateFirstColumnWidth);
        };
    }, [course]);

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all">
            <div className="p-3 sm:p-6">
                <div className="relative overflow-x-auto custom-scrollbar rounded-xl border border-gray-200">
                    <table ref={tableRef} className="w-full text-sm">
                        <tbody>
                            {course.data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={cn(
                                        "border-b last:border-0 transition-colors",
                                        rowIndex === 0
                                            ? "bg-blue-900 text-white font-medium"
                                            : rowIndex === highlightedRow
                                            ? "bg-blue-100"
                                            : rowIndex % 2 === 0
                                            ? "bg-blue-50 hover:bg-blue-100"
                                            : "hover:bg-blue-50"
                                    )}
                                    onMouseEnter={() =>
                                        rowIndex !== 0 &&
                                        setHighlightedRow(rowIndex)
                                    }
                                    onMouseLeave={() => setHighlightedRow(null)}
                                >
                                    {Array.isArray(row)
                                        ? row.map((cell, cellIndex) => {
                                              // Handle merged cells
                                              if (
                                                  cell &&
                                                  typeof cell === "object"
                                              ) {
                                                  // Skip cells that are part of a merged cell but not the top-left cell
                                                  if (
                                                      "isMerged" in cell &&
                                                      cell.isMerged
                                                  ) {
                                                      return null;
                                                  }

                                                  // Render the top-left cell of a merged range with proper rowspan/colspan
                                                  if (
                                                      "rowspan" in cell &&
                                                      "colspan" in cell
                                                  ) {
                                                      const mergedCell =
                                                          cell as MergedCell;
                                                      return (
                                                          <td
                                                              key={cellIndex}
                                                              className={cn(
                                                                  "px-2 py-1 sm:px-4 sm:py-4 border-r last:border-0",
                                                                  rowIndex === 0
                                                                      ? "text-white font-semibold bg-blue-900"
                                                                      : "text-blue-900",
                                                                  (cellIndex ===
                                                                      0 ||
                                                                      (rowIndex ===
                                                                          0 &&
                                                                          cellIndex ===
                                                                              0)) &&
                                                                      "sticky left-0 z-10",
                                                                  cellIndex ===
                                                                      0 &&
                                                                      rowIndex !==
                                                                          0 &&
                                                                      "font-semibold bg-blue-800 text-white",
                                                                  cellIndex ===
                                                                      1 && {
                                                                      "sticky z-10":
                                                                          true,
                                                                      "bg-blue-900":
                                                                          rowIndex ===
                                                                          0,
                                                                      "bg-blue-100":
                                                                          rowIndex ===
                                                                              highlightedRow &&
                                                                          rowIndex !==
                                                                              0,
                                                                      "bg-blue-50":
                                                                          rowIndex %
                                                                              2 ===
                                                                              0 &&
                                                                          rowIndex !==
                                                                              highlightedRow &&
                                                                          rowIndex !==
                                                                              0,
                                                                      "bg-white":
                                                                          rowIndex %
                                                                              2 !==
                                                                              0 &&
                                                                          rowIndex !==
                                                                              highlightedRow &&
                                                                          rowIndex !==
                                                                              0,
                                                                  },
                                                                  (cellIndex ===
                                                                      0 ||
                                                                      cellIndex ===
                                                                          1) &&
                                                                      "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                                                                  // Apply center alignment and larger font to special text cells
                                                                  typeof mergedCell.value ===
                                                                      "string" &&
                                                                      hasSpecialPattern(
                                                                          String(
                                                                              mergedCell.value
                                                                          )
                                                                      ) &&
                                                                      "text-center text-lg font-semibold"
                                                              )}
                                                              style={{
                                                                  left:
                                                                      cellIndex ===
                                                                      1
                                                                          ? `${firstColWidth}px`
                                                                          : 0,
                                                              }}
                                                              rowSpan={
                                                                  mergedCell.rowspan
                                                              }
                                                              colSpan={
                                                                  mergedCell.colspan
                                                              }
                                                          >
                                                              {mergedCell.value !==
                                                                  null &&
                                                              mergedCell.value !==
                                                                  undefined
                                                                  ? formatCellValue(
                                                                        mergedCell.value
                                                                    )
                                                                  : ""}
                                                          </td>
                                                      );
                                                  }
                                              }

                                              // Regular cell
                                              return (
                                                  <td
                                                      key={cellIndex}
                                                      className={cn(
                                                          "px-2 py-1 sm:px-4 sm:py-4 border-r last:border-0",
                                                          rowIndex === 0
                                                              ? "text-white font-semibold bg-blue-900"
                                                              : "text-blue-900",
                                                          cellIndex === 0 &&
                                                              "sticky left-0 z-10",
                                                          cellIndex === 0 &&
                                                              rowIndex !== 0 &&
                                                              "font-semibold bg-blue-800 text-white",
                                                          cellIndex === 1 && {
                                                              "sticky z-10":
                                                                  true,
                                                              "bg-blue-900":
                                                                  rowIndex ===
                                                                  0,
                                                              "bg-blue-100":
                                                                  rowIndex ===
                                                                      highlightedRow &&
                                                                  rowIndex !==
                                                                      0,
                                                              "bg-blue-50":
                                                                  rowIndex %
                                                                      2 ===
                                                                      0 &&
                                                                  rowIndex !==
                                                                      highlightedRow &&
                                                                  rowIndex !==
                                                                      0,
                                                              "bg-white":
                                                                  rowIndex %
                                                                      2 !==
                                                                      0 &&
                                                                  rowIndex !==
                                                                      highlightedRow &&
                                                                  rowIndex !==
                                                                      0,
                                                          },
                                                          (cellIndex === 0 ||
                                                              cellIndex ===
                                                                  1) &&
                                                              "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                                                          // Apply center alignment and larger font to special text cells
                                                          typeof cell ===
                                                              "string" &&
                                                              hasSpecialPattern(
                                                                  cell
                                                              ) &&
                                                              "text-center text-lg font-semibold"
                                                      )}
                                                      style={{
                                                          left:
                                                              cellIndex === 1
                                                                  ? `${firstColWidth}px`
                                                                  : 0,
                                                      }}
                                                  >
                                                      {cell !== null &&
                                                      cell !== undefined
                                                          ? formatCellValue(
                                                                cell
                                                            )
                                                          : ""}
                                                  </td>
                                              );
                                          })
                                        : Object.values(row).map(
                                              (cell, cellIndex) => {
                                                  // Handle objects for non-array rows too
                                                  if (
                                                      cell &&
                                                      typeof cell ===
                                                          "object" &&
                                                      "value" in cell
                                                  ) {
                                                      const mergedCell =
                                                          cell as MergedCell;
                                                      return (
                                                          <td
                                                              key={cellIndex}
                                                              className={cn(
                                                                  "px-2 py-1 sm:px-4 sm:py-4 border-r last:border-0",
                                                                  rowIndex === 0
                                                                      ? "text-white font-semibold bg-blue-900"
                                                                      : "text-blue-900",
                                                                  cellIndex ===
                                                                      0 &&
                                                                      "sticky left-0 z-10",
                                                                  cellIndex ===
                                                                      0 &&
                                                                      rowIndex !==
                                                                          0 &&
                                                                      "font-semibold bg-blue-800 text-white",
                                                                  cellIndex ===
                                                                      1 && {
                                                                      "sticky z-10":
                                                                          true,
                                                                      "bg-blue-900":
                                                                          rowIndex ===
                                                                          0,
                                                                      "bg-blue-100":
                                                                          rowIndex ===
                                                                              highlightedRow &&
                                                                          rowIndex !==
                                                                              0,
                                                                      "bg-blue-50":
                                                                          rowIndex %
                                                                              2 ===
                                                                              0 &&
                                                                          rowIndex !==
                                                                              highlightedRow &&
                                                                          rowIndex !==
                                                                              0,
                                                                      "bg-white":
                                                                          rowIndex %
                                                                              2 !==
                                                                              0 &&
                                                                          rowIndex !==
                                                                              highlightedRow &&
                                                                          rowIndex !==
                                                                              0,
                                                                  },
                                                                  (cellIndex ===
                                                                      0 ||
                                                                      cellIndex ===
                                                                          1) &&
                                                                      "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                                                                  // Apply center alignment and larger font to special text cells
                                                                  typeof mergedCell.value ===
                                                                      "string" &&
                                                                      hasSpecialPattern(
                                                                          String(
                                                                              mergedCell.value
                                                                          )
                                                                      ) &&
                                                                      "text-center text-lg font-semibold"
                                                              )}
                                                              style={{
                                                                  left:
                                                                      cellIndex ===
                                                                      1
                                                                          ? `${firstColWidth}px`
                                                                          : 0,
                                                              }}
                                                              rowSpan={
                                                                  mergedCell.rowspan ||
                                                                  1
                                                              }
                                                              colSpan={
                                                                  mergedCell.colspan ||
                                                                  1
                                                              }
                                                          >
                                                              {mergedCell.value !==
                                                                  null &&
                                                              mergedCell.value !==
                                                                  undefined
                                                                  ? formatCellValue(
                                                                        mergedCell.value
                                                                    )
                                                                  : ""}
                                                          </td>
                                                      );
                                                  }

                                                  return (
                                                      <td
                                                          key={cellIndex}
                                                          className={cn(
                                                              "px-2 py-1 sm:px-4 sm:py-4 border-r last:border-0",
                                                              rowIndex === 0
                                                                  ? "text-white font-semibold bg-blue-900"
                                                                  : "text-blue-900",
                                                              cellIndex === 0 &&
                                                                  "sticky left-0 z-10",
                                                              cellIndex === 0 &&
                                                                  rowIndex !==
                                                                      0 &&
                                                                  "font-semibold bg-blue-800 text-white",
                                                              cellIndex ===
                                                                  1 && {
                                                                  "sticky z-10":
                                                                      true,
                                                                  "bg-blue-900":
                                                                      rowIndex ===
                                                                      0,
                                                                  "bg-blue-100":
                                                                      rowIndex ===
                                                                          highlightedRow &&
                                                                      rowIndex !==
                                                                          0,
                                                                  "bg-blue-50":
                                                                      rowIndex %
                                                                          2 ===
                                                                          0 &&
                                                                      rowIndex !==
                                                                          highlightedRow &&
                                                                      rowIndex !==
                                                                          0,
                                                                  "bg-white":
                                                                      rowIndex %
                                                                          2 !==
                                                                          0 &&
                                                                      rowIndex !==
                                                                          highlightedRow &&
                                                                      rowIndex !==
                                                                          0,
                                                              },
                                                              (cellIndex ===
                                                                  0 ||
                                                                  cellIndex ===
                                                                      1) &&
                                                                  "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                                                              // Apply center alignment and larger font to special text cells
                                                              typeof cell ===
                                                                  "string" &&
                                                                  hasSpecialPattern(
                                                                      cell
                                                                  ) &&
                                                                  "text-center text-lg font-semibold"
                                                          )}
                                                          style={{
                                                              left:
                                                                  cellIndex ===
                                                                  1
                                                                      ? `${firstColWidth}px`
                                                                      : 0,
                                                          }}
                                                      >
                                                          {cell !== null &&
                                                          cell !== undefined
                                                              ? formatCellValue(
                                                                    cell
                                                                )
                                                              : ""}
                                                      </td>
                                                  );
                                              }
                                          )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Card Footer */}
            <div className="bg-gray-50 p-3 sm:p-5 border-t">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Note:</span> Fees are
                        subject to change as per university policy
                    </p>
                    <DownloadButton
                        course={course}
                        courseParam={courseParam}
                        universityName={universityName}
                    />
                </div>
            </div>
        </div>
    );
}
