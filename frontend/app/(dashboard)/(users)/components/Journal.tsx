'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { 
  BookOpen, 
  Plus, 
  Calendar as CalendarIcon,
  Flame,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  Heart,
  Star,
  Edit,
  Search
} from 'lucide-react';
import { Input } from './ui/input';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad';
  tags: string[];
  gratitude?: string[];
  goals?: string[];
}

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(2024, 11, 3),
      title: 'First day back to classes',
      content: 'Today was the first day back after break. I felt a bit anxious about getting back into the routine, but overall it went well. I managed to complete my morning meditation and felt more centered throughout the day. The anxiety was manageable and I used some breathing techniques when I started feeling overwhelmed.',
      mood: 'happy',
      tags: ['anxiety', 'meditation', 'school'],
      gratitude: ['Peaceful morning', 'Supportive friends', 'Good weather'],
      goals: ['Continue daily meditation', 'Prepare for upcoming exams']
    },
    {
      id: '2',
      date: new Date(2024, 11, 2),
      title: 'Weekend reflection',
      content: 'Had a good weekend with friends. We went for a hike which really helped clear my mind. I\'ve been feeling more balanced lately and the outdoor time definitely contributed to that. Sometimes I forget how much nature helps my mental state.',
      mood: 'happy',
      tags: ['friends', 'nature', 'hiking', 'weekend'],
      gratitude: ['Beautiful hiking trail', 'Quality time with friends', 'Fresh air'],
    },
    {
      id: '3',
      date: new Date(2024, 11, 1),
      title: 'Tough day',
      content: 'Today was challenging. I felt overwhelmed with assignments and couldn\'t seem to focus. I tried to use some of the techniques I\'ve learned but they didn\'t seem to help as much today. Feeling frustrated but I know tomorrow is a new day.',
      mood: 'sad',
      tags: ['overwhelmed', 'assignments', 'frustrated'],
      gratitude: ['Warm tea', 'Comfortable bed'],
      goals: ['Break tasks into smaller pieces', 'Reach out for support']
    }
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as const,
    tags: [] as string[],
    gratitude: ['', '', ''],
    goals: ['', '']
  });
  const [searchTerm, setSearchTerm] = useState('');

  const currentStreak = 7;
  const totalEntries = entries.length;
  const thisMonthEntries = entries.filter(entry => 
    entry.date.getMonth() === new Date().getMonth() &&
    entry.date.getFullYear() === new Date().getFullYear()
  ).length;

  const moodIcons = {
    happy: { icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
    neutral: { icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    sad: { icon: Frown, color: 'text-red-500', bg: 'bg-red-100' }
  };

  const journalPrompts = [
    "What am I grateful for today?",
    "What challenged me today and how did I handle it?",
    "What made me smile today?",
    "What would I like to improve about tomorrow?",
    "What am I feeling right now and why?",
    "What did I learn about myself today?"
  ];

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: selectedDate || new Date(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags,
      gratitude: newEntry.gratitude.filter(g => g.trim() !== ''),
      goals: newEntry.goals.filter(g => g.trim() !== '')
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      title: '',
      content: '',
      mood: 'neutral',
      tags: [],
      gratitude: ['', '', ''],
      goals: ['', '']
    });
    setIsWriting(false);
  };

  const handlePromptClick = (prompt: string) => {
    setNewEntry({ ...newEntry, content: newEntry.content + prompt + '\n\n' });
  };

  const filteredEntries = entries.filter(entry =>
    searchTerm === '' ||
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const moodCounts = {
    happy: entries.filter(e => e.mood === 'happy').length,
    neutral: entries.filter(e => e.mood === 'neutral').length,
    sad: entries.filter(e => e.mood === 'sad').length
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl text-purple-600">Personal Journal</h1>
        <p className="text-muted-foreground">
          Reflect on your thoughts, track your mood, and document your mental health journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl flex items-center gap-2">
                  <Flame className="h-6 w-6 text-orange-500" />
                  {currentStreak} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                  {totalEntries}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6 text-green-500" />
                  {thisMonthEntries}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mood Trend</p>
                <p className="text-2xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                  Positive
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Mood Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Mood Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(moodCounts).map(([mood, count]) => {
                  const { icon: Icon, color, bg } = moodIcons[mood as keyof typeof moodIcons];
                  return (
                    <div key={mood} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${bg}`}>
                          <Icon className={`h-4 w-4 ${color}`} />
                        </div>
                        <span className="capitalize">{mood}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Journal Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Writing Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {journalPrompts.slice(0, 4).map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-2 text-sm"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* New Entry Button and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setIsWriting(!isWriting)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>

          {/* New Entry Form */}
          {isWriting && (
            <Card>
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Entry title..."
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                />
                
                <div className="space-y-2">
                  <label className="text-sm">How are you feeling today?</label>
                  <div className="flex gap-2">
                    {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                      <Button
                        key={mood}
                        variant={newEntry.mood === mood ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewEntry({ ...newEntry, mood: mood as any })}
                        className={newEntry.mood === mood ? `${bg} ${color}` : ''}
                      >
                        <Icon className="h-4 w-4 mr-1" />
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <Textarea
                  placeholder="What's on your mind? How was your day? What are you grateful for?"
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  rows={6}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">What are you grateful for? (3 things)</label>
                    {newEntry.gratitude.map((item, index) => (
                      <Input
                        key={index}
                        placeholder={`Gratitude ${index + 1}...`}
                        value={item}
                        onChange={(e) => {
                          const newGratitude = [...newEntry.gratitude];
                          newGratitude[index] = e.target.value;
                          setNewEntry({ ...newEntry, gratitude: newGratitude });
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm">Goals for tomorrow</label>
                    {newEntry.goals.map((goal, index) => (
                      <Input
                        key={index}
                        placeholder={`Goal ${index + 1}...`}
                        value={goal}
                        onChange={(e) => {
                          const newGoals = [...newEntry.goals];
                          newGoals[index] = e.target.value;
                          setNewEntry({ ...newEntry, goals: newGoals });
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveEntry}>Save Entry</Button>
                  <Button variant="outline" onClick={() => setIsWriting(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Journal Entries */}
          <div className="space-y-4">
            {filteredEntries.map((entry) => {
              const { icon: MoodIcon, color, bg } = moodIcons[entry.mood];
              return (
                <Card key={entry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${bg}`}>
                            <MoodIcon className={`h-5 w-5 ${color}`} />
                          </div>
                          <div>
                            <h3 className="font-medium">{entry.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {entry.date.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">{entry.content}</p>
                      
                      {entry.gratitude && entry.gratitude.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            Grateful for:
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {entry.gratitude.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {entry.goals && entry.goals.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Goals:
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {entry.goals.map((goal, index) => (
                              <li key={index}>• {goal}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredEntries.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg mb-2">No entries found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Try adjusting your search' : 'Start your journaling journey by creating your first entry'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}