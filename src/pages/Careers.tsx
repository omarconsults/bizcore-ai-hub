
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareerHero from '@/components/careers/CareerHero';
import CareerValues from '@/components/careers/CareerValues';
import CareerOpenRoles from '@/components/careers/CareerOpenRoles';
import CareerBenefits from '@/components/careers/CareerBenefits';
import CareerCTA from '@/components/careers/CareerCTA';

const Careers = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={handleAuthClick} />
      <CareerHero />
      <CareerValues />
      <CareerOpenRoles />
      <CareerBenefits />
      <CareerCTA />
      <Footer />
    </div>
  );
};

export default Careers;
