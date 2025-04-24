"use client";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({
    value,
    onChange,
    placeholder = "Search courses...",
    className,
}: SearchBarProps) {
    return (
        <div className={cn("relative w-full", className)}>
            <div className="absolute z-10 inset-y-2 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-blue-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 pl-10 text-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-100"
                placeholder={placeholder}
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-100 hover:text-white"
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
