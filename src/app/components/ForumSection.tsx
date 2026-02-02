import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { MessageSquare, Users, Clock, Eye } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';
import { HandDrawnBox } from './HandDrawnBox';
import { HandDrawnLine } from './HandDrawnLine';

const forumCategories = [
  {
    id: 1,
    title: 'DISCUSSIONS GÉNÉRALES',
    topics: 1248,
    posts: 15632,
    lastPost: {
      title: 'Votre morceau préféré de "Requiem" ?',
      author: 'KoRnHead_89',
      time: '5 min',
    },
  },
  {
    id: 2,
    title: 'ANALYSES & THÉORIES',
    topics: 427,
    posts: 8941,
    lastPost: {
      title: 'Le symbolisme derrière "Freak on a Leash"',
      author: 'TheoryMaster',
      time: '23 min',
    },
  },
  {
    id: 3,
    title: 'CONCERTS & ÉVÉNEMENTS',
    topics: 892,
    posts: 12074,
    lastPost: {
      title: 'Paris 2026 - Qui sera présent ?',
      author: 'LiveMusic_Fr',
      time: '1h',
    },
  },
  {
    id: 4,
    title: 'CRÉATIONS COMMUNAUTAIRES',
    topics: 634,
    posts: 7523,
    lastPost: {
      title: 'Ma cover de "Blind" (guitare)',
      author: 'RiffMaster',
      time: '2h',
    },
  },
];

const recentTopics = [
  { title: 'Jonathan Davis annonce un projet solo surprise', replies: 47, views: 892, time: '12 min' },
  { title: 'Classement : Tous les albums de Korn du pire au meilleur', replies: 156, views: 3421, time: '34 min' },
  { title: 'Recherche personnes pour covoiturage concert Paris', replies: 23, views: 445, time: '1h' },
  { title: 'Discussion : L\'influence de Korn sur le nu-metal moderne', replies: 89, views: 1876, time: '3h' },
];

export function ForumSection() {
  return (
    <section id="forum" className="relative py-32 px-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-7xl font-black text-[#E0E0E0] tracking-tighter uppercase mb-4"
              style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
            >
              <GlitchText glitchIntensity="high">FORUM</GlitchText>
            </h2>
            <div className="h-[2px] w-32 bg-[#8B0000]" />
          </motion.div>
        </div>

        {/* Forum Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            className="p-6 bg-[#0A0A0A]"
          >
            <p className="font-mono text-xs text-[#8B0000] mb-2">MEMBRES ACTIFS</p>
            <p className="text-3xl font-black text-[#E0E0E0]">8,547</p>
          </HandDrawnBox>
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            className="p-6 bg-[#0A0A0A]"
          >
            <p className="font-mono text-xs text-[#8B0000] mb-2">SUJETS TOTAUX</p>
            <p className="text-3xl font-black text-[#E0E0E0]">3,201</p>
          </HandDrawnBox>
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            className="p-6 bg-[#0A0A0A]"
          >
            <p className="font-mono text-xs text-[#8B0000] mb-2">MESSAGES TOTAUX</p>
            <p className="text-3xl font-black text-[#E0E0E0]">44,170</p>
          </HandDrawnBox>
          <HandDrawnBox
            color="#8B0000"
            strokeWidth={3}
            roughness={2.5}
            className="p-6 bg-[#0A0A0A]"
          >
            <p className="font-mono text-xs text-[#8B0000] mb-2">EN LIGNE</p>
            <p className="text-3xl font-black text-[#E0E0E0]">127</p>
          </HandDrawnBox>
        </motion.div>

        {/* Forum Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-black text-[#E0E0E0] mb-6 uppercase tracking-tight">
            &gt;&gt; CATÉGORIES
          </h3>
          <div className="space-y-4">
            {forumCategories.map((category, index) => (
              <HandDrawnBox
                key={category.id}
                color="#8B0000"
                strokeWidth={3}
                roughness={2.5}
                className="p-6 bg-[#0A0A0A] hover:bg-[#8B0000]/5 transition-colors cursor-pointer group"
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-[#E0E0E0] mb-3 uppercase tracking-tight group-hover:text-[#8B0000] transition-colors">
                        {category.title}
                      </h4>
                      <div className="flex items-center gap-6 font-mono text-xs text-[#E0E0E0]/60">
                        <span>{category.topics} SUJETS</span>
                        <span>{category.posts} MESSAGES</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="font-mono text-xs text-[#8B0000] mb-1">DERNIER MESSAGE :</p>
                      <p className="font-mono text-xs text-[#E0E0E0] mb-1">{category.lastPost.title}</p>
                      <p className="font-mono text-xs text-[#E0E0E0]/60">
                        par {category.lastPost.author} • {category.lastPost.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </HandDrawnBox>
            ))}
          </div>
        </div>

        {/* Recent Topics */}
        <div>
          <h3 className="text-2xl font-black text-[#E0E0E0] mb-6 uppercase tracking-tight">
            &gt;&gt; SUJETS RÉCENTS
          </h3>
          <div className="space-y-3">
            {recentTopics.map((topic, index) => (
              <HandDrawnBox
                key={index}
                color="#E0E0E0"
                strokeWidth={2}
                roughness={2}
                className="p-4 bg-[#0A0A0A] hover:bg-[#8B0000]/5 transition-colors cursor-pointer group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <MessageSquare size={16} className="text-[#8B0000] flex-shrink-0" />
                      <span className="font-mono text-sm text-[#E0E0E0] group-hover:text-[#8B0000] transition-colors">
                        {topic.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 font-mono text-xs text-[#E0E0E0]/60 flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        {topic.replies}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {topic.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {topic.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </HandDrawnBox>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button variant="secondary" size="md">
            REJOINDRE LA DISCUSSION
          </Button>
        </motion.div>
      </div>
    </section>
  );
}