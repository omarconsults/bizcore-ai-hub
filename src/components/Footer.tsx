
import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press Kit', href: '#press' },
  ];

  const productLinks = [
    { name: 'Business Registration', href: '#registration' },
    { name: 'Compliance Management', href: '#compliance' },
    { name: 'Financial Tools', href: '#finance' },
    { name: 'HR Management', href: '#hr' },
    { name: 'Marketing Suite', href: '#marketing' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'API Documentation', href: '#api' },
    { name: 'Video Tutorials', href: '#tutorials' },
    { name: 'Contact Support', href: '#support' },
    { name: 'System Status', href: '#status' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'NDPR Compliance', href: '#ndpr' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Facebook, href: '#facebook', label: 'Facebook' },
    { icon: Instagram, href: '#instagram', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-8">
            {/* Company Info */}
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

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-3">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3 mb-6">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">Get the latest Nigerian business insights and platform updates</p>
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} BizCore. All rights reserved. Built with ❤️ for Nigerian entrepreneurs.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                All systems operational
              </span>
              <span>SOC 2 Compliant</span>
              <span>NDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
