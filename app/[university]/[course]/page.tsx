import { getUniversityFees, getHillUniversities } from "@/lib/excel";
import { formatUniversityDisplay, formatCourseForUrl } from "@/lib/utils";

import { notFound } from "next/navigation";

import Image from "next/image";
import graphicEraLogo from "@/assets/logo.svg";
import graphicEraHillLogo from "@/assets/logo-hill.svg";

import { FeeStructureCard } from "@/app/components/FeeStructureCard";

export async function generateStaticParams() {
    // Get all universities
    const universities = getHillUniversities();

    // Create an array to hold all params
    const params = [];

    // For each university, get its courses and create params
    for (const university of universities) {
        const universityData = await getUniversityFees(university);

        if (universityData && universityData.courses) {
            // Create a path for each course in this university
            for (const course of universityData.courses) {
                params.push({
                    university,
                    course: formatCourseForUrl(course.name),
                });
            }
        }
    }

    return params;
}

export default async function CoursePage(props: {
    params: Promise<{ university: string; course: string }>;
}) {
    const params = await props.params;
    // Use the raw parameter for file access
    const universityParam = params.university;
    const courseParam = decodeURIComponent(params.course);

    // Format the university name for display
    const universityName = formatUniversityDisplay(universityParam);

    const universityData = await getUniversityFees(universityParam);

    if (!universityData) {
        notFound();
    }

    // Try multiple matching strategies
    let course = universityData.courses.find((c) => c.name === courseParam);

    // If not found, try case-insensitive match
    if (!course) {
        course = universityData.courses.find(
            (c) => c.name.toLowerCase() === courseParam.toLowerCase()
        );
    }

    // If still not found, try trimming whitespace
    if (!course) {
        course = universityData.courses.find(
            (c) =>
                c.name.trim().toLowerCase() === courseParam.trim().toLowerCase()
        );
    }

    // Last resort - find a course that contains the parameter as a substring
    if (!course && courseParam.length > 3) {
        course = universityData.courses.find((c) =>
            c.name.toLowerCase().includes(courseParam.toLowerCase())
        );
    }

    if (!course) {
        console.log("Course not found:", courseParam);
        notFound();
    }

    return (
        <main className="min-h-screen relative bg-gradient-to-b from-blue-800 to-blue-600 overflow-x-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
                {/* Header Section with Glass Effect */}
                <div className="mb-6 sm:mb-10 p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl border border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 sm:gap-6">
                        {/* Logo on top for mobile, right side for desktop */}
                        <div className="w-full flex justify-center md:hidden mb-4">
                            <Image
                                src={
                                    universityParam === "geu"
                                        ? graphicEraLogo
                                        : graphicEraHillLogo
                                }
                                alt="Graphic Era Logo"
                                className="h-14 w-auto"
                                priority
                            />
                        </div>

                        <div className="text-center md:text-left w-full md:w-auto">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight">
                                {course.title[0].value}
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 font-medium">
                                {universityName}
                            </p>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <Image
                                src={
                                    universityParam === "geu"
                                        ? graphicEraLogo
                                        : graphicEraHillLogo
                                }
                                alt="Graphic Era Logo"
                                className="min-h-12 min-w-72 sm:h-16 sm:w-auto"
                                priority
                            />
                        </div>
                    </div>
                    <pre className="text-base mt-8 font-sans whitespace-pre-wrap text-white/70 font-medium">
                        {course.description[0].value}
                    </pre>
                </div>

                {/* Fee Structure Card - Now using client component */}
                <FeeStructureCard
                    course={course}
                    courseParam={courseParam}
                    universityName={universityName}
                />

                {/* Info Cards - Now using client component */}
                {/* <InfoCards /> */}

                {/* Footer */}
                <div className="mt-10 sm:mt-16 text-center text-blue-200 text-xs sm:text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} Graphic Era
                        University. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
}
