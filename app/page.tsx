import { getHillUniversities } from "@/lib/excel";
import Link from "next/link";
import Image from "next/image";
import graphicEraHillLogo from "@/assets/logo-hill.svg";
import {
    formatForUrl,
    formatUniversityDisplay,
    formatUniversityForCampusDisplay,
} from "@/lib/utils";

export default function Home() {
    const universities = getHillUniversities();

    return (
        <div className="min-h-screen relative bg-gradient-to-b from-blue-800 to-blue-600 overflow-x-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-fuxll opacity-10 transform translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/2 right-0 w-48 h-48 bg-blue-400 rounded-full opacity-10 transform translate-x-1/4 -translate-y-1/2"></div>

            <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
                {/* Header Section with Glass Effect */}
                <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl border border-white/20">
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src={graphicEraHillLogo}
                            alt="Graphic Era Logo"
                            className="h-16 sm:h-20 w-auto mb-4 sm:mb-6"
                            priority
                        />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
                            Graphic Era Hill University Fee Portal
                        </h1>
                        <p className="text-base sm:text-lg text-blue-100 font-medium max-w-2xl mx-auto">
                            View fee structures for all Graphic Era Hill
                            universities and courses in an organized format
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                    {universities.map((university) => (
                        <Link
                            key={university}
                            href={`/${formatForUrl(university)}`}
                            className="block group"
                        >
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 h-full flex flex-col transition-all hover:bg-white/15 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-2 text-white group-hover:text-blue-100 transition-colors">
                                    {formatUniversityForCampusDisplay(
                                        university
                                    )}
                                </h2>
                                <p className="text-blue-100 opacity-80 flex-1">
                                    View fee structure for{" "}
                                    {formatUniversityDisplay(university)} campus
                                </p>
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
                    ))}
                </div>

                {universities.length === 0 && (
                    <div className="bg-white/10 backdrop-blur-sm text-center p-8 border border-white/20 rounded-xl shadow-lg mt-8">
                        <h2 className="text-xl font-medium mb-2 text-white">
                            No Universities Found
                        </h2>
                        <p className="text-blue-100">
                            Please make sure you have uploaded the fee Excel
                            files to the data/fees directory.
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-10 sm:mt-16 text-center text-blue-200 text-xs sm:text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} Graphic Era Hill
                        University. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
}
