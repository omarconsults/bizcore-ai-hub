
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import FooterSection from './FooterSection';

const FooterLinks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProductLink = (module: string) => {
    if (user) {
      navigate('/', { state: { activeModule: module } });
    } else {
      navigate('/auth');
    }
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      console.log('Feature coming soon:', href);
    } else {
      navigate(href);
    }
  };

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press Kit', href: '#press' },
  ];

  const productLinks = [
    { name: 'Business Registration', module: 'dashboard' },
    { name: 'Compliance Management', module: 'compliance' },
    { name: 'Financial Tools', module: 'operations' },
    { name: 'HR Management', module: 'team' },
    { name: 'Marketing Suite', module: 'marketing' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact Support', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'NDPR Compliance', href: '/ndpr' },
  ];

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
      {/* Company Links */}
      <FooterSection title="Company">
        <ul className="space-y-3">
          {companyLinks.map((link, index) => (
            <li key={index}>
              <button 
                onClick={() => handleLinkClick(link.href)}
                className="text-gray-300 hover:text-emerald-400 transition-colors text-left"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </FooterSection>

      {/* Product Links */}
      <FooterSection title="Products">
        <ul className="space-y-3">
          {productLinks.map((link, index) => (
            <li key={index}>
              <button 
                onClick={() => handleProductLink(link.module)}
                className="text-gray-300 hover:text-emerald-400 transition-colors text-left"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </FooterSection>

      {/* Support & Legal */}
      <div>
        <FooterSection title="Support">
          <ul className="space-y-3 mb-6">
            {supportLinks.map((link, index) => (
              <li key={index}>
                <button 
                  onClick={() => handleLinkClick(link.href)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </FooterSection>

        <FooterSection title="Legal">
          <ul className="space-y-3">
            {legalLinks.map((link, index) => (
              <li key={index}>
                <button 
                  onClick={() => handleLinkClick(link.href)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </FooterSection>
      </div>
    </div>
  );
};

export default FooterLinks;
