
import React from 'react';

const NewsletterSignup = () => {
  return (
    <div className="border-t border-gray-800 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
          <p className="text-gray-300 text-sm">Get the latest business insights and platform updates</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          />
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
