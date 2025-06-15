
import React from 'react';

const LandingFeatures = () => {
  const features = [
    {
      title: "Lightning-Fast Business Setup",
      description: "Complete CAC registration, TIN application, and business permits in 48-72 hours. Our AI handles all paperwork, compliance checks, and government submissions automatically.",
      icon: "⚡",
      stats: "48hrs avg setup",
      highlight: "10x faster than traditional methods"
    },
    {
      title: "Bulletproof Compliance Automation",
      description: "Never miss a deadline again. Automated NDPR compliance, tax filing reminders, license renewals, and regulatory updates tailored to your business type and location.",
      icon: "🛡️",
      stats: "99.8% compliance rate",
      highlight: "Zero violations in 2024"
    },
    {
      title: "Intelligent Financial Management",
      description: "AI-powered invoicing with payment tracking, automated bookkeeping with bank sync, expense categorization, and real-time financial insights and forecasting.",
      icon: "📊",
      stats: "₦2.5B+ processed",
      highlight: "Save 15 hours/week on finances"
    },
    {
      title: "Complete HR & Team Management",
      description: "Digital employment contracts, automated payroll with tax calculations, performance tracking, leave management, and NSITF/pension compliance.",
      icon: "👥",
      stats: "25K+ employees managed",
      highlight: "Reduce HR costs by 60%"
    },
    {
      title: "Growth-Focused Marketing Suite",
      description: "AI content creation for Nigerian markets, social media automation, email campaigns, customer insights, and performance analytics to scale your business.",
      icon: "🚀",
      stats: "300% avg growth boost",
      highlight: "Nigerian market expertise built-in"
    },
    {
      title: "Expert Knowledge & Support",
      description: "Access to legal templates, business guides, Nigerian tax advisors, regulatory updates, and 24/7 expert support from business professionals.",
      icon: "🎓",
      stats: "500+ templates available",
      highlight: "Expert guidance included"
    }
  ];

  const testimonials = [
    {
      quote: "BizCore handled my entire CAC registration in 2 days. What used to take weeks now happens automatically. Game changer!",
      author: "Kemi Adebayo, Lagos Fashion Designer",
      business: "KemiStyles Fashion"
    },
    {
      quote: "The compliance automation alone saves me ₦200k annually in penalties and consultant fees. Worth every kobo.",
      author: "Chidi Okafor, Tech Entrepreneur",
      business: "TechHub Innovations"
    },
    {
      quote: "From idea to fully registered business in 3 days. My revenue is up 180% since using BizCore's growth tools.",
      author: "Aisha Mohammed, Food Business",
      business: "Aisha's Kitchen"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Trusted by 15,000+ Nigerian Businesses
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything Your Business Needs to 
            <span className="text-emerald-600"> Succeed in Nigeria</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From business registration to growth optimization, BizCore's AI-powered platform handles every aspect of running a compliant, profitable Nigerian business. 
            <strong className="text-gray-900"> See why thousands choose us over traditional consultants.</strong>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200">
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-semibold text-emerald-600 mb-1">{feature.stats}</div>
                <div className="text-xs text-gray-500">{feature.highlight}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-gradient-to-r from-blue-900 to-emerald-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">Real Success Stories from Real Entrepreneurs</h3>
            <p className="text-xl text-blue-100">See how BizCore transformed these Nigerian businesses</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
                <blockquote className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-blue-200 text-sm">{testimonial.business}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
