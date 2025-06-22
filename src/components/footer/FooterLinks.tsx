
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '/about#success-stories' },
    { name: 'Careers', href: '/careers' },
  ];

  const productLinks = [
    { name: 'Business Registration', module: 'dashboard' },
    { name: 'Compliance Management', module: 'compliance' },
    { name: 'Financial Tools', module: 'operations' },
    { name: 'HR Management', module: 'team' },
    { name: 'Marketing Suite', module: 'marketing' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Support', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'NDPR Compliance', href: '/ndpr' },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Company Links */}
      <FooterSection title="Company">
        <ul className="space-y-3">
          {companyLinks.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.href}
                className="text-gray-300 hover:text-emerald-400 transition-colors text-left text-sm block"
              >
                {link.name}
              </Link>
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
                className="text-gray-300 hover:text-emerald-400 transition-colors text-left text-sm"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </FooterSection>

      {/* Support */}
      <FooterSection title="Support">
        <ul className="space-y-3">
          {supportLinks.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.href}
                className="text-gray-300 hover:text-emerald-400 transition-colors text-left text-sm block"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </FooterSection>

      {/* Legal */}
      <FooterSection title="Legal">
        <ul className="space-y-3">
          {legalLinks.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.href}
                className="text-gray-300 hover:text-emerald-400 transition-colors text-left text-sm block"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </FooterSection>
    </div>
  );
};

export default FooterLinks;
