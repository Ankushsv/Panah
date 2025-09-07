'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Plus, 
  Search, 
  Star, 
  Trophy,
  ThumbsUp,
  Clock,
  Users
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    level: number;
    badges: string[];
    avatar: string;
  };
  timestamp: Date;
  likes: number;
  replies: number;
  category: string;
  isLiked?: boolean;
}

export function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Coping with exam anxiety - what works for you?',
      content: 'Hey everyone! Finals are coming up and I\'m feeling really overwhelmed. I\'ve tried some breathing exercises but I\'m wondering what other techniques have worked for you all. Any advice would be appreciated! 💙',
      author: {
        name: 'Sarah M.',
        level: 5,
        badges: ['Supportive Soul', 'Week Warrior'],
        avatar: 'SM'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 15,
      replies: 8,
      category: 'Academic Stress'
    },
    {
      id: '2',
      title: 'Daily gratitude practice - join me!',
      content: 'Starting a daily gratitude thread! Comment one thing you\'re grateful for today. I\'ll start: I\'m grateful for this supportive community and the sunshine today ☀️',
      author: {
        name: 'Alex R.',
        level: 7,
        badges: ['Community Builder', 'Gratitude Guide', 'Month Master'],
        avatar: 'AR'
      },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 32,
      replies: 24,
      category: 'Positive Vibes'
    },
    {
      id: '3',
      title: 'Sleep schedule tips for night owls?',
      content: 'I\'ve always been a night person but I need to adjust my sleep schedule for early morning classes. Has anyone successfully shifted from being a night owl to an early bird? What worked for you?',
      author: {
        name: 'Jordan K.',
        level: 3,
        badges: ['Night Owl'],
        avatar: 'JK'
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 12,
      replies: 15,
      category: 'Sleep & Wellness'
    }
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All Posts',
    'Academic Stress',
    'Positive Vibes', 
    'Sleep & Wellness',
    'Relationships',
    'Self Care',
    'Campus Life'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const userLevel = 4;
  const userBadges = ['Week Warrior', 'Supportive Soul', 'Learning Explorer'];

  const levels = [
    { level: 1, name: 'Newcomer', posts: '0-5', color: 'bg-gray-100 text-gray-700' },
    { level: 2, name: 'Community Member', posts: '6-15', color: 'bg-blue-100 text-blue-700' },
    { level: 3, name: 'Active Contributor', posts: '16-30', color: 'bg-green-100 text-green-700' },
    { level: 4, name: 'Trusted Advisor', posts: '31-50', color: 'bg-purple-100 text-purple-700' },
    { level: 5, name: 'Community Champion', posts: '51-75', color: 'bg-yellow-100 text-yellow-700' },
    { level: 6, name: 'Wellness Warrior', posts: '76-100', color: 'bg-orange-100 text-orange-700' },
    { level: 7, name: 'Mental Health Mentor', posts: '100+', color: 'bg-red-100 text-red-700' }
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        name: 'You',
        level: userLevel,
        badges: userBadges,
        avatar: 'YU'
      },
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      category: selectedCategory === 'All Posts' ? 'General' : selectedCategory
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPost(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl text-purple-600">Community Forum</h1>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Connect with peers, share experiences, and support each other's mental health journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* User Level & Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${levels[userLevel - 1]?.color}`}>
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Level {userLevel}: {levels[userLevel - 1]?.name}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {levels[userLevel - 1]?.posts} posts
                </p>
              </div>
              
              <div>
                <p className="text-xs sm:text-sm mb-2">Your Badges:</p>
                <div className="flex flex-wrap gap-1">
                  {userBadges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
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
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Level System */}
          <Card>
            <CardHeader>
              <CardTitle>Level System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {levels.map((levelInfo) => (
                  <div 
                    key={levelInfo.level}
                    className={`p-2 rounded text-xs ${levelInfo.color} ${
                      levelInfo.level === userLevel ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Level {levelInfo.level}</span>
                      <span>{levelInfo.posts}</span>
                    </div>
                    <div className="text-xs opacity-75">{levelInfo.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and New Post */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowNewPost(!showNewPost)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {/* New Post Form */}
          {showNewPost && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Share your thoughts, ask questions, or offer support..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button onClick={handleNewPost}>Post</Button>
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {post.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{post.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{post.author.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              Level {post.author.level}
                            </Badge>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(post.timestamp)}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      
                      <p className="text-gray-700">{post.content}</p>
                      
                      <div className="flex items-center space-x-2">
                        {post.author.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 pt-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.isLiked ? 'text-red-500' : ''}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.replies} replies
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}