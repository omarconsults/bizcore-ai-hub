
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Your Privacy Matters</h2>
            <p className="text-blue-800">
              At BizCore, we're committed to protecting your privacy and ensuring your personal information is secure. 
              This policy explains how we collect, use, and protect your data.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Name, email address, and contact information</li>
              <li>Business information and registration details</li>
              <li>Financial information for payment processing</li>
              <li>Communication preferences and support interactions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>How you use our platform and services</li>
              <li>Device information and IP addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Provide and improve our business registration services</li>
              <li>Process payments and maintain your account</li>
              <li>Send important updates about your business registration</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Comply with legal requirements and prevent fraud</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell your personal information. We may share your information only in these circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>With government agencies for business registration purposes</li>
              <li>With service providers who help us operate our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and assessments</li>
              <li>Limited access to personal information</li>
              <li>SOC 2 compliance and security certifications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">Under Nigerian data protection laws, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy or want to exercise your rights, contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@bizcore.ng<br />
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

export default PrivacyPolicy;
