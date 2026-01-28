import { useState } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { Users, MessageSquare, Calendar, Trophy } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';

const communityStats = [
  {
    icon: <Users size={40} />,
    value: '8,547',
    label: 'MEMBRES ACTIFS',
    description: 'Une communauté francophone passionnée',
  },
  {
    icon: <MessageSquare size={40} />,
    value: '44K+',
    label: 'MESSAGES',
    description: 'Échanges quotidiens entre fans',
  },
  {
    icon: <Calendar size={40} />,
    value: '156',
    label: 'ÉVÉNEMENTS',
    description: 'Meetups et rassemblements organisés',
  },
  {
    icon: <Trophy size={40} />,
    value: '2.8K',
    label: 'CONTRIBUTIONS',
    description: 'Créations artistiques partagées',
  },
];

const topMembers = [
  { rank: 1, username: 'KoRnHead_89', posts: 4728, joined: '2018' },
  { rank: 2, username: 'NuMetalKing', posts: 3891, joined: '2019' },
  { rank: 3, username: 'BlindFaith', posts: 3204, joined: '2017' },
  { rank: 4, username: 'TheoryMaster', posts: 2847, joined: '2020' },
  { rank: 5, username: 'RiffLord', posts: 2534, joined: '2019' },
];

const benefits = [
  {
    title: 'ACCÈS EXCLUSIF',
    description: 'Contenus réservés aux membres : interviews, analyses approfondies, et discussions privées avec les modérateurs.',
  },
  {
    title: 'ÉVÉNEMENTS COMMUNAUTAIRES',
    description: 'Participez à nos meetups, écoutes collectives, et rassemblements lors des concerts en France.',
  },
  {
    title: 'CRÉATION & PARTAGE',
    description: 'Partagez vos covers, artworks, et créations. Les meilleures œuvres sont mises en avant sur nos réseaux.',
  },
  {
    title: 'RÉSEAU FRANCOPHONE',
    description: 'Connectez-vous avec des fans partout en France et dans les pays francophones. Échangez, débattez, créez.',
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="relative py-32 px-4 bg-[#0A0A0A]">
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
              <GlitchText glitchIntensity="high">COMMUNAUTÉ</GlitchText>
            </h2>
            <div className="h-[2px] w-32 bg-[#8B0000]" />
          </motion.div>
        </div>

        {/* Community Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-2 border-[#8B0000] p-6 bg-[#0A0A0A] group hover:bg-[#8B0000]/5 transition-colors cursor-none"
            >
              <div className="text-[#8B0000] mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="text-4xl font-black text-[#E0E0E0] mb-2">{stat.value}</p>
              <p className="font-mono text-xs text-[#8B0000] uppercase mb-2">{stat.label}</p>
              <p className="font-mono text-xs text-[#E0E0E0]/60 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-[#E0E0E0] mb-8 uppercase tracking-tight"
          >
            &gt;&gt; POURQUOI NOUS REJOINDRE ?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-[#E0E0E0]/20 p-6 bg-[#0A0A0A] hover:border-[#8B0000] transition-colors cursor-none"
              >
                <h4 className="text-xl font-black text-[#8B0000] mb-3 uppercase tracking-tight">
                  {benefit.title}
                </h4>
                <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Members */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-[#E0E0E0] mb-8 uppercase tracking-tight"
          >
            &gt;&gt; TOP CONTRIBUTEURS
          </motion.h3>
          <div className="border-2 border-[#8B0000] bg-[#0A0A0A]">
            {topMembers.map((member, index) => (
              <motion.div
                key={member.rank}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex items-center justify-between p-6 hover:bg-[#8B0000]/5 transition-colors cursor-none ${
                  index !== topMembers.length - 1 ? 'border-b border-[#E0E0E0]/20' : ''
                }`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`text-3xl font-black ${
                      member.rank === 1
                        ? 'text-[#8B0000]'
                        : 'text-[#E0E0E0]/60'
                    }`}
                  >
                    #{member.rank}
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#E0E0E0] uppercase tracking-tight">
                      {member.username}
                    </p>
                    <p className="font-mono text-xs text-[#E0E0E0]/60">
                      Membre depuis {member.joined}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#8B0000]">{member.posts}</p>
                  <p className="font-mono text-xs text-[#E0E0E0]/60 uppercase">Messages</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-2 border-[#8B0000] p-12 bg-[#0A0A0A] text-center"
        >
          <h3 className="text-4xl font-black text-[#E0E0E0] mb-4 uppercase tracking-tight">
            PRÊT À NOUS REJOINDRE ?
          </h3>
          <p className="font-mono text-sm text-[#E0E0E0]/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Rejoignez la plus grande communauté francophone de fans de Korn. Inscription gratuite,
            ambiance garantie. Pas de jugement, que de la passion pour le nu-metal.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="primary" size="md">
              CRÉER UN COMPTE
            </Button>
            <Button variant="secondary" size="md">
              EN SAVOIR PLUS
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}