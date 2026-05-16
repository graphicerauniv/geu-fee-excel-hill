import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { saveFile } from "@/lib/file-service";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
    // Check for admin access
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const [isAdmin] = isAdminRequest(searchParams);

    if (!isAdmin) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    // Get the username from search params
    const username = searchParams.user || "unknown";

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file provided" },
                { status: 400 }
            );
        }

        // Check if it's an Excel file
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            return NextResponse.json(
                { success: false, message: "Only Excel files are allowed" },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Save the file with username
        const result = await saveFile(file.name, buffer, username);
        const university = file.name.replace(/[-]fee\.(xlsx|xls)$/i, "");

        revalidatePath("/");
        if (university !== file.name) {
            revalidatePath(`/${university}`);
            revalidatePath(`/${university}/[course]`, "page");
        }

        return NextResponse.json({ success: true, filePath: result.filePath });
    } catch (error) {
        console.error("Error handling file upload:", error);
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An error occurred during upload",
            },
            { status: 500 }
        );
    }
}
