
import React from 'react';

const CareerValues = () => {
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
  );
};

export default CareerValues;
