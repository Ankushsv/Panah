'use client';
import { useState, useEffect } from 'react';
import { AuthProvider } from '@/components/AuthProvider';
import { useProtectedRoute } from '@/app/hooks/useProtectedRoute';
import { AuthPage } from '@/components/AuthPage';
import { AdminNavbar } from '@/app/(dashboard)/(admin)/components/AdminNavbar';
import { AdminSidebar } from '@/app/(dashboard)/(admin)/components/AdminSidebar';
import { OverviewDashboard } from '@/app/(dashboard)/(admin)/components/OverviewDashboard';
import { TimelineChart } from '@/app/(dashboard)/(admin)/components/TimelineChart';
import { QuestionnaireAnalysis } from '@/app/(dashboard)/(admin)/components/QuestionnaireAnalysis';
import { CommonProblems } from '@/app/(dashboard)/(admin)/components/CommonProblems';
import { DemographicsAnalysis } from '@/app/(dashboard)/(admin)/components/DemographicsAnalysis';
import { MentalStatesTracking } from '@/app/(dashboard)/(admin)/components/MentalStatesTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/(dashboard)/(admin)/components/ui/card';
import { Badge } from '@/app/(dashboard)/(admin)/components/ui/badge';
import { Button } from '@/app/(dashboard)/(admin)/components/ui/button';
import { 
  AlertTriangle, 
  Calendar, 
  Shield, 
  Settings, 
  HelpCircle,
  Activity,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { projectId, publicAnonKey } from '@/utils/supabase/info';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useProtectedRoute();

  // Record login when user accesses dashboard
  useEffect(() => {
    if (user) {
      const recordLogin = async () => {
        try {
          const { makeAuthenticatedRequest } = await import('@/utils/api');
          await makeAuthenticatedRequest('/admin/login', { method: 'POST' });
        } catch (err) {
          console.error('Failed to record login:', err);
        }
      };
      recordLogin();
    }
  }, [user]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'timeline':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Mental Health Timeline Analysis</h1>
              <p className="text-gray-600">Track mental health trends over time and measure policy impact</p>
            </div>
            <TimelineChart />
          </div>
        );
      case 'questionnaires':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Questionnaire Responses</h1>
              <p className="text-gray-600">Individual assessment responses and analysis</p>
            </div>
            <QuestionnaireAnalysis />
          </div>
        );
      case 'problems':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Common Student Problems</h1>
              <p className="text-gray-600">Analysis of frequently reported issues and intervention strategies</p>
            </div>
            <CommonProblems />
          </div>
        );
      case 'demographics':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Demographics Analysis</h1>
              <p className="text-gray-600">Mental health data segmented by branch, gender, year, and category</p>
            </div>
            <DemographicsAnalysis />
          </div>
        );
      case 'mental-states':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Individual Mental State Tracking</h1>
              <p className="text-gray-600">Monitor and manage individual student mental health states</p>
            </div>
            <MentalStatesTracking />
          </div>
        );
      case 'alerts':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Critical Mental Health Alerts</h1>
              <p className="text-gray-600">Urgent cases requiring immediate attention</p>
            </div>
            <CriticalAlerts />
          </div>
        );
      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Counseling Appointments</h1>
              <p className="text-gray-600">Schedule and manage mental health counseling sessions</p>
            </div>
            <AppointmentManagement />
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Privacy & Security</h1>
              <p className="text-gray-600">Data protection and compliance management</p>
            </div>
            <PrivacySecurity />
          </div>
        );
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Additional components for complete functionality
function CriticalAlerts() {
  const criticalCases = [
    {
      id: 'CRIT-001',
      student: 'Amit Kumar',
      studentId: 'CS21B1045',
      riskLevel: 'Critical',
      lastContact: '6 hours ago',
      issue: 'Severe depression indicators, missed classes for 3 days',
      assignedCounselor: 'Dr. Sarah Wilson',
      actionTaken: 'Emergency counseling scheduled',
      priority: 1
    },
    {
      id: 'CRIT-002',
      student: 'Lisa Chen',
      studentId: 'EC21B0892',
      riskLevel: 'High',
      lastContact: '2 hours ago',
      issue: 'Anxiety attacks, academic pressure',
      assignedCounselor: 'Dr. Mike Johnson',
      actionTaken: 'Daily check-ins initiated',
      priority: 2
    },
    {
      id: 'CRIT-003',
      student: 'Rahul Patel',
      studentId: 'ME21B0456',
      riskLevel: 'Critical',
      lastContact: '1 day ago',
      issue: 'Substance abuse concerns, social isolation',
      assignedCounselor: 'Dr. Emily Davis',
      actionTaken: 'Medical referral sent',
      priority: 1
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>High Priority Cases</span>
            <Badge className="bg-red-600 text-white ml-2">
              {criticalCases.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalCases.map((case_, index) => (
              <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{case_.student}</h4>
                      <Badge variant="outline">{case_.studentId}</Badge>
                      <Badge className="bg-red-600 text-white">Priority {case_.priority}</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{case_.issue}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Assigned Counselor:</span>
                        <p className="font-medium">{case_.assignedCounselor}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Contact:</span>
                        <p className="font-medium">{case_.lastContact}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-600">Action Taken:</span>
                      <p className="text-sm text-green-700">{case_.actionTaken}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Contact Now
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AppointmentManagement() {
  const appointments = [
    {
      time: '09:00 AM',
      student: 'Priya Sharma',
      counselor: 'Dr. Sarah Wilson',
      type: 'Individual Therapy',
      status: 'Confirmed'
    },
    {
      time: '10:30 AM',
      student: 'Rajesh Kumar',
      counselor: 'Dr. Mike Johnson',
      type: 'Crisis Intervention',
      status: 'Emergency'
    },
    {
      time: '02:00 PM',
      student: 'Sneha Patel',
      counselor: 'Dr. Emily Davis',
      type: 'Follow-up Session',
      status: 'Confirmed'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{apt.time}</p>
                    <p className="text-sm text-gray-600">{apt.student}</p>
                    <p className="text-xs text-gray-500">{apt.type}</p>
                  </div>
                  <Badge className={
                    apt.status === 'Emergency' ? 'bg-red-600 text-white' : 
                    'bg-green-100 text-green-700 hover:bg-green-100'
                  }>
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Counselor Availability</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Dr. Sarah Wilson</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Available</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Dr. Mike Johnson</span>
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Busy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Dr. Emily Davis</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Available</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-orange-600" />
              <span>Quick Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Today's Sessions:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Week:</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Utilization Rate:</span>
                <span className="font-medium text-green-600">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PrivacySecurity() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Data Protection Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Encryption Status</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>GDPR Compliance</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Compliant
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Access Logs</span>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <Activity className="w-3 h-3 mr-1" />
                  Monitored
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Retention</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <Clock className="w-3 h-3 mr-1" />
                  Compliant
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>System Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                Configure Access Permissions
              </Button>
              <Button className="w-full" variant="outline">
                Data Export Settings
              </Button>
              <Button className="w-full" variant="outline">
                Audit Trail Configuration
              </Button>
              <Button className="w-full" variant="outline">
                Backup & Recovery Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useProtectedRoute();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage  />;
  }

  return <AdminDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}