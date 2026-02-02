import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, MessageCircle, UserPlus, Award, X } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { COLORS } from '@/app/constants/colors';

interface Notification {
  id: string;
  type: 'mention' | 'reply' | 'follow' | 'badge';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'mention',
    title: 'KornFreak666 vous a mentionné',
    message: 'Dans "Discussion sur le nouvel album"',
    time: 'Il y a 5 min',
    read: false,
  },
  {
    id: '2',
    type: 'reply',
    title: 'Nouvelle réponse',
    message: 'BlindFaith a répondu à votre commentaire',
    time: 'Il y a 23 min',
    read: false,
  },
  {
    id: '3',
    type: 'badge',
    title: 'Nouveau badge débloqué !',
    message: 'Vous avez obtenu "Vétéran" (100+ posts)',
    time: 'Il y a 1h',
    read: false,
  },
  {
    id: '4',
    type: 'follow',
    title: 'Nouveau follower',
    message: 'RottenVain suit maintenant votre profil',
    time: 'Il y a 3h',
    read: true,
  },
  {
    id: '5',
    type: 'reply',
    title: 'Nouvelle réponse',
    message: 'FallingAway a répondu à votre post',
    time: 'Il y a 5h',
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'mention':
      return <MessageCircle size={16} className="text-[#8B0000]" />;
    case 'reply':
      return <MessageCircle size={16} className="text-[#8B0000]" />;
    case 'follow':
      return <UserPlus size={16} className="text-[#8B0000]" />;
    case 'badge':
      return <Award size={16} className="text-[#8B0000]" />;
    default:
      return <Bell size={16} className="text-[#8B0000]" />;
  }
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
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
                              <h4 className="font-mono text-sm font-bold text-[#E0E0E0] mb-1">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="font-mono text-xs text-[#E0E0E0]/70 mb-2">
                              {notification.message}
                            </p>
                            <span className="font-mono text-[10px] text-[#E0E0E0]/50">
                              {notification.time}
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