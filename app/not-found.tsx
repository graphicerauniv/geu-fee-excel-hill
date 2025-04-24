import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
                The page you're looking for does not exist or may have been
                moved.
            </p>
            <Link
                href="/"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
            >
                Return to Home
            </Link>
        </div>
    );
}
