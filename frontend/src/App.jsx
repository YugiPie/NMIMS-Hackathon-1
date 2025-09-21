import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TestPage from './TestPage';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Main App component
const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <LoginPage />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
};

// Root App component with AuthProvider
const App = () => {
  // Check if Firebase is properly configured
  const isFirebaseConfigured = () => {
    // Since we're using hardcoded config, Firebase is always configured
    return true;
  };

  // Show test page if Firebase is not configured
  if (!isFirebaseConfigured()) {
    return <TestPage />;
  }

  // Show full app if Firebase is configured
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
