import { useAuth, badges } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Trophy, Star, CheckCircle2, Lock, Sparkles, Zap, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export function GamificationPanel() {
  const { user, currentBadge, nextBadge, progressToNextBadge } = useAuth();

  if (!user) return null;

  // Level Progression definitions
  const levels = ['Newbie', 'Explorer', 'Achiever', 'Specialist', 'Expert', 'Master'];

  // Determine current level index (mock logic - mapped to badges or points)
  // For demo, we'll map currentBadge to a level or calculate from points
  const currentLevelIndex = Math.min(Math.floor(user.totalPoints / 200), levels.length - 1);
  const currentLevel = levels[currentLevelIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-background/60 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-primary/40 group">

      {/* Ambient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-violet-500/5 to-blue-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-20 -ml-16 -mb-16 pointer-events-none animate-pulse delay-700" />

      <div className="relative p-5 space-y-6">

        {/* Profile Identity Header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-violet-500 rounded-full opacity-70 blur-sm animate-spin-slow group-hover:opacity-100 transition-opacity duration-700" />
            <Avatar className="h-14 w-14 border-2 border-background shadow-lg relative z-10">
              <AvatarImage src={user.avatar} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-violet-600 text-white font-bold text-lg">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 shadow-sm z-20">
              <div className="bg-green-500 h-2.5 w-2.5 rounded-full border-2 border-background animate-pulse" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              {user.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-primary/10 to-violet-500/10 text-primary border border-primary/20">
                <Sparkles className="h-2.5 w-2.5" />
                {currentLevel}
              </span>
              <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-violet-500 transition-all duration-1000 ease-out"
                  style={{ width: `${(user.totalPoints % 200) / 2}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Points Highlight Section */}
        <div className="relative text-center py-1">
          <div className="relative h-40 w-40 mx-auto">

            {/* Outer Rotating Ring */}
            <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-primary/20 animate-[spin_10s_linear_infinite]" />

            {/* Progress Circle SVG */}
            <svg className="h-full w-full -rotate-90 transform drop-shadow-xl overflow-visible">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" /> {/* Violet */}
                  <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
                </linearGradient>
              </defs>
              {/* Track */}
              <circle
                cx="80"
                cy="80"
                r="65"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-muted/10"
              />
              {/* Indicator */}
              <circle
                cx="80"
                cy="80"
                r="65"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 65}
                strokeDashoffset={(2 * Math.PI * 65) - (Math.min(user.totalPoints / 1000, 1) * (2 * Math.PI * 65))} // Example max 1000 points
                strokeLinecap="round"
                className="transition-all duration-1500 ease-out"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Points</span>
              <div className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary via-violet-500 to-blue-600 drop-shadow-sm scale-110 animate-in zoom-in-50 duration-700">
                {user.totalPoints}
              </div>
              <div className="mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary animate-bounce-slow">
                <Zap className="h-2.5 w-2.5 fill-current" />
                Top 5%
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-3 font-medium italic">
            "You are progressing brilliantly!"
          </p>
        </div>

        {/* Level Progression Roadmap */}
        <div className="pt-0">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-yellow-500" />
              Level Journey
            </h4>
            <span className="text-[10px] font-medium text-muted-foreground">{currentLevelIndex + 1}/{levels.length}</span>
          </div>

          <div className="relative pl-4 space-y-2.5 before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-muted before:to-muted/10">
            {levels.map((level, index) => {
              const isCompleted = index <= currentLevelIndex;
              const isCurrent = index === currentLevelIndex;
              const isLocked = index > currentLevelIndex;

              return (
                <div key={level} className={cn("relative flex items-center gap-3 group/item", isLocked && "opacity-60 grayscale")}>
                  {/* Node */}
                  <div className={cn(
                    "relative z-10 w-4 h-4 rounded-full flex items-center justify-center border-[1.5px] transition-all duration-500",
                    isCompleted ? "bg-primary border-primary shadow-[0_0_8px_rgba(139,92,246,0.3)]" : "bg-background border-muted-foreground/30",
                    isCurrent && "scale-125 ring-2 ring-primary/20"
                  )}>
                    {isCompleted && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                  </div>

                  {/* Content */}
                  <div className={cn(
                    "flex-1 px-3 py-2 rounded-lg border transition-all duration-300",
                    isCurrent
                      ? "bg-gradient-to-r from-primary/10 to-transparent border-primary/30 shadow-sm translate-x-1"
                      : "bg-muted/40 border-border/40 hover:bg-muted/60"
                  )}>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-xs font-bold",
                        isCurrent ? "text-primary" : "text-foreground"
                      )}>
                        {level}
                      </span>
                      {isLocked ? (
                        <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                      ) : (
                        <Award className={cn("h-3 w-3", isCurrent ? "text-primary animate-pulse" : "text-primary/50")} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
