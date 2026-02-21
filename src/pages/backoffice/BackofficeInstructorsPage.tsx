import { useState } from 'react';
import {
    Users,
    BookOpen,
    Star,
    Activity,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Shield,
    Award,
    BarChart3,
    Clock,
    FileCheck,
    TrendingUp,
    GraduationCap,
    LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock Data
const INSTRUCTORS = [
    {
        id: 'inst-1',
        name: 'Dr. Sarah Wilson',
        email: 'sarah.wilson@learnsphere.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        status: 'active',
        coursesCount: 12,
        studentsCount: 1543,
        rating: 4.9,
        specialization: 'Computer Science',
        joinedDate: '2023-01-15',
        recentActivity: 'Updated "Advanced React Patterns" curriculum',
    },
    {
        id: 'inst-2',
        name: 'Prof. Michael Chen',
        email: 'michael.chen@learnsphere.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        status: 'active',
        coursesCount: 8,
        studentsCount: 892,
        rating: 4.7,
        specialization: 'Data Science',
        joinedDate: '2023-03-10',
        recentActivity: 'Published new quiz for "Python for Beginners"',
    },
    {
        id: 'inst-3',
        name: 'Emily Davis',
        email: 'emily.davis@learnsphere.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        status: 'pending',
        coursesCount: 1,
        studentsCount: 0,
        rating: 0,
        specialization: 'UX Design',
        joinedDate: '2024-02-01',
        recentActivity: 'Submitted instructor application',
    },
    {
        id: 'inst-4',
        name: 'James Rodriguez',
        email: 'j.rodriguez@learnsphere.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        status: 'suspended',
        coursesCount: 3,
        studentsCount: 120,
        rating: 3.2,
        specialization: 'Digital Marketing',
        joinedDate: '2023-11-05',
        recentActivity: 'Account flagged for policy violation',
    },
    {
        id: 'inst-5',
        name: 'Anita Patel',
        email: 'anita.patel@learnsphere.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita',
        status: 'active',
        coursesCount: 5,
        studentsCount: 650,
        rating: 4.8,
        specialization: 'Business Management',
        joinedDate: '2023-06-20',
        recentActivity: 'Responded to 15 student queries',
    },
];

const RECENT_ACTIVITIES = [
    { id: 1, type: 'update', user: 'Dr. Sarah Wilson', action: 'Updated course content', time: '2 mins ago', course: 'Advanced React Patterns' },
    { id: 2, type: 'approval', user: 'Admin System', action: 'Approved new course', time: '1 hour ago', course: 'UX Design Fundamentals' },
    { id: 3, type: 'review', user: 'Prof. Michael Chen', action: 'Received 5-star review', time: '3 hours ago', course: 'Data Science 101' },
    { id: 4, type: 'join', user: 'Emily Davis', action: 'Applied for instructor account', time: '5 hours ago', course: 'N/A' },
    { id: 5, type: 'alert', user: 'System', action: 'High student engagement detected', time: '1 day ago', course: 'Web Development Bootcamp' },
];

export default function BackofficeInstructorsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedInstructor, setExpandedInstructor] = useState<string | null>(null);

    const filteredInstructors = INSTRUCTORS.filter(instructor => {
        const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || instructor.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
            case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-200';
            case 'suspended': return 'bg-destructive/10 text-destructive border-destructive/20';
            default: return 'bg-muted text-muted-foreground border-muted';
        }
    };

    const handleApprove = (id: string) => {
        toast.success("Instructor approved successfully");
    };

    const handleSuspend = (id: string) => {
        toast.error("Instructor account suspended");
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                        Instructor Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor, manage, and support your teaching staff.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Performance Report
                    </Button>
                    <Button>
                        <Users className="mr-2 h-4 w-4" />
                        Invite Instructor
                    </Button>
                </div>
            </div>

            {/* Analytics Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{INSTRUCTORS.length}</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-emerald-500/10 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Instructors</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">
                            {INSTRUCTORS.filter(i => i.status === 'active').length}
                        </div>
                        <p className="text-xs text-muted-foreground">98% engagement rate</p>
                    </CardContent>
                </Card>
                <Card className="border-indigo-500/10 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Courses Managed</CardTitle>
                        <BookOpen className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-indigo-600">
                            {INSTRUCTORS.reduce((acc, curr) => acc + curr.coursesCount, 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">Across {INSTRUCTORS.length} instructors</p>
                    </CardContent>
                </Card>
                <Card className="border-amber-500/10 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">
                            {INSTRUCTORS.filter(i => i.status === 'pending').length}
                        </div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="directory" className="space-y-6">
                <TabsList className="bg-muted/50 p-1">
                    <TabsTrigger value="directory" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Directory</TabsTrigger>
                    <TabsTrigger value="performance" className="gap-2"><BarChart3 className="h-4 w-4" /> Performance</TabsTrigger>
                    <TabsTrigger value="roles" className="gap-2"><Shield className="h-4 w-4" /> Roles & Responsibilities</TabsTrigger>
                </TabsList>

                {/* INSTRUCTOR DIRECTORY TAB */}
                <TabsContent value="directory" className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or specialty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-background"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Filter className="h-4 w-4" />
                                        Status: <span className="capitalize">{statusFilter}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('suspended')}>Suspended</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <Card className="border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>Instructor Directory</CardTitle>
                            <CardDescription>Manage instructor accounts and permissions.</CardDescription>
                        </CardHeader>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Instructor</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Specialization</TableHead>
                                        <TableHead className="text-center">Courses</TableHead>
                                        <TableHead className="text-center">Rating</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredInstructors.map((instructor) => (
                                        <>
                                            <TableRow
                                                key={instructor.id}
                                                className="group hover:bg-muted/50 transition-colors cursor-pointer"
                                                onClick={() => setExpandedInstructor(expandedInstructor === instructor.id ? null : instructor.id)}
                                            >
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border border-border">
                                                            <AvatarImage src={instructor.avatar} />
                                                            <AvatarFallback>{instructor.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                                {instructor.name}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">{instructor.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={cn("capitalize shadow-none", getStatusColor(instructor.status))}>
                                                        {instructor.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{instructor.specialization}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary" className="bg-muted font-mono">{instructor.coursesCount}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
                                                        <span className="font-medium text-sm">{instructor.rating}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                            <DropdownMenuItem>Email Instructor</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            {instructor.status === 'pending' && (
                                                                <DropdownMenuItem className="text-emerald-600" onClick={(e) => { e.stopPropagation(); handleApprove(instructor.id); }}>
                                                                    Approve Account
                                                                </DropdownMenuItem>
                                                            )}
                                                            {instructor.status !== 'suspended' && (
                                                                <DropdownMenuItem className="text-destructive" onClick={(e) => { e.stopPropagation(); handleSuspend(instructor.id); }}>
                                                                    Suspend Account
                                                                </DropdownMenuItem>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>

                                            {/* Expanded Details Row */}
                                            {expandedInstructor === instructor.id && (
                                                <TableRow className="bg-muted/30 hover:bg-muted/30">
                                                    <TableCell colSpan={6} className="p-0">
                                                        <div className="p-6 grid gap-6 md:grid-cols-2 animate-in slide-in-from-top-2 duration-300">
                                                            <div className="space-y-4">
                                                                <h4 className="font-semibold flex items-center gap-2">
                                                                    <BookOpen className="h-4 w-4 text-primary" />
                                                                    Course Management
                                                                </h4>
                                                                <div className="space-y-3">
                                                                    {/* Mock Courses List for the Expanded View */}
                                                                    {[1, 2, 3].slice(0, instructor.coursesCount > 0 ? 3 : 0).map((i) => (
                                                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                                                                                    <GraduationCap className="h-4 w-4 text-primary" />
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-sm font-medium">Course Title {i}</div>
                                                                                    <div className="text-xs text-muted-foreground">Updated 2 days ago</div>
                                                                                </div>
                                                                            </div>
                                                                            <Badge variant="outline" className="text-xs">Published</Badge>
                                                                        </div>
                                                                    ))}
                                                                    {instructor.coursesCount === 0 && (
                                                                        <p className="text-sm text-muted-foreground italic">No courses created yet.</p>
                                                                    )}
                                                                    <Button variant="link" size="sm" className="px-0 text-primary">View all courses</Button>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4 border-l pl-6 border-border/50">
                                                                <h4 className="font-semibold flex items-center gap-2">
                                                                    <Activity className="h-4 w-4 text-primary" />
                                                                    Recent Activity & Insights
                                                                </h4>
                                                                <div className="space-y-4">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="bg-background/80 p-3 rounded-lg border">
                                                                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Students</div>
                                                                            <div className="text-xl font-bold">{instructor.studentsCount}</div>
                                                                        </div>
                                                                        <div className="bg-background/80 p-3 rounded-lg border">
                                                                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Completion Rate</div>
                                                                            <div className="text-xl font-bold">87%</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                                                                        <p className="text-sm">
                                                                            <span className="font-semibold text-primary">Latest Action:</span> {instructor.recentActivity}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                {/* PERFORMANCE TAB */}
                <TabsContent value="performance" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Performing Instructors</CardTitle>
                                <CardDescription>Based on student ratings and engagement.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {INSTRUCTORS.sort((a, b) => b.rating - a.rating).slice(0, 3).map((inst, i) => (
                                        <div key={inst.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">#{i + 1}</div>
                                                <div>
                                                    <p className="font-medium text-sm">{inst.name}</p>
                                                    <p className="text-xs text-muted-foreground">{inst.studentsCount} students</p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="flex gap-1 text-emerald-600 bg-emerald-500/10">
                                                <Star className="h-3 w-3 fill-current" /> {inst.rating}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Engagement Trends</CardTitle>
                                <CardDescription>Instructor activity over the last 30 days.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center h-[200px]">
                                <p className="text-muted-foreground">Chart visualization placeholder</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* ROLES TAB */}
                <TabsContent value="roles" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Instructor Role Permissions</CardTitle>
                                <CardDescription>Control what your instructors can view and edit.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">Content Management</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {['Create & Edit Courses', 'Upload Videos/Files', 'Create Quizzes', 'Manage Course Settings'].map(perm => (
                                                <div key={perm} className="flex items-center space-x-2 border p-3 rounded-md bg-muted/20">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                    <span className="text-sm font-medium">{perm}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">Student Interaction</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {['View Student Marks', 'Respond to Q&A', 'Grade Assignments', 'Issue Certificates'].map(perm => (
                                                <div key={perm} className="flex items-center space-x-2 border p-3 rounded-md bg-muted/20">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                    <span className="text-sm font-medium">{perm}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/10 border-t px-6 py-4">
                                <Button variant="outline" className="ml-auto">Edit Global Permissions</Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Shield className="h-5 w-5" />
                                    Responsibility Guidelines
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3 text-sm">
                                    <li className="flex gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                        <span className="text-muted-foreground">Mainain high-quality course content and regular updates.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                        <span className="text-muted-foreground">Respond to student queries within 48 hours.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                        <span className="text-muted-foreground">Follow platform community guidelines and ethics code.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                        <span className="text-muted-foreground">Participate in monthly instructor performance reviews.</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Recent Activity Panel (Bottom Section as requested by appendage) */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-3 border-t-4 border-t-primary/50 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Recent Instructor Activity</CardTitle>
                                <CardDescription>Real-time log of instructor actions and system events.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm">View Full Log</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {RECENT_ACTIVITIES.map((activity, i) => (
                                <div key={activity.id} className="flex relative gap-4 pb-6 last:pb-0">
                                    {/* Timeline Line */}
                                    {i !== RECENT_ACTIVITIES.length - 1 && (
                                        <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-border" />
                                    )}

                                    <div className={cn(
                                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm",
                                        activity.type === 'update' ? "bg-blue-500/10 border-blue-200 text-blue-600" :
                                            activity.type === 'approval' ? "bg-emerald-500/10 border-emerald-200 text-emerald-600" :
                                                activity.type === 'alert' ? "bg-rose-500/10 border-rose-200 text-rose-600" :
                                                    "bg-muted border-border text-muted-foreground"
                                    )}>
                                        {activity.type === 'update' ? <FileCheck className="h-4 w-4" /> :
                                            activity.type === 'approval' ? <CheckCircle2 className="h-4 w-4" /> :
                                                activity.type === 'alert' ? <AlertCircle className="h-4 w-4" /> :
                                                    <Activity className="h-4 w-4" />}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-sm">{activity.user}</span>
                                            <span className="text-xs text-muted-foreground">• {activity.time}</span>
                                        </div>
                                        <p className="text-sm text-foreground/80 font-medium">{activity.action}</p>
                                        {activity.course !== 'N/A' && (
                                            <p className="text-xs text-primary flex items-center gap-1">
                                                <BookOpen className="h-3 w-3" /> {activity.course}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
