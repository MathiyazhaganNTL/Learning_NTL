import { useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
}

export function InteractiveCard({
    children,
    className,
    glowColor = 'rgba(113, 75, 110, 0.3)',
    duration = 4,
    borderWidth = 2,
    colorFrom = '#714B6E',
    colorTo = '#0D8FDC',
    ...props
}: InteractiveCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                'relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 ease-out cursor-pointer overflow-hidden group',
                isHovered ? 'shadow-card-hover border-transparent' : 'shadow-md',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Professional Border Beam Effect */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-700",
                    isHovered ? "opacity-100" : "opacity-0"
                )}
                style={{
                    padding: borderWidth,
                }}
            >
                <div
                    className="absolute inset-0 animate-border-beam"
                    style={{
                        // @ts-expect-error
                        '--duration': `${duration}s`,
                        maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        borderRadius: 'inherit',
                        background: `linear-gradient(to right, transparent, ${colorFrom}, ${colorTo}, transparent)`,
                        offsetPath: `rect(0 100% 100% 0 round 1rem)`,
                        width: isHovered ? '120px' : '80px',
                        height: '3px',
                        filter: isHovered ? 'blur(4px)' : 'blur(2px)',
                        transition: 'width 0.5s ease, filter 0.5s ease',
                    }}
                />
            </div>

            {/* Static background glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}, transparent 80%)`,
                }}
            />

            {/* Blinking/Pulse effect line */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-1000",
                    isHovered ? "opacity-100" : "opacity-0"
                )}
            >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
                {children}
            </div>
        </div>
    );
}

// Simpler version
export function HoverCard({
    children,
    className,
    glowColor = 'rgba(113, 75, 110, 0.2)',
    ...props
}: InteractiveCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                'relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 ease-out hover:shadow-xl cursor-pointer overflow-hidden group',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Running line on border */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-700",
                    isHovered ? "opacity-100" : "opacity-0"
                )}
            >
                <div
                    className="absolute inset-0 animate-border-beam"
                    style={{
                        // @ts-expect-error
                        '--duration': `3.5s`,
                        maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        borderRadius: 'inherit',
                        offsetPath: `rect(0 100% 100% 0 round 1rem)`,
                        background: `linear-gradient(to right, transparent, #714B6E, #0D8FDC, transparent)`,
                        width: isHovered ? '100px' : '60px',
                        height: '2px',
                        filter: isHovered ? 'blur(2px)' : 'none',
                        transition: 'all 0.5s ease',
                    }}
                />
            </div>

            {/* Static glow effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}, transparent 80%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.01]">
                {children}
            </div>
        </div>
    );
}
