
import React from 'react';
import { Shield, Zap, Star } from 'lucide-react';

const PricingGuarantees = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Guarantees</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-emerald-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Tokens Never Expire</h3>
            <p className="text-gray-600">Your tokens remain available until you use them - no monthly resets</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-blue-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Instant Top-ups</h3>
            <p className="text-gray-600">Buy more tokens anytime and start using them immediately</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-yellow-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">Know exactly what each AI feature costs before you use it</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingGuarantees;
