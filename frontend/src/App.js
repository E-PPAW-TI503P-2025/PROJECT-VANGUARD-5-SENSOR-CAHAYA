import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import SensorDashboard from './components/SensorDashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleEnterDashboard = () => {
    setShowDashboard(true);
  };

  const handleBackToLanding = () => {
    setShowDashboard(false);
  };

  return (
    <div className="App">
      {showDashboard ? (
        <SensorDashboard onBackToLanding={handleBackToLanding} />
      ) : (
        <LandingPage onEnterDashboard={handleEnterDashboard} />
      )}
    </div>
  );
}

export default App;
