import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/types";
import { Trophy, Star } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface GamificationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    pointsEarned: number;
    currentBadge: Badge | null;
    nextBadge: Badge | null;
    progress: number;
}

export function GamificationPopup({
    isOpen,
    onClose,
    pointsEarned,
    currentBadge,
    nextBadge,
    progress,
    title = "Congratulations!",
    buttonText = "Awesome!",
}: GamificationPopupProps & { title?: string; buttonText?: string }) {

    useEffect(() => {
        if (isOpen) {
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const random = (min: number, max: number) => {
                return Math.random() * (max - min) + min;
            }

            const interval: ReturnType<typeof setInterval> = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md text-center">
                <DialogHeader>
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                        <Trophy className="h-10 w-10 text-yellow-600" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-6">
                    <p className="mb-2 text-lg font-medium text-muted-foreground">
                        You have earned
                    </p>
                    <div className="mb-8 flex items-center justify-center gap-2">
                        <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                        <span className="text-4xl font-bold text-primary">{pointsEarned} Points</span>
                    </div>

                    <div className="space-y-2 rounded-lg bg-muted/30 p-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Progress to {nextBadge?.name || 'Max Rank'}</span>
                            <span className="text-muted-foreground">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{currentBadge?.name}</span>
                            <span>{nextBadge?.name}</span>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button onClick={onClose} size="lg" className="w-full sm:w-auto">
                        {buttonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
