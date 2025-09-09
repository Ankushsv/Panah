import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  MessageSquare, 
  AlertTriangle,
  Settings,
  HelpCircle,
  Brain,
  Calendar,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      description: 'Dashboard summary'
    },
    {
      id: 'timeline',
      label: 'Mental Health Timeline',
      icon: TrendingUp,
      description: 'Trends & policy impact'
    },
    {
      id: 'questionnaires',
      label: 'Questionnaire Responses',
      icon: FileText,
      description: 'Individual assessments',
      badge: '24'
    },
    {
      id: 'problems',
      label: 'Common Problems',
      icon: MessageSquare,
      description: 'Student issues analysis'
    },
    {
      id: 'demographics',
      label: 'Demographics',
      icon: Users,
      description: 'Population breakdown'
    },
    {
      id: 'mental-states',
      label: 'Mental States',
      icon: Brain,
      description: 'Individual tracking'
    },
    {
      id: 'alerts',
      label: 'Critical Alerts',
      icon: AlertTriangle,
      description: 'Urgent cases',
      badge: '7',
      urgent: true
    }
  ];

  const bottomItems = [
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      description: 'Counseling schedule'
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      icon: Shield,
      description: 'Data protection'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System configuration'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      description: 'Documentation'
    }
  ];

  const renderMenuItem = (item: any) => (
    <Button
      key={item.id}
      variant={activeTab === item.id ? 'secondary' : 'ghost'}
      className={cn(
        'w-full justify-start h-auto py-3 px-3 mb-1',
        activeTab === item.id && 'bg-purple-50 text-purple-700 border-purple-200'
      )}
      onClick={() => onTabChange(item.id)}
    >
      <div className="flex items-center w-full">
        <item.icon className={cn(
          'w-5 h-5 mr-3',
          activeTab === item.id ? 'text-purple-600' : 'text-gray-500'
        )} />
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge && (
              <Badge 
                variant={item.urgent ? 'destructive' : 'secondary'} 
                className="text-xs px-2 py-0.5 ml-2"
              >
                {item.badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
        </div>
      </div>
    </Button>
  );

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Main Navigation */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 px-3">Analytics Dashboard</h2>
          <div className="space-y-1">
            {menuItems.map(renderMenuItem)}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 px-3">Management</h2>
          <div className="space-y-1">
            {bottomItems.map(renderMenuItem)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">AI Insights</p>
              <p className="text-xs text-gray-600">Get personalized recommendations</p>
              <Button size="sm" className="mt-2 text-xs h-7 bg-purple-600 hover:bg-purple-700">
                View Insights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}