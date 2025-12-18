import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { initializeDatabase } from "@/lib/db";
import { useAuthStore } from "@/stores";

// Layouts
import { ChildLayout } from "@/layouts/ChildLayout";
import { TherapistLayout } from "@/layouts/TherapistLayout";
import { ParentLayout } from "@/layouts/ParentLayout";

// Auth Pages
import Landing from "@/pages/Landing";
import RoleSelect from "@/pages/RoleSelect";
import ChildSetup from "@/pages/child/ChildSetup";

// Child Pages
import LanguageSelect from "@/pages/child/LanguageSelect";
import QuestMap from "@/pages/child/QuestMap";
import Lesson from "@/pages/child/Lesson";
import LessonComplete from "@/pages/child/LessonComplete";
import ChildRewards from "@/pages/child/Rewards";
import ChildProfile from "@/pages/child/Profile";

// Therapist Pages
import TherapistDashboard from "@/pages/therapist/Dashboard";
import PatientsList from "@/pages/therapist/PatientsList";
import PatientProfile from "@/pages/therapist/PatientProfile";
import AuthoringStudio from "@/pages/therapist/AuthoringStudio";
import PackBuilder from "@/pages/therapist/PackBuilder";
import SessionRunner from "@/pages/therapist/SessionRunner";
import SessionReview from "@/pages/therapist/SessionReview";
import Reports from "@/pages/therapist/Reports";

// Parent Pages
import ParentDashboard from "@/pages/parent/Dashboard";
import ChildProgress from "@/pages/parent/ChildProgress";
import HomePractice from "@/pages/parent/HomePractice";
import Community from "@/pages/parent/Community";

// Not Found
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Route guard component
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles?: string[];
}) {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-2xl font-display text-primary">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/role-select" replace />;
  }

  return <>{children}</>;
}

const App = () => {
  // Initialize database on app start
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/child-setup" element={<ChildSetup />} />

            {/* Child Routes */}
            <Route path="/child" element={
              <ProtectedRoute allowedRoles={['child']}>
                <ChildLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="language" replace />} />
              <Route path="language" element={<LanguageSelect />} />
              <Route path="quest" element={<QuestMap />} />
              <Route path="lesson/:packId" element={<Lesson />} />
              <Route path="lesson/:packId/complete" element={<LessonComplete />} />
              <Route path="rewards" element={<ChildRewards />} />
              <Route path="profile" element={<ChildProfile />} />
            </Route>

            {/* Therapist Routes */}
            <Route path="/therapist" element={
              <ProtectedRoute allowedRoles={['therapist']}>
                <TherapistLayout />
              </ProtectedRoute>
            }>
              <Route index element={<TherapistDashboard />} />
              <Route path="patients" element={<PatientsList />} />
              <Route path="patients/:patientId" element={<PatientProfile />} />
              <Route path="authoring" element={<AuthoringStudio />} />
              <Route path="authoring/pack/:packId?" element={<PackBuilder />} />
              <Route path="session/:sessionId" element={<SessionRunner />} />
              <Route path="session/:sessionId/review" element={<SessionReview />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* Parent Routes */}
            <Route path="/parent" element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentLayout />
              </ProtectedRoute>
            }>
              <Route index element={<ParentDashboard />} />
              <Route path="progress" element={<ChildProgress />} />
              <Route path="practice" element={<HomePractice />} />
              <Route path="community" element={<Community />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
