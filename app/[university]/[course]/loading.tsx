import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="container mx-auto py-8 px-4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden p-6">
                <Skeleton className="h-[400px] w-full" />
            </div>
        </main>
    );
}
