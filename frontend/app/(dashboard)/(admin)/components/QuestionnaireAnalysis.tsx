import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FileText, Users, Clock, TrendingUp, AlertCircle, CheckCircle, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function QuestionnaireAnalysis() {
  const recentResponses = [
    {
      id: 'QR-2024-1247',
      studentId: 'CS21B1034',
      name: 'Rajesh Kumar',
      branch: 'Computer Science',
      year: '3rd Year',
      timestamp: '2 hours ago',
      score: 6.2,
      riskLevel: 'Moderate',
      questionnaire: 'PHQ-9 Depression Scale',
      responses: {
        mood: 3,
        sleep: 4,
        appetite: 2,
        concentration: 4,
        energy: 3
      }
    },
    {
      id: 'QR-2024-1246',
      studentId: 'ME21B0892',
      name: 'Priya Sharma',
      branch: 'Mechanical',
      year: '3rd Year',
      timestamp: '3 hours ago',
      score: 8.1,
      riskLevel: 'Low',
      questionnaire: 'GAD-7 Anxiety Scale',
      responses: {
        worry: 2,
        restless: 1,
        irritable: 2,
        fearful: 1,
        trouble_relaxing: 2
      }
    },
    {
      id: 'QR-2024-1245',
      studentId: 'EC21B0567',
      name: 'Amit Patel',
      branch: 'Electronics',
      year: '3rd Year',
      timestamp: '5 hours ago',
      score: 4.8,
      riskLevel: 'Critical',
      questionnaire: 'Stress Scale',
      responses: {
        overwhelmed: 5,
        coping: 2,
        support: 3,
        confidence: 2,
        optimism: 2
      }
    },
    {
      id: 'QR-2024-1244',
      studentId: 'CV21B0234',
      name: 'Sneha Reddy',
      branch: 'Civil',
      year: '2nd Year',
      timestamp: '1 day ago',
      score: 7.5,
      riskLevel: 'Low',
      questionnaire: 'Wellbeing Index',
      responses: {
        happiness: 4,
        satisfaction: 4,
        relationships: 3,
        purpose: 4,
        achievement: 3
      }
    }
  ];

  const questionnaireStats = [
    {
      name: 'PHQ-9 Depression Scale',
      totalResponses: 1247,
      avgScore: 6.8,
      completionRate: 89.2,
      criticalCases: 23,
      lastUpdated: '2 hours ago'
    },
    {
      name: 'GAD-7 Anxiety Scale',
      totalResponses: 1156,
      avgScore: 7.1,
      completionRate: 85.4,
      criticalCases: 18,
      lastUpdated: '3 hours ago'
    },
    {
      name: 'Stress Assessment',
      totalResponses: 1089,
      avgScore: 6.9,
      completionRate: 91.7,
      criticalCases: 31,
      lastUpdated: '1 hour ago'
    },
    {
      name: 'Wellbeing Index',
      totalResponses: 1345,
      avgScore: 7.3,
      completionRate: 93.1,
      criticalCases: 15,
      lastUpdated: '30 minutes ago'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Low': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Questionnaire Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {questionnaireStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stat.totalResponses}</span>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    {stat.completionRate}%
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Score:</span>
                    <span className={`font-medium ${getScoreColor(stat.avgScore)}`}>
                      {stat.avgScore}/10
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Critical Cases:</span>
                    <span className="font-medium text-red-600">{stat.criticalCases}</span>
                  </div>
                  
                  <Progress value={stat.completionRate} className="h-2" />
                  
                  <p className="text-xs text-gray-500">{stat.lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Responses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Recent Questionnaire Responses</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentResponses.map((response, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{response.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {response.studentId}
                      </Badge>
                      <Badge className={`text-xs ${getRiskColor(response.riskLevel)}`}>
                        {response.riskLevel} Risk
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>{response.branch}</span>
                      <span>•</span>
                      <span>{response.year}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{response.timestamp}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{response.questionnaire}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(response.score)} mb-1`}>
                      {response.score}/10
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
                
                {/* Response Summary */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Response Summary:</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {Object.entries(response.responses).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-xs text-gray-500 capitalize mb-1">
                          {key.replace('_', ' ')}
                        </p>
                        <div className={`text-sm font-medium ${
                          value >= 4 ? 'text-red-600' : 
                          value >= 3 ? 'text-yellow-600' : 
                          'text-green-600'
                        }`}>
                          {value}/5
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {response.riskLevel === 'Critical' && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-700 font-medium">
                        Immediate attention required - Schedule counseling session
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Response Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-green-900">Completion Rate</h4>
                  <p className="text-sm text-green-700">+5.2% this month</p>
                </div>
                <div className="text-2xl font-bold text-green-600">89.7%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-900">Average Response Time</h4>
                  <p className="text-sm text-blue-700">-2.3 minutes this month</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">8.4 min</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-purple-900">Quality Score</h4>
                  <p className="text-sm text-purple-700">+0.3 points this month</p>
                </div>
                <div className="text-2xl font-bold text-purple-600">8.7/10</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-indigo-600" />
              <span>Action Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 text-sm">Critical Cases Follow-up</h4>
                  <p className="text-xs text-red-700 mt-1">87 students need immediate counseling</p>
                  <Button size="sm" className="mt-2 h-7 bg-red-600 hover:bg-red-700">
                    Schedule Sessions
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-900 text-sm">Pending Responses</h4>
                  <p className="text-xs text-yellow-700 mt-1">234 students haven't completed this week's assessment</p>
                  <Button size="sm" variant="outline" className="mt-2 h-7">
                    Send Reminders
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 text-sm">Group Intervention</h4>
                  <p className="text-xs text-blue-700 mt-1">45 students showing similar stress patterns</p>
                  <Button size="sm" variant="outline" className="mt-2 h-7">
                    Plan Workshop
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}