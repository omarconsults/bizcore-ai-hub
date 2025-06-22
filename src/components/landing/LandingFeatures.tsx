import React from 'react';

const LandingFeatures = () => {
  const features = [
    {
      title: "Lightning-Fast Business Setup",
      description: "Complete CAC registration, TIN application, and business permits in 5-7 days. Our AI handles all paperwork, compliance checks, and government submissions automatically.",
      icon: "⚡",
      stats: "72hrs avg setup",
      highlight: "10x faster than traditional methods",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Bulletproof Compliance Automation",
      description: "Never miss a deadline again. Automated NDPR compliance, tax filing reminders, license renewals, and regulatory updates tailored to your business type and location.",
      icon: "🛡️",
      stats: "99.8% compliance rate",
      highlight: "Zero violations in 2024",
      gradient: "from-violet-500/20 to-purple-500/20"
    },
    {
      title: "Intelligent Financial Management",
      description: "AI-powered invoicing with payment tracking, automated bookkeeping with bank sync, expense categorization, and real-time financial insights and forecasting.",
      icon: "📊",
      stats: "₦200M+ processed",
      highlight: "Save 15 hours/week on finances",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Complete HR & Team Management",
      description: "Digital employment contracts, automated payroll with tax calculations, performance tracking, leave management, and NSITF/pension compliance.",
      icon: "👥",
      stats: "25K+ employees managed",
      highlight: "Reduce HR costs by 60%",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      title: "Growth-Focused Marketing Suite",
      description: "AI content creation for Nigerian markets, social media automation, email campaigns, customer insights, and performance analytics to scale your business.",
      icon: "🚀",
      stats: "300% avg growth boost",
      highlight: "Nigerian market expertise built-in",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Expert Knowledge & Support",
      description: "Access to legal templates, business guides, Nigerian tax advisors, regulatory updates, and 24/7 expert support from business professionals.",
      icon: "🎓",
      stats: "500+ templates available",
      highlight: "Expert guidance included",
      gradient: "from-indigo-500/20 to-violet-500/20"
    }
  ];

  const testimonials = [
    {
      quote: "BizCore handled my entire CAC registration in 3 days. What used to take weeks now happens automatically. Game changer!",
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
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-950 relative overflow-hidden">
      {/* Enhanced background elements with animations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-violet-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        
        {/* Additional animated elements */}
        <div className="absolute top-1/2 left-1/6 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-pink-500/5 rounded-full blur-xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '10s' }}></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-violet-500/20 to-cyan-500/20 backdrop-blur-sm text-violet-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold mb-6 sm:mb-8 border border-violet-500/30">
            Trusted by 15,000+ Nigerian Businesses
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            Everything Your Business Needs to 
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Succeed in Nigeria
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            From business registration to growth optimization, BizCore's AI-powered platform handles every aspect of running a compliant, profitable Nigerian business. 
            <span className="text-white font-semibold"> See why thousands choose us over traditional consultants.</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 animate-bounce" style={{ animationDelay: `${index * 0.5}s`, animationDuration: '2s', animationIterationCount: '3' }}>{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-violet-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-300 mb-6 sm:mb-8 leading-relaxed group-hover:text-slate-200 transition-colors text-sm sm:text-base">{feature.description}</p>
                <div className="border-t border-white/20 pt-4 sm:pt-6">
                  <div className="text-sm font-semibold text-cyan-400 mb-2">{feature.stats}</div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{feature.highlight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Success Stories Section */}
        <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-16 border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 rounded-2xl sm:rounded-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          
          {/* Floating testimonial decorations */}
          <div className="absolute top-4 left-4 text-violet-400/20 text-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>💬</div>
          <div className="absolute top-4 right-4 text-cyan-400/20 text-2xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>⭐</div>
          <div className="absolute bottom-4 left-1/2 text-emerald-400/20 text-2xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '5s' }}>🎯</div>
          
          <div className="relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">Real Success Stories from Real Entrepreneurs</h3>
              <p className="text-lg sm:text-xl text-slate-300">See how BizCore transformed these Nigerian businesses</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/10 transition-all duration-300 group animate-fade-in hover:scale-105"
                  style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-2xl sm:text-3xl lg:text-4xl">{testimonial.avatar}</div>
                    <div className="flex text-yellow-400 text-base sm:text-lg lg:text-xl">
                      {"⭐".repeat(5)}
                    </div>
                  </div>
                  <blockquote className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed text-slate-300 group-hover:text-white transition-colors">"{testimonial.quote}"</blockquote>
                  <div className="border-t border-white/20 pt-4 sm:pt-6">
                    <div className="font-semibold text-white text-base sm:text-lg">{testimonial.author}</div>
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
