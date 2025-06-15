
import React from 'react';

const CareerCTA = () => {
  return (
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
  );
};

export default CareerCTA;
