
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingCTA from '@/components/landing/LandingCTA';
import Footer from '@/components/Footer';
import AICopilot from '@/components/AICopilot';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import UserIndicator from '@/components/dashboard/UserIndicator';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('landing'); // 'landing' or 'dashboard'
  const [activeModule, setActiveModule] = useState('dashboard');

  // Debug logging
  useEffect(() => {
    console.log('Index component - user:', user);
    console.log('Index component - loading:', loading);
    console.log('Index component - viewMode:', viewMode);
    console.log('Index component - activeModule:', activeModule);
  }, [user, loading, viewMode, activeModule]);

  // Handle navigation from footer product links
  useEffect(() => {
    if (location.state?.activeModule && user) {
      setActiveModule(location.state.activeModule);
      setViewMode('dashboard');
      // Clear the state to prevent issues on refresh
      navigate('/', { replace: true });
    }
  }, [location.state, user, navigate]);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      console.log('User is authenticated, switching to dashboard');
      setViewMode('dashboard');
    } else if (!loading && !user) {
      console.log('User is not authenticated, showing landing page');
      setViewMode('landing');
    }
  }, [user, loading]);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleStartDemo = () => {
    if (user) {
      setViewMode('dashboard');
    } else {
      navigate('/auth');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (user && viewMode === 'dashboard') {
    console.log('Rendering dashboard for user:', user.email);
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <div className="flex-1 overflow-auto">
          <DashboardContent activeModule={activeModule} onModuleChange={setActiveModule} />
        </div>
        <AICopilot />
        <UserIndicator user={user} onExit={() => setViewMode('landing')} />
      </div>
    );
  }

  console.log('Rendering landing page');
  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingCTA onStartDemo={handleStartDemo} user={user} />
      <Footer />
      <AICopilot />
    </div>
  );
};

export default Index;
