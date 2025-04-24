import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">
                The course you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
