import { motion } from 'motion/react';
import { SectionTitle } from './SectionTitle';

interface SectionHeadingProps {
  title: string;
  description: string | React.ReactNode;
  glitchIntensity?: 'low' | 'medium' | 'high';
  maxWidth?: 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl';
  noGap?: boolean;
}

// Helper function to process description and highlight #UntouchablesFR
function processDescription(description: string | React.ReactNode): React.ReactNode {
  if (typeof description === 'string') {
    const parts = description.split(/(#UntouchablesFR)/g);
    return parts.map((part, index) => 
      part === '#UntouchablesFR' ? (
        <span key={index} className="text-[#8B0000] font-black">{part}</span>
      ) : (
        part
      )
    );
  }
  return description;
}

export function SectionHeading({ 
  title, 
  description, 
  glitchIntensity = 'low',
  maxWidth = 'max-w-3xl',
  noGap = false
}: SectionHeadingProps) {
  return (
    <div className="flex-1">
      <SectionTitle title={title} glitchIntensity={glitchIntensity} noGap={noGap} />
      
      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.2 }}
        className={`font-mono text-base text-[#E0E0E0]/70 leading-relaxed ${noGap ? 'mt-0' : 'mt-2'} ${maxWidth}`}
      >
        <span className="text-[#8B0000]">//</span> {processDescription(description)}
      </motion.p>
    </div>
  );
}