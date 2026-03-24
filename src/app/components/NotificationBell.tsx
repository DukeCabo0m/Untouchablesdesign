import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, MessageCircle, UserPlus, Award, X } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { COLORS } from '@/app/constants/colors';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Notification {
  id: string;
  type: 'mention' | 'reply' | 'like' | 'follow' | 'comment' | 'article' | 'system';
  message: string;
  time?: string;
  read: boolean;
  link?: string | null;
  fromUsername?: string | null;
  createdAt: string;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'mention':
      return <MessageCircle size={16} className="text-[#8B0000]" />;
    case 'reply':
    case 'comment':
      return <MessageCircle size={16} className="text-[#8B0000]" />;
    case 'follow':
      return <UserPlus size={16} className="text-[#8B0000]" />;
    case 'like':
    case 'article':
    case 'system':
      return <Award size={16} className="text-[#8B0000]" />;
    default:
      return <Bell size={16} className="text-[#8B0000]" />;
  }
};

// Format relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return date.toLocaleDateString('fr-FR');
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch notifications
  const fetchNotifications = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and when dropdown opens
  useEffect(() => {
    fetchNotifications();
    
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/notifications/${id}/read`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/notifications/read-all`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    // Optimistic update
    setNotifications((prev) => prev.filter((n) => n.id !== id));

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/notifications/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-[#8B0000]/10 transition-colors rounded-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell size={24} className="text-[#E0E0E0]" />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-[#8B0000] min-w-[20px] h-5 flex items-center justify-center px-1.5 rounded-full"
          >
            <span className="font-mono text-xs font-black text-[#0A0A0A]">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </motion.div>
        )}

        {/* Pulse animation for new notifications */}
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B0000] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[380px] z-50"
          >
            <HandDrawnBox
              color={COLORS.red.pure}
              strokeWidth={3}
              roughness={2.5}
              className="bg-[#0A0A0A] shadow-2xl"
            >
              {/* Header */}
              <div className="p-4 border-b border-[#8B0000]/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-sm uppercase tracking-tight text-[#E0E0E0]">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="font-mono text-xs text-[#8B0000] hover:text-[#E0E0E0] transition-colors uppercase"
                    >
                      Tout marquer lu
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8B0000] rounded-full" />
                  <span className="font-mono text-xs text-[#E0E0E0]/70">
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-[500px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell size={48} className="text-[#E0E0E0]/20 mx-auto mb-3" />
                    <p className="font-mono text-sm text-[#E0E0E0]/50">
                      Aucune notification
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#8B0000]/20">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 hover:bg-[#8B0000]/10 transition-colors cursor-pointer group relative ${
                          !notification.read ? 'bg-[#8B0000]/5' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-mono text-sm text-[#E0E0E0] mb-2">
                                {notification.message}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <span className="font-mono text-[10px] text-[#E0E0E0]/50">
                              {formatRelativeTime(notification.createdAt)}
                            </span>
                          </div>

                          {/* Delete button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <X
                              size={16}
                              className="text-[#E0E0E0]/50 hover:text-[#8B0000]"
                            />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-4 border-t border-[#8B0000]/30">
                  <button className="w-full font-mono text-xs text-[#8B0000] hover:text-[#E0E0E0] transition-colors uppercase text-center">
                    Voir toutes les notifications →
                  </button>
                </div>
              )}
            </HandDrawnBox>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}