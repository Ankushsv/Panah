import { StatsCards } from './StatsCards';
import { TimelineChart } from './TimelineChart';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Brain,
  Activity,
  Clock,
  Target
} from 'lucide-react';
import { Progress } from './ui/progress';

export function OverviewDashboard() {
  const quickInsights = [
    {
      title: 'Wellbeing Trend',
      value: 'Improving',
      description: '+0.3 points this month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'High Risk Students',
      value: '87',
      description: '-12 from last month',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Active Interventions',
      value: '156',
      description: 'Across all campuses',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Counselor Utilization',
      value: '78%',
      description: 'Optimal capacity',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const upcomingTasks = [
    {
      task: 'Weekly Mental Health Committee Meeting',
      time: 'Today, 2:00 PM',
      priority: 'High',
      type: 'Meeting'
    },
    {
      task: 'Review Critical Cases (15 students)',
      time: 'Today, 4:30 PM',
      priority: 'Critical',
      type: 'Review'
    },
    {
      task: 'Stress Management Workshop Preparation',
      time: 'Tomorrow, 10:00 AM',
      priority: 'Medium',
      type: 'Workshop'
    },
    {
      task: 'Monthly Report Generation',
      time: 'Friday, 9:00 AM',
      priority: 'Medium',
      type: 'Report'
    }
  ];

  const recentActivities = [
    {
      activity: 'New policy "24/7 Mental Health Helpline" implemented',
      time: '2 hours ago',
      type: 'Policy',
      impact: 'High'
    },
    {
      activity: '23 students completed PHQ-9 assessment',
      time: '4 hours ago',
      type: 'Assessment',
      impact: 'Medium'
    },
    {
      activity: 'Critical case alert: Student ME21B0456 flagged',
      time: '6 hours ago',
      type: 'Alert',
      impact: 'Critical'
    },
    {
      activity: 'Peer support group session completed (12 participants)',
      time: '1 day ago',
      type: 'Intervention',
      impact: 'Medium'
    }
  ];

  const systemHealth = [
    { metric: 'Response Rate', value: 89.7, target: 90, status: 'good' },
    { metric: 'Data Quality', value: 94.2, target: 95, status: 'good' },
    { metric: 'System Uptime', value: 99.8, target: 99.5, status: 'excellent' },
    { metric: 'User Satisfaction', value: 87.3, target: 85, status: 'excellent' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-600 text-white';
      case 'Medium': return 'bg-yellow-600 text-white';
      case 'Low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards />

      {/* Timeline Chart */}
      <TimelineChart />

      {/* Quick Insights & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>Quick Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickInsights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg ${insight.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white ${insight.color}`}>
                        <insight.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${insight.color}`}>
                      {insight.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Upcoming Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{task.task}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{task.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {task.type}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" size="sm">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.impact === 'Critical' ? 'bg-red-500' :
                    activity.impact === 'High' ? 'bg-orange-500' :
                    activity.impact === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className={`text-xs font-medium ${getImpactColor(activity.impact)}`}>
                        {activity.impact} Impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <span>System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">{metric.value}%</span>
                      <Badge className={`text-xs ${
                        metric.status === 'excellent' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                        metric.status === 'good' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                        'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                      }`}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                  <p className="text-xs text-gray-500">
                    Target: {metric.target}% • 
                    {metric.value >= metric.target ? ' Above target' : ' Below target'}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-900">System Status: Healthy</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                All systems operational. Performance metrics within acceptable ranges.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}