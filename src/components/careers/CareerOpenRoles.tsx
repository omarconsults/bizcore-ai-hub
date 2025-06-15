
import React from 'react';
import { MapPin, Clock, Users } from 'lucide-react';

const CareerOpenRoles = () => {
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

  return (
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
  );
};

export default CareerOpenRoles;
