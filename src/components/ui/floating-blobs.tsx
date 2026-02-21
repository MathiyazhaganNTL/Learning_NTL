import { cn } from "@/lib/utils";

interface FloatingBlobProps {
    className?: string;
    color?: string;
}

export function FloatingBlob({ className, color = "bg-primary" }: FloatingBlobProps) {
    return (
        <div
            className={cn(
                "absolute rounded-full blur-[100px] opacity-20 animate-blob mix-blend-multiply filter",
                color,
                className
            )}
        />
    );
}

export function FloatingBlobs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <FloatingBlob
                className="w-72 h-72 -top-10 -left-10 animate-blob"
                color="bg-primary"
            />
            <FloatingBlob
                className="w-96 h-96 top-1/2 -right-20 animate-blob delay-2000"
                color="bg-accent"
            />
            <FloatingBlob
                className="w-80 h-80 -bottom-20 left-1/4 animate-blob delay-4000"
                color="bg-rose-700"
            />
            <FloatingBlob
                className="w-64 h-64 top-1/4 right-1/3 animate-blob delay-2000"
                color="bg-blue-400"
            />
        </div>
    );
}
