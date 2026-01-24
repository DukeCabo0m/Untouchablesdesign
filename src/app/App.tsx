import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { AlertProvider } from '@/app/contexts/AlertContext';
import { AuthProvider } from '@/app/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </AuthProvider>
  );
}