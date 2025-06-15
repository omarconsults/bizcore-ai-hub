import React from 'react';
import { MapPin, Clock, Users, Heart, Zap, Globe } from 'lucide-react';
import Footer from '@/components/Footer';

const Careers = () => {
  const openRoles = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Join our engineering team to build the future of business automation in Nigeria."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Lead product strategy and development for our AI-powered business tools."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Help Nigerian entrepreneurs succeed with our platform and drive customer satisfaction."
    },
    {
      title: "Legal & Compliance Specialist",
      department: "Legal",
      location: "Abuja, Nigeria",
      type: "Full-time",
      description: "Ensure our platform stays compliant with Nigerian business regulations."
    }
  ];

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

  const values = [
    {
      title: "Innovation First",
      description: "We're building tomorrow's solutions today"
    },
    {
      title: "Nigerian Focus",
      description: "We understand the unique challenges of Nigerian entrepreneurs"
    },
    {
      title: "AI-Powered",
      description: "We leverage cutting-edge AI to solve real business problems"
    },
    {
      title: "Customer Obsessed",
      description: "Every decision we make puts our customers first"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Mission</h1>
          <p className="text-xl text-emerald-100 mb-8">
            Help us build the future of business automation for Nigerian entrepreneurs
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-emerald-200">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>50+ Team Members</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span>Lagos & Remote</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={20} />
              <span>Mission-Driven</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building more than just software - we're creating a platform that empowers Nigerian entrepreneurs to succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Roles */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600">
              Join our team and help shape the future of business in Nigeria
            </p>
          </div>
          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.title}</h3>
                    <p className="text-gray-600 mb-3">{role.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{role.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{role.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{role.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
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

      {/* CTA */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See Your Role?</h2>
          <p className="text-gray-600 mb-8">
            We're always looking for talented people to join our mission. Send us your resume and tell us how you'd like to contribute.
          </p>
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
            Send Us Your Resume
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
