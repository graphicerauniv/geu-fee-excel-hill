"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ContactButton() {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleContact = () => {
        setShowTooltip(true);
        // Here you could also implement a modal or redirect
        setTimeout(() => setShowTooltip(false), 3000);
    };

    return (
        <div className="relative">
            <Button
                className="w-full bg-blue-700 hover:bg-blue-800 transition-colors"
                onClick={handleContact}
            >
                Contact Us
            </Button>

            {showTooltip && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white text-blue-900 rounded-md shadow-lg text-sm z-10 w-64 animate-in fade-in slide-in-from-top-4 duration-300">
                    <p className="font-medium">Thanks for your interest!</p>
                    <p className="text-xs text-gray-600 mt-1">
                        A representative will contact you shortly.
                    </p>
                </div>
            )}
        </div>
    );
}
