
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Star, 
  Calendar, 
  DollarSign,
  ExternalLink,
  Filter,
  Search,
  MapPin,
  Building,
  Award,
  Clock,
  Target,
  CheckCircle
} from 'lucide-react';

const GrantAlerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const opportunities = [
    {
      id: 1,
      title: 'Tony Elumelu Foundation Entrepreneurship Programme',
      organization: 'Tony Elumelu Foundation',
      amount: '$5,000',
      deadline: '2024-04-15',
      type: 'Grant',
      stage: 'Early Stage',
      location: 'Nigeria',
      match: 95,
      description: 'Annual programme supporting African entrepreneurs with funding, mentorship, and networking.',
      requirements: ['Business plan', 'Below 30 years', 'African entrepreneur'],
      status: 'open',
      applied: false
    },
    {
      id: 2,
      title: 'Lagos State Employment Trust Fund (LSETF)',
      organization: 'Lagos State Government',
      amount: '₦500,000 - ₦5M',
      deadline: '2024-03-30',
      type: 'Loan',
      stage: 'SME',
      location: 'Lagos',
      match: 88,
      description: 'Low-interest loans for micro, small and medium enterprises in Lagos State.',
      requirements: ['Lagos resident', 'Registered business', 'Business plan'],
      status: 'open',
      applied: true
    },
    {
      id: 3,
      title: 'Google for Startups Black Founders Fund',
      organization: 'Google',
      amount: '$50,000 - $100,000',
      deadline: '2024-05-20',
      type: 'Equity',
      stage: 'Seed',
      location: 'Africa',
      match: 82,
      description: 'Non-dilutive funding for Black-led startups building scalable tech solutions.',
      requirements: ['Black founder', 'Tech startup', 'Scalable solution'],
      status: 'open',
      applied: false
    },
    {
      id: 4,
      title: 'Bank of Industry Youth Entrepreneurship Support',
      organization: 'Bank of Industry',
      amount: '₦1M - ₦10M',
      deadline: '2024-04-10',
      type: 'Loan',
      stage: 'Growth',
      location: 'Nigeria',
      match: 76,
      description: 'Support for youth-led enterprises with growth potential.',
      requirements: ['18-35 years', 'Nigerian', 'Growth-stage business'],
      status: 'closing-soon',
      applied: false
    },
    {
      id: 5,
      title: 'Africa Business Heroes Competition',
      organization: 'Jack Ma Foundation',
      amount: '$1.5M Prize Pool',
      deadline: '2024-06-15',
      type: 'Competition',
      stage: 'Growth',
      location: 'Africa',
      match: 91,
      description: 'Annual competition supporting African entrepreneurs building sustainable businesses.',
      requirements: ['African business', 'Revenue generating', 'Social impact'],
      status: 'open',
      applied: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Opportunities', count: opportunities.length },
    { id: 'grant', label: 'Grants', count: opportunities.filter(o => o.type === 'Grant').length },
    { id: 'loan', label: 'Loans', count: opportunities.filter(o => o.type === 'Loan').length },
    { id: 'equity', label: 'Equity', count: opportunities.filter(o => o.type === 'Equity').length },
    { id: 'applied', label: 'Applied', count: opportunities.filter(o => o.applied).length }
  ];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         opportunity.type.toLowerCase() === selectedFilter ||
                         (selectedFilter === 'applied' && opportunity.applied);
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'closing-soon': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Grant': return 'bg-emerald-100 text-emerald-700';
      case 'Loan': return 'bg-blue-100 text-blue-700';
      case 'Equity': return 'bg-purple-100 text-purple-700';
      case 'Competition': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Grant & Investor Alerts</h3>
          <p className="text-gray-600">Discover funding opportunities tailored to your business</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter size={16} className="mr-2" />
            Preferences
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Bell size={16} className="mr-2" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search funding opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(filter.id)}
                  className="whitespace-nowrap"
                >
                  {filter.label} ({filter.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opportunity) => {
          const daysLeft = calculateDaysLeft(opportunity.deadline);
          
          return (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{opportunity.title}</h4>
                        <p className="text-gray-600 text-sm">{opportunity.organization}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="text-yellow-500" size={16} />
                        <span className="text-sm font-medium">{opportunity.match}% match</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm">{opportunity.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getTypeColor(opportunity.type)}>
                        {opportunity.type}
                      </Badge>
                      <Badge variant="outline">
                        <MapPin size={12} className="mr-1" />
                        {opportunity.location}
                      </Badge>
                      <Badge variant="outline">
                        <Building size={12} className="mr-1" />
                        {opportunity.stage}
                      </Badge>
                      <Badge className={getStatusColor(opportunity.status)}>
                        <Clock size={12} className="mr-1" />
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Closed'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-emerald-600" />
                          <span className="font-medium">{opportunity.amount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-blue-600" />
                          <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Requirements:</p>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 lg:w-48">
                    {opportunity.applied ? (
                      <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                        <CheckCircle size={16} className="text-emerald-600" />
                        <span className="text-sm text-emerald-700 font-medium">Applied</span>
                      </div>
                    ) : (
                      <Button 
                        className="bg-blue-900 hover:bg-blue-800"
                        disabled={daysLeft <= 0}
                      >
                        <Target size={16} className="mr-2" />
                        Apply Now
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <ExternalLink size={14} className="mr-2" />
                      View Details
                    </Button>
                    
                    {!opportunity.applied && (
                      <Button variant="ghost" size="sm">
                        <Star size={14} className="mr-2" />
                        Save for Later
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find relevant funding opportunities.
            </p>
            <Button variant="outline">
              <Filter size={16} className="mr-2" />
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GrantAlerts;
