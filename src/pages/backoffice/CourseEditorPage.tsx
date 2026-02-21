import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Save,
  Eye,
  Users,
  Mail,
  Upload,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Play,
  FileText,
  Image,
  HelpCircle,
  Share2,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockCourses, mockLessons } from '@/data/mockData';
import { LessonType } from '@/types';
import { cn } from '@/lib/utils';

const getLessonIcon = (type: LessonType) => {
  switch (type) {
    case 'video': return Play;
    case 'document': return FileText;
    case 'image': return Image;
    case 'quiz': return HelpCircle;
    default: return FileText;
  }
};

export default function CourseEditorPage() {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId);
  const lessons = mockLessons.filter((l) => l.courseId === courseId);
  // @ts-ignore - Mock data typing shortcut
  const [lessonsList, setLessonsList] = useState<any[]>(lessons);

  const [isPublished, setIsPublished] = useState(course?.status === 'published');
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [visibility, setVisibility] = useState<string>(course?.visibility || 'everyone');
  const [accessRule, setAccessRule] = useState<string>(course?.accessRule || 'open');
  const [price, setPrice] = useState(course?.price?.toString() || '');
  const [website, setWebsite] = useState(course?.website || '');
  const [responsibleId, setResponsibleId] = useState(course?.instructorId || '');
  const [courseImage, setCourseImage] = useState(course?.image || '');
  const [addAttendeeOpen, setAddAttendeeOpen] = useState(false);
  const [contactAttendeeOpen, setContactAttendeeOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<LessonType>('video');
  const [newLessonWebsite, setNewLessonWebsite] = useState('');
  const [newLessonTags, setNewLessonTags] = useState<string[]>([]);
  const [newLessonTag, setNewLessonTag] = useState('');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: 'q1',
      text: '',
      choices: [
        { id: 'c1', text: '', isCorrect: false },
        { id: 'c2', text: '', isCorrect: false },
        { id: 'c3', text: '', isCorrect: false },
      ]
    }
  ]);
  const [activeQuizView, setActiveQuizView] = useState<string>('q1');
  const [rewards, setRewards] = useState({
    first: 10,
    second: 7,
    third: 5,
    fourth: 2
  });

  const handleAddQuestion = () => {
    const newId = `q${Date.now()}`;
    setQuizQuestions([
      ...quizQuestions,
      {
        id: newId,
        text: '',
        choices: [
          { id: `c${Date.now()}-1`, text: '', isCorrect: false },
          { id: `c${Date.now()}-2`, text: '', isCorrect: false },
        ]
      }
    ]);
    setActiveQuizView(newId);
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuizQuestions(quizQuestions.map(q => q.id === id ? { ...q, text } : q));
  };

  const updateChoice = (qId: string, cId: string, field: string, value: any) => {
    setQuizQuestions(quizQuestions.map(q => q.id === qId ? {
      ...q,
      choices: q.choices.map(c => c.id === cId ? { ...c, [field]: value } : c)
    } : q));
  };

  const addChoice = (qId: string) => {
    setQuizQuestions(quizQuestions.map(q => q.id === qId ? {
      ...q,
      choices: [...q.choices, { id: `c${Date.now()}`, text: '', isCorrect: false }]
    } : q));
  };

  const removeChoice = (qId: string, cId: string) => {
    setQuizQuestions(quizQuestions.map(q => q.id === qId ? {
      ...q,
      choices: q.choices.filter(c => c.id !== cId)
    } : q));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseImage(reader.result as string);
        toast.success('Course image updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContactAttendee = () => {
    // Mock implementation
    setContactAttendeeOpen(false);
    toast.success('Message sent to attendees successfully');
  };

  const handleAddLessonTag = () => {
    if (newLessonTag.trim() && !newLessonTags.includes(newLessonTag.trim())) {
      setNewLessonTags([...newLessonTags, newLessonTag.trim()]);
      setNewLessonTag('');
    }
  };

  const handleRemoveLessonTag = (tagToRemove: string) => {
    setNewLessonTags(newLessonTags.filter(tag => tag !== tagToRemove));
  };

  const handleEditLesson = (lesson: any) => {
    setEditingLessonId(lesson.id);
    setNewLessonTitle(lesson.title);
    setNewLessonType(lesson.type);
    setNewLessonWebsite(lesson.website || '');
    setNewLessonTags(lesson.tags || []);
    setLessonDialogOpen(true);
  };

  const handleDeleteLesson = (lessonId: string) => {
    setLessonsList(lessonsList.filter(l => l.id !== lessonId));
    toast.success('Lesson deleted successfully');
  };

  const handleSaveLesson = () => {
    if (editingLessonId) {
      setLessonsList(lessonsList.map(l => l.id === editingLessonId ? {
        ...l,
        title: newLessonTitle,
        type: newLessonType,
        website: newLessonWebsite,
        tags: newLessonTags,
        updatedAt: new Date().toISOString()
      } : l));
      toast.success('Lesson updated successfully');
    } else {
      const newLesson = {
        id: `new-lesson-${Date.now()}`,
        courseId: courseId!,
        title: newLessonTitle,
        description: '',
        type: newLessonType,
        order: lessonsList.length + 1,
        duration: 10,
        content: {},
        website: newLessonWebsite,
        tags: newLessonTags,
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setLessonsList([...lessonsList, newLesson]);
      toast.success('Lesson added successfully');
    }
    setLessonDialogOpen(false);
    setNewLessonTitle('');
    setNewLessonType('video');
    setNewLessonWebsite('');
    setNewLessonTags([]);
    setNewLessonTag('');
    setEditingLessonId(null);
  };

  const handleAddAttendee = () => {
    // Mock implementation
    setAddAttendeeOpen(false);
    toast.success('Attendee added successfully');
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Course not found</h1>
          <Button asChild>
            <Link to="/backoffice/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/backoffice/courses">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Course</h1>
            <p className="text-sm text-muted-foreground">{course.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Published</span>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
          <Button variant="outline" asChild>
            <Link to={`/course/${courseId}`}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button variant="outline" onClick={() => setAddAttendeeOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            Add Attendees
          </Button>
          <Button variant="outline" onClick={() => setContactAttendeeOpen(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button onClick={() => toast.success('Course changes saved')}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Course Image */}
      <div className="flex items-start gap-6">
        <div className="relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 group">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
            onChange={handleImageUpload}
          />
          {courseImage ? (
            <img
              src={courseImage}
              alt={title || 'Course Image'}
              className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-2 right-2 z-10 pointers-events-none"
          >
            Change Image
          </Button>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor="title">Course Title <span className="text-destructive">*</span></Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title..."
              className="mt-1"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Responsible</Label>
              <Select value={responsibleId} onValueChange={setResponsibleId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select course admin..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inst-1">Sarah Johnson</SelectItem>
                  <SelectItem value="inst-2">Michael Chen</SelectItem>
                  <SelectItem value="inst-3">Emily Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Settings</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Lessons ({lessonsList.length})</h3>
            <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Content
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingLessonId ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="lesson-title">Lesson Title</Label>
                    <Input
                      id="lesson-title"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      placeholder="Enter lesson title..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Lesson Type</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {(['video', 'document', 'image', 'quiz'] as LessonType[]).map((type) => {
                        const Icon = getLessonIcon(type);
                        return (
                          <button
                            key={type}
                            onClick={() => setNewLessonType(type)}
                            className={cn(
                              "flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-colors",
                              newLessonType === type
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="capitalize">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {newLessonType === 'video' && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="lesson-website">Website</Label>
                        <Input
                          id="lesson-website"
                          value={newLessonWebsite}
                          onChange={(e) => setNewLessonWebsite(e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Tags</Label>
                        <div className="flex gap-2">
                          <Input
                            value={newLessonTag}
                            onChange={(e) => setNewLessonTag(e.target.value)}
                            placeholder="Add a tag"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddLessonTag();
                              }
                            }}
                          />
                          <Button type="button" onClick={handleAddLessonTag} size="sm" variant="secondary">
                            Add
                          </Button>
                        </div>
                        {newLessonTags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newLessonTags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                                {tag}
                                <button
                                  onClick={() => handleRemoveLessonTag(tag)}
                                  className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => {
                      setLessonDialogOpen(false);
                      setEditingLessonId(null);
                      setNewLessonTitle('');
                      setNewLessonWebsite('');
                      setNewLessonTags([]);
                    }}>
                      Cancel
                    </Button>
                    <Button disabled={!newLessonTitle.trim()} onClick={handleSaveLesson}>
                      {editingLessonId ? 'Save Changes' : 'Add Lesson'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-xl border border-border bg-card">
            {lessonsList.length > 0 ? (
              <div className="divide-y divide-border">
                {lessonsList.map((lesson) => {
                  const Icon = getLessonIcon(lesson.type);
                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                    >
                      <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                      <div className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                        "bg-primary/10 text-primary"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {lesson.type} • {lesson.duration} min
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditLesson(lesson)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteLesson(lesson.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">No lessons yet</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Add your first lesson to get started
                </p>
                <Button onClick={() => setLessonDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Content
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Description Tab */}
        <TabsContent value="description">
          <div className="rounded-xl border border-border bg-card p-6">
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a detailed description of your course..."
              className="mt-2 min-h-[200px]"
            />
          </div>
        </TabsContent>

        {/* Options Tab */}
        <TabsContent value="options">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label>Visibility</Label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="signed_in">Signed In Users Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-muted-foreground">
                  Who can see this course in the catalog
                </p>
              </div>

              <div>
                <Label>Access Rule</Label>
                <Select value={accessRule} onValueChange={setAccessRule}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open (Free)</SelectItem>
                    <SelectItem value="invitation">On Invitation</SelectItem>
                    <SelectItem value="payment">On Payment</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-muted-foreground">
                  How users can access this course
                </p>
              </div>

              {accessRule === 'payment' && (
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="49.99"
                    className="mt-2"
                  />
                </div>
              )}


            </div>
          </div>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="h-[600px] flex flex-col">
          <div className="flex-1 flex rounded-xl border border-border bg-card overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-muted/20 flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Question List</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {quizQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuizView(q.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group",
                      activeQuizView === q.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>Question {idx + 1}</span>
                    {quizQuestions.length > 1 && (
                      <Trash2
                        className="h-3 w-3 opacity-0 group-hover:opacity-100 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuizQuestions(quizQuestions.filter(item => item.id !== q.id));
                          if (activeQuizView === q.id) setActiveQuizView('rewards');
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-border space-y-2">
                <Button onClick={handleAddQuestion} className="w-full bg-indigo-500 hover:bg-indigo-600 font-medium">
                  Add Question
                </Button>
                <Button
                  onClick={() => setActiveQuizView('rewards')}
                  className={cn(
                    "w-full font-medium transition-colors",
                    activeQuizView === 'rewards'
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  )}
                >
                  Rewards
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-background p-8 overflow-y-auto">
              {activeQuizView === 'rewards' ? (
                <div className="max-w-xl mx-auto">
                  <h2 className="text-xl font-bold mb-8">Rewards settings</h2>
                  <div className="space-y-6">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base text-yellow-600">First try :</Label>
                        <div className="relative w-32">
                          <Input
                            type="number"
                            value={rewards.first}
                            onChange={(e) => setRewards({ ...rewards, first: parseInt(e.target.value) })}
                            className="pr-12 text-center"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-yellow-600">points</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base text-yellow-600">Second try :</Label>
                        <div className="relative w-32">
                          <Input
                            type="number"
                            value={rewards.second}
                            onChange={(e) => setRewards({ ...rewards, second: parseInt(e.target.value) })}
                            className="pr-12 text-center"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-yellow-600">points</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base text-yellow-600">Third try :</Label>
                        <div className="relative w-32">
                          <Input
                            type="number"
                            value={rewards.third}
                            onChange={(e) => setRewards({ ...rewards, third: parseInt(e.target.value) })}
                            className="pr-12 text-center"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-yellow-600">points</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base text-yellow-600">Fourth Try and more :</Label>
                        <div className="relative w-32">
                          <Input
                            type="number"
                            value={rewards.fourth}
                            onChange={(e) => setRewards({ ...rewards, fourth: parseInt(e.target.value) })}
                            className="pr-12 text-center"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-yellow-600">points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                (() => {
                  const activeQuestion = quizQuestions.find(q => q.id === activeQuizView);
                  const index = quizQuestions.findIndex(q => q.id === activeQuizView);

                  if (!activeQuestion) return <div className="text-center text-muted-foreground">Select a question to edit</div>;

                  return (
                    <div className="max-w-3xl mx-auto space-y-8">
                      {/* Question Header */}
                      <div className="flex items-baseline gap-4">
                        <span className="text-2xl font-bold">{index + 1}.</span>
                        <div className="flex-1">
                          <Input
                            value={activeQuestion.text}
                            onChange={(e) => updateQuestionText(activeQuestion.id, e.target.value)}
                            className="text-lg border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent placeholder:text-muted-foreground/50"
                            placeholder="Write your question here"
                          />
                        </div>
                      </div>

                      {/* Answers */}
                      <div>
                        <div className="grid grid-cols-[1fr,80px,40px] gap-4 mb-4 px-2 text-sm font-medium text-muted-foreground">
                          <div>Choices</div>
                          <div className="text-center">Correct</div>
                          <div></div>
                        </div>
                        <div className="space-y-3">
                          {activeQuestion.choices.map((choice) => (
                            <div key={choice.id} className="grid grid-cols-[1fr,80px,40px] items-center gap-4 p-2 rounded-lg hover:bg-muted/30 group">
                              <Input
                                value={choice.text}
                                onChange={(e) => updateChoice(activeQuestion.id, choice.id, 'text', e.target.value)}
                                className="bg-transparent"
                                placeholder={`Answer`}
                              />
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={choice.isCorrect}
                                  onCheckedChange={(checked) => updateChoice(activeQuestion.id, choice.id, 'isCorrect', checked)}
                                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 text-destructive h-8 w-8"
                                onClick={() => removeChoice(activeQuestion.id, choice.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="ghost"
                          className="mt-4 text-blue-500 hover:text-blue-600 hover:bg-blue-50 pl-0"
                          onClick={() => addChoice(activeQuestion.id)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add choice
                        </Button>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Attendee Wizard */}
      <Dialog open={addAttendeeOpen} onOpenChange={setAddAttendeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Attendee</DialogTitle>
            <DialogDescription>
              Add a new learner to this course directly by email.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="learner-email">Learner Email</Label>
            <Input id="learner-email" placeholder="learner@example.com" className="mt-2" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAttendeeOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAttendee}>Add Learner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Wizard */}
      <Dialog open={contactAttendeeOpen} onOpenChange={setContactAttendeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Attendees</DialogTitle>
            <DialogDescription>
              Send an email to all learners enrolled in this course.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Course Update..." className="mt-2" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." className="mt-2 min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactAttendeeOpen(false)}>Cancel</Button>
            <Button onClick={handleContactAttendee}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
