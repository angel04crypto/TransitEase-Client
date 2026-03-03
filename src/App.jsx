import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Results from './pages/Results';
import Details from './pages/Details';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyTrips from './pages/MyTrips';   // ✅ ADDED

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MyTrips />
                </ProtectedRoute>
              }
            />

            {/* ✅ NEW PROTECTED ROUTE */}
            <Route
              path="/my-trips"
              element={
                <ProtectedRoute>
                  <MyTrips />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Footer */}
          <footer className="container mx-auto px-6 py-20 mt-20 border-t border-white/5 opacity-40">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-xl font-black tracking-tighter">TransitEase</span>
              </div>
              <div className="flex gap-8 text-xs font-black uppercase tracking-widest">
                <span className="cursor-pointer hover:text-primary transition-colors">Privacy Protocols</span>
                <span className="cursor-pointer hover:text-primary transition-colors">Network Terms</span>
                <span className="cursor-pointer hover:text-primary transition-colors">API Documentation</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest leading-none">
                © {new Date().getFullYear()} TransitEase Engine. <br /> All global rights secured.
              </div>
            </div>
          </footer>

        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;