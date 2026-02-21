import { Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Play, Lock, Sparkles } from 'lucide-react';
import { Course, Enrollment } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  enrollment?: Enrollment;
  showProgress?: boolean;
  onAction?: () => void;
}

export function CourseCard({ course, enrollment, showProgress = false, onAction }: CourseCardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleCardClick = () => {
    if (isAuthenticated) {
      navigate(`/course/${course.id}`);
    } else {
      navigate('/login');
    }
  };

  const getActionButton = () => {
    if (!enrollment) {
      if (course.accessRule === 'payment' && course.price) {
        return (
          <Button className="w-full rounded-full font-semibold shadow-lg hover:shadow-xl transition-all" onClick={isAuthenticated ? onAction : () => navigate('/login')}>
            Buy ₹{course.price}
          </Button>
        );
      }
      if (course.accessRule === 'invitation') {
        return (
          <Button variant="outline" className="w-full rounded-full" disabled>
            <Lock className="mr-2 h-4 w-4" />
            Invitation Only
          </Button>
        );
      }
      return (
        <Button className="w-full rounded-full font-semibold shadow-lg hover:shadow-xl transition-all" onClick={isAuthenticated ? onAction : () => navigate('/login')}>
          <Sparkles className="mr-2 h-4 w-4" />
          Join Course
        </Button>
      );
    }

    if (enrollment.status === 'completed') {
      return (
        <Button variant="outline" className="w-full rounded-full" asChild>
          <Link to={`/course/${course.id}`}>
            <Play className="mr-2 h-4 w-4" />
            Review
          </Link>
        </Button>
      );
    }

    if (enrollment.status === 'yet_to_start') {
      return (
        <Button className="w-full rounded-full font-semibold" asChild>
          <Link to={`/course/${course.id}/learn`}>
            <Play className="mr-2 h-4 w-4" />
            Start Learning
          </Link>
        </Button>
      );
    }

    return (
      <Button className="w-full rounded-full font-semibold" asChild>
        <Link to={`/course/${course.id}`}>
          <Play className="mr-2 h-4 w-4" />
          Continue
        </Link>
      </Button>
    );
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
      {/* Ambient Glow on Hover */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl" />
      </div>

      {/* Clickable Area for Image and Title */}
      <div className="cursor-pointer" onClick={handleCardClick}>
        {/* Image with Overlay */}
        <div className="relative aspect-video overflow-hidden">
          {/* Image */}
          <img
            src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop'}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Rating Badge */}
          {course.status === 'published' && (
            <div className="absolute left-3 top-3 z-10 group-hover:scale-105 transition-transform duration-300">
              <div className="relative">
                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-yellow-500/50 blur-lg rounded-full animate-pulse" />

                {/* Styled Badge */}
                <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1 shadow-[0_0_15px_rgba(251,191,36,0.5)] border border-yellow-200/50 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-white text-white drop-shadow-sm" />
                  <span className="text-sm font-extrabold text-white tracking-wide drop-shadow-sm">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Price Badge */}
          {course.accessRule === 'payment' && course.price && (
            <div className="absolute right-3 top-3 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400/30 blur-lg rounded-full" />
                <Badge className="relative bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-lg border-0">
                  ₹{course.price}
                </Badge>
              </div>
            </div>
          )}

          {/* Hover Overlay with Quick Action Hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <div className="rounded-full bg-white/20 backdrop-blur-md p-4 border border-white/30">
                <Play className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex flex-1 flex-col p-5 pb-3">
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-2">
            {course.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn(
                  "text-xs font-medium border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors",
                  "animate-in fade-in slide-in-from-left-2 duration-300"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight transition-colors group-hover:text-primary">
            {course.title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <BookOpen className="h-3.5 w-3.5" />
              {course.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(course.totalDuration)}
            </span>
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Users className="h-3.5 w-3.5" />
              {course.enrolledCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section - Non-clickable */}
      <div className="flex flex-col p-5 pt-0 mt-auto">
        {/* Progress */}
        {showProgress && enrollment && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary">{enrollment.progress}%</span>
            </div>
            <Progress value={enrollment.progress} className="h-2 rounded-full bg-secondary" />
          </div>
        )}

        {/* Instructor */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-xs font-bold text-primary border border-primary/20">
            {course.instructorName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {course.instructorName}
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-border/50">
          {getActionButton()}
        </div>
      </div>
    </div>
  );
}
