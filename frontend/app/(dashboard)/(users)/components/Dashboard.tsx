'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth } from '@/components/AuthProvider';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { 
  Flame, 
  MessageCircle, 
  Video, 
  BookOpen, 
  Users, 
  Trophy, 
  Star,
  Calendar,
  Target,
  Award
} from 'lucide-react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

interface UserStats {
  journalEntries: number;
  forumPosts: number;
  evaluationsCompleted: number;
  joinDate: string;
}

export function Dashboard({ setActiveTab }: DashboardProps) {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ad91a532/user/stats`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        });
        
        if (response.ok) {
          const stats = await response.json();
          setUserStats(stats);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const displayStats = {
    journalStreak: userStats?.journalEntries || 0,
    forumPosts: userStats?.forumPosts || 0,
    videosCompleted: 15, // This would come from video tracking
    totalBadges: user?.badges?.length || 0,
    weeklyProgress: Math.min(((userStats?.journalEntries || 0) * 10), 100),
    level: user?.level || 1,
    levelProgress: ((user?.level || 1) * 20) % 100
  };

  const recentBadges = user?.badges?.slice(-3).map(badge => ({
    name: badge,
    description: getBadgeDescription(badge),
    icon: getBadgeIcon(badge),
    color: getBadgeColor(badge)
  })) || [];

  function getBadgeDescription(badge: string) {
    const descriptions: Record<string, string> = {
      'Welcome': 'Joined the community',
      'Week Warrior': '7-day journal streak',
      'Supportive Soul': '10 helpful forum posts',
      'Learning Explorer': '5 videos completed',
      'Month Master': '30-day streak',
      'Community Builder': 'Active forum participant'
    };
    return descriptions[badge] || 'Achievement unlocked';
  }

  function getBadgeIcon(badge: string) {
    const icons: Record<string, string> = {
      'Welcome': '👋',
      'Week Warrior': '🏆',
      'Supportive Soul': '💝',
      'Learning Explorer': '🎓',
      'Month Master': '🔥',
      'Community Builder': '🏗️'
    };
    return icons[badge] || '⭐';
  }

  function getBadgeColor(badge: string) {
    const colors: Record<string, string> = {
      'Welcome': 'bg-blue-100 text-blue-800',
      'Week Warrior': 'bg-yellow-100 text-yellow-800',
      'Supportive Soul': 'bg-pink-100 text-pink-800',
      'Learning Explorer': 'bg-purple-100 text-purple-800',
      'Month Master': 'bg-orange-100 text-orange-800',
      'Community Builder': 'bg-green-100 text-green-800'
    };
    return colors[badge] || 'bg-gray-100 text-gray-800';
  }

  const quickActions = [
    { 
      title: 'AI Support Chat', 
      description: 'Get instant guidance & coping strategies',
      icon: MessageCircle,
      color: 'bg-purple-600',
      action: () => setActiveTab('chatbox')
    },
    { 
      title: 'Book Counselor', 
      description: 'Schedule confidential appointment',
      icon: Calendar,
      color: 'bg-blue-600',
      action: () => setActiveTab('booking')
    },
    { 
      title: 'Peer Support', 
      description: 'Connect with trained volunteers',
      icon: Users,
      color: 'bg-orange-600',
      action: () => setActiveTab('forum')
    },
    { 
      title: 'Learning Videos', 
      description: 'Watch wellness guides & exercises',
      icon: Video,
      color: 'bg-green-600',
      action: () => setActiveTab('videos')
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-gray-200 rounded-lg h-32"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl mb-2">Welcome back, {user?.name || 'there'}! 👋</h1>
        <p className="text-purple-100 text-sm sm:text-base">Your mental wellbeing journey continues. Keep up the amazing progress!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Journal Streak</p>
                <p className="text-lg sm:text-2xl flex items-center gap-1 sm:gap-2">
                  <Flame className="h-4 w-4 sm:h-6 sm:w-6 text-orange-500" />
                  <span className="text-sm sm:text-2xl">{displayStats.journalStreak}</span>
                  <span className="text-xs sm:text-base">days</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Forum Posts</p>
                <p className="text-lg sm:text-2xl flex items-center gap-1 sm:gap-2">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />
                  <span className="text-sm sm:text-2xl">{displayStats.forumPosts}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Videos Completed</p>
                <p className="text-lg sm:text-2xl flex items-center gap-1 sm:gap-2">
                  <Video className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
                  <span className="text-sm sm:text-2xl">{displayStats.videosCompleted}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-lg sm:text-2xl flex items-center gap-1 sm:gap-2">
                  <Trophy className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" />
                  <span className="text-sm sm:text-2xl">{displayStats.totalBadges}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Progress Tracker */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Overall Progress</span>
                  <span className="text-sm sm:text-base">{displayStats.weeklyProgress}%</span>
                </div>
                <Progress value={displayStats.weeklyProgress} className="h-2 sm:h-3" />
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                  <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
                    <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground">This Week</p>
                    <p className="text-lg sm:text-xl">5/7 Days</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                    <Star className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground">Level {displayStats.level}</p>
                    <Progress value={displayStats.levelProgress} className="h-1 sm:h-2 mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-3 sm:p-4 flex flex-col items-start space-y-2 text-left"
                      onClick={action.action}
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm sm:text-base">{action.title}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges & Achievements */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                Recent Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBadges.length > 0 ? recentBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="text-xl sm:text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base">{badge.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Complete activities to earn badges!</p>
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 text-sm"
                onClick={() => setActiveTab('forum')}
              >
                View All Badges
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Contribution Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <Users className="h-4 w-4 text-blue-500" />
                    Forum Posts
                  </span>
                  <Badge variant="secondary" className="text-xs sm:text-sm">{displayStats.forumPosts}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <Video className="h-4 w-4 text-green-500" />
                    Videos Completed
                  </span>
                  <Badge variant="secondary" className="text-xs sm:text-sm">{displayStats.videosCompleted}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <BookOpen className="h-4 w-4 text-purple-500" />
                    Journal Entries
                  </span>
                  <Badge variant="secondary" className="text-xs sm:text-sm">{displayStats.journalStreak}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}