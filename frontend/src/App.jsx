import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DailyInput from './pages/DailyInput';
import BurnoutAnalysis from './pages/BurnoutAnalysis';
import Prediction from './pages/Prediction';
import Simulator from './pages/Simulator';
import ActionPlan from './pages/ActionPlan';
import Progress from './pages/Progress';
import Insights from './pages/Insights';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="daily-input" element={<DailyInput />} />
          <Route path="burnout-analysis" element={<BurnoutAnalysis />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="action-plan" element={<ActionPlan />} />
          <Route path="progress" element={<Progress />} />
          <Route path="insights" element={<Insights />} />
          <Route path="community" element={<Community />} />
          <Route path="settings" element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<AdminPortal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
