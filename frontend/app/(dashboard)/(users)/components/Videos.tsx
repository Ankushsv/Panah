'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Play, 
  Clock, 
  Search, 
  Filter,
  CheckCircle,
  Star,
  Users,
  BookOpen,
  Heart,
  Brain,
  Zap,
  Headphones,
  Music,
  Globe,
  Volume2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  instructor: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  views: number;
  isCompleted?: boolean;
  tags: string[];
  type: 'video' | 'audio';
  language: string;
  subtitles?: string[];
}

export function Videos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [completedVideos, setCompletedVideos] = useState<string[]>(['1', '3', '7']);

  const categories = [
    'All',
    'Mindfulness & Meditation',
    'Stress Management',
    'Sleep & Relaxation',
    'Anxiety Relief',
    'Depression Support',
    'Academic Wellness',
    'Relationship Skills',
    'Relaxation Audio',
    'Guided Imagery'
  ];

  const languages = [
    'All',
    'English',
    'Spanish',
    'Mandarin',
    'French',
    'Hindi',
    'Arabic'
  ];

  const contentTypes = [
    'All',
    'Video',
    'Audio'
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'Introduction to Mindful Breathing',
      description: 'Learn the fundamentals of mindful breathing to reduce stress and increase focus. Perfect for beginners starting their mindfulness journey.',
      duration: '8:45',
      category: 'Mindfulness & Meditation',
      instructor: 'Dr. Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      difficulty: 'Beginner',
      rating: 4.8,
      views: 15420,
      isCompleted: true,
      tags: ['breathing', 'meditation', 'stress-relief'],
      type: 'video',
      language: 'English',
      subtitles: ['Spanish', 'Mandarin']
    },
    {
      id: '2',
      title: 'Managing Exam Anxiety',
      description: 'Practical strategies to cope with test anxiety and improve academic performance through mental wellness techniques.',
      duration: '12:30',
      category: 'Academic Wellness',
      instructor: 'Prof. Michael Torres',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      difficulty: 'Beginner',
      rating: 4.9,
      views: 22350,
      tags: ['anxiety', 'studying', 'academic-stress'],
      type: 'video',
      language: 'English',
      subtitles: ['Spanish']
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation',
      description: 'A guided session to release physical tension and mental stress through systematic muscle relaxation techniques.',
      duration: '15:20',
      category: 'Stress Management',
      instructor: 'Lisa Rodriguez, LMFT',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      difficulty: 'Beginner',
      rating: 4.7,
      views: 18900,
      isCompleted: true,
      tags: ['relaxation', 'stress-relief', 'body-awareness'],
      type: 'audio',
      language: 'English',
      subtitles: []
    },
    {
      id: '4',
      title: 'Building Healthy Sleep Habits',
      description: 'Evidence-based strategies for improving sleep quality and establishing a healthy bedtime routine for better mental health.',
      duration: '10:15',
      category: 'Sleep & Relaxation',
      instructor: 'Dr. James Wilson',
      thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=250&fit=crop',
      difficulty: 'Beginner',
      rating: 4.6,
      views: 12750,
      tags: ['sleep', 'hygiene', 'wellness'],
      type: 'video',
      language: 'English',
      subtitles: ['Spanish', 'Mandarin', 'French']
    },
    {
      id: '5',
      title: 'Cognitive Behavioral Techniques for Anxiety',
      description: 'Learn practical CBT strategies to identify and challenge anxious thoughts, building resilience and emotional regulation.',
      duration: '18:45',
      category: 'Anxiety Relief',
      instructor: 'Dr. Amanda Foster',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      difficulty: 'Intermediate',
      rating: 4.9,
      views: 31200,
      tags: ['CBT', 'anxiety', 'coping-strategies'],
      type: 'video',
      language: 'English',
      subtitles: ['Spanish', 'Mandarin']
    },
    {
      id: '6',
      title: 'Mindful Communication Skills',
      description: 'Develop better relationships through mindful listening and compassionate communication techniques.',
      duration: '14:30',
      category: 'Relationship Skills',
      instructor: 'Dr. Rachel Green',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop',
      difficulty: 'Intermediate',
      rating: 4.5,
      views: 9800,
      tags: ['communication', 'relationships', 'mindfulness'],
      type: 'video',
      language: 'English',
      subtitles: []
    },
    {
      id: '7',
      title: 'Understanding and Managing Depression',
      description: 'A compassionate guide to understanding depression symptoms and developing coping strategies for daily life.',
      duration: '22:10',
      category: 'Depression Support',
      instructor: 'Dr. David Kim, PhD',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      difficulty: 'Intermediate',
      rating: 4.8,
      views: 27600,
      isCompleted: true,
      tags: ['depression', 'mental-health', 'support'],
      type: 'video',
      language: 'English',
      subtitles: []
    },
    {
      id: '8',
      title: 'Advanced Meditation: Loving-Kindness Practice',
      description: 'Deepen your meditation practice with loving-kindness meditation to cultivate compassion and emotional wellbeing.',
      duration: '25:00',
      category: 'Mindfulness & Meditation',
      instructor: 'Master Zen Li',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      difficulty: 'Advanced',
      rating: 4.9,
      views: 8450,
      tags: ['meditation', 'compassion', 'advanced-practice'],
      type: 'video',
      language: 'English',
      subtitles: []
    }
  ];

  const userProgress = {
    totalVideos: videos.length,
    completedVideos: completedVideos.length,
    totalWatchTime: '2h 45m',
    streakDays: 12
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = searchTerm === '' || 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleVideoComplete = (videoId: string) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const progressPercentage = (userProgress.completedVideos / userProgress.totalVideos) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl text-purple-600">Video Library</h1>
        <p className="text-muted-foreground">
          Expert-led videos on mental health, wellness, and personal development
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  {userProgress.completedVideos}/{userProgress.totalVideos}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Watch Time</p>
                <p className="text-2xl flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-500" />
                  {userProgress.totalWatchTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  {userProgress.streakDays} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Progress</p>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% Complete</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Categories
              </CardTitle>
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

          {/* Learning Path */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Recommended Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>1. Mindful Breathing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 rounded-full border-2 border-purple-300"></div>
                  <span>2. Managing Exam Anxiety</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                  <span>3. Progressive Muscle Relaxation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                  <span>4. CBT for Anxiety</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const isCompleted = completedVideos.includes(video.id);
              return (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
                      <Button size="lg" className="bg-white bg-opacity-90 text-black hover:bg-white">
                        <Play className="h-6 w-6 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium leading-tight">{video.title}</h3>
                        <Badge className={getDifficultyColor(video.difficulty)}>
                          {video.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Instructor:</span> {video.instructor}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{video.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{video.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {video.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                          <Play className="h-4 w-4 mr-2" />
                          {isCompleted ? 'Watch Again' : 'Watch Now'}
                        </Button>
                        {!isCompleted && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleVideoComplete(video.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg mb-2">No videos found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}