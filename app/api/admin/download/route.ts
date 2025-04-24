import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { ensureDirectories } from "@/lib/file-service";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FEE_DIR = path.join(DATA_DIR, "fee");
const HISTORY_DIR = path.join(DATA_DIR, "history");

export async function GET(request: NextRequest) {
    // Check for admin access
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const isAdmin = isAdminRequest(searchParams);

    if (!isAdmin) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const fileName = searchParams.file;
    const fileType = searchParams.type || "current";

    if (!fileName) {
        return NextResponse.json(
            { success: false, message: "No file specified" },
            { status: 400 }
        );
    }

    try {
        // Ensure directories exist
        ensureDirectories();

        let filePath;

        if (fileType === "history") {
            filePath = path.join(HISTORY_DIR, fileName);
        } else {
            filePath = path.join(FEE_DIR, fileName);
        }

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { success: false, message: "File not found" },
                { status: 404 }
            );
        }

        // Read file
        const fileBuffer = fs.readFileSync(filePath);

        // Set appropriate headers for Excel files
        const headers = new Headers();
        if (fileName.endsWith(".xlsx")) {
            headers.set(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
        } else if (fileName.endsWith(".xls")) {
            headers.set("Content-Type", "application/vnd.ms-excel");
        } else {
            headers.set("Content-Type", "application/octet-stream");
        }

        headers.set(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );

        return new NextResponse(fileBuffer, {
            headers,
            status: 200,
        });
    } catch (error) {
        console.error("Error downloading file:", error);
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An error occurred while downloading the file",
            },
            { status: 500 }
        );
    }
}
