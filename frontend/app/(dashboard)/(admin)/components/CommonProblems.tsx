import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MessageSquare, TrendingUp, AlertTriangle, Users, Calendar, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function CommonProblems() {
  const problemData = [
    { 
      problem: 'Academic Pressure', 
      count: 1247, 
      percentage: 43.8, 
      severity: 'High',
      trend: '+8.2%',
      category: 'Academic'
    },
    { 
      problem: 'Social Isolation', 
      count: 892, 
      percentage: 31.3, 
      severity: 'High',
      trend: '+12.1%',
      category: 'Social'
    },
    { 
      problem: 'Financial Stress', 
      count: 634, 
      percentage: 22.3, 
      severity: 'Medium',
      trend: '+3.4%',
      category: 'Financial'
    },
    { 
      problem: 'Sleep Disorders', 
      count: 578, 
      percentage: 20.3, 
      severity: 'Medium',
      trend: '+15.7%',
      category: 'Health'
    },
    { 
      problem: 'Relationship Issues', 
      count: 445, 
      percentage: 15.6, 
      severity: 'Medium',
      trend: '-2.1%',
      category: 'Social'
    },
    { 
      problem: 'Career Uncertainty', 
      count: 423, 
      percentage: 14.9, 
      severity: 'Medium',
      trend: '+9.8%',
      category: 'Career'
    },
    { 
      problem: 'Family Pressure', 
      count: 389, 
      percentage: 13.7, 
      severity: 'Medium',
      trend: '+1.2%',
      category: 'Family'
    },
    { 
      problem: 'Body Image Issues', 
      count: 267, 
      percentage: 9.4, 
      severity: 'Low',
      trend: '+6.3%',
      category: 'Personal'
    }
  ];

  const severityData = [
    { name: 'High Severity', value: 2139, color: '#ef4444' },
    { name: 'Medium Severity', value: 2739, color: '#f59e0b' },
    { name: 'Low Severity', value: 267, color: '#10b981' }
  ];

  const trendingProblems = [
    { problem: 'Sleep Disorders', trend: '+15.7%', impact: 'Rising' },
    { problem: 'Social Isolation', trend: '+12.1%', impact: 'Critical' },
    { problem: 'Career Uncertainty', trend: '+9.8%', impact: 'Growing' },
    { problem: 'Academic Pressure', trend: '+8.2%', impact: 'Persistent' }
  ];

  const interventionSuggestions = [
    {
      problem: 'Academic Pressure',
      interventions: ['Study Skills Workshops', 'Time Management Training', 'Peer Tutoring'],
      priority: 'High'
    },
    {
      problem: 'Social Isolation',
      interventions: ['Group Activities', 'Buddy System', 'Social Skills Training'],
      priority: 'Critical'
    },
    {
      problem: 'Sleep Disorders',
      interventions: ['Sleep Hygiene Education', 'Relaxation Techniques', 'Schedule Counseling'],
      priority: 'High'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Low': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Problems Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Most Common Student Problems</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={problemData} layout="horizontal" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="problem" type="category" width={120} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-medium text-gray-900 mb-2">{label}</p>
                          <p className="text-sm text-blue-600">Affected: {data.count} students</p>
                          <p className="text-sm text-gray-600">Percentage: {data.percentage}%</p>
                          <p className="text-sm text-gray-600">Trend: {data.trend}</p>
                          <Badge className={`mt-1 text-xs ${getSeverityColor(data.severity)}`}>
                            {data.severity} Severity
                          </Badge>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Severity Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {severityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Problems */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Trending Issues</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingProblems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{item.problem}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.impact} concern</p>
                </div>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                  {item.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intervention Suggestions */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Recommended Interventions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interventionSuggestions.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{item.problem}</h4>
                  <Badge 
                    className={`text-xs ${
                      item.priority === 'Critical' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    {item.priority} Priority
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.interventions.map((intervention, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {intervention}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Calendar className="w-4 h-4 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900 text-sm">Implementation Timeline</h4>
                <p className="text-xs text-purple-700 mt-1">
                  Critical interventions should be implemented within 2 weeks. 
                  High priority items within 4 weeks. Monitor effectiveness monthly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}