
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
      
      {/* Trial Information Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Free Trial Today!</h2>
            <p className="text-xl text-gray-600">No credit card required • Full access • Cancel anytime</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-emerald-200">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎁</span>
                </div>
                <div className="text-3xl font-bold text-emerald-600">10 Tokens</div>
                <div className="text-gray-600">Welcome Bonus</div>
                <p className="text-sm text-gray-500">Instant access to AI features</p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">100 Days</div>
                <div className="text-gray-600">Free Trial Period</div>
                <p className="text-sm text-gray-500">Extended trial to build your business</p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="text-3xl font-bold text-purple-600">25 Daily</div>
                <div className="text-gray-600">Tokens per Day</div>
                <p className="text-sm text-gray-500">2,500+ total tokens during trial</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Trial Value: Over 2,500 AI Tokens!</h3>
                <p className="text-emerald-100">Enough to generate multiple business plans, marketing content, and explore all features</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
