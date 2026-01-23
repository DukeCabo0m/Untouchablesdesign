import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert, AlertType } from '@/app/components/AlertMessage';

interface AlertContextType {
  alerts: Alert[];
  addAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((type: AlertType, message: string) => {
    const id = `alert-${Date.now()}-${Math.random()}`;
    const newAlert: Alert = { id, type, message };
    
    setAlerts((prev) => [...prev, newAlert]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
