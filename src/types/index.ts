// User & Auth Types
export type UserRole = 'admin' | 'instructor' | 'learner' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  totalPoints: number;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  level: number;
  requiredPoints: number;
  icon: string;
  color: string;
}

// Course Types
export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseVisibility = 'everyone' | 'signed_in';
export type CourseAccessRule = 'open' | 'invitation' | 'payment';

export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  status: CourseStatus;
  visibility: CourseVisibility;
  accessRule: CourseAccessRule;
  website?: string;
  price?: number;
  instructorId: string;
  instructorName: string;
  totalLessons: number;
  totalDuration: number; // in minutes
  viewsCount: number;
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Lesson Types
export type LessonType = 'video' | 'document' | 'image' | 'quiz';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  type: LessonType;
  order: number;
  duration?: number; // in minutes
  content: LessonContent;
  attachments: Attachment[];
  responsiblePerson?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonContent {
  // Video
  videoUrl?: string;
  videoDuration?: number;
  // Document
  documentUrl?: string;
  documentName?: string;
  allowDownload?: boolean;
  // Image
  imageUrl?: string;
  // Quiz
  quizId?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'file' | 'link';
  url: string;
  size?: number;
}

// Quiz Types
export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  rewardConfig: QuizRewardConfig;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionIds: string[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizRewardConfig {
  firstAttempt: number;
  secondAttempt: number;
  thirdAttempt: number;
  fourthPlusAttempt: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  attemptNumber: number;
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  completedAt: string;
}

// Enrollment & Progress Types
export type EnrollmentStatus = 'yet_to_start' | 'in_progress' | 'completed';

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress: number; // 0-100
  enrolledAt: string;
  startedAt?: string;
  completedAt?: string;
  timeSpent: number; // in minutes
}

export interface LessonProgress {
  id: string;
  lessonId: string;
  enrollmentId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent: number;
}

// Review Types
export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Report Types
export interface CourseReport {
  totalParticipants: number;
  yetToStart: number;
  inProgress: number;
  completed: number;
  learners: LearnerReportRow[];
}

export interface LearnerReportRow {
  id: string;
  courseName: string;
  learnerName: string;
  learnerEmail: string;
  enrolledDate: string;
  startDate?: string;
  timeSpent: number;
  completionPercentage: number;
  status: EnrollmentStatus;
}
