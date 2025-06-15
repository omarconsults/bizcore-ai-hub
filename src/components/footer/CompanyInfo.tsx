
import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const CompanyInfo = () => {
  const socialLinks = [
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Facebook, href: '#facebook', label: 'Facebook' },
    { icon: Instagram, href: '#instagram', label: 'Instagram' },
  ];

  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">BizCore</h3>
        <p className="text-blue-200 text-sm font-medium mb-4">Powered by AI • Built for Nigeria</p>
        <p className="text-gray-300 leading-relaxed mb-6">
          The complete AI-powered business operating system that helps Nigerian entrepreneurs 
          launch, manage, and scale compliant businesses faster than ever before.
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-300">
          <Mail size={18} className="text-emerald-400" />
          <span>hello@bizcore.ng</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <Phone size={18} className="text-emerald-400" />
          <span>+234 (0) 800 BIZCORE</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <MapPin size={18} className="text-emerald-400" />
          <span>Lagos, Nigeria</span>
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
