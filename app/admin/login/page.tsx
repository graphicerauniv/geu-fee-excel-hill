"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const USERS = [
    { id: "ashish", name: "Ashish" },
    { id: "aaditya", name: "Aaditya" },
    { id: "sauhard", name: "Sauhard" },
    { id: "aman", name: "Aman" },
    { id: "akhil", name: "Akhil" },
];

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please select a user");
            return;
        }
        router.push(
            `/admin?password=${encodeURIComponent(
                password
            )}&user=${encodeURIComponent(user)}`
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>
                        Enter your password to access the admin portal
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="user"
                                    className="text-sm font-medium"
                                >
                                    User
                                </label>
                                <Select
                                    value={user}
                                    onValueChange={setUser}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select user" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {USERS.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
