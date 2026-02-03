import { motion } from 'motion/react';
import { OnlineMembersWidget } from './OnlineMembersWidget';
import { TopContributorsWidget } from './TopContributorsWidget';
import { SectionTitle } from './SectionTitle';

export function CommunityWidgetsSection() {
  return (
    <section className="relative py-20 px-4 bg-[#1A0000]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <SectionTitle title="Galerie Family Values" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Online Members Widget */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <OnlineMembersWidget />
          </motion.div>

          {/* Top Contributors Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TopContributorsWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}