
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-emerald-900 mb-2">Welcome to BizCore</h2>
            <p className="text-emerald-800">
              These terms govern your use of BizCore's business registration and management platform. 
              By using our services, you agree to these terms.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 mb-4">
              BizCore provides AI-powered business registration, compliance management, and growth tools specifically designed for Nigerian businesses. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Automated CAC business registration</li>
              <li>Compliance monitoring and management</li>
              <li>Financial management tools</li>
              <li>HR and team management features</li>
              <li>Marketing and growth optimization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 mb-4">When using BizCore, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use our services in compliance with Nigerian laws</li>
              <li>Not use our platform for illegal or fraudulent activities</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Guarantees</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Our Commitments</h3>
              <ul className="list-disc pl-6 text-blue-800">
                <li><strong>48-72 Hour Registration:</strong> Business registered within 72 hours or full refund</li>
                <li><strong>100% Compliance:</strong> We handle all compliance violations at no cost to you</li>
                <li><strong>24/7 Support:</strong> Expert support available around the clock</li>
                <li><strong>Money-Back Guarantee:</strong> 30-day satisfaction guarantee</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Fees are charged as described in your selected plan</li>
              <li>Government fees are separate from our service fees</li>
              <li>Refunds are processed according to our refund policy</li>
              <li>Subscription fees are billed in advance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              While we strive to provide excellent service, our liability is limited to the amount you paid for our services. We are not liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Government processing delays beyond our control</li>
              <li>Changes in regulations after registration</li>
              <li>Business losses or damages</li>
              <li>Third-party service failures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700">
              Either party may terminate this agreement with 30 days notice. Upon termination, you retain access to your business documents and data for 90 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              For questions about these terms, contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@bizcore.ng<br />
                <strong>Phone:</strong> +234 (0) 800 BIZCORE<br />
                <strong>Address:</strong> Lagos, Nigeria
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
