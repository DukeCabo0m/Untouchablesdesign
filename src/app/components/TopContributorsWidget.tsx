import { motion } from 'motion/react';
import { Trophy, Zap, Award, Star } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { COLORS } from '@/app/constants/colors';

interface Contributor {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  points: number;
  badge: {
    name: string;
    color: string;
    icon: 'trophy' | 'zap' | 'award' | 'star';
  };
  contributions: {
    posts: number;
    comments: number;
    shares: number;
  };
}

const contributors: Contributor[] = [
  {
    id: '1',
    rank: 1,
    username: 'KornFreak666',
    avatar: 'KF',
    points: 2847,
    badge: {
      name: 'LÉGENDE',
      color: COLORS.primary,
      icon: 'trophy',
    },
    contributions: {
      posts: 47,
      comments: 189,
      shares: 23,
    },
  },
  {
    id: '2',
    rank: 2,
    username: 'BlindFaith',
    avatar: 'BF',
    points: 1923,
    badge: {
      name: 'HÉROS',
      color: COLORS.primary,
      icon: 'zap',
    },
    contributions: {
      posts: 34,
      comments: 156,
      shares: 18,
    },
  },
  {
    id: '3',
    rank: 3,
    username: 'RottenVain',
    avatar: 'RV',
    points: 1556,
    badge: {
      name: 'CHAMPION',
      color: COLORS.red.pure,
      icon: 'award',
    },
    contributions: {
      posts: 28,
      comments: 134,
      shares: 14,
    },
  },
];

const getBadgeIcon = (icon: string) => {
  switch (icon) {
    case 'trophy':
      return <Trophy size={16} />;
    case 'zap':
      return <Zap size={16} />;
    case 'award':
      return <Award size={16} />;
    case 'star':
      return <Star size={16} />;
    default:
      return <Trophy size={16} />;
  }
};

export function TopContributorsWidget() {
  return (
    <HandDrawnBox
      color="#80808080"
      strokeWidth={3}
      roughness={2.5}
      padding="0"
    >
      <div className="bg-[#000000] p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Trophy size={28} className="text-[#8B0000]" />
          <h3 className="font-black text-lg uppercase tracking-tight text-[#E0E0E0]">
            <GlitchText glitchIntensity="low">Top Contributeurs</GlitchText>
          </h3>
        </div>

        {/* Month indicator */}
        <div className="mb-8">
          <HandDrawnBox
            color={COLORS.red.pure}
            strokeWidth={2}
            roughness={2}
            className="px-4 py-2 bg-[#8B0000]/20 inline-block"
          >
            <span className="font-mono text-sm text-[#E0E0E0] uppercase font-bold">
              Février 2026
            </span>
          </HandDrawnBox>
        </div>

        {/* Contributors List */}
        <div className="space-y-5">
          {contributors.map((contributor, index) => (
            <motion.div
              key={contributor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <HandDrawnBox
                color={contributor.rank === 1 ? COLORS.primary : COLORS.red.pure}
                strokeWidth={contributor.rank === 1 ? 3 : 2}
                roughness={2.5}
                className={`p-5 relative overflow-hidden ${
                  contributor.rank === 1 ? 'bg-[#8B0000]/5' : 'bg-[#0A0A0A]'
                } hover:bg-[#8B0000]/10 transition-colors`}
              >
                {/* Spotlight effect for rank 1 */}
                {contributor.rank === 1 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                <div className="relative flex items-start gap-4">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className={`w-12 h-12 flex items-center justify-center font-black text-xl ${
                        contributor.rank === 1
                          ? 'bg-[#8B0000] text-[#E0E0E0]'
                          : contributor.rank === 2
                          ? 'bg-[#8B0000]/70 text-[#E0E0E0]'
                          : 'bg-[#8B0000]/50 text-[#E0E0E0]'
                      }`}
                      animate={
                        contributor.rank === 1
                          ? {
                              boxShadow: [
                                '0 0 10px rgba(139, 0, 0, 0.5)',
                                '0 0 20px rgba(139, 0, 0, 0.8)',
                                '0 0 10px rgba(139, 0, 0, 0.5)',
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      #{contributor.rank}
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* Username and Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-base font-bold text-[#E0E0E0] group-hover:text-[#8B0000] transition-colors truncate">
                        {contributor.username}
                      </span>
                      <div
                        className="flex items-center gap-1 px-2 py-1"
                        style={{ backgroundColor: contributor.badge.color }}
                      >
                        <span className="text-[#0A0A0A]">
                          {getBadgeIcon(contributor.badge.icon)}
                        </span>
                        <span className="font-mono text-[9px] font-black text-[#0A0A0A]">
                          {contributor.badge.name}
                        </span>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={16} className="text-[#8B0000]" />
                      <span className="font-mono text-xl font-black text-[#E0E0E0]">
                        {contributor.points.toLocaleString()}
                      </span>
                      <span className="font-mono text-xs text-[#E0E0E0]/50">
                        PTS
                      </span>
                    </div>

                    {/* Contributions breakdown */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-[#8B0000]" />
                        <span className="font-mono text-[10px] text-[#E0E0E0]/70">
                          {contributor.contributions.posts} posts
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-[#8B0000]/70" />
                        <span className="font-mono text-[10px] text-[#E0E0E0]/70">
                          {contributor.contributions.comments} coms
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-[#8B0000]/50" />
                        <span className="font-mono text-[10px] text-[#E0E0E0]/70">
                          {contributor.contributions.shares} shares
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </HandDrawnBox>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-[#8B0000]/30">
          <button className="w-full font-mono text-xs text-[#8B0000] hover:text-[#E0E0E0] transition-colors uppercase">
            Voir le classement complet →
          </button>
        </div>
      </div>
    </HandDrawnBox>
  );
}