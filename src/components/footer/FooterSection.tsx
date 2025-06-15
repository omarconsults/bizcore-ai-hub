
import React from 'react';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => {
  return (
    <div>
      <h4 className="font-semibold text-white mb-4">{title}</h4>
      {children}
    </div>
  );
};

export default FooterSection;
