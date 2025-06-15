
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const steps = [
    {
      step: '01',
      title: 'Sign Up & Business Assessment',
      description: 'Create your account and let our AI analyze your business idea, industry, and goals to recommend the perfect setup.',
      features: ['AI-powered business type recommendation', 'Compliance requirement analysis', 'Cost estimation'],
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      step: '02',
      title: 'Automated Registration Process',
      description: 'Our system handles all CAC paperwork, name searches, and government submissions automatically.',
      features: ['Instant name availability check', 'Automated form completion', 'Direct CAC submission'],
      icon: Zap,
      color: 'bg-emerald-500'
    },
    {
      step: '03',
      title: 'Compliance Setup & Monitoring',
      description: 'We set up all necessary compliance frameworks and monitor deadlines to keep you compliant.',
      features: ['NDPR compliance setup', 'Tax registration', '24/7 compliance monitoring'],
      icon: Shield,
      color: 'bg-purple-500'
    },
    {
      step: '04',
      title: 'Business Operations Dashboard',
      description: 'Access your complete business management suite with finance, HR, and growth tools.',
      features: ['Financial management', 'HR & payroll', 'Marketing automation'],
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const benefits = [
    '48-72 hour business registration vs 2-6 weeks traditional',
    '100% compliance guarantee with automatic monitoring',
    'Save ₦500,000+ annually on consultants and penalties',
    '24/7 expert support included in all plans'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            How <span className="text-emerald-600">BizCore</span> Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From business idea to fully registered, compliant operation in just 4 simple steps. 
            Our AI-powered platform handles everything so you can focus on what matters most.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 mb-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full ${step.color} text-white flex items-center justify-center text-2xl font-bold`}>
                    {step.step}
                  </div>
                  <step.icon className="text-gray-400" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className={`h-64 rounded-2xl ${step.color} bg-opacity-10 flex items-center justify-center`}>
                  <step.icon className={`${step.color.replace('bg-', 'text-')} opacity-20`} size={120} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-blue-900 to-emerald-600 rounded-3xl p-8 lg:p-12 text-white text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Why 15,000+ Entrepreneurs Choose BizCore</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 text-left">
                <CheckCircle className="text-emerald-300 flex-shrink-0" size={24} />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Business Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful Nigerian entrepreneurs who chose BizCore for their business registration and growth.
          </p>
          <Button 
            onClick={handleAuthClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-xl"
          >
            Get Started Now <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
