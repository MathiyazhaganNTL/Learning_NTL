import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  BookOpen,
  Award,
  ArrowRight,
  Play,
  CheckCircle,
  Brain,
  Globe,
  BarChart,
  Zap,
  Layers,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { InteractiveCard, HoverCard } from '@/components/ui/interactive-card';
import { FloatingBlobs } from '@/components/ui/floating-blobs';
import { LearningRoadmap } from '@/components/home/LearningRoadmap';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section - Futuristic & Holographic */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-slate-950">

        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0a1a] to-slate-950" />
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />

        {/* Digital Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Content */}
            <div className="text-left space-y-8 max-w-2xl">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-1.5 text-xs font-semibold text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md animate-in slide-in-from-bottom-4 fade-in duration-700"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Next to learn for your future
              </div>

              {/* Main Heading */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100"
              >
                Master New Skills <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-gradient-x">
                  With Global Experts
                </span>
              </h1>

              {/* Subheading */}
              <p
                className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200"
              >
                Experience the future of education with our holographic AI-powered dashboard. Track progress, collaborate, and grow in real-time.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 pt-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300"
              >
                <Button
                  size="lg"
                  className="relative overflow-hidden h-14 px-8 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg shadow-[0_0_25px_rgba(8,145,178,0.4)] group hover:shadow-[0_0_40px_rgba(8,145,178,0.6)] transition-all duration-300"
                  asChild
                >
                  <Link to="/courses">
                    <span className="relative z-10 flex items-center">
                      Explore Courses
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {/* Hover Light Sweep */}
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                  </Link>
                </Button>

                {!isAuthenticated && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-full border-cyan-500/30 bg-cyan-950/10 text-cyan-300 font-bold text-lg backdrop-blur-md hover:bg-cyan-950/30 hover:border-cyan-500/50 hover:text-cyan-200 transition-all duration-300"
                    asChild
                  >
                    <Link to="/register">
                      Join Free
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Right: Holographic Visualization */}
            <div className="relative flex items-center justify-center h-[500px] w-full scale-90 lg:scale-100 animate-in fade-in duration-1000 delay-500 pointer-events-none lg:pointer-events-auto">

              {/* Central Core */}
              <div className="relative z-20 flex items-center justify-center w-32 h-32 rounded-full bg-slate-950 border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-float">
                <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse" />
                <Brain className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
              </div>

              {/* Inner Orbit */}
              <div className="absolute z-10 w-[280px] h-[280px] rounded-full border border-cyan-500/20 animate-[spin_20s_linear_infinite]">
                {/* Icons on Orbit */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Globe className="w-6 h-6 text-indigo-400 animate-[spin_20s_linear_infinite_reverse]" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 rounded-full bg-slate-900 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Zap className="w-6 h-6 text-yellow-400 animate-[spin_20s_linear_infinite_reverse]" />
                </div>
              </div>

              {/* Middle Orbit (Reverse) */}
              <div className="absolute z-10 w-[420px] h-[420px] rounded-full border border-indigo-500/20 border-dashed animate-[spin_30s_linear_infinite_reverse]">
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <BarChart className="w-6 h-6 text-purple-400 animate-[spin_30s_linear_infinite]" />
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Layers className="w-6 h-6 text-pink-400 animate-[spin_30s_linear_infinite]" />
                </div>
              </div>

              {/* Outer Orbit (Slow) */}
              <div className="absolute z-0 w-[560px] h-[560px] rounded-full border border-emerald-500/10 opacity-60 animate-[spin_40s_linear_infinite]">
                <div className="absolute bottom-[15%] right-[15%] p-3 rounded-full bg-slate-900 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <Users className="w-6 h-6 text-emerald-400 animate-[spin_40s_linear_infinite_reverse]" />
                </div>
                <div className="absolute top-[15%] left-[15%] p-3 rounded-full bg-slate-900 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <GraduationCap className="w-6 h-6 text-emerald-400 animate-[spin_40s_linear_infinite_reverse]" />
                </div>
              </div>

              {/* Connecting Lines Effect (Static SVG for decorative connect) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 600 600">
                <circle cx="300" cy="300" r="140" fill="none" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="300" cy="300" r="210" fill="none" stroke="url(#gradient-line)" strokeWidth="0.5" />
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>

            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section (Updated Style slightly to match) */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-slate-950" />
        <FloatingBlobs />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 md:text-5xl text-white tracking-tight">Why Choose LearnSphere?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Join thousands of learners who have transformed their careers through our platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: GraduationCap, title: 'Expert Instructors', desc: 'Learn from industry professionals with real-world experience.', color: 'text-purple-400', glow: 'purple' },
              { icon: Play, title: 'High-Quality Content', desc: 'Access professionally produced videos and interactive materials.', color: 'text-cyan-400', glow: 'cyan' },
              { icon: Award, title: 'Earn Certificates', desc: 'Get recognized for your achievements with shareable badges.', color: 'text-emerald-400', glow: 'emerald' }
            ].map((item, i) => (
              <InteractiveCard
                key={i}
                glowColor={item.glow === 'purple' ? "rgba(168, 85, 247, 0.4)" : item.glow === 'cyan' ? "rgba(34, 211, 238, 0.4)" : "rgba(52, 211, 153, 0.4)"}
                className="h-full bg-white/5 border-white/10 backdrop-blur-sm"
              >
                <div className="p-6 space-y-4">
                  <div className={`rounded-2xl bg-white/5 p-4 w-fit ${item.color}`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-background">
        <LearningRoadmap />
      </section>

      {/* CTA Section - Footer Style */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-slate-950 to-slate-950" />

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of learners unlocking their potential today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-10 rounded-full bg-white text-slate-900 hover:bg-slate-200 font-bold text-lg" asChild>
                <Link to="/courses">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
