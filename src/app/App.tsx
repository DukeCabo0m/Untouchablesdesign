import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { AlertProvider } from '@/app/contexts/AlertContext';

export default function App() {
  return (
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  );
}