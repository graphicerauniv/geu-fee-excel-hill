import { getUniversityFees, getHillUniversities } from "@/lib/excel";
import { formatUniversityDisplay } from "@/lib/utils";

import { notFound } from "next/navigation";

import Image from "next/image";
import graphicEraLogo from "@/assets/logo.svg";
import graphicEraHillLogo from "@/assets/logo-hill.svg";

import { CourseList } from "@/app/components/CourseList";

export async function generateStaticParams() {
    const universities = await getHillUniversities();

    return universities.map((university) => ({
        university: university,
    }));
}

export default async function UniversityPage(props: {
    params: { university: string };
}) {
    const params = await props.params;
    const universityParam = params.university;
    const universityName = formatUniversityDisplay(universityParam);

    const universityData = await getUniversityFees(universityParam);

    if (!universityData) {
        notFound();
    }

    return (
        <main className="min-h-screen relative bg-gradient-to-b from-blue-800 to-blue-600 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-10 transform translate-x-1/3 translate-y-1/3"></div>

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
                                {universityName}
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 font-medium">
                                <span className="opacity-90">
                                    Select a course to view fee details
                                </span>
                            </p>
                        </div>

                        <div className="hidden md:block">
                            <Image
                                src={
                                    universityParam === "geu"
                                        ? graphicEraLogo
                                        : graphicEraHillLogo
                                }
                                alt="Graphic Era Logo"
                                className="h-12 sm:h-16 w-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Replace the original course grid with the CourseList component */}
                <CourseList
                    courses={universityData.courses}
                    universityParam={universityParam}
                />

                {/* Footer */}
                <div className="mt-10 sm:mt-16 text-center text-blue-200 text-xs sm:text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} Graphic Era Hill
                        University. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
}
