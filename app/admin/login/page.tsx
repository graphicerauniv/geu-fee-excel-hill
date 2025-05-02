"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please enter a username");
            return;
        }
        if (!password) {
            alert("Please enter a password");
            return;
        }
        router.push(
            `/admin?user=${encodeURIComponent(
                user
            )}&password=${encodeURIComponent(password)}`
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Admin Login
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="user"
                                    className="text-sm font-medium"
                                >
                                    User
                                </label>
                                <Input
                                    id="user"
                                    type="text"
                                    placeholder="Enter username"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Log in
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-center w-full text-gray-500">
                            This area is restricted to authorized personnel only
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
