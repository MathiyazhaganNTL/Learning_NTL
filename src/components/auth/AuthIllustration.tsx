
import {
    GraduationCap,
    BookOpen,
    Coffee,
    Headphones,
    Code,
    Calendar,
    FileText,
    MessageCircle,
    Brain,
    BarChart,
    Cloud,
    Award,
    LucideIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Floating Icon Component
const FloatingIcon = ({
    icon: Icon,
    color,
    bg,
    position,
    delay,
    duration,
    rotate,
    scale = 1,
    floatHeight = 15,
    mousePos
}: {
    icon: LucideIcon,
    color: string,
    bg: string,
    position: string,
    delay: number,
    duration: number,
    rotate: number,
    scale?: number,
    floatHeight?: number,
    mousePos: { x: number, y: number }
}) => {
    // Parallax Factor - Randomized per icon for depth feel
    const parallaxFactor = (duration % 2 === 0 ? 20 : -20);
    const translateX = (mousePos.x * parallaxFactor) / 1000;
    const translateY = (mousePos.y * parallaxFactor) / 1000;

    return (
        <div
            className={cn(
                "absolute animate-float transition-transform duration-700 ease-out",
                position
            )}
            style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                '--float-height': `${floatHeight}px`,
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`
            } as React.CSSProperties}
        >
            <div className={cn(
                "relative flex items-center justify-center p-3 rounded-2xl backdrop-blur-md border shadow-2xl transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary/30",
                bg,
                "border-white/10"
            )}>
                {/* Inner Glow */}
                <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    "bg-gradient-to-br from-white/20 to-transparent"
                )} />

                <Icon className={cn("w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-colors", color)} />
            </div>
        </div>
    );
};

export function AuthIllustration() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX - window.innerWidth / 2,
                y: e.clientY - window.innerHeight / 2
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative h-full w-full overflow-hidden bg-slate-950 flex items-center justify-center p-8 perspective-1000">
            {/* Background Gradients & Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-slate-950 to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-50" />

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none animate-pulse duration-[10s]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/20 blur-[100px] rounded-full pointer-events-none animate-pulse duration-[8s]" />

            {/* Main 3D Composition Container */}
            <div className="relative z-10 w-full max-w-lg min-h-[400px] flex items-center justify-center preserve-3d">

                {/* --- Main Laptop --- */}
                <div
                    className="relative w-[480px] h-[280px] group animate-float z-20"
                    style={{ animationDuration: '8s' } as React.CSSProperties}
                >
                    {/* Laptop Lid/Screen */}
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-900 rounded-t-xl rounded-b-md shadow-2xl border-[4px] border-slate-800 overflow-hidden transition-transform duration-700 group-hover:-translate-y-2 z-20">
                        {/* Screen Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-30" />

                        {/* Screen Content */}
                        <div className="absolute inset-2 bg-slate-950 rounded overflow-hidden flex flex-col items-center pt-8 relative">
                            {/* Navbar Mock */}
                            <div className="absolute top-0 w-full h-8 bg-slate-900 border-b border-white/5 flex items-center px-3 gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                            {/* Hero Content Mock */}
                            <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center space-y-4 bg-gradient-to-br from-slate-900 to-slate-950">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 animate-pulse">
                                    <GraduationCap className="w-7 h-7 text-white" />
                                </div>
                                <div className="space-y-2 w-full flex flex-col items-center">
                                    <div className="w-3/4 h-3 bg-white/10 rounded-full" />
                                    <div className="w-1/2 h-2 bg-white/5 rounded-full" />
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <div className="w-20 h-6 rounded-md bg-accent/80 shadow-lg shadow-accent/20" />
                                    <div className="w-20 h-6 rounded-md border border-white/10 bg-white/5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Laptop Base */}
                    <div className="absolute -bottom-[12px] left-[-5%] w-[110%] h-[16px] bg-slate-800 rounded-b-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] z-10" />
                </div>


                {/* --- Floating Icons Layer (Orbiting) --- */}

                {/* 1. Course/Video Icon - Top Right */}
                <FloatingIcon
                    icon={Brain}
                    position="-top-12 -right-8"
                    bg="bg-indigo-500/10"
                    color="text-indigo-400"
                    rotate={12}
                    delay={0}
                    duration={6}
                    mousePos={mousePos}
                />

                {/* 2. Certificate/Award - Top Left */}
                <FloatingIcon
                    icon={Award}
                    position="top-0 -left-16"
                    bg="bg-yellow-500/10"
                    color="text-yellow-400"
                    rotate={-8}
                    delay={1.5}
                    duration={7}
                    mousePos={mousePos}
                />

                {/* 3. Coding - Bottom Right */}
                <FloatingIcon
                    icon={Code}
                    position="bottom-16 -right-20"
                    bg="bg-blue-500/10"
                    color="text-blue-400"
                    rotate={-15}
                    delay={2}
                    duration={5.5}
                    mousePos={mousePos}
                />

                {/* 4. Calendar - Bottom Left */}
                <FloatingIcon
                    icon={Calendar}
                    position="-bottom-8 -left-12"
                    bg="bg-red-500/10"
                    color="text-red-400"
                    rotate={6}
                    delay={0.5}
                    duration={6.5}
                    mousePos={mousePos}
                />

                {/* 5. Notes - Top Center (Floating high) */}
                <FloatingIcon
                    icon={FileText}
                    position="-top-24 left-1/4"
                    bg="bg-emerald-500/10"
                    color="text-emerald-400"
                    rotate={-5}
                    delay={3}
                    duration={8}
                    scale={0.9}
                    mousePos={mousePos}
                />

                {/* 6. Community - Right Center */}
                <FloatingIcon
                    icon={MessageCircle}
                    position="top-1/3 -right-24"
                    bg="bg-pink-500/10"
                    color="text-pink-400"
                    rotate={10}
                    delay={1}
                    duration={5}
                    scale={0.9}
                    mousePos={mousePos}
                />

                {/* 7. Analytics - Left Center */}
                <FloatingIcon
                    icon={BarChart}
                    position="top-1/2 -left-28"
                    bg="bg-purple-500/10"
                    color="text-purple-400"
                    rotate={-12}
                    delay={2.5}
                    duration={6}
                    scale={0.9}
                    mousePos={mousePos}
                />

                {/* 8. Cloud - Bottom Center (Deep) */}
                <FloatingIcon
                    icon={Cloud}
                    position="-bottom-20 left-1/2"
                    bg="bg-sky-500/10"
                    color="text-sky-400"
                    rotate={4}
                    delay={4}
                    duration={7.5}
                    scale={0.8}
                    mousePos={mousePos}
                />

            </div>

            {/* Modern Overlay Text */}
            <div className="absolute bottom-12 left-12 z-30 pointer-events-none">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
                    Your Personal
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary ml-2 typing-cursor">Learning Space</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    Immerse yourself in a world of knowledge with our cutting-edge platform designed for focus and growth.
                </p>
            </div>
        </div>
    );
}
