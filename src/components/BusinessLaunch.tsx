
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Shield,
  CreditCard,
  Clock
} from 'lucide-react';

const BusinessLaunch = () => {
  const [selectedEntityType, setSelectedEntityType] = useState('');

  const entityTypes = [
    {
      type: 'Sole Proprietorship',
      description: 'Simple structure for individual business owners',
      pros: ['Easy to set up', 'Complete control', 'Simple taxation'],
      cons: ['Unlimited liability', 'Limited funding options'],
      bestFor: 'Freelancers, consultants, small traders',
      cost: '₦15,000 - ₦30,000'
    },
    {
      type: 'Limited Liability Company (LLC)',
      description: 'Most popular choice for growing businesses',
      pros: ['Limited liability', 'Professional credibility', 'Easy to raise funds'],
      cons: ['More paperwork', 'Higher costs', 'Annual filings required'],
      bestFor: 'Startups, SMEs, businesses seeking investment',
      cost: '₦50,000 - ₦100,000'
    },
    {
      type: 'Partnership',
      description: 'Shared ownership and responsibilities',
      pros: ['Shared costs', 'Combined expertise', 'Shared liability'],
      cons: ['Potential conflicts', 'Joint liability', 'Profit sharing'],
      bestFor: 'Professional services, joint ventures',
      cost: '₦25,000 - ₦50,000'
    }
  ];

  const launchSteps = [
    { 
      step: 'Business Name Search & Reservation', 
      status: 'completed', 
      description: 'Check availability and reserve your business name',
      timeframe: '1-2 days'
    },
    { 
      step: 'Prepare Incorporation Documents', 
      status: 'in-progress', 
      description: 'Memorandum and Articles of Association',
      timeframe: '2-3 days'
    },
    { 
      step: 'CAC Registration & Certificate', 
      status: 'pending', 
      description: 'Submit documents and pay registration fees',
      timeframe: '5-10 days'
    },
    { 
      step: 'Tax Identification Number (TIN)', 
      status: 'pending', 
      description: 'Register with Federal Inland Revenue Service',
      timeframe: '3-5 days'
    },
    { 
      step: 'Open Corporate Bank Account', 
      status: 'pending', 
      description: 'Choose bank and complete account opening',
      timeframe: '1-3 days'
    },
    { 
      step: 'Business Permits & Licenses', 
      status: 'pending', 
      description: 'Industry-specific licenses and permits',
      timeframe: '1-4 weeks'
    }
  ];

  const completedSteps = launchSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / launchSteps.length) * 100;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building className="text-blue-900" size={28} />
              Business Launch Toolkit
            </h1>
            <p className="text-gray-600 mt-1">Get your business legally registered and compliant in Nigeria</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-lg font-semibold text-emerald-600">{Math.round(progressPercentage)}%</div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Entity Type Advisor */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader>
              <CardTitle>Choose Your Business Structure</CardTitle>
              <p className="text-gray-600">Select the entity type that best fits your business goals</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {entityTypes.map((entity, index) => (
                <div 
                  key={index}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedEntityType === entity.type 
                      ? 'border-blue-900 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedEntityType(entity.type)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{entity.type}</h3>
                      <p className="text-sm text-gray-600 mt-1">{entity.description}</p>
                      
                      <div className="mt-3 grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-emerald-600">Pros:</h4>
                          <ul className="text-sm text-gray-600 mt-1">
                            {entity.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-red-600">Cons:</h4>
                          <ul className="text-sm text-gray-600 mt-1">
                            {entity.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Best for: </span>
                          <span className="text-sm font-medium text-gray-700">{entity.bestFor}</span>
                        </div>
                        <div className="text-sm font-semibold text-blue-900">{entity.cost}</div>
                      </div>
                    </div>
                    
                    {selectedEntityType === entity.type && (
                      <CheckCircle className="text-blue-900 ml-4" size={24} />
                    )}
                  </div>
                </div>
              ))}
              
              {selectedEntityType && (
                <Button className="w-full bg-blue-900 hover:bg-blue-800">
                  Continue with {selectedEntityType}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Launch Steps */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Business Registration Steps</CardTitle>
              <p className="text-gray-600">Complete these steps to get your business fully registered</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {launchSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {step.status === 'completed' ? (
                      <CheckCircle className="text-emerald-600" size={20} />
                    ) : step.status === 'in-progress' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{step.step}</h3>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock size={14} />
                        {step.timeframe}
                      </div>
                      {step.status === 'in-progress' && (
                        <Button size="sm" variant="outline">
                          Continue
                        </Button>
                      )}
                      {step.status === 'pending' && (
                        <Button size="sm" variant="ghost" className="text-gray-400">
                          Pending
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Resources */}
        <div className="space-y-6">
          {/* CAC Quick Start */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-blue-900" size={20} />
                CAC Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Start CAC Registration
              </Button>
              <Button variant="outline" className="w-full">
                Check Name Availability
              </Button>
              <Button variant="outline" className="w-full">
                Download Forms
              </Button>
            </CardContent>
          </Card>

          {/* Cost Calculator */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="text-blue-900" size={20} />
                Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name search</span>
                <span className="text-sm font-medium">₦500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">CAC registration</span>
                <span className="text-sm font-medium">₦10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Legal documents</span>
                <span className="text-sm font-medium">₦25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Stamp duties</span>
                <span className="text-sm font-medium">₦15,000</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total Estimated</span>
                <span className="text-blue-900">₦50,500</span>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Reminder */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-emerald-600" size={20} />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                After registration, you'll need to maintain compliance with annual filings and tax obligations.
              </p>
              <Button variant="outline" className="w-full">
                Set Up Compliance Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessLaunch;
