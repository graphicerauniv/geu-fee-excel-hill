"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintableContent } from "./PrintableContent";

interface DownloadButtonProps {
    course: any;
    courseParam: string;
    universityName: string;
}

export function DownloadButton({
    course,
    courseParam,
    universityName,
}: DownloadButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const printableRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printableRef,
        documentTitle: `${courseParam}_Fee_Structure`,
        onBeforePrint: () => {
            setIsLoading(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setIsLoading(false);
        },
        pageStyle: `
            @page {
                size: 17in 11in;
                margin: 0.5cm;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            }
        `,
    });

    return (
        <>
            <Button
                className="bg-blue-700 hover:bg-blue-800 transition-colors"
                onClick={() => handlePrint()}
                disabled={isLoading || !course.data}
            >
                {isLoading ? "Preparing..." : "Download Fee Structure"}
            </Button>

            {/* Hidden Printable Component */}
            {course.data && (
                <PrintableContent ref={printableRef} course={course} />
            )}
        </>
    );
}
