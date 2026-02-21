
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { GraduationCap, Projector, ShieldCheck } from 'lucide-react';

interface RoleSelectorProps {
    selectedRole: UserRole;
    onSelect: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHoveringContainer, setIsHoveringContainer] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const roles = useMemo<{ id: UserRole; label: string; icon: React.ElementType }[]>(() => [
        { id: 'learner', label: 'Learner', icon: GraduationCap },
        { id: 'instructor', label: 'Instructor', icon: Projector },
        { id: 'admin', label: 'Admin', icon: ShieldCheck },
    ], []);

    useEffect(() => {
        const index = roles.findIndex((r) => r.id === selectedRole);
        setActiveIndex(index >= 0 ? index : 0);
    }, [selectedRole, roles]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsHoveringContainer(true);
    };

    const handleMouseLeave = () => {
        setIsHoveringContainer(false);
        setHoveredRole(null);
    };

    return (
        <div className="w-full max-w-md mx-auto mb-6 animate-fade-in group perspective-1000">
            {/* Main Interactive Container */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative grid grid-cols-3 gap-1 p-1.5 bg-muted/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(123,30,58,0.15)] ring-1 ring-white/5"
            >
                {/* 1. Dynamic Mouse-Follow Glow (Container Level) */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 wil-change-[background]"
                    style={{
                        opacity: isHoveringContainer ? 1 : 0,
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(113, 75, 110, 0.15), transparent 40%)`
                    }}
                />

                {/* 2. Animated Sliding Background Pill (Selection) */}
                <div
                    className="absolute top-1.5 bottom-1.5 rounded-xl bg-background/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1)] border border-border/50 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
                    style={{
                        left: `calc(6px + ${activeIndex} * ((100% - 12px) / 3))`,
                        width: `calc((100% - 12px) / 3)`,
                    }}
                >
                    {/* Inner Pill Glow Trail */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-100" />
                    {/* Active Bottom Highlight */}
                    <div className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-[1px]" />
                </div>

                {/* Role Options */}
                {roles.map((role) => {
                    const isActive = selectedRole === role.id;
                    const isHovered = hoveredRole === role.id;
                    const Icon = role.icon;
                    // Fade out non-hovered items slightly when interacting
                    const isDimmed = isHoveringContainer && !isHovered && !isActive;

                    return (
                        <button
                            key={role.id}
                            onClick={() => onSelect(role.id)}
                            onMouseEnter={() => setHoveredRole(role.id)}
                            className={cn(
                                "relative z-10 flex-1 flex flex-col items-center justify-center py-3 px-2 text-sm font-medium transition-all duration-300 select-none outline-none rounded-xl",
                                "focus-visible:ring-2 focus-visible:ring-primary/50",
                                isActive
                                    ? "text-primary scale-105 cursor-default"
                                    : "text-muted-foreground cursor-pointer hover:text-foreground",
                                isDimmed && "opacity-50 blur-[0.5px] scale-95",
                                isHovered && !isActive && "scale-105 bg-white/5"
                            )}
                        >
                            {/* Icon Container */}
                            <div className={cn(
                                "mb-1.5 p-1.5 rounded-full transition-all duration-500 relative",
                                isActive ? "bg-primary/10 text-primary -translate-y-0.5" : "bg-transparent",
                                isHovered && !isActive && "bg-white/10 text-foreground"
                            )}>
                                <Icon className={cn(
                                    "h-5 w-5 transition-all duration-300",
                                    isActive && "drop-shadow-[0_0_10px_rgba(123,30,58,0.6)]",
                                    isHovered && "animate-pulse"
                                )} />

                                {/* Orbiting Dot for Active State */}
                                {isActive && (
                                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                    </span>
                                )}
                            </div>

                            {/* Label */}
                            <span className={cn(
                                "tracking-tight transition-all duration-300",
                                isActive ? "font-bold text-foreground" : "font-medium",
                                isHovered && "tracking-wide"
                            )}>
                                {role.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Helper text with smooth height transition */}
            <div className="mt-4 text-center h-6 overflow-hidden">
                <p key={selectedRole} className="text-xs text-muted-foreground animate-slide-up font-medium">
                    {selectedRole === 'learner' && "🎓 Access courses, track progress, and earn certificates."}
                    {selectedRole === 'instructor' && "📽️ Create courses, manage students, and view reports."}
                    {selectedRole === 'admin' && "🛡️ System configuration, user management, and oversight."}
                </p>
            </div>
        </div>
    );
}
