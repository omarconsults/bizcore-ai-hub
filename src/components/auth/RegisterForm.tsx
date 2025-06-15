
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import BusinessSetupForm from '@/components/onboarding/BusinessSetupForm';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBusinessSetup, setShowBusinessSetup] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(email, password, '');
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account, then complete your business setup.",
        });
        setShowBusinessSetup(true);
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

  const handleBusinessSetupComplete = (hasExistingBusiness: boolean) => {
    toast({
      title: "Welcome to BizCore!",
      description: hasExistingBusiness 
        ? "Your dashboard has been customized for your existing business."
        : "Your dashboard is ready to guide you through business registration.",
    });
    // The user will be redirected to dashboard by the auth context
  };

  if (showBusinessSetup) {
    return <BusinessSetupForm onComplete={handleBusinessSetupComplete} />;
  }

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">Start Your Journey</CardTitle>
        <p className="text-slate-600">Create your BizCore account</p>
      </CardHeader>
      <CardContent className="space-y-6">
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
