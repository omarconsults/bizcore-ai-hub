
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChoosePlan = (planType: string) => {
    if (user) {
      // Navigate to dashboard with plan selection
      navigate('/', { state: { selectedPlan: planType } });
    } else {
      navigate('/auth');
    }
  };

  const plans = [
    {
      name: "Starter",
      price: "₦15,000",
      period: "/month",
      description: "Perfect for new entrepreneurs and small businesses",
      popular: false,
      features: [
        "CAC Business Registration (₦45,000 value)",
        "Basic compliance monitoring",
        "Simple invoicing (up to 20/month)",
        "Email support",
        "Business bank account setup assistance",
        "Basic financial reporting",
        "Document storage (5GB)"
      ],
      oneTimeServices: [
        "Business Name Search: ₦5,000",
        "FIRS TIN Registration: ₦8,000",
        "State Business Permit: ₦12,000"
      ]
    },
    {
      name: "Professional",
      price: "₦35,000",
      period: "/month",
      description: "Ideal for growing businesses with advanced needs",
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced compliance automation (NDPR, VAT)",
        "Unlimited invoicing with payment tracking",
        "HR management suite (up to 20 employees)",
        "Priority support (24/7 chat)",
        "Advanced financial analytics",
        "Document storage (50GB)",
        "Marketing automation tools",
        "Custom business reports"
      ],
      oneTimeServices: [
        "NAFDAC Registration: ₦35,000",
        "Environmental Impact Assessment: ₦25,000",
        "Import/Export License: ₦45,000"
      ]
    },
    {
      name: "Enterprise",
      price: "₦75,000",
      period: "/month",
      description: "Comprehensive solution for established businesses",
      popular: false,
      features: [
        "Everything in Professional",
        "Unlimited employees & contractors",
        "Advanced tax optimization",
        "Dedicated account manager",
        "Custom integrations & API access",
        "White-label solutions",
        "Unlimited storage",
        "Advanced security features",
        "Custom compliance workflows",
        "Business growth consulting"
      ],
      oneTimeServices: [
        "Corporate Restructuring: ₦100,000",
        "IPO Preparation: ₦500,000",
        "International Expansion Setup: ₦200,000"
      ]
    }
  ];

  const oneTimeServices = [
    {
      category: "Business Registration",
      services: [
        { name: "Limited Liability Company", price: "₦65,000" },
        { name: "Business Name Registration", price: "₦45,000" },
        { name: "Partnership Registration", price: "₦55,000" },
        { name: "Incorporated Trustees", price: "₦75,000" }
      ]
    },
    {
      category: "Compliance & Licensing",
      services: [
        { name: "FIRS TIN Registration", price: "₦8,000" },
        { name: "VAT Registration", price: "₦12,000" },
        { name: "NAFDAC Registration", price: "₦35,000" },
        { name: "SON Certificate", price: "₦25,000" }
      ]
    },
    {
      category: "Professional Services",
      services: [
        { name: "Legal Document Drafting", price: "₦15,000" },
        { name: "Tax Advisory Session", price: "₦20,000" },
        { name: "Business Plan Creation", price: "₦50,000" },
        { name: "Compliance Audit", price: "₦40,000" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={() => navigate('/auth')} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 px-4 py-2">
            🎯 Transparent Pricing • No Hidden Fees
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Business 
            <span className="text-blue-900 block">Growth Plan</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From startup to enterprise, we have the right plan to accelerate your Nigerian business. 
            All plans include our industry-leading compliance guarantee.
          </p>
          
          <div className="flex justify-center gap-8 text-sm text-gray-600 mb-12">
            <div className="flex items-center gap-2">
              <Shield className="text-emerald-600" size={16} />
              <span>100% Compliance Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-blue-600" size={16} />
              <span>48-Hour Business Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={16} />
              <span>4.9/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Monthly Subscription Plans</h2>
            <p className="text-xl text-gray-600">Comprehensive business management with ongoing support</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-900 shadow-xl scale-105' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-900 text-white px-6 py-2">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Monthly Features</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Popular Add-On Services</h4>
                    <ul className="space-y-1">
                      {plan.oneTimeServices.map((service, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {service}</li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className={`w-full py-3 ${plan.popular ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => handleChoosePlan(plan.name.toLowerCase())}
                  >
                    Choose {plan.name}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* One-Time Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Individual Services</h2>
            <p className="text-xl text-gray-600">Pay-as-you-go services for specific business needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {oneTimeServices.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.services.map((service, idx) => (
                      <li key={idx} className="flex justify-between items-center">
                        <span className="text-gray-700">{service.name}</span>
                        <span className="font-semibold text-blue-900">{service.price}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ/Guarantees */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Guarantees</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Compliance</h3>
              <p className="text-gray-600">We handle all violations and ensure your business stays compliant</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">48-Hour Setup</h3>
              <p className="text-gray-600">Business registration completed in 48-72 hours or money back</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Expert support included in all plans with dedicated account managers</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
