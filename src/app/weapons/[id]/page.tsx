'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useWeapon, useLoadout } from '@/hooks';
import { useAuth } from '@/store/AuthContext';
import StatBar from '@/components/ui/StatBar';
import TierBadge from '@/components/ui/TierBadge';
import { getTierColor } from '@/lib/utils';
import { Plus, ArrowLeft, Zap, Target, Shield, Scale } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const ThreeViewer = dynamic(() => import('@/components/three/ThreeViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="font-orbitron text-[10px] tracking-[4px] text-cyan-DEFAULT/50 animate-pulse uppercase">Loading 3D Model...</div>
    </div>
  ),
});

interface Props {
  params: Promise<{ id: string }>;
}

export default function WeaponDetailPage({ params }: Props) {
  // In Next.js 15, params is a Promise - use React.use() to unwrap it
  const { id } = React.use(params);
  const { weapon, loading, error } = useWeapon(id);
  const { user } = useAuth();
  const { addWeapon } = useLoadout();

  const handleAddToLoadout = async () => {
    if (!user) {
      toast.error('Login to add weapons to your loadout');
      return;
    }
    if (!weapon) return;
    await addWeapon(weapon._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020d12' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-cyan-DEFAULT/30 border-t-cyan-DEFAULT rounded-full animate-spin mx-auto mb-4" />
          <div className="font-orbitron text-[10px] tracking-[4px] text-cyan-DEFAULT/50 animate-pulse uppercase">Loading Weapon...</div>
        </div>
      </div>
    );
  }

  if (error || !weapon) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020d12' }}>
        <div className="text-center">
          <div className="font-orbitron text-2xl mb-4">⚠️</div>
          <h2 className="font-orbitron text-lg font-bold mb-2">Weapon Not Found</h2>
          <Link href="/weapons" className="text-cyan-DEFAULT font-rajdhani tracking-wider hover:underline">← Back to Arsenal</Link>
        </div>
      </div>
    );
  }

  const tierColor = getTierColor(weapon.tier);

  return (
    <div
      className="min-h-screen noise pt-20"
      style={{
        background: `radial-gradient(ellipse 60% 50% at 80% 30%, ${tierColor}08 0%, transparent 60%), linear-gradient(160deg, #020d12, #061820)`,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
          <Link
            href="/weapons"
            className="inline-flex items-center gap-2 font-rajdhani text-sm tracking-[2px] uppercase text-white/40 hover:text-cyan-DEFAULT transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Arsenal
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <div
              className="glass clip-card border p-2 h-80 lg:h-96 relative overflow-hidden"
              style={{ borderColor: `${tierColor}25` }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: `radial-gradient(ellipse at center, ${tierColor}15 0%, transparent 70%)` }}
              />
              <ThreeViewer type="weapon" color={tierColor} className="w-full h-full" />
              {/* Tier badge overlay */}
              <div className="absolute top-4 left-4">
                <TierBadge tier={weapon.tier} />
              </div>
            </div>

            {/* Quick stats overview */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Zap, label: 'Damage', value: weapon.stats.damage },
                { icon: Target, label: 'Accuracy', value: weapon.stats.accuracy },
                { icon: Shield, label: 'Control', value: weapon.stats.control },
              ].map((s) => (
                <div key={s.label} className="glass border border-cyan-500/10 clip-card-sm p-3 text-center">
                  <s.icon className="w-4 h-4 mx-auto mb-1" style={{ color: tierColor }} />
                  <div className="font-orbitron text-lg font-black" style={{ color: tierColor }}>{s.value}</div>
                  <div className="font-rajdhani text-[9px] tracking-[2px] text-white/40 uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {/* Category tag */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: tierColor }} />
              <span className="font-orbitron text-[9px] tracking-[4px] uppercase" style={{ color: `${tierColor}90` }}>
                {weapon.category}
              </span>
            </div>

            <h1 className="font-orbitron font-black text-3xl lg:text-4xl mb-2 tracking-tight">{weapon.name}</h1>
            <p className="font-exo text-sm text-white/50 mb-6 tracking-wider">{weapon.subtitle}</p>

            {/* Description */}
            <div className="glass border border-cyan-500/10 clip-card-sm p-5 mb-8">
              <p className="font-exo text-sm text-white/60 leading-relaxed">{weapon.description}</p>
            </div>

            {/* All Stats */}
            <div className="mb-8">
              <h3 className="font-orbitron text-xs font-bold tracking-[4px] uppercase text-white/40 mb-5">
                // Statistics
              </h3>
              <div className="space-y-1">
                <StatBar label="Damage" value={weapon.stats.damage} tier={weapon.tier} delay={0} />
                <StatBar label="Range" value={weapon.stats.range} tier={weapon.tier} delay={0.1} />
                <StatBar label="Accuracy" value={weapon.stats.accuracy} tier={weapon.tier} delay={0.2} />
                <StatBar label="Fire Rate" value={weapon.stats.fireRate} tier={weapon.tier} delay={0.3} />
                <StatBar label="Mobility" value={weapon.stats.mobility} tier={weapon.tier} delay={0.4} />
                <StatBar label="Control" value={weapon.stats.control} tier={weapon.tier} delay={0.5} />
              </div>
            </div>

            {/* Tags */}
            {weapon.tags?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-orbitron text-xs font-bold tracking-[4px] uppercase text-white/40 mb-4">
                  // Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {weapon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-rajdhani text-xs font-semibold tracking-[1px] px-3 py-1.5 clip-btn-sm"
                      style={{ color: tierColor, border: `1px solid ${tierColor}30`, background: `${tierColor}08` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToLoadout}
                className="flex-1 clip-btn font-orbitron text-[11px] font-bold tracking-[3px] uppercase py-3.5 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-cyan-md"
                style={{ background: tierColor, color: '#020d12' }}
              >
                <Plus className="w-4 h-4" />
                Add to Loadout
              </button>
              <button
                onClick={() => toast('Comparison tool coming soon')}
                className="clip-btn font-rajdhani text-sm font-semibold tracking-[2px] uppercase text-white/60 border border-white/10 px-4 py-3.5 hover:bg-white/5 hover:text-white transition-all flex items-center gap-2"
                title="Compare Weapon"
              >
                <Scale className="w-4 h-4" />
              </button>
              <Link
                href="/weapons"
                className="clip-btn font-rajdhani text-sm font-semibold tracking-[2px] uppercase text-cyan-DEFAULT border border-cyan-500/30 px-6 py-3.5 hover:bg-cyan-500/10 transition-all"
              >
                ← Back
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
