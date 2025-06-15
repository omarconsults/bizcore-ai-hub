
import React from 'react';

const LandingFeatures = () => {
  const features = [
    {
      title: "Lightning-Fast Business Setup",
      description: "Complete CAC registration, TIN application, and business permits in 48-72 hours. Our AI handles all paperwork, compliance checks, and government submissions automatically.",
      icon: "⚡",
      stats: "48hrs avg setup",
      highlight: "10x faster than traditional methods",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "Bulletproof Compliance Automation",
      description: "Never miss a deadline again. Automated NDPR compliance, tax filing reminders, license renewals, and regulatory updates tailored to your business type and location.",
      icon: "🛡️",
      stats: "99.8% compliance rate",
      highlight: "Zero violations in 2024",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Intelligent Financial Management",
      description: "AI-powered invoicing with payment tracking, automated bookkeeping with bank sync, expense categorization, and real-time financial insights and forecasting.",
      icon: "📊",
      stats: "₦2.5B+ processed",
      highlight: "Save 15 hours/week on finances",
      gradient: "from-emerald-500/20 to-green-500/20"
    },
    {
      title: "Complete HR & Team Management",
      description: "Digital employment contracts, automated payroll with tax calculations, performance tracking, leave management, and NSITF/pension compliance.",
      icon: "👥",
      stats: "25K+ employees managed",
      highlight: "Reduce HR costs by 60%",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Growth-Focused Marketing Suite",
      description: "AI content creation for Nigerian markets, social media automation, email campaigns, customer insights, and performance analytics to scale your business.",
      icon: "🚀",
      stats: "300% avg growth boost",
      highlight: "Nigerian market expertise built-in",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
      title: "Expert Knowledge & Support",
      description: "Access to legal templates, business guides, Nigerian tax advisors, regulatory updates, and 24/7 expert support from business professionals.",
      icon: "🎓",
      stats: "500+ templates available",
      highlight: "Expert guidance included",
      gradient: "from-teal-500/20 to-emerald-500/20"
    }
  ];

  const testimonials = [
    {
      quote: "BizCore handled my entire CAC registration in 2 days. What used to take weeks now happens automatically. Game changer!",
      author: "Kemi Adebayo, Lagos Fashion Designer",
      business: "KemiStyles Fashion",
      avatar: "🌟"
    },
    {
      quote: "The compliance automation alone saves me ₦200k annually in penalties and consultant fees. Worth every kobo.",
      author: "Chidi Okafor, Tech Entrepreneur",
      business: "TechHub Innovations",
      avatar: "🚀"
    },
    {
      quote: "From idea to fully registered business in 3 days. My revenue is up 180% since using BizCore's growth tools.",
      author: "Aisha Mohammed, Food Business",
      business: "Aisha's Kitchen",
      avatar: "✨"
    }
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-sm text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-500/30">
            Trusted by 15,000+ Nigerian Businesses
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Everything Your Business Needs to 
            <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Succeed in Nigeria
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            From business registration to growth optimization, BizCore's AI-powered platform handles every aspect of running a compliant, profitable Nigerian business. 
            <span className="text-white font-semibold"> See why thousands choose us over traditional consultants.</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className={`group relative bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-300 mb-8 leading-relaxed group-hover:text-slate-200 transition-colors">{feature.description}</p>
                <div className="border-t border-white/20 pt-6">
                  <div className="text-sm font-semibold text-emerald-400 mb-2">{feature.stats}</div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{feature.highlight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-md rounded-3xl p-8 lg:p-16 border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 rounded-3xl"></div>
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">Real Success Stories from Real Entrepreneurs</h3>
              <p className="text-xl text-slate-300">See how BizCore transformed these Nigerian businesses</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div className="flex text-yellow-400 text-xl">
                      {"⭐".repeat(5)}
                    </div>
                  </div>
                  <blockquote className="text-lg mb-8 leading-relaxed text-slate-300 group-hover:text-white transition-colors">"{testimonial.quote}"</blockquote>
                  <div className="border-t border-white/20 pt-6">
                    <div className="font-semibold text-white text-lg">{testimonial.author}</div>
                    <div className="text-slate-400 text-sm mt-1">{testimonial.business}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
