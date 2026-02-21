import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    variant: 'purple' | 'orange' | 'blue' | 'green';
    className?: string;
    description?: string;
}

export function StatCard({ title, value, icon: Icon, variant, className, description }: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

    useEffect(() => {
        if (typeof value !== 'number') return;

        let start = 0;
        const end = value;
        const duration = 2000;
        const startTime = performance.now();

        const easeOutExpo = (x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(easeOutExpo(progress) * (end - start) + start);
            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }, [value]);

    const variants = {
        purple: {
            gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
            border: "border-purple-500/20 hover:border-purple-500/40",
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-600 dark:text-purple-400",
            shadow: "shadow-[0_8px_30px_rgb(168,85,247,0.12)]",
            glow: "bg-purple-500/30",
            ring: "group-hover:ring-purple-500/20"
        },
        orange: {
            gradient: "from-orange-500/10 via-red-500/5 to-transparent",
            border: "border-orange-500/20 hover:border-orange-500/40",
            iconBg: "bg-orange-500/10",
            iconColor: "text-orange-600 dark:text-orange-400",
            shadow: "shadow-[0_8px_30px_rgb(249,115,22,0.12)]",
            glow: "bg-orange-500/30",
            ring: "group-hover:ring-orange-500/20"
        },
        blue: {
            gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
            border: "border-blue-500/20 hover:border-blue-500/40",
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-600 dark:text-blue-400",
            shadow: "shadow-[0_8px_30px_rgb(59,130,246,0.12)]",
            glow: "bg-blue-500/30",
            ring: "group-hover:ring-blue-500/20"
        },
        green: {
            gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
            border: "border-emerald-500/20 hover:border-emerald-500/40",
            iconBg: "bg-emerald-500/10",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            shadow: "shadow-[0_8px_30px_rgb(16,185,129,0.12)]",
            glow: "bg-emerald-500/30",
            ring: "group-hover:ring-emerald-500/20"
        },
    };

    const theme = variants[variant];

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-card/80 backdrop-blur-sm",
                theme.border,
                theme.shadow,
                className
            )}
        >
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-300 group-hover:opacity-70", theme.gradient)} />

            {/* Dynamic Glow Effect */}
            <div className={cn("absolute -right-12 -top-12 h-40 w-40 rounded-full blur-[60px] transition-all duration-700 opacity-20 group-hover:opacity-40", theme.glow)} />
            <div className={cn("absolute -left-12 -bottom-12 h-40 w-40 rounded-full blur-[60px] transition-all duration-700 opacity-20 group-hover:opacity-40", theme.glow)} />

            <div className="relative flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{title}</p>
                    <h3 className="text-3xl font-bold tracking-tight text-foreground">
                        {typeof value === 'number' ? displayValue.toLocaleString() : value}
                    </h3>
                    {description && (
                        <p className="text-xs text-muted-foreground/80 font-medium">{description}</p>
                    )}
                </div>

                <div className={cn(
                    "rounded-xl p-3.5 bg-opacity-20 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner",
                    theme.iconBg
                )}>
                    <Icon className={cn("h-6 w-6 stroke-[2.5px]", theme.iconColor)} />
                </div>
            </div>

            {/* Bottom accent line */}
            <div className={cn("absolute bottom-0 left-0 h-1 w-full scale-x-0 transition-transform duration-500 group-hover:scale-x-100 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 origin-left", theme.iconColor)} />
        </div>
    );
}
