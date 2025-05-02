import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a university name for use in URLs by converting to lowercase
 * and preserving any hyphens
 */
export function formatForUrl(name: string): string {
    return name.toLowerCase().replace(/-/g, "-");
}

/**
 * Formats a course name for use in URLs by encoding URI components
 */
export function formatCourseForUrl(name: string): string {
    return encodeURIComponent(name);
}

/**
 * Formats a university name for display by replacing hyphens with spaces
 */
export function formatUniversityDisplay(name: string): string {
    if (name.toLowerCase().includes("btl")) {
        return "Graphic Era Hill University, Bhimtal";
    }
    if (name.toLowerCase().includes("ddn")) {
        return "Graphic Era Hill University, Dehradun";
    }
    if (name.toLowerCase().includes("hld")) {
        return "Graphic Era Hill University, Haldwani";
    }
    if (name.toLowerCase().includes("geu")) {
        return "Graphic Era (Deemed to be University)";
    }
    return name.replace(/-/g, " ");
}

export function formatUniversityForCampusDisplay(name: string): string {
    if (name.toLowerCase().includes("btl")) {
        return "Bhimtal Campus";
    }
    if (name.toLowerCase().includes("ddn")) {
        return "Dehradun Campus";
    }
    if (name.toLowerCase().includes("hld")) {
        return "Haldwani Campus";
    }
    return name;
}
