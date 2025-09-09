import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Users, AlertTriangle, FileText, Calendar, Brain, Activity } from 'lucide-react';

export function StatsCards() {
  const stats = [
    {
      title: 'Total Students Tracked',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Assessments',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Critical Cases',
      value: '23',
      change: '-15.4%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Avg Wellbeing Score',
      value: '7.2/10',
      change: '+0.8',
      trend: 'up',
      icon: Brain,
      color: 'purple'
    },
    {
      title: 'Counseling Sessions',
      value: '89',
      change: '+24.1%',
      trend: 'up',
      icon: Calendar,
      color: 'orange'
    },
    {
      title: 'Response Rate',
      value: '92.4%',
      change: '+3.1%',
      trend: 'up',
      icon: Activity,
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      red: 'text-red-600 bg-red-50',
      purple: 'text-purple-600 bg-purple-50',
      orange: 'text-orange-600 bg-orange-50',
      indigo: 'text-indigo-600 bg-indigo-50'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="flex items-center space-x-1">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <Badge 
                variant={stat.trend === 'up' ? 'default' : 'destructive'}
                className={`text-xs px-2 py-0.5 ${
                  stat.trend === 'up' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                    : 'bg-red-100 text-red-700 hover:bg-red-100'
                }`}
              >
                {stat.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}