import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleEnterDashboard = () => {
    setShowDashboard(true);
  };

  return (
    <div className="size-full">
      {!showDashboard ? (
        <LandingPage onEnter={handleEnterDashboard} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}