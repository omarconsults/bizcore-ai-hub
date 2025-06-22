
import React from 'react';
import { CheckCircle, Shield, Calculator, Users, Megaphone, Target, Building2, Zap } from 'lucide-react';

const LandingFeaturesSection = () => {
  const features = [
    {
      icon: Building2,
      title: "Business Registration",
      description: "Complete CAC registration and business setup in just 5 days with our streamlined process."
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description: "Automated NDPR, FIRS & state compliance monitoring to keep your business legally compliant."
    },
    {
      icon: Calculator,
      title: "Financial Operations",
      description: "AI-powered invoicing, bookkeeping & financial management with real-time insights."
    },
    {
      icon: Users,
      title: "HR Management",
      description: "Complete HR suite with payroll, contracts & performance tracking for your team."
    },
    {
      icon: Megaphone,
      title: "Marketing Tools",
      description: "Growth marketing tools with Nigerian market insights to boost your business."
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description: "AI-powered business planning and strategy tools to guide your growth journey."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to 
            <span className="block text-emerald-600">Build & Scale Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From registration to growth, our AI-powered platform handles every aspect of your business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="mt-6 flex items-center text-emerald-600 font-medium">
                <CheckCircle size={16} className="mr-2" />
                <span className="text-sm">Included in all plans</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full">
            <Zap size={20} className="mr-2" />
            <span className="font-semibold">45% faster business growth vs manual methods</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeaturesSection;
