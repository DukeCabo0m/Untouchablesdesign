import { motion } from 'motion/react';

export function XRaySection() {
  return (
    <section className="min-h-screen bg-[#0A0A0A] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-24"
          style={{ fontFamily: 'Arial Black, sans-serif' }}
        >
          L'ESSENCE_DU_CHAOS
        </motion.h2>

        {/* Grid of X-ray style images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden cursor-none"
          >
            <div className="relative aspect-square">
              <img
                src="https://images.unsplash.com/photo-1662558066589-e452d46b9ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxYLXJheSUyMHNrZWxldG9ufGVufDF8fHx8MTc2ODk5NDMyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="X-ray style"
                className="w-full h-full object-cover mix-blend-screen"
                style={{
                  filter: 'invert(1) contrast(2) grayscale(1)',
                }}
              />
              <div className="absolute inset-0 bg-[#8B0000] mix-blend-multiply opacity-60" />
              
              {/* Hover glitch effect */}
              <motion.div
                className="absolute inset-0 bg-[#0A0A0A]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: [0, 0.5, 0, 0.3, 0] }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Caption */}
            <div className="mt-4 font-mono text-xs text-[#E0E0E0] tracking-wider">
              <p>&gt; SPECIMEN_001</p>
              <p className="text-[#8B0000]">DEGRADATION_STATUS: CRITICAL</p>
            </div>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden cursor-none"
          >
            <div className="relative aspect-square">
              <img
                src="https://images.unsplash.com/photo-1629229002497-fe93b56ecd17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0JTIwbWV0YWwlMjB0ZXh0dXJlfGVufDF8fHx8MTc2ODk5NDMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Rust texture"
                className="w-full h-full object-cover"
                style={{
                  filter: 'contrast(1.5) saturate(0.5)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/30 to-transparent" />
              
              {/* Breathing animation */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </div>
            
            {/* Caption */}
            <div className="mt-4 font-mono text-xs text-[#E0E0E0] tracking-wider">
              <p>&gt; SURFACE_ANALYSIS_002</p>
              <p className="text-[#8B0000]">CORROSION_LEVEL: ADVANCED</p>
            </div>
          </motion.div>

          {/* Image 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden cursor-none"
          >
            <div className="relative aspect-square">
              <img
                src="https://images.unsplash.com/photo-1647971149742-6c00b44c63ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3JuJTIwZmFicmljJTIwdGV4dHVyZXxlbnwxfHx8fDE3Njg5OTQzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Torn fabric"
                className="w-full h-full object-cover"
                style={{
                  filter: 'grayscale(1) contrast(1.3)',
                }}
              />
              <div className="absolute inset-0 bg-[#0A0A0A] mix-blend-multiply opacity-40" />
            </div>
            
            {/* Caption */}
            <div className="mt-4 font-mono text-xs text-[#E0E0E0] tracking-wider">
              <p>&gt; TISSUE_SAMPLE_003</p>
              <p className="text-[#8B0000]">STRUCTURAL_INTEGRITY: COMPROMISED</p>
            </div>
          </motion.div>

          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center p-12 border-2 border-[#8B0000] cursor-none"
          >
            <div className="font-mono text-[#E0E0E0] text-sm leading-loose">
              <p className="text-[#8B0000] mb-6">&gt;&gt; SYSTEM_MESSAGE:</p>
              <p className="mb-4">THE FLESH IS WEAK</p>
              <p className="mb-4">THE METAL DECAYS</p>
              <p className="mb-4">ONLY THE SOUND REMAINS</p>
              <p className="text-[#8B0000]">ETERNAL_CORRUPTION.EXE</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}