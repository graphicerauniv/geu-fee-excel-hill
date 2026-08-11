import type { Metadata } from "next";

const SITE_URL = "https://gehu.ac.in";
const FEE_BASE_URL = `${SITE_URL}/fee`;

const CAMPUS_NAMES: Record<string, string> = {
    ddn: "Dehradun",
    btl: "Bhimtal",
    hld: "Haldwani",
};

const CAMPUS_META: Record<string, { title: string; description: string }> = {
    ddn: {
        title: "GEHU Dehradun Fee Structure 2026 - Graphic Era Hill University",
        description:
            "Check GEHU Dehradun fee structure for UG, PG, diploma, and doctoral programs. View course-wise tuition fees, payment schedules, and scholarship details.",
    },
    btl: {
        title: "GEHU Bhimtal Fee Structure 2026 - Graphic Era Hill University",
        description:
            "View GEHU Bhimtal fee structure for undergraduate and postgraduate programs. Find course-wise tuition fees, payment information, and scholarships.",
    },
    hld: {
        title: "GEHU Haldwani Fee Structure 2026 - Graphic Era Hill University",
        description:
            "Explore GEHU Haldwani fee structure for UG and PG courses. Check tuition fees, semester-wise payment details, scholarships, and admission fee information.",
    },
};

const COURSE_LABEL_OVERRIDES: Record<string, string> = {
    "ddn/bsc-it-integrated": "Bsc It Integrated",
    "ddn/diploma-me": "Diploma Me",
    "ddn/ma-english": "MA English",
    "hld/ccho": "CCHA",
    "hld/bsc-it": "Bsc It",
};

const UPPERCASE_WORDS = new Set([
    "aat",
    "acca",
    "ai",
    "ba",
    "bba",
    "bca",
    "bfd",
    "bfa",
    "bhm",
    "bjmc",
    "ce",
    "cma",
    "cpa",
    "cse",
    "dhm",
    "ds",
    "ece",
    "gt",
    "hm",
    "iot",
    "it",
    "llb",
    "llm",
    "mba",
    "mbf",
    "mca",
    "me",
    "mfa",
    "mjmc",
]);

const ROOT_META = {
    title: "GEHU Fee Structure 2026 - Graphic Era Hill University",
    description:
        "Explore GEHU fee structure for all courses across Dehradun, Bhimtal, and Haldwani campuses. View semester-wise fees, scholarships, and payment details.",
};

function titleCaseWord(word: string): string {
    const lowerWord = word.toLowerCase();

    if (UPPERCASE_WORDS.has(lowerWord)) {
        return lowerWord.toUpperCase();
    }

    return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
}

function formatCourseLabel(university: string, course: string): string {
    const override = COURSE_LABEL_OVERRIDES[`${university}/${course}`];

    if (override) {
        return override;
    }

    return course
        .split("-")
        .map(titleCaseWord)
        .join(" ")
        .replace("AI DS", "AI & DS");
}

function buildMetadata(
    title: string,
    description: string,
    canonical: string
): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: "Graphic Era Hill University",
            type: "website",
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

export function getHomeMetadata(): Metadata {
    return buildMetadata(ROOT_META.title, ROOT_META.description, FEE_BASE_URL);
}

export function getCampusMetadata(university: string): Metadata | null {
    const campusMeta = CAMPUS_META[university];

    if (!campusMeta) {
        return null;
    }

    return buildMetadata(
        campusMeta.title,
        campusMeta.description,
        `${FEE_BASE_URL}/${university}`
    );
}

export function getCourseMetadata(
    university: string,
    course: string
): Metadata | null {
    const campusName = CAMPUS_NAMES[university];

    if (!campusName) {
        return null;
    }

    const courseLabel = formatCourseLabel(university, course);
    const title = `${courseLabel} Fee Portal | Graphic Era Hill University, ${campusName}`;
    const description = `${courseLabel} program builds strong analytical and financial skills with real-world applications. Apply now for Admission 2026 at GEHU ${campusName}.`;

    return buildMetadata(
        title,
        description,
        `${FEE_BASE_URL}/${university}/${course}`
    );
}
