import React from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';

const HelpCenter = () => {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using BizCore",
      articles: 8,
      icon: Book
    },
    {
      title: "Business Registration",
      description: "Complete guide to registering your business",
      articles: 12,
      icon: MessageCircle
    },
    {
      title: "Compliance & Legal",
      description: "Stay compliant with Nigerian regulations",
      articles: 15,
      icon: Book
    },
    {
      title: "Financial Management",
      description: "Manage your business finances effectively",
      articles: 10,
      icon: MessageCircle
    }
  ];

  const popularArticles = [
    "How to register a business in Nigeria",
    "Understanding CAC requirements",
    "Setting up your business compliance",
    "Creating your first invoice",
    "Managing employee records"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-emerald-100 mb-8">
            Find answers to your questions and get the most out of BizCore
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <category.icon className="text-emerald-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.articles} articles</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">{article}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Need More Help?</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <MessageCircle className="text-emerald-600 mb-3" size={24} />
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">Chat with our support team</p>
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Mail className="text-emerald-600 mb-3" size={24} />
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Get help via email</p>
                <button className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Send Email
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Phone className="text-emerald-600 mb-3" size={24} />
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-4">+234 (0) 800 BIZCORE</p>
                <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM WAT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
