
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminContent from '@/components/admin/AdminContent';

const Admin = () => {
  const { user, loading } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');

  // Check if user is admin (you can modify this logic based on your admin detection)
  const isAdmin = user?.email?.includes('admin') || user?.user_metadata?.role === 'admin';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 overflow-auto">
        <AdminContent activeModule={activeModule} />
      </div>
    </div>
  );
};

export default Admin;
