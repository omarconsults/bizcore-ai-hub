
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle } from 'lucide-react';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const getErrorMessage = (error: any) => {
    console.log('Full error object:', error);
    
    // Handle timeout errors specifically
    if (error?.status === 504 || error?.name === 'AuthRetryableFetchError') {
      return "Server is temporarily overloaded. Please try again in a few moments.";
    }
    
    // Handle other specific auth errors
    if (error?.message) {
      if (error.message.includes('already registered')) {
        return "This email is already registered. Try signing in instead.";
      }
      if (error.message.includes('invalid email')) {
        return "Please enter a valid email address.";
      }
      if (error.message.includes('password')) {
        return "Password must be at least 6 characters long.";
      }
      return error.message;
    }
    
    return "Registration failed. Please check your connection and try again.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, '');
      
      if (error) {
        const errorMessage = getErrorMessage(error);
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive",
        });
        
        // If it's a timeout error, suggest trying again
        if (error?.status === 504) {
          setTimeout(() => {
            toast({
              title: "Try again",
              description: "The server should be less busy now. You can try registering again.",
            });
          }, 3000);
        }
      } else {
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account before you can proceed.",
        });
      }
    } catch (error: any) {
      console.error('Unexpected registration error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">Start Your Journey</CardTitle>
        <p className="text-slate-600">Create your BizCore account</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Show a warning about email verification */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Email Verification Required</p>
            <p>You'll need to verify your email address before you can access your account.</p>
          </div>
        </div>

        {/* Show server status warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Server Status</p>
            <p>If registration fails, our servers might be busy. Please wait a moment and try again.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="border-slate-200 focus:border-violet-500 focus:ring-violet-500"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              minLength={6}
              className="border-slate-200 focus:border-violet-500 focus:ring-violet-500"
              disabled={loading}
            />
            <p className="text-xs text-slate-500">Must be at least 6 characters long</p>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold transition-all duration-200"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors"
              disabled={loading}
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
