import { useRef, useState } from "react";
import {
    BookOpen, Play, GraduationCap, Sparkles

} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        id: 1,
        title: "Choose a Course",
        description: "Browse our extensive catalog and select the perfect course that matches your career goals and interests.",
        icon: BookOpen,
        gradient: "from-cyan-500 to-blue-600",
        glowColor: "rgba(6, 182, 212, 0.5)",
        borderColor: "border-cyan-500/50",
        textColor: "text-cyan-400"
    },
    {
        id: 2,
        title: "Learn at Your Pace",
        description: "Access high-quality video lessons, interactive quizzes, and reading materials anytime, anywhere.",
        icon: Play,
        gradient: "from-rose-600 to-rose-800",
        glowColor: "rgba(139, 92, 246, 0.5)",
        borderColor: "border-violet-500/50",
        textColor: "text-violet-400"
    },
    {
        id: 3,
        title: "Earn Recognition",
        description: "Complete your curriculum to earn industry-recognized certificates, badges, and skill points.",
        icon: GraduationCap,
        gradient: "from-emerald-500 to-green-600",
        glowColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "border-emerald-500/50",
        textColor: "text-emerald-400"
    }
];

export function LearningRoadmap() {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="w-full py-20 px-4 md:px-8 relative overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Learning Journey
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Start your learning journey in just three simple steps.
                    </p>
                </div>

                {/* Desktop Roadmap */}
                <div className="hidden md:block relative">

                    {/* Connection Line - Background */}
                    <div className="absolute top-[88px] left-[16.66%] right-[16.66%] h-1 bg-slate-800 rounded-full z-0">
                        {/* Animated Progress Line */}
                        <div
                            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 transition-all duration-700 ease-out"
                            style={{
                                width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%'
                            }}
                        />

                        {/* Glowing Effect on Line */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-cyan-500/50 via-violet-500/50 to-emerald-500/50 blur-sm transition-all duration-700 ease-out"
                            style={{
                                width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%'
                            }}
                        />
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-3 gap-8 relative z-10">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={cn(
                                    "group relative flex flex-col items-center text-center cursor-pointer transition-all duration-500",
                                    activeStep === step.id ? "scale-105" : "scale-100 hover:scale-102"
                                )}
                                onClick={() => setActiveStep(step.id)}
                            >
                                {/* Node Circle */}
                                <div className="relative mb-8">
                                    {/* Outer Glow Ring */}
                                    <div
                                        className={cn(
                                            "absolute inset-[-8px] rounded-full transition-all duration-500",
                                            activeStep === step.id ? "opacity-100" : "opacity-0"
                                        )}
                                        style={{
                                            background: `radial-gradient(circle, ${step.glowColor} 0%, transparent 70%)`,
                                            filter: 'blur(8px)'
                                        }}
                                    />

                                    {/* Icon Container */}
                                    <div
                                        className={cn(
                                            "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                                            step.borderColor,
                                            activeStep === step.id
                                                ? "shadow-lg"
                                                : "opacity-80 group-hover:opacity-100"
                                        )}
                                        style={{
                                            boxShadow: activeStep === step.id ? `0 0 30px ${step.glowColor}` : 'none'
                                        }}
                                    >
                                        <div className={cn(
                                            "w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br",
                                            step.gradient
                                        )}>
                                            <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div
                                    className={cn(
                                        "w-full p-6 rounded-2xl border transition-all duration-500 bg-slate-900/50 backdrop-blur-sm",
                                        activeStep === step.id
                                            ? `${step.borderColor} shadow-xl`
                                            : "border-slate-800 hover:border-slate-700"
                                    )}
                                    style={{
                                        boxShadow: activeStep === step.id ? `0 10px 40px -10px ${step.glowColor}` : 'none'
                                    }}
                                >
                                    <span className={cn(
                                        "inline-block mb-3 text-sm font-bold uppercase tracking-wider",
                                        step.textColor
                                    )}>
                                        Step 0{step.id}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {steps.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(step.id)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-300",
                                    activeStep === step.id
                                        ? `bg-gradient-to-r ${step.gradient} scale-125 shadow-lg`
                                        : "bg-slate-700 hover:bg-slate-600"
                                )}
                                style={{
                                    boxShadow: activeStep === step.id ? `0 0 15px ${step.glowColor}` : 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Roadmap (Vertical Timeline) */}
                <div className="md:hidden space-y-0 relative">
                    {/* Vertical Connection Line */}
                    <div className="absolute left-[23px] top-[40px] bottom-[40px] w-0.5 bg-slate-800">
                        <div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500 transition-all duration-700"
                            style={{ height: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }}
                        />
                    </div>

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={cn(
                                "relative pl-16 pb-12 last:pb-0 transition-all duration-500",
                                activeStep === step.id ? "opacity-100" : "opacity-70"
                            )}
                            onClick={() => setActiveStep(step.id)}
                        >
                            {/* Node Circle */}
                            <div
                                className={cn(
                                    "absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                                    step.borderColor
                                )}
                                style={{
                                    boxShadow: activeStep === step.id ? `0 0 20px ${step.glowColor}` : 'none'
                                }}
                            >
                                <div className={cn(
                                    "w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br",
                                    step.gradient
                                )}>
                                    <step.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={cn(
                                "p-5 rounded-xl border transition-all duration-300 bg-slate-900/50",
                                activeStep === step.id
                                    ? `${step.borderColor} shadow-lg`
                                    : "border-slate-800"
                            )}>
                                <span className={cn("text-xs font-bold uppercase tracking-wider", step.textColor)}>
                                    Step 0{step.id}
                                </span>
                                <h3 className="text-lg font-bold text-white mt-1 mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
