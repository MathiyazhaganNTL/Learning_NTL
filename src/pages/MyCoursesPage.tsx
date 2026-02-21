import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CourseCard } from '@/components/courses/CourseCard';
import { GamificationPanel } from '@/components/gamification/GamificationPanel';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { BookOpen, CheckCircle, Clock, PlayCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get user's enrolled courses with enrollment data
  let enrolledCourses = mockEnrollments
    .filter((e) => e.userId === user?.id)
    .map((enrollment) => ({
      course: mockCourses.find((c) => c.id === enrollment.courseId)!,
      enrollment,
    }))
    .filter((item) => item.course);

  // Fallback: If no enrollments (new user), show demo courses
  if (enrolledCourses.length === 0) {
    enrolledCourses = mockCourses.slice(0, 3).map((course, index) => ({
      course,
      enrollment: {
        id: `demo-${course.id}`,
        userId: user?.id || 'demo-user',
        courseId: course.id,
        status: index === 0 ? 'in_progress' : index === 1 ? 'yet_to_start' : 'completed',
        progress: index === 0 ? 35 : index === 1 ? 0 : 100,
        enrolledAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        timeSpent: index === 0 ? 120 : 0,
        completedAt: index === 2 ? new Date().toISOString() : undefined
      }
    }));
  }

  const filterByStatus = (status?: string) => {
    let filtered = enrolledCourses;

    // Filter by status
    if (status && status !== 'all') {
      filtered = filtered.filter((item) => item.enrollment.status === status);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.course.title.toLowerCase().includes(query) ||
        item.course.description.toLowerCase().includes(query) ||
        item.course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const stats = {
    all: enrolledCourses.length,
    yet_to_start: enrolledCourses.filter((e) => e.enrollment.status === 'yet_to_start').length,
    in_progress: enrolledCourses.filter((e) => e.enrollment.status === 'in_progress').length,
    completed: enrolledCourses.filter((e) => e.enrollment.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 pt-24 pb-10">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mb-1 text-4xl font-extrabold tracking-tight">My Courses</h1>
            <p className="text-sm text-muted-foreground">
              Track your progress and continue learning
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-9 rounded-full bg-background shadow-sm focus-visible:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>

              <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
                {[
                  {
                    id: 'all',
                    label: 'All Courses',
                    icon: BookOpen,
                    colorClass: 'text-purple-600 dark:text-purple-400',
                    bgClass: 'bg-purple-500/10',
                    activeBorder: 'border-purple-500/50',
                    activeRing: 'ring-purple-500/20',
                    gradient: 'from-purple-500/5 to-indigo-500/5',
                    activeGradient: 'from-purple-500/10 to-indigo-500/10'
                  },
                  {
                    id: 'yet_to_start',
                    label: 'To Start',
                    icon: Clock,
                    colorClass: 'text-amber-600 dark:text-amber-400',
                    bgClass: 'bg-amber-500/10',
                    activeBorder: 'border-amber-500/50',
                    activeRing: 'ring-amber-500/20',
                    gradient: 'from-amber-500/5 to-orange-500/5',
                    activeGradient: 'from-amber-500/10 to-orange-500/10'
                  },
                  {
                    id: 'in_progress',
                    label: 'In Progress',
                    icon: PlayCircle,
                    colorClass: 'text-blue-600 dark:text-blue-400',
                    bgClass: 'bg-blue-500/10',
                    activeBorder: 'border-blue-500/50',
                    activeRing: 'ring-blue-500/20',
                    gradient: 'from-blue-500/5 to-cyan-500/5',
                    activeGradient: 'from-blue-500/10 to-cyan-500/10'
                  },
                  {
                    id: 'completed',
                    label: 'Completed',
                    icon: CheckCircle,
                    colorClass: 'text-green-600 dark:text-green-400',
                    bgClass: 'bg-green-500/10',
                    activeBorder: 'border-green-500/50',
                    activeRing: 'ring-green-500/20',
                    gradient: 'from-green-500/5 to-emerald-500/5',
                    activeGradient: 'from-green-500/10 to-emerald-500/10'
                  },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  // Map stats to tab id
                  const count = stats[tab.id as keyof typeof stats];

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "group relative flex flex-col items-center justify-center gap-3 rounded-xl border p-3 transition-all duration-300 md:p-4 hover:scale-[1.02]",
                        isActive
                          ? cn(
                            "shadow-md bg-gradient-to-br ring-2",
                            tab.activeBorder,
                            tab.activeRing,
                            tab.activeGradient
                          )
                          : "border-border/50 bg-background/50 hover:bg-muted/50 hover:shadow-sm hover:border-border"
                      )}
                    >
                      {/* Active Glow Effect */}
                      {isActive && (
                        <div className={cn("absolute inset-0 rounded-xl opacity-20 blur-xl transition-all duration-500", tab.bgClass.replace('/10', '/30'))} />
                      )}

                      <div className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500",
                        isActive
                          ? cn("bg-background shadow-sm scale-110", tab.colorClass)
                          : "bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground group-hover:shadow-sm"
                      )}>
                        <Icon className={cn("h-5 w-5 transition-transform duration-500", isActive && "animate-pulse")} />
                      </div>

                      <div className="space-y-0.5 text-center">
                        <span className={cn(
                          "block text-sm font-bold transition-colors duration-300",
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}>
                          {tab.label}
                        </span>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-300",
                          isActive ? cn(tab.bgClass, tab.colorClass) : "bg-muted text-muted-foreground"
                        )}>
                          {count} Courses
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>


              {['all', 'yet_to_start', 'in_progress', 'completed'].map((tab) => (
                <TabsContent
                  key={tab}
                  value={tab}
                  className="data-[state=inactive]:hidden"
                >
                  {filterByStatus(tab).length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-2 duration-300 will-change-[opacity,transform]">
                      {filterByStatus(tab).map(({ course, enrollment }) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          enrollment={enrollment}
                          showProgress
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 will-change-[opacity,transform]">
                      <div className="mb-4 rounded-full bg-background p-5 shadow-sm">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">No courses found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? `No courses match "${searchQuery}"`
                          : tab === 'all'
                            ? "You haven't enrolled in any courses yet"
                            : `You don't have any ${tab.replace('_', ' ')} courses`
                        }
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last sticky top-24">
            <GamificationPanel />
          </div>
        </div>
      </div>
    </div>
  );
}