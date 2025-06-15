
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Search, BookOpen, FileText, Video, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface KnowledgeResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'guide' | 'template' | 'video' | 'course';
  category: string;
  source?: string;
  tags: string[];
  rating?: number;
  duration?: string;
  created_at: string;
  updated_at: string;
}

const KnowledgeManagement = () => {
  const [resources, setResources] = useState<KnowledgeResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<KnowledgeResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<KnowledgeResource | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    type: 'guide' as const,
    category: '',
    source: '',
    tags: '',
    rating: '',
    duration: ''
  });

  const typeIcons = {
    guide: BookOpen,
    template: FileText,
    video: Video,
    course: GraduationCap
  };

  const loadResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('knowledge_resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
      setFilteredResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
      toast({
        title: "Error",
        description: "Failed to load resources",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(resource => resource.type === filterType);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, filterType]);

  const openEditModal = (resource?: KnowledgeResource) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        title: resource.title,
        description: resource.description,
        url: resource.url,
        type: resource.type,
        category: resource.category,
        source: resource.source || '',
        tags: resource.tags.join(', '),
        rating: resource.rating?.toString() || '',
        duration: resource.duration || ''
      });
    } else {
      setEditingResource(null);
      setFormData({
        title: '',
        description: '',
        url: '',
        type: 'guide',
        category: '',
        source: '',
        tags: '',
        rating: '',
        duration: ''
      });
    }
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const resourceData = {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        type: formData.type,
        category: formData.category,
        source: formData.source || null,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        rating: formData.rating ? parseFloat(formData.rating) : null,
        duration: formData.duration || null,
        updated_at: new Date().toISOString()
      };

      if (editingResource) {
        const { error } = await supabase
          .from('knowledge_resources')
          .update(resourceData)
          .eq('id', editingResource.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Resource updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('knowledge_resources')
          .insert([{ ...resourceData, created_at: new Date().toISOString() }]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Resource created successfully"
        });
      }

      setIsEditModalOpen(false);
      loadResources();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({
        title: "Error",
        description: "Failed to save resource",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (resourceId: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const { error } = await supabase
        .from('knowledge_resources')
        .delete()
        .eq('id', resourceId);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Resource deleted successfully"
      });
      loadResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive"
      });
    }
  };

  const getStats = () => {
    return {
      total: resources.length,
      guides: resources.filter(r => r.type === 'guide').length,
      templates: resources.filter(r => r.type === 'template').length,
      videos: resources.filter(r => r.type === 'video').length,
      courses: resources.filter(r => r.type === 'course').length
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Management</h1>
          <p className="text-gray-600">Manage knowledge hub resources and content</p>
        </div>
        <Button onClick={() => openEditModal()}>
          <Plus size={16} className="mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Resources</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-600">{stats.guides}</div>
            <div className="text-sm text-gray-600">Guides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.templates}</div>
            <div className="text-sm text-gray-600">Templates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.videos}</div>
            <div className="text-sm text-gray-600">Videos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.courses}</div>
            <div className="text-sm text-gray-600">Courses</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="guide">Guides</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="course">Courses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <Card>
        <CardHeader>
          <CardTitle>Resources ({filteredResources.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading resources...</div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No resources found</div>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((resource) => {
                const TypeIcon = typeIcons[resource.type];
                return (
                  <div key={resource.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <TypeIcon className="text-blue-600 mt-1" size={20} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{resource.type}</Badge>
                            <Badge variant="secondary">{resource.category}</Badge>
                            {resource.rating && (
                              <Badge variant="outline">★ {resource.rating}</Badge>
                            )}
                            {resource.duration && (
                              <span className="text-xs text-gray-500">{resource.duration}</span>
                            )}
                          </div>
                          {resource.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {resource.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditModal(resource)}>
                          <Edit size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingResource ? 'Edit Resource' : 'Add New Resource'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Resource title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Resource description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., compliance, marketing"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="Resource URL"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source">Source (optional)</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="Content source"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (optional)</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 10 min, 2 hours"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Rating (optional)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  placeholder="0.0 - 5.0"
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingResource ? 'Update' : 'Create'} Resource
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KnowledgeManagement;
