import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  DollarSign,
  Users,
  Target,
  ArrowRight,
  Building,
  MapPin,
  Phone,
  Mail,
  ListChecks,
  Clock,
  FileText,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true); // For new users
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  
  const businessName = user?.user_metadata?.business_name || 'Your Business';
  const isNewUser = !user?.user_metadata?.onboarding_completed;

  // Onboarding questions component
  const OnboardingFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
      businessType: '',
      industry: '',
      location: '',
      phone: '',
      goals: []
    });

    const steps = [
      {
        title: "Welcome to BizCore!",
        subtitle: `Let's set up ${businessName} for success`,
        content: (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Building className="w-10 h-10 text-emerald-600" />
            </div>
            <p className="text-gray-600 text-lg">
              We'll ask you a few quick questions to personalize your experience and help you get started.
            </p>
            <p className="text-sm text-gray-500">This will take about 2 minutes</p>
          </div>
        )
      },
      {
        title: "What type of business are you running?",
        subtitle: "This helps us customize your experience",
        content: (
          <div className="space-y-4">
            {[
              'Limited Liability Company (LLC)',
              'Private Limited Company (Ltd)',
              'Partnership',
              'Sole Proprietorship',
              'NGO/Non-Profit',
              'Other'
            ].map((type) => (
              <button
                key={type}
                onClick={() => setFormData({...formData, businessType: type})}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  formData.businessType === type 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )
      },
      {
        title: "What industry are you in?",
        subtitle: "We'll provide relevant compliance and growth guidance",
        content: (
          <div className="space-y-4">
            {[
              'Technology & Software',
              'E-commerce & Retail',
              'Fashion & Lifestyle',
              'Food & Beverage',
              'Healthcare',
              'Education',
              'Professional Services',
              'Manufacturing',
              'Other'
            ].map((industry) => (
              <button
                key={industry}
                onClick={() => setFormData({...formData, industry})}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  formData.industry === industry 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        )
      },
      {
        title: "What are your main goals?",
        subtitle: "Select all that apply - we'll prioritize these areas",
        content: (
          <div className="space-y-4">
            {[
              'Register my business with CAC',
              'Get proper licenses and permits',
              'Set up accounting and bookkeeping',
              'Hire and manage employees',
              'Create marketing campaigns',
              'Ensure compliance with regulations',
              'Scale and grow revenue',
              'Manage cash flow'
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  const goals = formData.goals.includes(goal)
                    ? formData.goals.filter(g => g !== goal)
                    : [...formData.goals, goal];
                  setFormData({...formData, goals});
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  formData.goals.includes(goal)
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  {goal}
                  {formData.goals.includes(goal) && (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )
      }
    ];

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete onboarding
        console.log('Onboarding completed with data:', formData);
        setShowOnboarding(false);
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    const canProceed = () => {
      switch (currentStep) {
        case 0: return true;
        case 1: return formData.businessType !== '';
        case 2: return formData.industry !== '';
        case 3: return formData.goals.length > 0;
        default: return true;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index <= currentStep ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <CardTitle className="text-2xl text-gray-900">
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-gray-600 mt-2">{steps[currentStep].subtitle}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                {steps[currentStep].content}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="px-6"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-6 bg-emerald-600 hover:bg-emerald-700"
                >
                  {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Show onboarding for new users
  if (showOnboarding && isNewUser) {
    return <OnboardingFlow />;
  }

  const toggleChecklistItem = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Business Setup Checklist
  const setupChecklist = [
    {
      id: 'cac-registration',
      title: 'CAC Business Registration',
      description: 'Complete your business registration with CAC',
      status: 'completed',
      category: 'Legal',
      priority: 'high'
    },
    {
      id: 'tin-registration',
      title: 'Tax Identification Number',
      description: 'Register for TIN with FIRS',
      status: 'completed',
      category: 'Tax',
      priority: 'high'
    },
    {
      id: 'bank-account',
      title: 'Corporate Bank Account',
      description: 'Open a business bank account',
      status: 'in-progress',
      category: 'Banking',
      priority: 'high'
    },
    {
      id: 'business-permits',
      title: 'Business Permits & Licenses',
      description: 'Obtain industry-specific permits',
      status: 'pending',
      category: 'Legal',
      priority: 'medium'
    }
  ];

  // Ongoing Compliance Checklist
  const complianceChecklist = [
    {
      id: 'monthly-tax',
      title: 'Monthly Tax Returns',
      description: 'Submit VAT and WHT returns',
      dueDate: 'Next: Jan 21, 2024',
      frequency: 'Monthly',
      category: 'Tax',
      priority: 'high'
    },
    {
      id: 'annual-returns',
      title: 'Annual Returns Filing',
      description: 'File annual returns with CAC',
      dueDate: 'Due: Mar 31, 2024',
      frequency: 'Annually',
      category: 'Legal',
      priority: 'medium'
    },
    {
      id: 'ndpr-renewal',
      title: 'NDPR Compliance Review',
      description: 'Review and update data protection policies',
      dueDate: 'Due: Feb 15, 2024',
      frequency: 'Annually',
      category: 'Privacy',
      priority: 'medium'
    },
    {
      id: 'financial-audit',
      title: 'Financial Audit Preparation',
      description: 'Prepare documents for annual audit',
      dueDate: 'Due: Apr 30, 2024',
      frequency: 'Annually',
      category: 'Finance',
      priority: 'low'
    }
  ];

  // Growth & Operations Checklist
  const growthChecklist = [
    {
      id: 'marketing-plan',
      title: 'Q1 Marketing Plan',
      description: 'Develop marketing strategy for next quarter',
      isChecked: checkedItems.includes('marketing-plan'),
      category: 'Marketing'
    },
    {
      id: 'inventory-review',
      title: 'Inventory Management Review',
      description: 'Optimize inventory levels and processes',
      isChecked: checkedItems.includes('inventory-review'),
      category: 'Operations'
    },
    {
      id: 'team-hiring',
      title: 'Hire Customer Service Rep',
      description: 'Recruit and onboard new team member',
      isChecked: checkedItems.includes('team-hiring'),
      category: 'HR'
    },
    {
      id: 'financial-planning',
      title: 'Q2 Budget Planning',
      description: 'Create budget and financial projections',
      isChecked: checkedItems.includes('financial-planning'),
      category: 'Finance'
    }
  ];

  // Quick Stats
  const quickStats = [
    { title: 'Monthly Revenue', value: '₦2.4M', change: '+12%', icon: DollarSign, positive: true },
    { title: 'Active Customers', value: '156', change: '+8%', icon: Users, positive: true },
    { title: 'Compliance Score', value: '92%', change: '+5%', icon: CheckCircle, positive: true },
    { title: 'Growth Target', value: '76%', change: 'On track', icon: Target, positive: true },
  ];

  // Recent Tasks
  const recentTasks = [
    { task: 'Submit monthly tax returns', due: 'Tomorrow', priority: 'high', status: 'pending' },
    { task: 'Renew NDPR compliance certificate', due: '3 days', priority: 'medium', status: 'pending' },
    { task: 'Update employee contracts', due: '1 week', priority: 'low', status: 'pending' },
    { task: 'Review quarterly financials', due: '2 weeks', priority: 'medium', status: 'pending' },
  ];

  // AI Insights
  const aiSuggestions = [
    "Your cash flow looks strong this month. Consider investing in inventory for the peak season.",
    "NDPR renewal is due soon. I can help prepare the required documents.",
    "You're hiring fast! Let's set up proper onboarding workflows."
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with {businessName} today</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">March 15, 2024</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Monthly Revenue', value: '₦2.4M', change: '+12%', icon: DollarSign, positive: true },
          { title: 'Active Customers', value: '156', change: '+8%', icon: Users, positive: true },
          { title: 'Compliance Score', value: '92%', change: '+5%', icon: CheckCircle, positive: true },
          { title: 'Growth Target', value: '76%', change: 'On track', icon: Target, positive: true },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.positive ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  <stat.icon className={stat.positive ? 'text-emerald-600' : 'text-red-600'} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Business Setup Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="text-blue-900" size={20} />
                Business Setup Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {setupChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'completed' ? 'bg-emerald-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.category === 'Legal' ? 'bg-purple-100 text-purple-600' :
                          item.category === 'Tax' ? 'bg-red-100 text-red-600' :
                          item.category === 'Banking' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-600' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {item.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  {item.status === 'completed' ? (
                    <CheckCircle className="text-emerald-600" size={20} />
                  ) : (
                    <Button size="sm" variant="outline">
                      {item.status === 'in-progress' ? 'Continue' : 'Start'}
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Checklist */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-emerald-600" size={20} />
                Compliance & Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="text-gray-400" size={16} />
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{item.dueDate}</span>
                        <span className="text-xs text-gray-500">• {item.frequency}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.category === 'Tax' ? 'bg-red-100 text-red-600' :
                          item.category === 'Legal' ? 'bg-purple-100 text-purple-600' :
                          item.category === 'Privacy' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Growth & Operations Checklist */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="text-blue-600" size={20} />
                Growth & Operations Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {growthChecklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${item.isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.title}
                    </p>
                    <p className={`text-sm ${item.isChecked ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.category === 'Marketing' ? 'bg-pink-100 text-pink-600' :
                    item.category === 'Operations' ? 'bg-orange-100 text-orange-600' :
                    item.category === 'HR' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.category}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Insights & Compliance Status */}
        <div>
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-emerald-600" size={20} />
                AI Business Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Your cash flow looks strong this month. Consider investing in inventory for the peak season.",
                "NDPR renewal is due soon. I can help prepare the required documents.",
                "You're hiring fast! Let's set up proper onboarding workflows."
              ].map((suggestion, index) => (
                <div key={index} className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-gray-700">{suggestion}</p>
                  <Button size="sm" variant="ghost" className="mt-2 text-emerald-600 hover:text-emerald-700">
                    Learn more
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-emerald-600" size={20} />
                Compliance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Overall Score</span>
                    <span className="text-sm font-medium text-emerald-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">CAC Registration</span>
                    <CheckCircle className="text-emerald-600" size={16} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Tax Compliance</span>
                    <CheckCircle className="text-emerald-600" size={16} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">NDPR Status</span>
                    <AlertCircle className="text-yellow-500" size={16} />
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
                  Fix Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
