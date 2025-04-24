"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCourseForUrl } from "@/lib/utils";
import { SearchBar } from "./SearchBar";

interface Course {
    name: string;
    title: { value?: string }[];
    description: { value?: string }[];
    data: any;
}

interface CourseListProps {
    courses: Course[];
    universityParam: string;
}

export function CourseList({ courses, universityParam }: CourseListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter courses based on search term
    const filteredCourses = courses.filter((course) => {
        const courseTitle = course.title[0]?.value || course.name;
        const courseDescription = course.description[0]?.value || course.name;
        return (
            courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            courseDescription.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <div className="mb-6">
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search courses..."
                />
            </div>

            {filteredCourses.length === 0 && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                    <p className="text-blue-50">
                        No courses found matching "{searchTerm}"
                    </p>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredCourses.map((course) => (
                    <div
                        key={course.name}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all shadow-lg"
                    >
                        <Link
                            href={`/${universityParam}/${formatCourseForUrl(
                                course.name
                            )}`}
                            className="block"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-medium mb-2 text-white">
                                    {course.title[0]?.value || course.name}
                                </h2>
                                <div className="mt-4 text-blue-50 font-medium flex items-center">
                                    View Fee Details
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
