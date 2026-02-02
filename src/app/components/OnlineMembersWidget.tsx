import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Circle } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { COLORS } from '@/app/constants/colors';

interface OnlineMember {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'away';
}

export function OnlineMembersWidget() {
  const [onlineCount, setOnlineCount] = useState(42);
  const [onlineMembers, setOnlineMembers] = useState<OnlineMember[]>([
    { id: '1', username: 'KornFreak666', avatar: 'KF', status: 'online' },
    { id: '2', username: 'BlindFaith', avatar: 'BF', status: 'online' },
    { id: '3', username: 'RottenVain', avatar: 'RV', status: 'away' },
    { id: '4', username: 'FallingAway', avatar: 'FA', status: 'online' },
    { id: '5', username: 'FreakOnLeash', avatar: 'FL', status: 'online' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newCount = Math.max(35, Math.min(50, prev + change));
        return newCount;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HandDrawnBox
      color="#80808080"
      strokeWidth={3}
      roughness={2.5}
      padding="0"
    >
      <div className="bg-[#000000] p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <Users size={28} className="text-[#8B0000]" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-[#8B0000] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <h3 className="font-black text-lg uppercase tracking-tight text-[#E0E0E0]">
            <GlitchText glitchIntensity="low">Membres en ligne</GlitchText>
          </h3>
        </div>

        {/* Online Members List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {onlineMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 hover:bg-[#8B0000]/10 transition-colors rounded-sm group cursor-pointer"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 bg-[#8B0000] flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-[#0A0A0A]">
                      {member.avatar}
                    </span>
                  </div>
                  <Circle
                    size={10}
                    className={`absolute -bottom-0.5 -right-0.5 ${
                      member.status === 'online'
                        ? 'text-[#8B0000] fill-[#8B0000]'
                        : 'text-[#E0E0E0] fill-[#E0E0E0]'
                    }`}
                    strokeWidth={2}
                  />
                </div>

                {/* Username */}
                <span className="font-mono text-sm text-[#E0E0E0] group-hover:text-[#8B0000] transition-colors">
                  {member.username}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-[#8B0000]/30">
          <div className="text-center font-mono text-xs text-[#E0E0E0]/50 uppercase">
            {onlineCount} membres en ligne
          </div>
        </div>
      </div>
    </HandDrawnBox>
  );
}