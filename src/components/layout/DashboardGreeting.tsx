import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Sun, Moon, CloudSun, type LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardGreetingProps {
    name: string;
    className?: string;
}

export function DashboardGreeting({ name, className }: DashboardGreetingProps) {
    const [greeting, setGreeting] = useState('');
    const [Icon, setIcon] = useState<LucideIcon>(() => Sun);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const hour = new Date().getHours();

        if (hour < 12) {
            setGreeting('Good Morning');
            setIcon(() => Sun);
        } else if (hour < 18) {
            setGreeting('Good Afternoon');
            setIcon(() => CloudSun);
        } else {
            setGreeting('Good Evening');
            setIcon(() => Moon);
        }
    }, []);

    if (!mounted) return null;

    return (
        <div
            className={cn(
                "group relative flex items-center gap-3 rounded-full border border-primary/10 bg-background/50 pl-2 pr-6 py-1.5 backdrop-blur-md transition-all duration-300 hover:bg-background/80 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] animate-in fade-in slide-in-from-top-1 duration-700",
                className
            )}
        >
            {/* Animated Glow Border Effect */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-rose-700/0 via-rose-700/10 to-rose-700/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Avatar Section */}
            <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-background ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30">
                    <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${name}&backgroundColor=transparent`} />
                    <AvatarFallback className="bg-gradient-to-br from-rose-700 to-rose-900 text-white font-bold text-xs">
                        {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                {/* Status indicator */}
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
            </div>

            {/* Text Section */}
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-orange-500 dark:text-yellow-400 animate-in zoom-in duration-500" />
                    <span className="text-xs font-medium text-muted-foreground/80 tracking-wide uppercase">
                        {greeting}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-rose-700 group-hover:to-rose-900 transition-all duration-300">
                        {name}
                    </span>
                    <Sparkles className="h-3 w-3 text-yellow-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-12" />
                </div>
            </div>

            {/* Hover Light Streak */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
                <div className="absolute top-0 h-full w-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent left-[-20%] group-hover:left-[120%] transition-all duration-1000 ease-in-out" />
            </div>
        </div>
    );
}
