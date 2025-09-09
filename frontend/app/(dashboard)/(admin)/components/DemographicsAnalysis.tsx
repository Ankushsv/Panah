import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, GraduationCap, UserCheck, Briefcase } from 'lucide-react';
import { Badge } from './ui/badge';

export function DemographicsAnalysis() {
  const branchData = [
    { branch: 'Computer Science', total: 847, critical: 23, moderate: 156, good: 668 },
    { branch: 'Electronics', total: 612, critical: 18, moderate: 94, good: 500 },
    { branch: 'Mechanical', total: 534, critical: 15, moderate: 78, good: 441 },
    { branch: 'Civil', total: 423, critical: 12, moderate: 67, good: 344 },
    { branch: 'Chemical', total: 298, critical: 8, moderate: 45, good: 245 },
    { branch: 'Biotech', total: 133, critical: 4, moderate: 21, good: 108 }
  ];

  const genderData = [
    { name: 'Male', value: 1654, color: '#3b82f6' },
    { name: 'Female', value: 1098, color: '#ec4899' },
    { name: 'Other', value: 95, color: '#10b981' }
  ];

  const yearData = [
    { year: 'First Year', wellbeing: 6.8, stress: 4.5, count: 756 },
    { year: 'Second Year', wellbeing: 7.2, stress: 4.1, count: 689 },
    { year: 'Third Year', wellbeing: 7.4, stress: 3.8, count: 634 },
    { year: 'Fourth Year', wellbeing: 7.6, stress: 3.5, count: 592 },
    { year: 'Graduate', wellbeing: 7.8, stress: 3.2, count: 176 }
  ];

  const categoryData = [
    { category: 'General', total: 1423, critical: 38, percentage: '2.7%' },
    { category: 'OBC', total: 896, critical: 24, percentage: '2.7%' },
    { category: 'SC', total: 342, critical: 11, percentage: '3.2%' },
    { category: 'ST', total: 186, critical: 7, percentage: '3.8%' }
  ];

  const COLORS = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Branch-wise Analysis */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>Branch-wise Mental Health Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-medium text-gray-900 mb-2">{label}</p>
                          <p className="text-sm text-green-600">Good: {data.good} students</p>
                          <p className="text-sm text-yellow-600">Moderate: {data.moderate} students</p>
                          <p className="text-sm text-red-600">Critical: {data.critical} students</p>
                          <p className="text-sm text-gray-600 mt-1">Total: {data.total} students</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="good" stackId="a" fill="#10b981" name="Good" />
                <Bar dataKey="moderate" stackId="a" fill="#f59e0b" name="Moderate" />
                <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-pink-600" />
            <span>Gender Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {genderData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Year-wise Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <span>Year-wise Wellbeing</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {yearData.map((year, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{year.year}</span>
                    <span className="text-xs text-gray-500">{year.count} students</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Wellbeing: {year.wellbeing}/10</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Stress: {year.stress}/10</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  className={`ml-3 ${
                    year.wellbeing >= 7.5 
                      ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                      : year.wellbeing >= 7.0 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                      : 'bg-red-100 text-red-700 hover:bg-red-100'
                  }`}
                >
                  {year.wellbeing >= 7.5 ? 'Good' : year.wellbeing >= 7.0 ? 'Moderate' : 'Needs Attention'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category-wise Analysis */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-orange-600" />
            <span>Category-wise Critical Cases</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categoryData.map((category, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{category.category}</h3>
                  <Badge 
                    className={`text-xs ${
                      parseFloat(category.percentage) < 3.0 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : parseFloat(category.percentage) < 3.5
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                        : 'bg-red-100 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    {category.percentage}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{category.total}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-red-600">{category.critical} critical cases</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 text-sm mb-2">Analysis Summary</h4>
            <p className="text-sm text-blue-700">
              ST category shows slightly higher critical case percentage (3.8%), indicating need for targeted interventions. 
              Overall distribution suggests systemic factors rather than category-specific issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}