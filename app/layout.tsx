import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Fee Portal | Graphic Era Hill University",
    description:
        "Fee structure for all Graphic Era Hill universities and courses",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script id="google-tag-manager" strategy="beforeInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MTTTBJ88');`}
                </Script>
            </head>
            <body
                className={`${poppins.variable} ${geistMono.variable} antialiased`}
            >
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-MTTTBJ88"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                {children}

                <Toaster />
            </body>
        </html>
    );
}
