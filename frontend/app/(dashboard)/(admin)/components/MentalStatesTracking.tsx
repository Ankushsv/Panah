import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Brain, User, AlertTriangle, TrendingUp, TrendingDown, Calendar, Eye, MessageCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function MentalStatesTracking() {
  const individualStates = [
    {
      id: 'STU001',
      name: 'Arjun Mehta',
      studentId: 'CS21B1034',
      branch: 'Computer Science',
      year: '3rd Year',
      currentState: 'At Risk',
      wellbeingScore: 4.2,
      lastAssessment: '2 days ago',
      trend: 'declining',
      trendValue: '-1.3',
      riskFactors: ['Academic Pressure', 'Social Isolation', 'Sleep Issues'],
      interventions: ['Counseling Scheduled', 'Peer Support Assigned'],
      avatar: null,
      priority: 'High'
    },
    {
      id: 'STU002',
      name: 'Priya Singh',
      studentId: 'EC21B0892',
      branch: 'Electronics',
      year: '2nd Year',
      currentState: 'Stable',
      wellbeingScore: 7.1,
      lastAssessment: '1 day ago',
      trend: 'improving',
      trendValue: '+0.8',
      riskFactors: ['Career Uncertainty'],
      interventions: ['Career Guidance'],
      avatar: null,
      priority: 'Medium'
    },
    {
      id: 'STU003',
      name: 'Karthik Kumar',
      studentId: 'ME21B0456',
      branch: 'Mechanical',
      year: '4th Year',
      currentState: 'Critical',
      wellbeingScore: 3.1,
      lastAssessment: '4 hours ago',
      trend: 'declining',
      trendValue: '-2.1',
      riskFactors: ['Depression', 'Financial Stress', 'Family Issues'],
      interventions: ['Emergency Counseling', 'Medical Referral', 'Financial Aid'],
      avatar: null,
      priority: 'Critical'
    },
    {
      id: 'STU004',
      name: 'Sneha Patel',
      studentId: 'CV21B0234',
      branch: 'Civil',
      year: '1st Year',
      currentState: 'Good',
      wellbeingScore: 8.3,
      lastAssessment: '3 days ago',
      trend: 'stable',
      trendValue: '+0.1',
      riskFactors: [],
      interventions: ['Preventive Check-in'],
      avatar: null,
      priority: 'Low'
    },
    {
      id: 'STU005',
      name: 'Rahul Sharma',
      studentId: 'CH21B0567',
      branch: 'Chemical',
      year: '3rd Year',
      currentState: 'Moderate Risk',
      wellbeingScore: 5.8,
      lastAssessment: '1 day ago',
      trend: 'improving',
      trendValue: '+0.5',
      riskFactors: ['Anxiety', 'Academic Pressure'],
      interventions: ['Stress Management Workshop'],
      avatar: null,
      priority: 'Medium'
    }
  ];

  const stateDistribution = [
    { state: 'Critical', count: 87, percentage: 3.1, color: 'bg-red-500' },
    { state: 'At Risk', count: 234, percentage: 8.2, color: 'bg-orange-500' },
    { state: 'Moderate Risk', count: 456, percentage: 16.0, color: 'bg-yellow-500' },
    { state: 'Stable', count: 1234, percentage: 43.4, color: 'bg-blue-500' },
    { state: 'Good', count: 836, percentage: 29.3, color: 'bg-green-500' }
  ];

  const recentAlerts = [
    {
      id: 'ALT001',
      student: 'Amit Verma (ME21B0789)',
      alert: 'Sudden drop in wellbeing score',
      severity: 'High',
      timestamp: '15 minutes ago',
      action: 'Counselor notified'
    },
    {
      id: 'ALT002',
      student: 'Lisa Chen (CS21B0123)',
      alert: 'Missed 3 consecutive assessments',
      severity: 'Medium',
      timestamp: '2 hours ago',
      action: 'Reminder sent'
    },
    {
      id: 'ALT003',
      student: 'David Kumar (EC21B0456)',
      alert: 'Critical mental state flagged',
      severity: 'Critical',
      timestamp: '3 hours ago',
      action: 'Emergency protocol activated'
    }
  ];

  const getStateColor = (state: string) => {
    switch (state) {
      case 'Critical': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'At Risk': return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'Moderate Risk': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Stable': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Good': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-600 text-white';
      case 'Medium': return 'bg-yellow-600 text-white';
      case 'Low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Mental State Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Mental State Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stateDistribution.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{item.count}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{item.state}</h4>
                <p className="text-sm text-gray-600">{item.percentage}% of students</p>
                <Progress value={item.percentage} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Mental States */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-indigo-600" />
              <span>Individual Mental State Tracking</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              View All Students
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {individualStates.map((student, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="bg-purple-600 text-white">
                        {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {student.studentId}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(student.priority)}`}>
                          {student.priority}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>{student.branch}</span>
                        <span>•</span>
                        <span>{student.year}</span>
                        <span>•</span>
                        <span>Last assessment: {student.lastAssessment}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge className={`text-sm ${getStateColor(student.currentState)}`}>
                          {student.currentState}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Wellbeing:</span>
                          <span className={`font-bold ${getScoreColor(student.wellbeingScore)}`}>
                            {student.wellbeingScore}/10
                          </span>
                          <div className="flex items-center space-x-1">
                            {student.trend === 'improving' ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : student.trend === 'declining' ? (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            ) : (
                              <div className="w-4 h-1 bg-gray-400 rounded"></div>
                            )}
                            <span className={`text-sm ${
                              student.trend === 'improving' ? 'text-green-600' : 
                              student.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {student.trendValue}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {student.riskFactors.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Risk Factors:</h5>
                          <div className="flex flex-wrap gap-1">
                            {student.riskFactors.map((factor, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-red-50 text-red-700">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Active Interventions:</h5>
                        <div className="flex flex-wrap gap-1">
                          {student.interventions.map((intervention, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              {intervention}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                    {student.priority === 'Critical' && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Emergency
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Recent Mental Health Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'Critical' ? 'border-red-500 bg-red-50' :
                alert.severity === 'High' ? 'border-orange-500 bg-orange-50' :
                'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{alert.student}</h4>
                      <Badge className={`text-xs ${
                        alert.severity === 'Critical' ? 'bg-red-600 text-white' :
                        alert.severity === 'High' ? 'bg-orange-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.alert}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </span>
                      <span>Action: {alert.action}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}