"use client";

import { forwardRef } from "react";
import Image from "next/image";
import graphicEraLogo from "@/assets/logo-hill.svg";
import { cn } from "@/lib/utils";
import { CellData } from "@/lib/excel";
import { formatCellValue } from "./FeeStructureCard";
interface PrintableContentProps {
    course: {
        name: string;
        title: CellData[];
        description: CellData[];
        data: CellData[][];
    };
}

export const PrintableContent = forwardRef<
    HTMLDivElement,
    PrintableContentProps
>(({ course }, ref) => {
    return (
        <div
            ref={ref}
            className="hidden print:block print:mx-0 print:my-0 print:p-0"
            style={{
                width: "100%",
                pageBreakAfter: "always",
            }}
        >
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: Tabloid landscape;
                        margin: 0.2cm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .print-table td,
                    .print-table th {
                        padding: 2px 4px;
                        font-size: 10px;
                        border: 1px solid #ddd;
                    }
                    .print-header {
                        margin-bottom: 4px;
                    }
                    .print-footer {
                        margin-top: 2px;
                    }
                }
            `}</style>

            {/* Header Section */}
            <div className="print-header flex items-center justify-between mb-2 p-2 bg-blue-800 text-white border-b border-gray-300">
                <div>
                    <h1 className="text-lg font-bold text-white m-0">
                        {course.title[0].value}
                    </h1>
                    <p className="text-sm text-blue-100 m-0">
                        {course.description[0].value}
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <Image
                        src={graphicEraLogo}
                        alt="Graphic Era Logo"
                        className="h-10 w-auto"
                        priority
                    />
                </div>
            </div>

            {/* Fee Table */}
            <table className="print-table w-full border-collapse border border-gray-300 bg-white text-black">
                <tbody>
                    {course &&
                        course.data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={cn(
                                    "border-b last:border-0",
                                    rowIndex === 0
                                        ? "bg-blue-800 text-white font-medium"
                                        : rowIndex % 2 === 0
                                        ? "bg-blue-50"
                                        : "bg-white"
                                )}
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
                                                  return (
                                                      <td
                                                          key={cellIndex}
                                                          className={cn(
                                                              "border",
                                                              rowIndex === 0
                                                                  ? "text-white font-semibold bg-blue-800"
                                                                  : "text-blue-900",
                                                              cellIndex === 0 &&
                                                                  rowIndex !==
                                                                      0 &&
                                                                  "font-semibold bg-blue-700 text-white"
                                                          )}
                                                          rowSpan={cell.rowspan}
                                                          colSpan={cell.colspan}
                                                      >
                                                          {cell.value !==
                                                              null &&
                                                          cell.value !==
                                                              undefined
                                                              ? formatCellValue(
                                                                    cell.value
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
                                                      "border",
                                                      rowIndex === 0
                                                          ? "text-white font-semibold bg-blue-800"
                                                          : "text-blue-900",
                                                      cellIndex === 0 &&
                                                          rowIndex !== 0 &&
                                                          "font-semibold bg-blue-700 text-white"
                                                  )}
                                              >
                                                  {cell !== null &&
                                                  cell !== undefined
                                                      ? formatCellValue(cell)
                                                      : ""}
                                              </td>
                                          );
                                      })
                                    : Object.values(row).map(
                                          (cell, cellIndex) => (
                                              <td
                                                  key={cellIndex}
                                                  className={cn(
                                                      "border",
                                                      rowIndex === 0
                                                          ? "text-white font-semibold bg-blue-800"
                                                          : "text-blue-900",
                                                      cellIndex === 0 &&
                                                          rowIndex !== 0 &&
                                                          "font-semibold bg-blue-700 text-white"
                                                  )}
                                              >
                                                  {cell !== null &&
                                                  cell !== undefined
                                                      ? typeof cell ===
                                                            "object" &&
                                                        "value" in cell
                                                          ? String(cell.value)
                                                          : String(cell)
                                                      : ""}
                                              </td>
                                          )
                                      )}
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Disclaimer */}
            <div className="text-center text-xs text-gray-600 mt-4 mb-2 italic">
                <p>
                    Note: Fees may be revised in accordance with university
                    policy.
                </p>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 mt-2 print-footer">
                <p>
                    © {new Date().getFullYear()} Graphic Era University. All
                    rights reserved.
                </p>
            </div>
        </div>
    );
});

PrintableContent.displayName = "PrintableContent";
