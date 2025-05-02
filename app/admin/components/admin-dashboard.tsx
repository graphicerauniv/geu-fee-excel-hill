"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import FileUploader from "./file-uploader";
import FilesList from "./files-list";
import HistoryList from "./history-list";

type User = {
    id: string;
    name: string;
};

export default function AdminDashboard({ user }: { user: User }) {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleUploadSuccess = () => {
        toast.success("File uploaded successfully!");
        setRefreshKey(refreshKey + 1);
    };

    return (
        <div className="container mx-auto py-10 space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600">Logged in as: {user.name}</p>
                </div>
                <Button variant="outline" asChild>
                    <a href="/fee">Back to Home</a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upload Excel Files</CardTitle>
                    <CardDescription>
                        Upload Excel fee files. Previous versions will be stored
                        in history.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FileUploader onUploadSuccess={handleUploadSuccess} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Fee Files</CardTitle>
                        <CardDescription>
                            Latest fee files available in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FilesList key={`files-${refreshKey}`} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Version History</CardTitle>
                        <CardDescription>
                            Previous versions of fee files
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <HistoryList key={`history-${refreshKey}`} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
