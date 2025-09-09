import { Bell, Search, Settings, User, LogOut, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { useAuth } from '../hooks/useAuth';

export function AdminNavbar() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-2 rounded-lg">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">P</span>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Panah Admin</h1>
          <p className="text-sm text-gray-500">Mental Health Analytics Dashboard</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search students, reports, or analytics..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Export Button */}
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] text-xs bg-red-500 text-white border-0">
              3
            </Badge>
          </Button>
        </div>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>

        {/* Admin Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-admin.jpg" alt="Admin" />
                <AvatarFallback className="bg-purple-600 text-white">
                  {user?.user_metadata?.name 
                    ? user.user_metadata.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                    : 'AD'
                  }
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">
                {user?.user_metadata?.name || 'Admin User'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || 'admin@panah.edu'}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}