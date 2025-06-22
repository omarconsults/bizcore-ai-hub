import React from 'react';
import { Mail, Phone, MapPin, X, Linkedin, Facebook, Instagram } from 'lucide-react';

const CompanyInfo = () => {
  const socialLinks = [
    { icon: X, href: 'https://x.com/bizcoreX', label: 'X (Twitter)' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/bizcore-os/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/bizcoreai/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/bizcore.site/', label: 'Instagram' },
  ];

  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <img src="/lovable-uploads/6a0e5efd-2366-477b-8fd2-53d719319ed6.png" alt="BizCore Logo" className="h-8 w-auto mb-4" />
        <p className="text-gray-300 leading-relaxed mb-6">
          The complete AI-powered business operating system that helps Nigerian entrepreneurs 
          launch, manage, and scale compliant businesses faster than ever before.
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-300">
          <Mail size={18} className="text-emerald-400" />
          <span>Contact@obizcore.site</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <Phone size={18} className="text-emerald-400" />
          <span>+2349066414474</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <MapPin size={18} className="text-emerald-400" />
          <span>Plot 34, Victoria Island, Lagos, Nigeria</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            aria-label={social.label}
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfo;
