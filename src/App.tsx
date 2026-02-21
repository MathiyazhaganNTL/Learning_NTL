import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AIChatBot } from "@/components/ai/AIChatBot";

// Layouts
import { LearnerLayout } from "@/components/layout/LearnerLayout";
import { BackofficeLayout } from "@/components/layout/BackofficeLayout";

// Pages
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import MyCoursesPage from "@/pages/MyCoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import LessonPlayerPage from "@/pages/LessonPlayerPage";
import QuizPage from "@/pages/QuizPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFound from "@/pages/NotFound";
import LearnerSettingsPage from "@/pages/SettingsPage";
import BadgesPage from "@/pages/BadgesPage";

// Backoffice Pages
import BackofficeDashboard from "@/pages/backoffice/BackofficeDashboard";
import BackofficeCoursesPage from "@/pages/backoffice/BackofficeCoursesPage";
import CourseEditorPage from "@/pages/backoffice/CourseEditorPage";
import BackofficeReportsPage from "@/pages/backoffice/BackofficeReportsPage";
import BackofficeLearnersPage from "@/pages/backoffice/BackofficeLearnersPage";
import BackofficeInstructorsPage from "@/pages/backoffice/BackofficeInstructorsPage";

const queryClient = new QueryClient();

// Protected Route wrapper
function ProtectedRoute({ children, requiredRoles }: { children: React.ReactNode; requiredRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Auth Route wrapper (redirect if already logged in)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/my-courses" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

      {/* Learner Routes */}
      <Route element={<LearnerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/badges"
          element={
            <ProtectedRoute>
              <BadgesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <LearnerSettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Full-screen lesson player (outside layout) */}
      <Route
        path="/course/:courseId/learn"
        element={
          <ProtectedRoute>
            <LessonPlayerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/course/:courseId/quiz/:quizId"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />

      {/* Backoffice Routes */}
      <Route
        path="/backoffice"
        element={
          <ProtectedRoute requiredRoles={['admin', 'instructor']}>
            <BackofficeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<BackofficeDashboard />} />
        <Route path="courses" element={<BackofficeCoursesPage />} />
        <Route path="courses/:courseId" element={<CourseEditorPage />} />
        <Route path="learners" element={<BackofficeLearnersPage />} />
        <Route path="instructors" element={<BackofficeInstructorsPage />} />
        <Route path="reports" element={<BackofficeReportsPage />} />
        <Route path="settings" element={<LearnerSettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="learnflow-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
            <AIChatBot />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
