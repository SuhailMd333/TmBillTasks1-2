import React, { useEffect } from "react";
import { Home, AllTasks, ImportantTasks, InCompletedTasks, CompletedTasks, Signup, Login } from "./pages/index";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { authActions } from "./reducer/auth";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login())
    }
    if (!isLoggedIn && !window.location.pathname.includes('/signup') && !window.location.pathname.includes('/login')) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className=" bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      {/* Notification Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
      
      {/* Main container with different styling for auth vs app pages */}
      <div className={isLoggedIn ? "container mx-auto px-4 py-8" : "min-h-screen flex items-center justify-center p-4"}>
        <Routes>
          {/* Public Routes - full screen centered layout */}
          <Route 
            path="/signup" 
            element={
              <div className="w-full max-w-md">
                {isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
              </div>
            } 
          />
          <Route 
            path="/login" 
            element={
              <div className="w-full max-w-md">
                {isLoggedIn ? <Navigate to="/" replace /> : <Login />}
              </div>
            } 
          />
          
          {/* Protected Routes - normal app layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<AllTasks />} />
            <Route path="important" element={<ImportantTasks />} />
            <Route path="completed" element={<CompletedTasks />} />
            <Route path="incompleted" element={<InCompletedTasks />} />
          </Route>

          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;