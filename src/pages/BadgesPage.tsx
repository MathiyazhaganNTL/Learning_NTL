import { Award, Star, Medal, Trophy, Moon, Zap, Target, Crown, Sun, BookOpen, Clock, Lock, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserStats = {
  loginCount: number;
  coursesStarted: number;
  coursesCompleted: number;
  streak: number;
  studiedAtNight: boolean;
};

const userStats: UserStats = {
  loginCount: 3,
  coursesStarted: 2,
  coursesCompleted: 1,
  streak: 9,
  studiedAtNight: true,
};

const BADGES = [
  {
    id: "first-login",
    name: "First Launch",
    description: "Logged in for the first time",
    icon: Zap,
    color: "from-yellow-400 to-orange-500",
    glowColor: "yellow",
    condition: (stats: UserStats) => stats.loginCount >= 1,
  },
  {
    id: "course-starter",
    name: "Course Starter",
    description: "Started your first course",
    icon: Target,
    color: "from-cyan-400 to-blue-500",
    glowColor: "cyan",
    condition: (stats: UserStats) => stats.coursesStarted >= 1,
  },
  {
    id: "consistent-learner",
    name: "Consistency King",
    description: "Maintained a 7-day learning streak",
    icon: Crown,
    color: "from-rose-400 to-rose-700",
    glowColor: "purple",
    condition: (stats: UserStats) => stats.streak >= 7,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Studied after midnight",
    icon: Moon,
    color: "from-slate-400 to-indigo-600",
    glowColor: "indigo",
    condition: (stats: UserStats) => stats.studiedAtNight,
  },
  {
    id: "course-finisher",
    name: "Finisher",
    description: "Completed a full course",
    icon: Trophy,
    color: "from-emerald-400 to-green-500",
    glowColor: "emerald",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
  {
    id: "five-courses",
    name: "Course Explorer",
    description: "Started 5 different courses",
    icon: Star,
    color: "from-pink-400 to-rose-500",
    glowColor: "pink",
    condition: (stats: UserStats) => stats.coursesStarted >= 5,
  },
  {
    id: "daily-grinder",
    name: "Daily Grinder",
    description: "Learned something every day for 3 days",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    glowColor: "amber",
    condition: (stats: UserStats) => stats.streak >= 3,
  },
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    description: "Started 3 different courses",
    icon: BookOpen,
    color: "from-blue-400 to-cyan-500",
    glowColor: "blue",
    condition: (stats: UserStats) => stats.coursesStarted >= 3,
  },
  {
    id: "halfway-hero",
    name: "Halfway Hero",
    description: "Reached 50% in any course",
    icon: Target,
    color: "from-green-400 to-emerald-500",
    glowColor: "green",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintained a 14-day streak",
    icon: Crown,
    color: "from-rose-400 to-rose-600",
    glowColor: "purple",
    condition: (stats: UserStats) => stats.streak >= 14,
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Studied before 6 AM",
    icon: Sun,
    color: "from-yellow-300 to-amber-500",
    glowColor: "yellow",
    condition: (_stats: UserStats) => true,
  },
  {
    id: "marathon-learner",
    name: "Marathon Learner",
    description: "Spent long hours learning",
    icon: Clock,
    color: "from-red-400 to-rose-500",
    glowColor: "red",
    condition: (stats: UserStats) => stats.loginCount >= 5,
  },
  {
    id: "curious-mind",
    name: "Curious Mind",
    description: "Explored multiple topics",
    icon: Star,
    color: "from-indigo-400 to-blue-500",
    glowColor: "indigo",
    condition: (stats: UserStats) => stats.coursesStarted >= 2,
  },
  {
    id: "focused-student",
    name: "Focused Student",
    description: "Completed lessons without skipping",
    icon: Target,
    color: "from-teal-400 to-emerald-500",
    glowColor: "teal",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
  {
    id: "legendary-learner",
    name: "Legendary Learner",
    description: "Elite learning achievement",
    icon: Trophy,
    color: "from-yellow-400 to-yellow-600",
    glowColor: "yellow",
    condition: (stats: UserStats) => stats.streak >= 30,
  },
];

export function GamificationPanel() {
  const badgesWithStatus = BADGES.map((badge) => ({
    ...badge,
    unlocked: badge.condition(userStats),
  }));

  const unlockedCount = badgesWithStatus.filter(b => b.unlocked).length;

  return (
    <div className="space-y-8">
      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 fade-in duration-700">

        {/* Badges Earned */}
        <div className="group relative overflow-hidden rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-500/40">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-3 p-3 rounded-full bg-rose-500/10 text-rose-700">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-rose-900 drop-shadow-sm">
              {unlockedCount}
            </div>
            <div className="text-xs font-bold text-muted-foreground mt-2 group-hover:text-rose-700 transition-colors uppercase tracking-widest">Badges Earned</div>
          </div>
        </div>

        {/* To Unlock */}
        <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/40">
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-3 p-3 rounded-full bg-cyan-500/10 text-cyan-600">
              <Lock className="h-6 w-6" />
            </div>
            <div className="text-4xl font-bold text-muted-foreground/40 group-hover:text-cyan-600 transition-colors duration-300">
              {BADGES.length - unlockedCount}
            </div>
            <div className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-widest">Badges To Unlock</div>
          </div>
        </div>

        {/* Streak */}
        <div className="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/40">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-3 p-3 rounded-full bg-orange-500/10 text-orange-600 animate-pulse">
              <Flame className="h-6 w-6" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-extrabold text-orange-600 drop-shadow-sm">{userStats.streak}</span>
            </div>
            <div className="text-xs font-bold text-muted-foreground mt-2 group-hover:text-orange-600 transition-colors uppercase tracking-widest">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Badge Grid */}
      <h2 className="text-xl font-bold flex items-center gap-2 mt-8 mb-4">
        <Award className="h-5 w-5 text-primary" />
        All Achievements
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badgesWithStatus.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border p-6 text-center transition-all duration-500",
                "hover:-translate-y-1 hover:shadow-lg",
                badge.unlocked
                  ? "bg-card border-primary/20 shadow-md"
                  : "bg-muted/10 border-border/50 opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glow Effect for Unlocked */}
              {badge.unlocked && (
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  `bg-gradient-to-br ${badge.color}`
                )} style={{ filter: 'blur(80px)', opacity: 0.1 }} />
              )}

              {/* Badge Icon */}
              <div className="relative mb-5 flex justify-center">
                <div className={cn(
                  "relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 border-4",
                  badge.unlocked
                    ? `bg-gradient-to-br ${badge.color} border-background shadow-lg group-hover:scale-105`
                    : "bg-muted border-transparent"
                )}>
                  {badge.unlocked && (
                    <div className="absolute inset-0 rounded-full blur-xl opacity-40"
                      style={{ background: `linear-gradient(135deg, var(--${badge.glowColor}-400), var(--${badge.glowColor}-600))` }}
                    />
                  )}
                  {Icon && <Icon className={cn(
                    "h-8 w-8 relative z-10 transition-transform duration-300 group-hover:scale-110",
                    badge.unlocked ? "text-white" : "text-muted-foreground"
                  )} />}

                  {/* Lock Overlay for Locked Badges */}
                  {!badge.unlocked && (
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1.5 shadow-sm border border-border">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}

                  {/* Check Overlay for Unlocked */}
                  {badge.unlocked && (
                    <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-sm border border-primary/20">
                      <CheckCircle2 className={cn("h-4 w-4", `text-${badge.glowColor}-600`)} color="var(--primary)" />
                    </div>
                  )}

                </div>
              </div>

              {/* Badge Content */}
              <h3 className={cn(
                "mb-1 text-lg font-bold transition-colors",
                badge.unlocked ? "text-foreground group-hover:text-primary" : "text-muted-foreground"
              )}>
                {badge.name}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed px-2">
                {badge.unlocked ? badge.description : "Keep learning to unlock this milestone."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-30" />

        <div className="container relative pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Achievement Icon */}
            <div className="relative inline-block mb-1">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-violet-600 text-white shadow-xl rotate-3 transition-transform duration-500 hover:rotate-6 hover:scale-105">
                <Medal className="h-8 w-8" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">Badges</span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Track your learning journey, unlock new milestones, and showcase your achievements.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container -mt-10 relative z-10">
        <GamificationPanel />
      </div>
    </div>
  );
}