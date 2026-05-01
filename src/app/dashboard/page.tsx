'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/store/AuthContext';
import { useLoadout } from '@/hooks';
import { getTierColor } from '@/lib/utils';
import StatBar from '@/components/ui/StatBar';
import TierBadge from '@/components/ui/TierBadge';
import ParticleBackground from '@/components/three/ParticleBackground';
import { Crosshair, Shield, Target, Zap, User, Star, Trash2, Plus } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { loadout = [], selectedCharacter, removeWeapon } = useLoadout();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-DEFAULT/30 border-t-cyan-DEFAULT rounded-full animate-spin" />
      </div>
    );
  }

  const rankColors: Record<string, string> = {
    Rookie: '#4a7a8a',
    Sergeant: '#00e5ff',
    Lieutenant: '#9f7fff',
    Captain: '#ffd700',
    General: '#ff6b9d',
  };
  const rankColor = rankColors[user.stats.rank] || '#00e5ff';

  return (
    <div className="min-h-screen noise pt-20" style={{ background: 'linear-gradient(160deg, #020d12, #061820)' }}>
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-cyan-DEFAULT" />
            <span className="font-orbitron text-[9px] tracking-[5px] text-cyan-DEFAULT uppercase">// Operator Hub</span>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">
            Welcome, <span className="text-cyan-DEFAULT">{user.username}</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass border border-cyan-500/15 clip-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="clip-hex w-14 h-14 flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.15)', border: '1px solid rgba(0,229,255,0.3)' }}>
                <User className="w-6 h-6 text-cyan-DEFAULT" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold tracking-wider">{user.username}</h3>
                <p className="font-rajdhani text-xs text-white/40 tracking-wider">{user.email}</p>
              </div>
            </div>

            {/* Rank */}
            <div
              className="clip-card-sm p-3 mb-5 flex items-center justify-between"
              style={{ background: `${rankColor}10`, border: `1px solid ${rankColor}30` }}
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" style={{ color: rankColor }} />
                <span className="font-orbitron text-xs font-bold tracking-[2px]" style={{ color: rankColor }}>
                  {user.stats.rank}
                </span>
              </div>
              <span className="font-rajdhani text-[10px] text-white/40 tracking-wider uppercase">Current Rank</span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Crosshair, label: 'Kills', value: user.stats.kills },
                { icon: Target, label: 'Wins', value: user.stats.wins },
                { icon: Zap, label: 'Matches', value: user.stats.matches },
              ].map((s) => (
                <div key={s.label} className="text-center glass-light border border-cyan-500/10 clip-card-sm p-3">
                  <s.icon className="w-3.5 h-3.5 mx-auto mb-1 text-cyan-DEFAULT" />
                  <div className="font-orbitron text-lg font-black text-cyan-DEFAULT">{s.value}</div>
                  <div className="font-rajdhani text-[9px] tracking-[2px] text-white/40 uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="mt-5 w-full clip-btn font-orbitron text-[10px] font-bold tracking-[3px] uppercase text-amber-400 border border-amber-400/30 py-2.5 flex items-center justify-center gap-2 hover:bg-amber-400/10 transition-all"
              >
                <Shield className="w-3.5 h-3.5" /> Admin Panel
              </Link>
            )}
          </motion.div>

          {/* ── Active Character ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass border border-cyan-500/15 clip-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-orbitron text-xs font-bold tracking-[4px] uppercase text-white/50">// Active Operator</h3>
              <Link href="/characters" className="font-rajdhani text-xs tracking-[2px] uppercase text-cyan-DEFAULT hover:text-white transition-colors">
                Change →
              </Link>
            </div>

            {selectedCharacter ? (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="clip-hex w-16 h-16 flex items-center justify-center text-2xl font-black"
                    style={{ background: `${getTierColor(selectedCharacter.tier)}18`, border: `1px solid ${getTierColor(selectedCharacter.tier)}40`, color: getTierColor(selectedCharacter.tier) }}
                  >
                    {(selectedCharacter as unknown as { codename?: string }).codename?.charAt(0) ?? selectedCharacter.name?.charAt(0) ?? '?'}
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold tracking-wider">{selectedCharacter.name}</h4>
                    <p className="font-rajdhani text-xs text-white/40 tracking-wider">{selectedCharacter.role}</p>
                    <TierBadge tier={selectedCharacter.tier} className="mt-1" />
                  </div>
                </div>
                {selectedCharacter.stats && (
                  <div className="space-y-1">
                    <StatBar label="Health" value={selectedCharacter.stats.health} tier={selectedCharacter.tier} />
                    <StatBar label="Speed" value={selectedCharacter.stats.speed} tier={selectedCharacter.tier} />
                    <StatBar label="Stealth" value={selectedCharacter.stats.stealth} tier={selectedCharacter.tier} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="text-4xl mb-4">👤</div>
                <p className="font-rajdhani text-sm text-white/40 tracking-wider mb-4">No operator selected</p>
                <Link
                  href="/characters"
                  className="clip-btn-sm font-orbitron text-[10px] tracking-[3px] uppercase text-dark-DEFAULT bg-cyan-DEFAULT px-4 py-2"
                >
                  Select Operator
                </Link>
              </div>
            )}
          </motion.div>

          {/* ── Loadout ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass border border-cyan-500/15 clip-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-orbitron text-xs font-bold tracking-[4px] uppercase text-white/50">// Loadout ({loadout.length}/5)</h3>
              <Link href="/weapons" className="font-rajdhani text-xs tracking-[2px] uppercase text-cyan-DEFAULT hover:text-white transition-colors">
                Add +
              </Link>
            </div>

            {loadout.length > 0 ? (
              <div className="space-y-3">
                {loadout.map((weapon) => {
                  const tc = getTierColor(weapon.tier);
                  return (
                    <div
                      key={weapon._id}
                      className="flex items-center gap-3 glass-light border clip-card-sm px-3 py-2.5 group"
                      style={{ borderColor: `${tc}20` }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-orbitron text-xs font-bold truncate">{weapon.name}</p>
                        <p className="font-rajdhani text-[10px] text-white/40 tracking-wider">{weapon.category}</p>
                      </div>
                      <TierBadge tier={weapon.tier} />
                      <button
                        onClick={() => removeWeapon(weapon._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="text-4xl mb-4">⚔️</div>
                <p className="font-rajdhani text-sm text-white/40 tracking-wider mb-4">Loadout is empty</p>
                <Link
                  href="/weapons"
                  className="clip-btn-sm font-orbitron text-[10px] tracking-[3px] uppercase text-dark-DEFAULT bg-cyan-DEFAULT px-4 py-2 inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3" /> Add Weapons
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { href: '/weapons', icon: Crosshair, label: 'Browse Weapons', color: '#00e5ff' },
            { href: '/characters', icon: User, label: 'Characters', color: '#9f7fff' },
            { href: '/game', icon: Target, label: 'Game Info', color: '#ffd700' },
            { href: '/', icon: Zap, label: 'Home', color: '#ff6b9d' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="glass border border-cyan-500/10 clip-card-sm p-4 flex flex-col items-center gap-2 hover:border-cyan-500/30 transition-all duration-300 group text-center"
            >
              <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: action.color }} />
              <span className="font-rajdhani text-xs font-semibold tracking-[2px] uppercase text-white/60 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
