
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingHero from '@/components/pricing/PricingHero';
import TokenPackages from '@/components/pricing/TokenPackages';
import TokenUsageGuide from '@/components/pricing/TokenUsageGuide';
import SubscriptionPlans from '@/components/pricing/SubscriptionPlans';
import PayAsYouGoSection from '@/components/pricing/PayAsYouGoSection';
import PricingGuarantees from '@/components/pricing/PricingGuarantees';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChoosePlan = (planType: string) => {
    if (user) {
      // Navigate to dashboard with plan selection
      navigate('/', { state: { selectedPlan: planType } });
    } else {
      navigate('/auth');
    }
  };

  const handleBuyTokens = (packageName: string) => {
    if (user) {
      navigate('/', { state: { tokenPackage: packageName } });
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={() => navigate('/auth')} />
      
      <PricingHero />
      
      <TokenPackages onBuyTokens={handleBuyTokens} />
      
      <TokenUsageGuide />
      
      <SubscriptionPlans onChoosePlan={handleChoosePlan} />
      
      <PayAsYouGoSection 
        onBuyTokens={handleBuyTokens}
        onViewAuth={() => navigate('/auth')}
      />
      
      <PricingGuarantees />

      <Footer />
    </div>
  );
};

export default Pricing;
