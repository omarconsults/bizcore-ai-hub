
import React from 'react';
import CompanyInfo from './footer/CompanyInfo';
import FooterLinks from './footer/FooterLinks';
import NewsletterSignup from './footer/NewsletterSignup';
import BottomBar from './footer/BottomBar';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <CompanyInfo />
            </div>
            
            {/* Footer Links - Takes up 3 columns */}
            <div className="lg:col-span-3">
              <FooterLinks />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <NewsletterSignup />
        
        {/* Bottom Bar */}
        <BottomBar />
      </div>
    </footer>
  );
};

export default Footer;
