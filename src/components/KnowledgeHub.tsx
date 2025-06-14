
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Search, 
  FileText, 
  Video, 
  Download,
  Clock,
  Star,
  PlayCircle,
  CheckCircle
} from 'lucide-react';

const KnowledgeHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 45 },
    { id: 'compliance', name: 'Compliance & Legal', count: 12 },
    { id: 'finance', name: 'Finance & Tax', count: 10 },
    { id: 'hr', name: 'HR & Employment', count: 8 },
    { id: 'marketing', name: 'Marketing & Sales', count: 9 },
    { id: 'operations', name: 'Operations', count: 6 }
  ];

  const featuredResources = [
    {
      title: 'Complete Guide to CAC Business Registration',
      type: 'guide',
      category: 'compliance',
      duration: '15 min read',
      rating: 4.9,
      description: 'Step-by-step guide to registering your business with the Corporate Affairs Commission',
      tags: ['CAC', 'Registration', 'Legal'],
      featured: true
    },
    {
      title: 'Understanding Nigerian Tax Obligations',
      type: 'video',
      category: 'finance',
      duration: '22 min watch',
      rating: 4.8,
      description: 'Comprehensive overview of tax requirements for Nigerian businesses',
      tags: ['Tax', 'FIRS', 'Compliance'],
      featured: true
    },
    {
      title: 'NDPR Compliance Checklist',
      type: 'template',
      category: 'compliance',
      duration: '5 min read',
      rating: 4.7,
      description: 'Essential checklist to ensure your business complies with data protection laws',
      tags: ['NDPR', 'Data Protection', 'Privacy'],
      featured: true
    }
  ];

  const allResources = [
    {
      title: 'Employment Contract Templates',
      type: 'template',
      category: 'hr',
      duration: 'Download',
      description: 'Ready-to-use employment contract templates for Nigerian businesses',
      tags: ['HR', 'Contracts', 'Employment']
    },
    {
      title: 'Bookkeeping Best Practices',
      type: 'guide',
      category: 'finance',
      duration: '12 min read',
      description: 'Essential bookkeeping practices for small business owners',
      tags: ['Bookkeeping', 'Finance', 'Records']
    },
    {
      title: 'Social Media Marketing for Nigerian Businesses',
      type: 'course',
      category: 'marketing',
      duration: '45 min course',
      description: 'Learn effective social media strategies for the Nigerian market',
      tags: ['Social Media', 'Marketing', 'Digital']
    },
    {
      title: 'VAT Registration and Compliance',
      type: 'guide',
      category: 'finance',
      duration: '10 min read',
      description: 'When and how to register for VAT in Nigeria',
      tags: ['VAT', 'Tax', 'Registration']
    },
    {
      title: 'Payroll Management Template',
      type: 'template',
      category: 'hr',
      duration: 'Download',
      description: 'Excel template for managing employee payroll and deductions',
      tags: ['Payroll', 'HR', 'Templates']
    },
    {
      title: 'Business Plan Template',
      type: 'template',
      category: 'operations',
      duration: 'Download',
      description: 'Comprehensive business plan template for Nigerian startups',
      tags: ['Business Plan', 'Strategy', 'Template']
    }
  ];

  const learningTracks = [
    {
      title: 'New Business Owner Essentials',
      description: 'Everything you need to know to start and run your business legally',
      lessons: 8,
      duration: '2 hours',
      level: 'Beginner',
      progress: 0
    },
    {
      title: 'Tax Compliance Mastery',
      description: 'Master Nigerian tax requirements and stay compliant',
      lessons: 6,
      duration: '1.5 hours',
      level: 'Intermediate',
      progress: 33
    },
    {
      title: 'HR and Employment Law',
      description: 'Navigate employment laws and build strong HR practices',
      lessons: 10,
      duration: '3 hours',
      level: 'Advanced',
      progress: 75
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <PlayCircle className="text-blue-600" size={16} />;
      case 'template': return <Download className="text-emerald-600" size={16} />;
      case 'guide': return <FileText className="text-purple-600" size={16} />;
      case 'course': return <BookOpen className="text-orange-600" size={16} />;
      default: return <FileText className="text-gray-600" size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'template': return 'bg-emerald-100 text-emerald-800';
      case 'guide': return 'bg-purple-100 text-purple-800';
      case 'course': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="text-blue-900" size={28} />
              Knowledge Hub
            </h1>
            <p className="text-gray-600 mt-1">Learn, grow, and stay compliant with our comprehensive resources</p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guides, templates, videos..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Resources */}
          {activeCategory === 'all' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
              <div className="grid gap-6">
                {featuredResources.map((resource, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            {getTypeIcon(resource.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                              <p className="text-gray-600 mb-3">{resource.description}</p>
                              
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600">{resource.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star size={14} className="text-yellow-500" />
                                  <span className="text-sm text-gray-600">{resource.rating}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Badge className={getTypeColor(resource.type)}>
                                  {resource.type}
                                </Badge>
                                {resource.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <Button className="bg-blue-900 hover:bg-blue-800">
                              {resource.type === 'template' ? 'Download' : 
                               resource.type === 'video' ? 'Watch' : 'Read'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Resources */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="grid gap-4">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="border border-gray-200 hover:border-blue-900 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(resource.type)}
                        <div>
                          <h3 className="font-medium text-gray-900">{resource.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getTypeColor(resource.type)}>
                              {resource.type}
                            </Badge>
                            <span className="text-xs text-gray-500">{resource.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Access
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Tracks */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Learning Tracks</CardTitle>
              <p className="text-sm text-gray-600">Structured learning paths for your business journey</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningTracks.map((track, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{track.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{track.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{track.lessons} lessons • {track.duration}</span>
                      <Badge variant="outline">{track.level}</Badge>
                    </div>
                    
                    {track.progress > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-emerald-600">{track.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full" 
                            style={{ width: `${track.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <Button size="sm" className="w-full mt-3 bg-blue-900 hover:bg-blue-800">
                      {track.progress > 0 ? 'Continue' : 'Start Track'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2" size={16} />
                Document Templates
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PlayCircle className="mr-2" size={16} />
                Video Tutorials
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="mr-2" size={16} />
                Compliance Checklists
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2" size={16} />
                Legal Guides
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
