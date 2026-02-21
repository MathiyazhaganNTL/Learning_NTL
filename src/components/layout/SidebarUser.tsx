
import { useNavigate } from 'react-router-dom';
import { LogOut, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface User {
    name: string;
    role: string;
    email?: string;
}

interface SidebarUserProps {
    user: User | null;
    collapsed: boolean;
    logout: () => void;
}

export function SidebarUser({ user, collapsed, logout }: SidebarUserProps) {
    const navigate = useNavigate();

    if (collapsed) {
        return (
            <div className="flex flex-col items-center gap-4 border-t border-border p-4 animate-in fade-in duration-300">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="group relative cursor-pointer"
                            onClick={() => navigate('/settings')}
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Avatar className="relative h-9 w-9 border border-border transition-transform duration-300 group-hover:scale-110">
                                <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.name}&backgroundColor=transparent`} />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={logout}
                            className="h-9 w-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
            </div>
        );
    }

    return (
        <div className="border-t border-border p-4 space-y-4 animate-in slide-in-from-bottom-2 duration-500">
            {/* Profile Card */}
            <div
                onClick={() => navigate('/settings')}
                className="group relative overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-card/50 to-transparent p-3 shadow-sm transition-all duration-300 hover:bg-card/80 hover:shadow-md hover:border-primary/20 cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center gap-3">
                    {/* Avatar Area */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 blur-[2px] opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                        <Avatar className="relative h-10 w-10 border-2 border-background shadow-inner">
                            <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.name}&backgroundColor=transparent`} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white font-bold">
                                {user?.name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500 ring-1 ring-emerald-500/20 animate-pulse" />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h4 className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                                {user?.name}
                            </h4>
                            <Sparkles className="h-3 w-3 text-amber-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-12" />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "px-1.5 py-0 text-[10px] uppercase tracking-wider font-bold border-primary/20 bg-primary/5 text-primary/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors",
                                    user?.role === 'admin' && "border-indigo-500/30 text-indigo-500 bg-indigo-500/5",
                                    user?.role === 'instructor' && "border-rose-700/30 text-rose-700 bg-rose-500/5"
                                )}
                            >
                                {user?.role}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <Button
                onClick={logout}
                variant="ghost"
                className="group relative w-full justify-center overflow-hidden rounded-xl border border-destructive/10 bg-destructive/5 hover:bg-destructive/10 hover:border-destructive/20 text-destructive/80 hover:text-destructive transition-all duration-300 h-10"
            >
                <div className="flex items-center gap-2 z-10 transition-transform duration-300 group-hover:scale-105">
                    <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span className="font-semibold text-sm">Sign Out</span>
                </div>

                {/* Hover Light Sweep */}
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-destructive/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            </Button>
        </div>
    );
}
