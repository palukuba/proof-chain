import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Documents } from './pages/Documents';
import { Issue } from './pages/Issue';
import { Students } from './pages/Students';
import { StudentDetails } from './pages/StudentDetails';
import { SchoolProfile } from './pages/SchoolProfile';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { ROUTES } from './constants';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.DOCUMENTS} element={<Documents />} />
        <Route path={ROUTES.ISSUE} element={<Issue />} />
        <Route path={ROUTES.STUDENTS} element={<Students />} />
        <Route path={ROUTES.STUDENT_DETAILS} element={<StudentDetails />} />
        <Route path={ROUTES.PROFILE} element={<SchoolProfile />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Route>
      
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;