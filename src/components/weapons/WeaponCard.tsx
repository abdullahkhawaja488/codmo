'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Weapon } from '@/types';
import StatBar from '@/components/ui/StatBar';
import TierBadge from '@/components/ui/TierBadge';
import { Plus, Eye } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useLoadout } from '@/hooks';
import { getTierColor } from '@/lib/utils';
import toast from 'react-hot-toast';

interface WeaponCardProps {
  weapon: Weapon;
  index?: number;
}

export default function WeaponCard({ weapon, index = 0 }: WeaponCardProps) {
  const { user } = useAuth();
  const { addWeapon } = useLoadout();
  const tierColor = getTierColor(weapon.tier);

  const handleAddToLoadout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Login to add weapons to your loadout');
      return;
    }
    await addWeapon(weapon._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div
        className="glass clip-card border transition-all duration-400 relative overflow-hidden h-full"
        style={{
          borderColor: `${tierColor}18`,
        }}
      >
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${tierColor}08 0%, transparent 60%)` }}
        />
        {/* Top border glow on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(90deg, transparent, ${tierColor}, transparent)` }}
        />

        <div className="p-6 relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span className="font-orbitron text-[10px] text-white/30 tracking-[3px] uppercase">
              {weapon.category}
            </span>
            <TierBadge tier={weapon.tier} />
          </div>

          {/* Weapon Visual Placeholder */}
          <div className="relative flex items-center justify-center h-28 mb-5 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${tierColor} 0%, transparent 70%)`,
              }}
            />
            <svg viewBox="0 0 240 80" className="w-52 transition-all duration-400 group-hover:scale-105" style={{ filter: `drop-shadow(0 0 16px ${tierColor}60)` }}>
              <rect x="10" y="30" width="140" height="18" rx="3" fill="#0a2030" stroke={`${tierColor}cc`} strokeWidth="1.5"/>
              <rect x="130" y="32" width="85" height="7" rx="2" fill="#071520" stroke={`${tierColor}66`} strokeWidth="1"/>
              <rect x="3" y="32" width="20" height="12" rx="2" fill="#061820" stroke={`${tierColor}55`} strokeWidth="1"/>
              <rect x="50" y="19" width="50" height="13" rx="3" fill="#071520" stroke={`${tierColor}aa`} strokeWidth="1"/>
              <circle cx="75" cy="25.5" r="5" fill={`${tierColor}44`} stroke={`${tierColor}cc`} strokeWidth="1"/>
              <rect x="75" y="44" width="14" height="18" rx="2" fill="#061820" stroke={`${tierColor}55`} strokeWidth="1"/>
              <rect x="105" y="21" width="18" height="8" rx="1" fill={`${tierColor}66`} stroke={tierColor} strokeWidth="1"/>
              <circle cx="220" cy="35" r="5" fill={`${tierColor}33`}>
                <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          {/* Info */}
          <div className="mb-4">
            <h3 className="font-orbitron text-sm font-bold tracking-wider text-white mb-1 group-hover:text-glow-white transition-all duration-300">
              {weapon.name}
            </h3>
            <p className="font-exo text-[11px] text-white/40 tracking-wider">{weapon.subtitle}</p>
          </div>

          {/* Stats */}
          <div className="flex-1 mb-5">
            <StatBar label="Damage" value={weapon.stats.damage} tier={weapon.tier} delay={0} />
            <StatBar label="Range" value={weapon.stats.range} tier={weapon.tier} delay={0.1} />
            <StatBar label="Accuracy" value={weapon.stats.accuracy} tier={weapon.tier} delay={0.2} />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              href={`/weapons/${weapon._id}`}
              className="flex-1 flex items-center justify-center gap-2 glass-light border border-cyan-500/20 hover:border-cyan-500/50 py-2 transition-all duration-300 group/btn clip-btn-sm"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-DEFAULT" />
              <span className="font-rajdhani text-xs font-semibold tracking-[2px] uppercase text-white/70 group-hover/btn:text-cyan-DEFAULT transition-colors">
                Details
              </span>
            </Link>
            <button
              onClick={handleAddToLoadout}
              className="clip-btn-sm px-3 py-2 transition-all duration-300 hover:shadow-cyan-sm"
              style={{ background: `${tierColor}22`, border: `1px solid ${tierColor}44` }}
              title="Add to Loadout"
            >
              <Plus className="w-3.5 h-3.5" style={{ color: tierColor }} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
