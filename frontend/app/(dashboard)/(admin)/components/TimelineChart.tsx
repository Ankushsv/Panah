import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Badge } from './ui/badge';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export function TimelineChart() {
  const data = [
    { month: 'Jan', wellbeing: 6.8, stress: 4.2, anxiety: 3.8, depression: 2.1, policies: [] },
    { month: 'Feb', wellbeing: 6.9, stress: 4.0, anxiety: 3.6, depression: 2.0, policies: [] },
    { month: 'Mar', wellbeing: 7.1, stress: 3.8, anxiety: 3.4, depression: 1.9, policies: ['Mental Health Week'] },
    { month: 'Apr', wellbeing: 7.3, stress: 3.6, anxiety: 3.2, depression: 1.8, policies: [] },
    { month: 'May', wellbeing: 7.0, stress: 4.5, anxiety: 4.1, depression: 2.3, policies: [] },
    { month: 'Jun', wellbeing: 7.2, stress: 4.2, anxiety: 3.9, depression: 2.1, policies: ['Peer Support Launch'] },
    { month: 'Jul', wellbeing: 7.5, stress: 3.9, anxiety: 3.5, depression: 1.7, policies: [] },
    { month: 'Aug', wellbeing: 7.8, stress: 3.4, anxiety: 3.1, depression: 1.5, policies: ['24/7 Helpline'] },
    { month: 'Sep', wellbeing: 7.6, stress: 3.7, anxiety: 3.3, depression: 1.6, policies: [] },
    { month: 'Oct', wellbeing: 7.4, stress: 3.9, anxiety: 3.5, depression: 1.8, policies: [] },
    { month: 'Nov', wellbeing: 7.7, stress: 3.2, anxiety: 2.9, depression: 1.4, policies: ['AI Therapy Bot'] },
    { month: 'Dec', wellbeing: 8.1, stress: 2.8, anxiety: 2.6, depression: 1.2, policies: [] }
  ];

  const policyImplementations = [
    { month: 'Mar', policy: 'Mental Health Week', impact: '+0.2 wellbeing' },
    { month: 'Jun', policy: 'Peer Support Launch', impact: '+0.3 wellbeing' },
    { month: 'Aug', policy: '24/7 Helpline', impact: '+0.6 wellbeing' },
    { month: 'Nov', policy: 'AI Therapy Bot', impact: '+0.4 wellbeing' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Mental Health Trends Over Time</span>
            </CardTitle>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
              Last 12 Months
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 10]} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const policies = data.find(d => d.month === label)?.policies || [];
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-medium text-gray-900 mb-2">{`${label} 2024`}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {`${entry.name}: ${entry.value}`}
                            </p>
                          ))}
                          {policies.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <p className="text-sm font-medium text-purple-600">Policy Changes:</p>
                              {policies.map((policy, idx) => (
                                <p key={idx} className="text-xs text-gray-600">• {policy}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="wellbeing" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Wellbeing Score"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Stress Level"
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="anxiety" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Anxiety Level"
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="depression" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  name="Depression Level"
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 3 }}
                />
                {/* Policy implementation markers */}
                <ReferenceLine x="Mar" stroke="#10b981" strokeDasharray="2 2" />
                <ReferenceLine x="Jun" stroke="#10b981" strokeDasharray="2 2" />
                <ReferenceLine x="Aug" stroke="#10b981" strokeDasharray="2 2" />
                <ReferenceLine x="Nov" stroke="#10b981" strokeDasharray="2 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Wellbeing Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Stress Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Anxiety Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-gray-600">Depression Level</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span>Policy Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policyImplementations.map((policy, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{policy.policy}</h4>
                  <p className="text-xs text-gray-600">{policy.month} 2024</p>
                  <Badge className="mt-1 text-xs bg-green-100 text-green-700 hover:bg-green-100">
                    {policy.impact}
                  </Badge>
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 text-sm">Key Insight</h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Policy implementations show consistent positive impact on student wellbeing, 
                    with the 24/7 helpline showing the strongest correlation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}