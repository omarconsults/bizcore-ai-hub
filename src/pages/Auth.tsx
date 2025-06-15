
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Footer from '@/components/Footer';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">BizCore</h1>
            <p className="text-cyan-400 font-medium">Powered by AI</p>
          </div>
          
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <RegisterForm onToggleMode={toggleMode} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
