export default function Loading() {
    return (
        <main className="min-h-screen relative bg-gradient-to-b from-blue-800 to-blue-600 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-10 transform translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
                {/* Header Section with Glass Effect - Loading State */}
                <div className="mb-6 sm:mb-10 p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl border border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 sm:gap-6">
                        {/* Logo placeholder for mobile */}
                        <div className="w-full flex justify-center md:hidden mb-4">
                            <div className="h-14 w-32 bg-white/20 animate-pulse rounded"></div>
                        </div>

                        <div className="text-center md:text-left w-full md:w-auto">
                            <div className="h-10 sm:h-12 md:h-14 w-64 sm:w-80 bg-white/20 animate-pulse rounded mb-2 sm:mb-3"></div>
                            <div className="h-5 sm:h-6 w-48 sm:w-64 bg-white/20 animate-pulse rounded"></div>
                        </div>

                        {/* Logo placeholder for desktop */}
                        <div className="hidden md:block">
                            <div className="h-12 sm:h-16 w-32 bg-white/20 animate-pulse rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Course List - Loading State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="h-8 w-3/4 bg-white/20 animate-pulse rounded mb-4"></div>
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <div
                                        key={j}
                                        className="h-5 w-full bg-white/20 animate-pulse rounded"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer - Loading State */}
                <div className="mt-10 sm:mt-16 text-center">
                    <div className="h-4 w-64 mx-auto bg-white/20 animate-pulse rounded"></div>
                </div>
            </div>
        </main>
    );
}
