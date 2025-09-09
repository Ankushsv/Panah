import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from './AuthProvider';
import { Heart, Mail, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showAdminSignup, setShowAdminSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    adminKey: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }
        if (!formData.name.trim()) {
          setError('Name is required');
          return;
        }

        // Check admin key if admin signup is selected
        if (showAdminSignup) {
          const validAdminKeys = ['ADMIN_KEY_2024', 'SUPER_ADMIN_123']; // In production, store this securely
          if (!formData.adminKey || !validAdminKeys.includes(formData.adminKey)) {
            setError('Invalid admin registration key');
            return;
          }
        }

        const result = await signUp(
          formData.email, 
          formData.password, 
          formData.name
        );
        
        if (result.error) {
          setError(result.error);
        } else if (result.user) {
          // Redirect based on user role after successful signup
          if (result.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/users');
          }
        }
      } else {
        const result = await signIn(formData.email, formData.password);
        if (result.error) {
          setError(result.error);
        } else if (result.user) {
          // Redirect based on user role after successful signin
          if (result.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/users');
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setIsSignUp(!isSignUp);
    setShowAdminSignup(false);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      adminKey: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-purple-600 rounded-lg p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl text-purple-600">Panah</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl">
              {isSignUp ? (showAdminSignup ? 'Create Admin Account' : 'Create Your Account') : 'Welcome Back'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isSignUp 
                ? (showAdminSignup ? 'Register as an administrator' : 'Start your mental health journey with us')
                : 'Continue your wellness journey'
              }
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center">
              {isSignUp ? (showAdminSignup ? 'Admin Sign Up' : 'Sign Up') : 'Sign In'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {isSignUp && showAdminSignup && (
                <div className="space-y-2">
                  <Label htmlFor="adminKey">Admin Registration Key</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="adminKey"
                      name="adminKey"
                      type="text"
                      placeholder="Enter admin key"
                      value={formData.adminKey}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Contact your system administrator for the registration key
                  </p>
                </div>
              )}

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {isSignUp 
                        ? (showAdminSignup ? 'Creating Admin Account...' : 'Creating Account...') 
                        : 'Signing In...'
                      }
                    </span>
                  </div>
                ) : (
                  isSignUp 
                    ? (showAdminSignup ? 'Create Admin Account' : 'Create Account')
                    : 'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-2">
              {/* Admin Signup Toggle (only show during signup) */}
              {isSignUp && (
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAdminSignup(!showAdminSignup)}
                    className="text-sm text-gray-600 hover:text-gray-700"
                  >
                    {showAdminSignup ? (
                      <span className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Sign up as regular user</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <Shield className="h-4 w-4" />
                        <span>Sign up as admin</span>
                      </span>
                    )}
                  </Button>
                </div>
              )}
              
              {/* Sign In/Up Toggle */}
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={resetForm}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"
                  }
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Key Info Card */}
        {isSignUp && showAdminSignup && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-orange-600" />
                <h3 className="text-sm font-medium text-orange-800">Admin Registration</h3>
              </div>
              <p className="text-xs text-orange-700">
                Admin accounts require a special registration key for security purposes. 
                Contact your system administrator to obtain the key.
              </p>
              {/* For development purposes - remove in production */}
              <div className="mt-2 p-2 bg-orange-100 rounded text-xs text-orange-800">
                <strong>Dev Mode:</strong> Try "ADMIN_KEY_2024" or "SUPER_ADMIN_123"
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Preview */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-purple-800 mb-3">What's included:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-purple-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>AI Mental Health Companion</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Personal Journal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Community Forum</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Video Library</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Mental Health Assessments</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Resource Directory</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}