import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getLatestFiles, ensureDirectories } from "@/lib/file-service";

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

    try {
        // Ensure directories exist before attempting to read files
        ensureDirectories();

        const files = getLatestFiles();

        return NextResponse.json({
            success: true,
            files: files.map((file) => ({
                name: file.name,
                lastModified: file.lastModified.toISOString(),
            })),
        });
    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An error occurred while fetching files",
            },
            { status: 500 }
        );
    }
}
