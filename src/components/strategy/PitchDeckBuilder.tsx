
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Presentation, 
  Download, 
  Eye, 
  Plus,
  Move,
  Edit,
  Copy,
  Trash2,
  Play,
  Users,
  Target,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const PitchDeckBuilder = () => {
  const [mode, setMode] = useState('templates'); // 'templates', 'builder', 'preview'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [slides, setSlides] = useState([]);

  const templates = [
    {
      id: 'startup',
      name: 'Startup Pitch',
      description: 'Perfect for early-stage startups seeking seed funding',
      slides: 10,
      color: 'blue',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'tech',
      name: 'Tech Innovation',
      description: 'Ideal for technology companies and SaaS products',
      slides: 12,
      color: 'purple',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'social-impact',
      name: 'Social Impact',
      description: 'For businesses with social or environmental mission',
      slides: 11,
      color: 'green',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Tailored for online retail and marketplace businesses',
      slides: 9,
      color: 'orange',
      preview: '/api/placeholder/300/200'
    }
  ];

  const defaultSlides = [
    { id: 1, title: 'Cover Slide', type: 'cover', content: 'Company Name & Vision' },
    { id: 2, title: 'Problem', type: 'problem', content: 'What problem are you solving?' },
    { id: 3, title: 'Solution', type: 'solution', content: 'Your unique solution' },
    { id: 4, title: 'Market Size', type: 'market', content: 'Total addressable market' },
    { id: 5, title: 'Product Demo', type: 'product', content: 'Show your product' },
    { id: 6, title: 'Business Model', type: 'business-model', content: 'How you make money' },
    { id: 7, title: 'Traction', type: 'traction', content: 'Progress and metrics' },
    { id: 8, title: 'Competition', type: 'competition', content: 'Competitive landscape' },
    { id: 9, title: 'Team', type: 'team', content: 'Meet the team' },
    { id: 10, title: 'Funding Ask', type: 'funding', content: 'Investment request' }
  ];

  const startBuilder = (template) => {
    setSelectedTemplate(template);
    setSlides(defaultSlides);
    setMode('builder');
  };

  const addSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: 'New Slide',
      type: 'custom',
      content: 'Add your content here'
    };
    setSlides([...slides, newSlide]);
  };

  const duplicateSlide = (slideId) => {
    const slideIndex = slides.findIndex(s => s.id === slideId);
    const slideToDuplicate = slides[slideIndex];
    const newSlide = {
      ...slideToDuplicate,
      id: slides.length + 1,
      title: `${slideToDuplicate.title} (Copy)`
    };
    const newSlides = [...slides];
    newSlides.splice(slideIndex + 1, 0, newSlide);
    setSlides(newSlides);
  };

  const deleteSlide = (slideId) => {
    setSlides(slides.filter(s => s.id !== slideId));
  };

  if (mode === 'templates') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Pitch Deck Builder</h3>
            <p className="text-gray-600">Create investor-ready presentations with professional templates</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setMode('builder')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Start from Scratch
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Presentation className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`bg-${template.color}-50 text-${template.color}-700 border-${template.color}-200`}>
                      {template.slides} slides
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye size={14} className="mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => startBuilder(template)}
                        className="bg-blue-900 hover:bg-blue-800"
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'builder') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => setMode('templates')} className="mb-2">
              ← Back to Templates
            </Button>
            <h3 className="text-xl font-bold text-gray-900">
              {selectedTemplate ? selectedTemplate.name : 'Custom Pitch Deck'}
            </h3>
            <p className="text-gray-600">{slides.length} slides</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setMode('preview')}>
              <Eye size={16} className="mr-2" />
              Preview
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Slide Navigator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Slides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {slides.map((slide, index) => (
                <div key={slide.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Slide {index + 1}</div>
                      <div className="font-medium text-sm">{slide.title}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => duplicateSlide(slide.id)}>
                        <Copy size={12} />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteSlide(slide.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addSlide} variant="outline" className="w-full">
                <Plus size={16} className="mr-2" />
                Add Slide
              </Button>
            </CardContent>
          </Card>

          {/* Slide Editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Slide 1: Cover Slide</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Move size={14} className="mr-1" />
                      Move
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Your Company Name</h1>
                    <p className="text-xl opacity-90">Transforming [Industry] with [Innovation]</p>
                    <div className="mt-6 space-y-1 text-sm opacity-75">
                      <p>Founder Name</p>
                      <p>Month Year</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Your company's mission in one line"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PitchDeckBuilder;
