'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  ExternalLink,
  Phone,
  MessageCircle,
  Search,
  Heart,
  Brain,
  Users,
  BookOpen,
  Shield,
  Clock,
  MapPin,
  Headphones
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'hotline' | 'website' | 'app' | 'service' | 'article';
  contact?: string;
  website?: string;
  availability?: string;
  location?: string;
  tags: string[];
  isEmergency?: boolean;
}

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Crisis Support',
    'Therapy & Counseling',
    'Mental Health Apps',
    'Educational Resources',
    'Peer Support',
    'Campus Resources',
    'Self-Help Tools'
  ];

  const resources: Resource[] = [
    // Crisis Support
    {
      id: '1',
      title: 'National Suicide Prevention Lifeline',
      description: '24/7 free and confidential emotional support for people in suicidal crisis or emotional distress.',
      category: 'Crisis Support',
      type: 'hotline',
      contact: '988',
      availability: '24/7',
      tags: ['suicide', 'crisis', 'emergency'],
      isEmergency: true
    },
    {
      id: '2',
      title: 'Crisis Text Line',
      description: 'Free, 24/7 support for those in crisis. Text HOME to 741741 from anywhere in the US.',
      category: 'Crisis Support',
      type: 'hotline',
      contact: 'Text HOME to 741741',
      availability: '24/7',
      tags: ['text', 'crisis', 'emergency'],
      isEmergency: true
    },
    {
      id: '3',
      title: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service for mental health and substance use disorders.',
      category: 'Crisis Support',
      type: 'hotline',
      contact: '1-800-662-4357',
      availability: '24/7',
      tags: ['treatment', 'referral', 'substance-use']
    },

    // Therapy & Counseling
    {
      id: '4',
      title: 'BetterHelp',
      description: 'Online counseling platform connecting you with licensed therapists via video, phone, or messaging.',
      category: 'Therapy & Counseling',
      type: 'service',
      website: 'https://betterhelp.com',
      tags: ['online-therapy', 'counseling', 'licensed-therapists']
    },
    {
      id: '5',
      title: 'Campus Counseling Center',
      description: 'Free mental health services for students including individual therapy, group sessions, and crisis intervention.',
      category: 'Campus Resources',
      type: 'service',
      location: 'Student Health Center, 2nd Floor',
      availability: 'Mon-Fri 8AM-5PM',
      tags: ['campus', 'free', 'students', 'therapy']
    },
    {
      id: '6',
      title: 'Psychology Today Therapist Directory',
      description: 'Find local therapists, psychiatrists, and mental health professionals in your area.',
      category: 'Therapy & Counseling',
      type: 'website',
      website: 'https://psychologytoday.com',
      tags: ['therapist-directory', 'local', 'mental-health-professionals']
    },

    // Mental Health Apps
    {
      id: '7',
      title: 'Headspace',
      description: 'Meditation and mindfulness app with guided sessions for stress, anxiety, and sleep.',
      category: 'Mental Health Apps',
      type: 'app',
      tags: ['meditation', 'mindfulness', 'stress', 'anxiety', 'sleep']
    },
    {
      id: '8',
      title: 'Calm',
      description: 'App for meditation, sleep stories, and relaxation techniques to improve mental wellbeing.',
      category: 'Mental Health Apps',
      type: 'app',
      tags: ['meditation', 'sleep', 'relaxation', 'wellbeing']
    },
    {
      id: '9',
      title: 'Youper',
      description: 'AI-powered emotional health assistant that uses CBT techniques to improve mood.',
      category: 'Mental Health Apps',
      type: 'app',
      tags: ['AI', 'CBT', 'mood-tracking', 'emotional-health']
    },

    // Educational Resources
    {
      id: '10',
      title: 'National Institute of Mental Health (NIMH)',
      description: 'Comprehensive information about mental health conditions, treatments, and research.',
      category: 'Educational Resources',
      type: 'website',
      website: 'https://nimh.nih.gov',
      tags: ['information', 'research', 'mental-health-conditions']
    },
    {
      id: '11',
      title: 'Mental Health America',
      description: 'Educational resources, screening tools, and advocacy for mental health awareness.',
      category: 'Educational Resources',
      type: 'website',
      website: 'https://mhanational.org',
      tags: ['education', 'screening', 'advocacy', 'awareness']
    },

    // Peer Support
    {
      id: '12',
      title: 'NAMI Support Groups',
      description: 'Free peer support groups for individuals living with mental health conditions and their families.',
      category: 'Peer Support',
      type: 'service',
      website: 'https://nami.org',
      tags: ['peer-support', 'groups', 'family', 'free']
    },
    {
      id: '13',
      title: 'Student Mental Health Collective',
      description: 'Peer-led support group for students dealing with mental health challenges.',
      category: 'Campus Resources',
      type: 'service',
      location: 'Student Union Building, Room 205',
      availability: 'Thursdays 6PM-7PM',
      tags: ['peer-support', 'students', 'campus']
    },

    // Self-Help Tools
    {
      id: '14',
      title: 'MindShift',
      description: 'Free app using CBT strategies to help manage anxiety and worry.',
      category: 'Self-Help Tools',
      type: 'app',
      tags: ['CBT', 'anxiety', 'worry', 'free', 'self-help']
    },
    {
      id: '15',
      title: 'Centre for Clinical Interventions (CCI)',
      description: 'Free self-help resources and workbooks for various mental health conditions.',
      category: 'Self-Help Tools',
      type: 'website',
      website: 'https://cci.health.wa.gov.au',
      tags: ['self-help', 'workbooks', 'free', 'clinical-interventions']
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const emergencyResources = resources.filter(r => r.isEmergency);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotline': return Phone;
      case 'website': return ExternalLink;
      case 'app': return Headphones;
      case 'service': return Users;
      case 'article': return BookOpen;
      default: return Heart;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotline': return 'bg-red-100 text-red-700';
      case 'website': return 'bg-blue-100 text-blue-700';
      case 'app': return 'bg-purple-100 text-purple-700';
      case 'service': return 'bg-green-100 text-green-700';
      case 'article': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl text-purple-600">Mental Health Resources</h1>
        <p className="text-muted-foreground">
          Find support, information, and tools to help you on your mental health journey
        </p>
      </div>

      {/* Emergency Resources */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Shield className="h-5 w-5" />
            Emergency Resources - Available 24/7
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyResources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                <div>
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.contact}</p>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            ))}
          </div>
          <p className="text-sm text-red-600 mt-4">
            If you're having thoughts of self-harm or are in immediate danger, please call 911 or go to your nearest emergency room.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Quick Mental Health Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-medium">Practice the 5-4-3-2-1 grounding technique</p>
                  <p className="text-muted-foreground">5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">Take deep breaths</p>
                  <p className="text-muted-foreground">Inhale for 4, hold for 4, exhale for 6</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium">Reach out for support</p>
                  <p className="text-muted-foreground">You don't have to face challenges alone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <TypeIcon className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium leading-tight">{resource.title}</h3>
                            <Badge className={`text-xs mt-1 ${getTypeColor(resource.type)}`}>
                              {resource.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resource.description}
                      </p>
                      
                      <div className="space-y-2">
                        {resource.contact && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{resource.contact}</span>
                          </div>
                        )}
                        
                        {resource.availability && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{resource.availability}</span>
                          </div>
                        )}
                        
                        {resource.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{resource.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {resource.contact && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Phone className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        )}
                        {resource.website && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit Site
                          </Button>
                        )}
                        {resource.type === 'app' && (
                          <Button size="sm" variant="outline">
                            <Headphones className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Additional Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <MessageCircle className="h-6 w-6 text-purple-600" />
              <span>Chat with AI Companion</span>
              <span className="text-xs text-muted-foreground">Get immediate support and guidance</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6 text-blue-600" />
              <span>Join Community Forum</span>
              <span className="text-xs text-muted-foreground">Connect with peers who understand</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <BookOpen className="h-6 w-6 text-green-600" />
              <span>Access Video Library</span>
              <span className="text-xs text-muted-foreground">Learn coping strategies and techniques</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}