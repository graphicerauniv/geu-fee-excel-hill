"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface FileUploaderProps {
    onUploadSuccess: () => void;
}

export default function FileUploader({ onUploadSuccess }: FileUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const searchParams = useSearchParams();
    const password = searchParams.get("password");
    const user = searchParams.get("user");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Check if file is an Excel file
            if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
            } else {
                toast.error("Please select an Excel file (.xlsx only)");
                e.target.value = "";
                return;
            }

            // Check if it matches existing file names
            const existingFileNames = [
                "GEU-fee.xlsx",
                "GEHU-Bhimtal-fee.xlsx",
                "GEHU-Dehradun-fee.xlsx",
                "GEHU-Haldwani-fee.xlsx",
            ];
            if (!existingFileNames.includes(file.name)) {
                toast.error("Different file name than existing files");
                e.target.value = "";
                return;
            }

            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please select a file to upload");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            // Include both password and user in the request
            const queryParams = new URLSearchParams();
            if (password) queryParams.append("password", password);
            if (user) queryParams.append("user", user);

            const response = await fetch(
                `/fee/api/admin/upload?${queryParams.toString()}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();

            if (data.success) {
                setSelectedFile(null);
                if (onUploadSuccess) {
                    onUploadSuccess();
                }

                // Reset the file input
                const fileInput = document.getElementById(
                    "file-upload"
                ) as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = "";
                }
            } else {
                throw new Error(data.message || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(
                "Failed to upload file: " +
                    (error instanceof Error ? error.message : "Unknown error")
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="file-upload" className="text-sm font-medium">
                    Select Excel File
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium hover:file:bg-neutral-100 border rounded-md p-2"
                    disabled={isUploading}
                />
            </div>

            <div className="flex items-center space-x-2">
                <Button type="submit" disabled={!selectedFile || isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                </Button>
                {selectedFile && (
                    <p className="text-sm">Selected: {selectedFile.name}</p>
                )}
            </div>
            {user && (
                <p className="text-sm text-gray-500">Uploading as: {user}</p>
            )}
        </form>
    );
}
