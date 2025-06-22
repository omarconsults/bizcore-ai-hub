
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Building, Users, Award, Target } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const stats = [
    { label: 'Businesses Launched', value: '5,000+', icon: Building },
    { label: 'Active Users', value: '1,000+', icon: Users },
    { label: 'Success Rate', value: '99.8%', icon: Award },
    { label: 'Revenue Generated', value: '₦200M+', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-emerald-600">BizCore</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize business success in Nigeria by providing AI-powered tools that make business registration, compliance, and growth accessible to everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-emerald-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              To empower every Nigerian entrepreneur with the tools, knowledge, and support needed to build successful, compliant businesses that drive economic growth and create lasting impact.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that starting and running a business shouldn't be complicated by bureaucracy, compliance challenges, or lack of access to expert guidance.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Why We Built BizCore</h3>
            <p className="leading-relaxed">
              After seeing countless Nigerian entrepreneurs struggle with complex registration processes, compliance requirements, and lack of business guidance, we created BizCore to be the comprehensive solution that handles everything from day one to IPO.
            </p>
          </div>
        </div>

        {/* Team Values */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation First</h3>
              <p className="text-gray-600">We leverage cutting-edge AI to solve traditional business challenges in new ways.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nigerian-Focused</h3>
              <p className="text-gray-600">Every feature is built specifically for the Nigerian business environment and regulations.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Success</h3>
              <p className="text-gray-600">Your business success is our success. We're here to support you every step of the way.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
