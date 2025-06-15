
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(email, password, businessName);
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        onToggleMode(); // Switch to login form
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Google signup failed",
          description: error.message,
          variant: "destructive",
        });
      }
      // Note: For OAuth, the redirect happens automatically
      // The user will be redirected back to the app after authentication
    } catch (error) {
      toast({
        title: "Google signup failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">Start Your Journey</CardTitle>
        <p className="text-slate-600">Create your BizCore account</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Signup Button */}
        <Button
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          variant="outline"
          className="w-full border-2 border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200"
        >
          {googleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Your Business Name"
              required
              className="border-slate-200 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
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
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold transition-all duration-200"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-violet-600 hover:text-violet-800 hover:underline font-medium transition-colors"
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
