import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    Database,
    Users,
    Sparkles,
    Rocket,
    ArrowLeft,
    Bell,
    Construction,
    Cpu,
    GraduationCap
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BackofficeLearnersPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isNotified, setIsNotified] = useState(false);

    const handleNotify = () => {
        if (!email) return;
        setIsNotified(true);
        setTimeout(() => setIsNotified(false), 3000);
    };

    return (
        <div className="flex min-h-[80vh] w-full flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-700">

            {/* Background Decor */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px] animate-pulse delay-700" />
            </div>

            <Card className="relative w-full max-w-3xl overflow-hidden rounded-3xl border-primary/10 bg-card/30 backdrop-blur-xl shadow-2xl">
                {/* Glow Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="relative flex flex-col items-center p-8 md:p-16 text-center space-y-8">

                    {/* Central Illustration */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-500/10 border border-primary/20 shadow-inner backdrop-blur-md group hover:scale-105 transition-transform duration-500">
                            <Database className="w-10 h-10 text-primary animate-float" />

                            {/* Floating Orbit Icons */}
                            <div className="absolute -top-6 -right-6 w-12 h-12 flex items-center justify-center rounded-xl bg-card border border-border shadow-lg animate-bounce delay-100">
                                <Users className="w-5 h-5 text-indigo-500" />
                            </div>
                            <div className="absolute -bottom-4 -left-8 w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border shadow-lg animate-bounce delay-300">
                                <GraduationCap className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="absolute bottom-6 -right-10 w-8 h-8 flex items-center justify-center rounded-full bg-card border border-border shadow-lg animate-ping-slow">
                                <Sparkles className="w-3 h-3 text-amber-500" />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4 max-w-lg mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider animate-in slide-in-from-bottom-2 fade-in duration-700 delay-200">
                            <Construction className="w-3 h-3" />
                            <span>Under Development</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-indigo-600 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
                            Learners Management
                            <span className="block text-2xl md:text-3xl font-medium text-muted-foreground mt-2">Coming Soon</span>
                        </h1>

                        <p className="text-muted-foreground text-lg leading-relaxed animate-in slide-in-from-bottom-6 fade-in duration-700 delay-400">
                            We are building an advanced database management system to help you track, analyze, and manage your learners' progress more effectively.
                        </p>
                    </div>

                    {/* Interactive Actions */}
                    <div className="w-full max-w-sm space-y-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500">
                        {!isNotified ? (
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter your email to notify"
                                    className="bg-background/50 border-primary/10 focus-visible:ring-primary/20"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button onClick={handleNotify} className="bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 transition-opacity">
                                    <Bell className="w-4 h-4 mr-2" />
                                    Notify Me
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 p-2 text-emerald-500 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <Sparkles className="w-4 h-4" />
                                <span className="font-medium">Thanks! We'll notify you.</span>
                            </div>
                        )}

                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate('/backoffice')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Return to Dashboard
                        </Button>
                    </div>

                    {/* Feature Preview Pills */}
                    <div className="flex flex-wrap justify-center gap-3 pt-4 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-700">
                        {['Advanced Filtering', 'Bulk Actions', 'Progress Analytics', 'Export Data'].map((feature, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-xs text-muted-foreground">
                                {feature}
                            </span>
                        ))}
                    </div>

                </div>
            </Card>
        </div>
    );
}
