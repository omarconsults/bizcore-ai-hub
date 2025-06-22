import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
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
import BusinessSetupForm from '@/components/onboarding/BusinessSetupForm';
import EmailVerificationPrompt from '@/components/auth/EmailVerificationPrompt';

const Index = () => {
  const { user, loading, isEmailVerified } = useAuth();
  const { businessProfile, loading: profileLoading, refetch } = useBusinessProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('landing');
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isPageReady, setIsPageReady] = useState(false);

  // Ensure page starts at top and prevent bottom loading
  useEffect(() => {
    // Immediately scroll to top
    window.scrollTo(0, 0);
    
    // Set scroll restoration to manual to prevent browser auto-scroll
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Mark page as ready after a brief delay to ensure DOM is stable
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      // Restore scroll behavior on cleanup
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Scroll to top when view mode changes
  useEffect(() => {
    if (isPageReady) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [viewMode, isPageReady]);

  // Debug logging for better troubleshooting
  useEffect(() => {
    console.log('Index component state:', {
      user: user ? `${user.email} (${user.id})` : null,
      loading,
      businessProfile: businessProfile ? `${businessProfile.business_name}` : null,
      profileLoading,
      viewMode,
      userEmailVerified: user?.email_confirmed_at || 'Not confirmed',
      isEmailVerified,
    });
  }, [user, loading, businessProfile, profileLoading, viewMode, isEmailVerified]);

  // Handle navigation from footer product links
  useEffect(() => {
    if (location.state?.activeModule && user && businessProfile) {
      setActiveModule(location.state.activeModule);
      setViewMode('dashboard');
      // Clear the state to prevent issues on refresh
      navigate('/', { replace: true });
    }
  }, [location.state, user, businessProfile, navigate]);

  // Determine view mode based on user and business profile status
  useEffect(() => {
    if (!loading && !profileLoading) {
      if (user) {
        console.log('User authenticated, checking email verification...');
        if (!isEmailVerified) {
          console.log('User email not verified, showing verification prompt');
          setViewMode('email-verification');
        } else if (businessProfile) {
          console.log('User has business profile, switching to dashboard');
          setViewMode('dashboard');
        } else {
          console.log('User authenticated but no business profile - showing onboarding');
          setViewMode('onboarding');
        }
      } else {
        console.log('User not authenticated, showing landing page');
        setViewMode('landing');
      }
    }
  }, [user, loading, businessProfile, profileLoading, isEmailVerified]);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleStartDemo = () => {
    if (user) {
      if (businessProfile) {
        setViewMode('dashboard');
      } else {
        setViewMode('onboarding');
      }
    } else {
      navigate('/auth');
    }
  };

  const handleBusinessSetupComplete = (hasExistingBusiness: boolean) => {
    console.log('Business setup completed, refreshing profile and switching to dashboard');
    
    // Refetch the business profile to get the updated data
    refetch();
    
    // Switch to dashboard view
    setViewMode('dashboard');
  };

  // Show loading screen while authentication and profile data are being fetched
  if (loading || profileLoading || !isPageReady) {
    return <LoadingScreen />;
  }

  // Show email verification prompt for unverified users
  if (user && !isEmailVerified && viewMode === 'email-verification') {
    console.log('Rendering email verification prompt for user:', user.email);
    return <EmailVerificationPrompt />;
  }

  // Show onboarding flow for authenticated users without business profile
  if (user && viewMode === 'onboarding') {
    console.log('Rendering business setup onboarding for user:', user.email);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
          <BusinessSetupForm onComplete={handleBusinessSetupComplete} />
        </div>
      </div>
    );
  }

  // Show dashboard for authenticated users with business profile
  if (user && businessProfile && viewMode === 'dashboard') {
    console.log('Rendering dashboard for user:', user.email, 'with business:', businessProfile.business_name);
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

  // Show landing page for unauthenticated users or when explicitly requested
  console.log('Rendering landing page');
  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: 'smooth' }}>
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
