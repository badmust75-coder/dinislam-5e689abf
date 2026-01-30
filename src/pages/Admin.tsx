import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, Moon, Bell, BarChart3 } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminStudents from '@/components/admin/AdminStudents';
import AdminContent from '@/components/admin/AdminContent';
import AdminNotifications from '@/components/admin/AdminNotifications';

const Admin = () => {
  const { isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <AppLayout title="Administration">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-2 border-gold border-t-transparent rounded-full" />
        </div>
      </AppLayout>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout title="Administration">
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex flex-col items-center gap-1 py-2">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Tableau</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex flex-col items-center gap-1 py-2">
              <Users className="h-4 w-4" />
              <span className="text-xs">Élèves</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex flex-col items-center gap-1 py-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs">Contenu</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col items-center gap-1 py-2">
              <Bell className="h-4 w-4" />
              <span className="text-xs">Notifs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="students">
            <AdminStudents />
          </TabsContent>

          <TabsContent value="content">
            <AdminContent />
          </TabsContent>

          <TabsContent value="notifications">
            <AdminNotifications />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
