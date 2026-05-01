'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { getStatBarColor } from '@/lib/utils';

interface StatBarProps {
  label: string;
  value: number;
  tier?: string;
  delay?: number;
}

export default function StatBar({ label, value, tier = 'common', delay = 0 }: StatBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !animated) {
      const timer = setTimeout(() => setAnimated(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, animated, delay]);

  const barColor = getStatBarColor(tier);

  return (
    <div ref={ref} className="mb-3 group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-rajdhani text-[10px] font-semibold tracking-[2px] text-white/50 uppercase group-hover:text-white/80 transition-colors">
          {label}
        </span>
        <motion.span
          className="font-orbitron text-xs font-bold"
          style={{ color: tier === 'common' ? '#00e5ff' : tier === 'mythic' ? '#ff6b9d' : tier === 'legendary' ? '#ffd700' : '#9f7fff' }}
          initial={{ opacity: 0 }}
          animate={animated ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {value}
        </motion.span>
      </div>
      <div className="relative h-1 bg-white/5 overflow-visible">
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ background: barColor }}
          initial={{ width: 0 }}
          animate={animated ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
        {animated && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-cyan-sm"
            style={{
              left: `${value}%`,
              marginLeft: '-4px',
              background: barColor.includes('gradient') ? '#00e5ff' : barColor,
              boxShadow: `0 0 8px ${tier === 'mythic' ? '#ff6b9d' : tier === 'legendary' ? '#ffd700' : tier === 'epic' ? '#9f7fff' : '#00e5ff'}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.9 + delay }}
          />
        )}
      </div>
    </div>
  );
}
