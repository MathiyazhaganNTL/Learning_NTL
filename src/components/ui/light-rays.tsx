import { useRef, useEffect, useState } from 'react';

interface LightRaysProps {
    raysOrigin?: 'center' | 'top' | 'top-center';
    raysColor?: string;
    lightSpread?: number;
    rayLength?: number;
    fadeDistance?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    intensity?: number;
    blur?: number;
    className?: string;
}

export function LightRays({
    raysOrigin = 'top-center',
    raysColor = '#7c3aed',
    lightSpread = 0.6,
    rayLength = 0.8,
    fadeDistance = 1,
    saturation = 0.3,
    followMouse = true,
    mouseInfluence = 0.05,
    intensity = 0.35,
    blur = 60,
    className = '',
}: LightRaysProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 });
    const animationRef = useRef<number>();
    const smoothMouseRef = useRef({ x: 0.5, y: 0.3 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {

            const dpr = Math.min(window.devicePixelRatio, 1.5);
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Parse color to RGB
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 124, g: 58, b: 237 };
        };

        const rgb = hexToRgb(raysColor);

        const render = () => {
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            if (width === 0 || height === 0) {
                animationRef.current = requestAnimationFrame(render);
                return;
            }

            // Very smooth mouse easing
            smoothMouseRef.current.x += (mousePos.x - smoothMouseRef.current.x) * 0.015;
            smoothMouseRef.current.y += (mousePos.y - smoothMouseRef.current.y) * 0.015;

            ctx.clearRect(0, 0, width, height);

            // Calculate mouse-influenced center
            const mouseOffsetX = followMouse ? (smoothMouseRef.current.x - 0.5) * width * mouseInfluence : 0;
            const centerX = width / 2 + mouseOffsetX;

            // Handle raysOrigin
            let originY = -height * 0.1;
            if (raysOrigin === 'center') originY = height / 2;
            else if (raysOrigin === 'top') originY = 0;

            const baseAlpha = intensity * saturation * fadeDistance;
            const spotlightWidth = width * lightSpread;
            const spotlightHeight = height * rayLength;

            // Layer 1: Wide ambient glow
            const ambientGlow = ctx.createRadialGradient(
                centerX, originY,
                0,
                centerX, height * 0.5,
                width * 0.8
            );

            ambientGlow.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.4})`);
            ambientGlow.addColorStop(0.2, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.2})`);
            ambientGlow.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.05})`);
            ambientGlow.addColorStop(1, 'transparent');

            ctx.fillStyle = ambientGlow;
            ctx.fillRect(0, 0, width, height);

            // Layer 2: Main spotlight cone
            ctx.save();

            // Create soft cone path
            ctx.beginPath();
            const topWidth = spotlightWidth * 0.15;
            const bottomWidth = spotlightWidth * 1.2;

            ctx.moveTo(centerX - topWidth, originY > 0 ? originY : 0);
            ctx.lineTo(centerX + topWidth, originY > 0 ? originY : 0);

            // Smooth bezier curves
            ctx.bezierCurveTo(
                centerX + topWidth * 2, originY + spotlightHeight * 0.25,
                centerX + bottomWidth * 0.7, originY + spotlightHeight * 0.6,
                centerX + bottomWidth, originY + spotlightHeight * 1.2
            );
            ctx.lineTo(centerX - bottomWidth, originY + spotlightHeight * 1.2);
            ctx.bezierCurveTo(
                centerX - bottomWidth * 0.7, originY + spotlightHeight * 0.6,
                centerX - topWidth * 2, originY + spotlightHeight * 0.25,
                centerX - topWidth, originY > 0 ? originY : 0
            );
            ctx.closePath();
            ctx.clip();

            // Multi-stop gradient
            const coneGradient = ctx.createLinearGradient(centerX, originY > 0 ? originY : 0, centerX, originY + spotlightHeight);

            coneGradient.addColorStop(0, `rgba(${Math.min(255, rgb.r + 80)}, ${Math.min(255, rgb.g + 80)}, ${Math.min(255, rgb.b + 80)}, ${baseAlpha * 0.6})`);
            coneGradient.addColorStop(0.1, `rgba(${Math.min(255, rgb.r + 40)}, ${Math.min(255, rgb.g + 40)}, ${Math.min(255, rgb.b + 40)}, ${baseAlpha * 0.4})`);
            coneGradient.addColorStop(0.25, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.25})`);
            coneGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.12})`);
            coneGradient.addColorStop(0.75, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.04})`);
            coneGradient.addColorStop(1, 'transparent');

            ctx.fillStyle = coneGradient;
            ctx.fillRect(0, 0, width, height);

            ctx.restore();

            // Layer 3: Center highlight
            const centerHighlight = ctx.createRadialGradient(
                centerX, originY > 0 ? originY : 0,
                0,
                centerX, originY > 0 ? originY : 0,
                spotlightWidth * 0.4
            );

            centerHighlight.addColorStop(0, `rgba(255, 250, 255, ${baseAlpha * 0.35})`);
            centerHighlight.addColorStop(0.15, `rgba(${Math.min(255, rgb.r + 100)}, ${Math.min(255, rgb.g + 100)}, ${Math.min(255, rgb.b + 100)}, ${baseAlpha * 0.2})`);
            centerHighlight.addColorStop(0.4, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.08})`);
            centerHighlight.addColorStop(1, 'transparent');

            ctx.fillStyle = centerHighlight;
            ctx.fillRect(0, 0, width, height);

            // Layer 4: Soft bloom effect
            const bloom = ctx.createRadialGradient(
                centerX, originY + height * 0.2,
                0,
                centerX, originY + height * 0.3,
                spotlightWidth * 0.6
            );

            bloom.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.15})`);
            bloom.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * 0.05})`);
            bloom.addColorStop(1, 'transparent');

            ctx.fillStyle = bloom;
            ctx.fillRect(0, 0, width, height);

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [
        raysOrigin,
        raysColor,
        lightSpread,
        rayLength,
        fadeDistance,
        saturation,
        followMouse,
        mouseInfluence,
        intensity,
        mousePos
    ]);

    useEffect(() => {
        if (!followMouse) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [followMouse]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                filter: `blur(${blur}px)`,
                transform: 'translateZ(0)',
            }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    mixBlendMode: 'screen',
                    opacity: 0.9,
                }}
            />
        </div>
    );
}
