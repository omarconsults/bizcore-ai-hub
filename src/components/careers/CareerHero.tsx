
import React from 'react';
import { Users, MapPin, Heart } from 'lucide-react';

const CareerHero = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Join Our Mission</h1>
        <p className="text-xl text-emerald-100 mb-8">
          Help us build the future of business automation for Nigerian entrepreneurs
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-emerald-200">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <span>50+ Team Members</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <span>Lagos & Remote</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={20} />
            <span>Mission-Driven</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHero;
