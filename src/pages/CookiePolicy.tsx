
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const CookiePolicy = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-amber-900 mb-2">About Our Cookies</h2>
            <p className="text-amber-800">
              BizCore uses cookies to enhance your experience, analyze website traffic, and provide personalized services. 
              This policy explains what cookies are and how we use them.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve your user experience</li>
              <li>Provide personalized content and services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as security and account access.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              We use analytics cookies to understand how visitors interact with our website, helping us improve our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Functional Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies remember your preferences and provide enhanced, personalized features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Browser Settings</h3>
              <p className="text-blue-800">
                Most browsers allow you to view, manage, and delete cookies. Check your browser's help section for specific instructions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about our cookie policy, contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>Email:</strong> bizcore@omarconsults.ng<br />
                <strong>Phone:</strong> +2349066414474
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
