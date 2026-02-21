import { useState } from 'react';
import {
  Users,
  Clock,
  CheckCircle,
  PlayCircle,
  Search,
  Filter,
  Download,
  Settings2,
  ChevronDown,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/ui/stat-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockLearnerData = [
  {
    id: '1',
    course: 'React Masterclass',
    name: 'Alex Thompson',
    email: 'alex@email.com',
    enrolled: '2024-01-15',
    started: '2024-01-16',
    timeSpent: 245,
    completion: 78,
    status: 'in_progress'
  },
  {
    id: '2',
    course: 'TypeScript for Professional Developers',
    name: 'Maria Garcia',
    email: 'maria@email.com',
    enrolled: '2024-01-20',
    started: '2024-01-21',
    timeSpent: 180,
    completion: 100,
    status: 'completed'
  },
  {
    id: '3',
    course: 'UI/UX Design Fundamentals',
    name: 'James Wilson',
    email: 'james@email.com',
    enrolled: '2024-02-01',
    started: null,
    timeSpent: 0,
    completion: 0,
    status: 'yet_to_start'
  },
  {
    id: '4',
    course: 'React Masterclass',
    name: 'Emily Chen',
    email: 'emily@email.com',
    enrolled: '2024-01-18',
    started: '2024-01-19',
    timeSpent: 320,
    completion: 92,
    status: 'in_progress'
  },
  {
    id: '5',
    course: 'Node.js Backend Development',
    name: 'David Kim',
    email: 'david@email.com',
    enrolled: '2024-02-05',
    started: '2024-02-06',
    timeSpent: 45,
    completion: 15,
    status: 'in_progress'
  },
];

export default function BackofficeReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Stats Data
  const reportStats = [
    { title: 'Total Participants', value: 2847, icon: Users, variant: 'purple' as const, description: 'Active learners' },
    { title: 'Yet to Start', value: 423, icon: Clock, variant: 'orange' as const, description: 'Pending enrollment' },
    { title: 'In Progress', value: 1256, icon: PlayCircle, variant: 'blue' as const, description: 'Learning now' },
    { title: 'Completed', value: 1168, icon: CheckCircle, variant: 'green' as const, description: 'Courses finished' },
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/25 transition-colors">
            Completed
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors">
            In Progress
          </Badge>
        );
      case 'yet_to_start':
        return (
          <Badge className="bg-muted text-muted-foreground border-muted hover:bg-muted/80 transition-colors">
            Yet to Start
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Track learner progress and engagement metrics
          </p>
        </div>
        <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat, i) => (
          <StatCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
            description={stat.description}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between sticky top-[4rem] z-20 bg-background/95 backdrop-blur-sm py-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-rose-700 to-rose-500 shadow-md" />
            Detailed Reports
          </h2>

          <div className="flex flex-1 items-center gap-2 md:max-w-xl md:justify-end">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                placeholder="Search learners or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all hover:bg-card/80"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-card/95 border-border/50 shadow-xl">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All Statuses</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>In Progress</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Yet to Start</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="gap-2 border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all">
              <Settings2 className="h-4 w-4" />
              Columns
            </Button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="space-y-3">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 bg-muted/20 rounded-lg border border-border/40 backdrop-blur-sm">
            <div className="col-span-3">Course</div>
            <div className="col-span-3">Learner</div>
            <div className="col-span-2">Timeline</div>
            <div className="col-span-1">Time Spent</div>
            <div className="col-span-2">Completion</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          {/* Rows */}
          {mockLearnerData.map((row) => (
            <div
              key={row.id}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center rounded-2xl border border-border/50 bg-card/50 p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 hover:bg-card/80"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Course */}
              <div className="col-span-1 md:col-span-3">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1" title={row.course}>
                  {row.course}
                </h3>
                <div className="mt-1 flex gap-2 text-xs text-muted-foreground md:hidden">
                  <span>{row.enrolled}</span>
                </div>
              </div>

              {/* Learner */}
              <div className="col-span-1 md:col-span-3 flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-background ring-1 ring-border/50 transition-all group-hover:ring-primary/30">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name}`} />
                  <AvatarFallback className="bg-gradient-to-br from-rose-700 to-rose-900 text-white text-xs">
                    {row.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">{row.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{row.email}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="col-span-1 md:col-span-2 space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-12">Enrolled:</span>
                  <span className="font-medium text-foreground/80">{new Date(row.enrolled).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-12">Started:</span>
                  <span className="font-medium text-foreground/80">
                    {row.started ? new Date(row.started).toLocaleDateString() : '-'}
                  </span>
                </div>
              </div>

              {/* Time Spent */}
              <div className="col-span-1 hidden md:block text-sm font-medium text-foreground/80">
                {formatTime(row.timeSpent)}
              </div>

              {/* Completion */}
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-muted-foreground">Progress</span>
                  <span className="font-bold text-foreground">{row.completion}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/50">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000 ease-out",
                      row.completion === 100 ? "bg-gradient-to-r from-emerald-500 to-green-500" :
                        row.completion > 0 ? "bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800" :
                          "bg-muted"
                    )}
                    style={{ width: `${row.completion}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="col-span-1 flex md:justify-end">
                {getStatusBadge(row.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
