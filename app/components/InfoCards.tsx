"use client";

import { ContactButton } from "./ContactButton";

export function InfoCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-10">
            {/* Payment Methods */}
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-1 sm:mb-2">
                    Payment Methods
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                    Multiple payment options available for your convenience
                </p>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2 text-gray-700">
                        <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
                            ✓
                        </span>
                        Online Banking
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                        <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
                            ✓
                        </span>
                        Credit/Debit Cards
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                        <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
                            ✓
                        </span>
                        Bank Challan
                    </li>
                </ul>
            </div>

            {/* Scholarship Information */}
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                        />
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-1 sm:mb-2">
                    Scholarship Opportunities
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                    Financial aid options to support your education
                </p>
                <div className="space-y-2 sm:space-y-3">
                    <div className="border-l-2 border-blue-500 pl-3">
                        <p className="text-xs text-blue-500 font-semibold">
                            Merit Scholarship
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            Up to 50% tuition waiver
                        </p>
                    </div>
                    <div className="border-l-2 border-blue-500 pl-3">
                        <p className="text-xs text-blue-500 font-semibold">
                            Need-Based Aid
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            Based on financial circumstances
                        </p>
                    </div>
                    <div className="border-l-2 border-blue-500 pl-3">
                        <p className="text-xs text-blue-500 font-semibold">
                            Application Deadline
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            30 days before semester start
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-lg sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-1 sm:mb-2">
                    Need Assistance?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                    Contact our fees department for any queries
                </p>
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-blue-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-medium text-gray-800">
                                <a
                                    href="tel:18008906027"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    +1 (800) 890-6027
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-blue-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <a
                                href="mailto:feecell@geu.ac.in"
                                className="text-sm font-medium text-gray-800"
                            >
                                feecell@geu.ac.in
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-3 sm:mt-4">
                    <ContactButton />
                </div>
            </div>
        </div>
    );
}
