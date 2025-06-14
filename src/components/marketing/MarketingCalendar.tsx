
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Mail,
  MessageSquare,
  Instagram,
  Bell
} from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';

const MarketingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const scheduledEvents = [
    {
      id: 1,
      title: 'Spring Sale Email Campaign',
      type: 'email',
      date: new Date(),
      time: '09:00',
      status: 'scheduled',
      audience: 'All Customers'
    },
    {
      id: 2,
      title: 'Instagram Product Post',
      type: 'social',
      date: addDays(new Date(), 1),
      time: '14:30',
      status: 'scheduled',
      audience: 'Instagram Followers'
    },
    {
      id: 3,
      title: 'SMS Flash Sale Alert',
      type: 'sms',
      date: addDays(new Date(), 2),
      time: '10:00',
      status: 'draft',
      audience: 'VIP Customers'
    },
    {
      id: 4,
      title: 'LinkedIn Business Update',
      type: 'social',
      date: addDays(new Date(), 3),
      time: '11:00',
      status: 'scheduled',
      audience: 'LinkedIn Network'
    },
    {
      id: 5,
      title: 'Customer Survey Email',
      type: 'email',
      date: addDays(new Date(), 5),
      time: '16:00',
      status: 'draft',
      audience: 'Recent Customers'
    }
  ];

  const aiSuggestions = [
    {
      title: 'Eid Mubarak Promotion',
      description: 'Consider creating a special Eid promotion campaign',
      suggestedDate: addDays(new Date(), 7),
      type: 'seasonal'
    },
    {
      title: 'Repost High-Performing Content',
      description: 'Your "Business Tips" post had great engagement last week',
      suggestedDate: addDays(new Date(), 3),
      type: 'content'
    },
    {
      title: 'Follow-up Email',
      description: 'Send follow-up to users who opened but didn\'t click',
      suggestedDate: addDays(new Date(), 2),
      type: 'automation'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={16} className="text-blue-600" />;
      case 'sms': return <MessageSquare size={16} className="text-green-600" />;
      case 'social': return <Instagram size={16} className="text-pink-600" />;
      default: return <CalendarIcon size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventsForDate = (date: Date) => {
    return scheduledEvents.filter(event => isSameDay(event.date, date));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CalendarIcon className="text-purple-600" size={20} />
              Marketing Calendar
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button 
              size="sm" 
              variant={viewMode === 'month' ? 'default' : 'outline'}
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'week' ? 'default' : 'outline'}
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasEvents: (date) => getEventsForDate(date).length > 0
                }}
                modifiersClassNames={{
                  hasEvents: "bg-blue-100 text-blue-900 font-semibold"
                }}
              />
            </div>

            {/* Selected Date Events */}
            <div className="space-y-4">
              <h3 className="font-semibold">
                {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select a date'}
              </h3>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="border">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getEventIcon(event.type)}
                            <span className="font-medium text-sm">{event.title}</span>
                          </div>
                          <Badge className={getStatusColor(event.status)} variant="secondary">
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{event.time} • {event.audience}</p>
                        <div className="flex gap-1 mt-2">
                          <Button size="sm" variant="ghost" className="h-6 px-2">
                            <Eye size={12} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 px-2">
                            <Edit size={12} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 px-2">
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <CalendarIcon size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No events scheduled for this date</p>
                  <Button size="sm" className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getEventIcon(event.type)}
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">
                      {format(event.date, 'MMM dd')} at {event.time} • {event.audience}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(event.status)} variant="secondary">
                    {event.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="text-emerald-600" size={20} />
            AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-emerald-900">{suggestion.title}</h4>
                    <p className="text-sm text-emerald-700 mt-1">{suggestion.description}</p>
                    <p className="text-xs text-emerald-600 mt-2">
                      Suggested for: {format(suggestion.suggestedDate, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-emerald-300">
                      Schedule
                    </Button>
                    <Button size="sm" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingCalendar;
