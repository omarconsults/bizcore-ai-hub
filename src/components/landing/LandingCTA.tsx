
import React from 'react';

interface LandingCTAProps {
  onStartDemo: () => void;
  user: any;
}

const LandingCTA = ({ onStartDemo, user }: LandingCTAProps) => {
  return (
    <section className="py-16 bg-blue-900">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Build Your Dream Business?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of Nigerian entrepreneurs who've transformed their ideas into thriving businesses with BizCore.
        </p>
        <button 
          onClick={onStartDemo}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
        >
          {user ? 'Go to Dashboard →' : 'Start Your Business Journey →'}
        </button>
        <p className="text-blue-200 text-sm mt-4">30-day free trial • No credit card required</p>
      </div>
    </section>
  );
};

export default LandingCTA;
