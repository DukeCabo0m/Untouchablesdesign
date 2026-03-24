import { Outlet } from 'react-router';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { AlertProvider } from '@/app/contexts/AlertContext';

export function AdminLayout() {
  return (
    <AuthProvider>
      <AlertProvider>
        <div className="min-h-screen bg-[#0A0A0A]">
          <Outlet />
        </div>
      </AlertProvider>
    </AuthProvider>
  );
}