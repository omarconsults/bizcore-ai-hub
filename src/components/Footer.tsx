
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
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-8">
            <CompanyInfo />
            <FooterLinks />
          </div>
        </div>

        <NewsletterSignup />
        <BottomBar />
      </div>
    </footer>
  );
};

export default Footer;
