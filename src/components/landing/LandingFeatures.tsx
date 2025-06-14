
import React from 'react';

const LandingFeatures = () => {
  const features = [
    {
      title: "AI-Guided Setup",
      description: "Get personalized guidance for CAC registration, licensing, and compliance setup",
      icon: "🤖"
    },
    {
      title: "Smart Compliance",
      description: "Automated tracking of NDPR, tax obligations, and renewal deadlines",
      icon: "✅"
    },
    {
      title: "Financial Management",
      description: "Invoicing, bookkeeping, payroll, and financial reporting made simple",
      icon: "💰"
    },
    {
      title: "HR & Team Tools",
      description: "Employee management, contracts, performance tracking, and payroll automation",
      icon: "👥"
    },
    {
      title: "Growth Marketing",
      description: "AI-powered content creation, campaign management, and customer insights",
      icon: "📈"
    },
    {
      title: "Expert Knowledge",
      description: "Access to legal templates, business guides, and Nigerian market insights",
      icon: "📚"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything Your Business Needs in One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From business registration to growth optimization, BizCore handles every aspect of your entrepreneurial journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
