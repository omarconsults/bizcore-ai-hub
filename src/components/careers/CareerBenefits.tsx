
import React from 'react';
import { Heart, Zap, Users, Globe } from 'lucide-react';

const CareerBenefits = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: Zap,
      title: "Professional Growth",
      description: "Learning budget and career development opportunities"
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate people building the future of business in Nigeria"
    },
    {
      icon: Globe,
      title: "Remote Flexibility",
      description: "Flexible work arrangements and remote-first culture"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
          <p className="text-gray-600">
            We offer competitive benefits and a mission-driven work environment
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <benefit.icon className="text-emerald-600 mx-auto mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerBenefits;
