
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, FileText, Users } from 'lucide-react';

const NDPRCompliance = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const complianceFeatures = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We implement robust security measures to protect your personal data according to NDPR standards.'
    },
    {
      icon: CheckCircle,
      title: 'Lawful Processing',
      description: 'All data processing activities are conducted with proper legal basis and user consent.'
    },
    {
      icon: FileText,
      title: 'Transparency',
      description: 'Clear and accessible privacy notices explain how we collect and use your data.'
    },
    {
      icon: Users,
      title: 'Individual Rights',
      description: 'We respect and facilitate your rights to access, correct, and delete your personal data.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">NDPR Compliance</h1>
          <p className="text-gray-600 mb-8">Nigeria Data Protection Regulation Compliance Statement</p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-900 mb-2">NDPR Certified</h2>
            <p className="text-green-800">
              BizCore is fully compliant with the Nigeria Data Protection Regulation (NDPR) 2019. 
              We are committed to protecting the privacy and personal data of all Nigerians.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our NDPR Commitment</h2>
            <p className="text-gray-700 mb-6">
              As a Nigerian company serving Nigerian businesses, we take data protection seriously and ensure full compliance with NDPR requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {complianceFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <feature.icon className="text-emerald-600" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Processing Principles</h2>
            <p className="text-gray-700 mb-4">
              We adhere to the following NDPR principles when processing personal data:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Lawfulness:</strong> We process data with proper legal basis and consent</li>
              <li><strong>Purpose Limitation:</strong> Data is collected for specific, legitimate purposes</li>
              <li><strong>Data Minimization:</strong> We only collect data that is necessary</li>
              <li><strong>Accuracy:</strong> We keep personal data accurate and up-to-date</li>
              <li><strong>Storage Limitation:</strong> Data is kept only as long as necessary</li>
              <li><strong>Security:</strong> Appropriate security measures protect your data</li>
              <li><strong>Accountability:</strong> We can demonstrate compliance with NDPR</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under NDPR</h2>
            <p className="text-gray-700 mb-4">
              Under the Nigeria Data Protection Regulation, you have the following rights:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <ul className="list-disc pl-6 text-blue-800 space-y-2">
                <li>Right to be informed about data processing</li>
                <li>Right of access to your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure of your data</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection Officer</h2>
            <p className="text-gray-700 mb-4">
              We have appointed a Data Protection Officer (DPO) to oversee our NDPR compliance:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> bizcore@omarconsults.ng<br />
                <strong>Phone:</strong> +2349066414474<br />
                <strong>Address:</strong> Lagos, Nigeria
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reporting Data Breaches</h2>
            <p className="text-gray-700">
              In the unlikely event of a data breach, we will notify the National Information Technology Development Agency (NITDA) within 72 hours and affected individuals without undue delay.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NDPRCompliance;
