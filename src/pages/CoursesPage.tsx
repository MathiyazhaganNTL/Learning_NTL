import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, TrendingUp, Code, Palette, Smartphone, Cloud, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CourseCard } from '@/components/courses/CourseCard';
import { mockCourses } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Enhanced tags list to match new courses
const allTags = ['All', 'React', 'JavaScript', 'TypeScript', 'Design', 'Node.js', 'Python', 'AI', 'Mobile', 'DevOps', 'Marketing'];

export default function CoursesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchFocused, setSearchFocused] = useState(false);

  // Filter only published courses and apply visibility rules
  const filteredCourses = mockCourses.filter((course) => {
    // Only show published courses
    if (course.status !== 'published') return false;

    // Check visibility
    if (course.visibility === 'signed_in' && !isAuthenticated) return false;

    // Search filter
    if (search && !course.title.toLowerCase().includes(search.toLowerCase())) return false;

    // Tag filter
    if (selectedTag !== 'All' && !course.tags.some(tag => tag === selectedTag || (selectedTag === 'Mobile' && tag === 'Flutter'))) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Hero Section with Modern Dark Mesh Gradient */}
      <div className="relative overflow-hidden border-b border-white/5 bg-slate-950">

        {/* Abstract Background Elements */}
        <div className="absolute inset-0">
          {/* Main Gradient Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          {/* Colorful Mesh Gradients (Aurora Effect) */}
          <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />
          <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen" />

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="container relative py-20 lg:py-28">
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* Statistics Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)] transform hover:scale-105 transition-transform duration-300 cursor-default">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>{filteredCourses.length} Premium Courses Available</span>
            </div>

            {/* Main Title Area */}
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                Unlock Your Potential with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x">
                  Global Expert Courses
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners mastering the skills of tomorrow. From coding to design, find the perfect path for your career growth.
              </p>
            </div>

            {/* Search Interface */}
            <div className="w-full max-w-2xl pt-6">
              <div className={cn(
                "relative group transition-all duration-500 z-10",
                searchFocused && "scale-[1.02]"
              )}>
                {/* Glow Ring */}
                <div className={cn(
                  "absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-30 blur-lg transition-opacity duration-500",
                  searchFocused ? "opacity-70" : "opacity-30 group-hover:opacity-50"
                )} />

                <div className="relative flex items-center">
                  <Search className={cn(
                    "absolute left-6 h-5 w-5 transition-colors duration-300",
                    searchFocused ? "text-indigo-400" : "text-slate-500"
                  )} />
                  <Input
                    placeholder="What do you want to learn today?"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={cn(
                      "h-16 pl-14 pr-6 rounded-full text-lg transition-all duration-300",
                      "bg-slate-900/80 backdrop-blur-xl border-slate-700/50 text-slate-100 placeholder:text-slate-500 shadow-2xl",
                      "focus-visible:ring-0 focus-visible:border-indigo-500/50"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="pt-8 w-full max-w-5xl">
              <div className="flex flex-wrap justify-center gap-3">
                {allTags.map((tag, index) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm",
                      "hover:-translate-y-0.5",
                      selectedTag === tag
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                        : "bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-700"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative flex items-center gap-2">
                      {tag === 'All' && <Sparkles className="w-3.5 h-3.5" />}
                      {tag === 'React' && <Code className="w-3.5 h-3.5" />}
                      {tag === 'Design' && <Palette className="w-3.5 h-3.5" />}
                      {tag === 'Mobile' && <Smartphone className="w-3.5 h-3.5" />}
                      {tag === 'DevOps' && <Cloud className="w-3.5 h-3.5" />}
                      {tag === 'Marketing' && <BarChart className="w-3.5 h-3.5" />}
                      {tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section - Lighter Background for Contrast */}
      <div className="min-h-[800px] bg-background relative z-10">
        <div className="container py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Featured Courses</h2>
              <p className="text-muted-foreground mt-1">Hand-picked courses to help you start your journey</p>
            </div>

          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CourseCard
                    course={course}
                    onAction={() => {
                      if (isAuthenticated) {
                        navigate(`/course/${course.id}`);
                      } else {
                        navigate(`/login?redirect=/course/${course.id}`);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
              <div className="p-8 rounded-full bg-muted mb-6">
                <Search className="h-12 w-12 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No results matching "{search}"</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                We couldn't find any courses matching your criteria. Try adjusting your search term or selecting a different category.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => { setSearch(''); setSelectedTag('All') }}
                  className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
