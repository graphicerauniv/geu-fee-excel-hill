"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface FileInfo {
    name: string;
    lastModified: string;
}

export default function FilesList() {
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const password = searchParams.get("password");
    const user = searchParams.get("user");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (password) queryParams.append("password", password);
                if (user) queryParams.append("user", user);

                const response = await fetch(
                    `/fee/api/admin/files?${queryParams.toString()}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch files");
                }

                const data = await response.json();
                setFiles(data.files || []);
            } catch (error) {
                console.error("Error fetching files:", error);
                toast.error("Failed to load files");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, [password, user]);

    const handleDownload = (filename: string) => {
        const queryParams = new URLSearchParams();
        queryParams.append("file", filename);
        queryParams.append("type", "current");
        if (password) queryParams.append("password", password);
        if (user) queryParams.append("user", user);

        window.open(
            `/fee/api/admin/download?${queryParams.toString()}`,
            "_blank"
        );
    };

    if (isLoading) {
        return <div className="py-4">Loading files...</div>;
    }

    if (files.length === 0) {
        return <div className="py-4">No files found.</div>;
    }

    return (
        <div className="space-y-4">
            <div className="overflow-auto max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                File Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Modified
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {files.map((file) => (
                            <tr key={file.name}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                    {file.name}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(
                                        file.lastModified
                                    ).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleDownload(file.name)
                                        }
                                    >
                                        Download
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
