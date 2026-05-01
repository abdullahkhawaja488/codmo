'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crosshair, ChevronDown, Zap, Users, Target, Shield } from 'lucide-react';

const ParticleBackground = dynamic(() => import('@/components/three/ParticleBackground'), { ssr: false });
const ThreeViewer = dynamic(() => import('@/components/three/ThreeViewer'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const gameModes = [
  { icon: '💀', name: 'Team Deathmatch', desc: 'Fast-paced squad elimination', num: '01' },
  { icon: '🎯', name: 'Hard Point', desc: 'Capture and hold rotating zones', num: '02' },
  { icon: '☠️', name: 'Domination', desc: 'Seize three strategic objectives', num: '03' },
  { icon: '🪂', name: 'Battle Royale', desc: '150 players, one island, one winner', num: '04' },
  { icon: '🧟', name: 'Zombie Mode', desc: 'Survive endless undead waves', num: '05' },
  { icon: '💣', name: 'Search & Destroy', desc: 'One life, no respawns, maximum stakes', num: '06' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP scroll animations
    if (window.innerWidth < 768) return  // add as first line inside useEffect
    const sections = document.querySelectorAll('.gsap-reveal');
    sections.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen noise">
      {/* Particle Background */}
      <ParticleBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,80,100,0.25) 0%, transparent 70%), linear-gradient(160deg, #020d12 0%, #061820 50%, #020d12 100%)',
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 grid-bg opacity-100"
          style={{ maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)' }}
        />
        {/* Scan line */}
        <div className="scan-line" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-cyan-DEFAULT" />
              <span className="font-orbitron text-[10px] tracking-[5px] text-cyan-DEFAULT uppercase">
                // FPS Mobile — Season 01
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-orbitron font-black leading-none mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 90px)' }}
            >
              <span className="block text-white">CALL</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: '2px #00e5ff', filter: 'drop-shadow(0 0 20px #00e5ff)' }}
              >
                OF
              </span>
              <span className="block text-white">DUTY</span>
              <span
                className="block text-cyan-DEFAULT mt-2 tracking-[12px]"
                style={{ fontSize: '0.42em' }}
              >
                MOBILE
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-48 h-px mb-6"
              style={{ background: 'linear-gradient(90deg, #00e5ff, transparent)' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-white/55 text-sm leading-relaxed max-w-md mb-8 font-light tracking-wide"
            >
              The most iconic FPS franchise arrives on mobile. Drop in, gear up, and dominate
              the battlefield with 150 players across six legendary game modes.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-10 mb-10"
            >
              {[
                { num: '150', label: 'Players' },
                { num: '24GB', label: 'Storage' },
                { num: '6', label: 'Modes' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-orbitron text-2xl font-black text-cyan-DEFAULT">{s.num}</div>
                  <div className="font-rajdhani text-[10px] tracking-[3px] text-white/40 uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                href="/weapons"
                className="clip-btn font-orbitron text-[11px] font-bold tracking-[3px] uppercase text-dark-DEFAULT bg-cyan-DEFAULT px-8 py-3.5 hover:bg-white transition-all duration-300 hover:shadow-cyan-md inline-flex items-center gap-2 group"
              >
                <Crosshair className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                View Arsenal
              </Link>
              <Link
                href="/game"
                className="clip-btn font-rajdhani text-sm font-semibold tracking-[2px] uppercase text-cyan-DEFAULT border border-cyan-500/40 px-7 py-3.5 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300"
              >
                Game Info
              </Link>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-1"
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-accent text-base">★</span>
              ))}
              <span className="font-rajdhani text-xs text-white/40 ml-2 tracking-wider">4.9 / 5 Rating</span>
            </motion.div>
          </div>

          {/* Right - 3D Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] hidden lg:block"
          >
            {/* Glow rings */}
            {[420, 320, 220].map((size, i) => (
              <div
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 animate-pulse-slow"
                style={{ width: size, height: size, animationDelay: `${i * 0.5}s` }}
              />
            ))}

            <ThreeViewer type="character" color="#00e5ff" className="w-full h-full" />

            {/* HUD tags */}
            <div className="absolute right-4 top-1/4 flex items-center gap-2 font-orbitron text-[9px] tracking-[2px] text-cyan-DEFAULT uppercase">
              <div className="w-5 h-px bg-cyan-DEFAULT" />
              FPS — Primary
            </div>
            <div className="absolute right-4 top-1/2 flex items-center gap-2 font-orbitron text-[9px] tracking-[2px] text-cyan-DEFAULT uppercase">
              <div className="w-5 h-px bg-cyan-DEFAULT" />
              Storage: 24GB
            </div>
            <div className="absolute right-4 top-[65%] flex items-center gap-2 font-orbitron text-[9px] tracking-[2px] text-cyan-DEFAULT uppercase">
              <div className="w-5 h-px bg-cyan-DEFAULT" />
              5★ Rating
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-orbitron text-[8px] tracking-[3px] text-cyan-DEFAULT/40 uppercase"
        >
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── QUICK STATS ──────────────────────────────────────────── */}
      <section className="relative z-10 py-16 border-y border-cyan-500/10" style={{ background: 'rgba(6,24,32,0.5)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, num: '500M+', label: 'Downloads Worldwide' },
              { icon: Target, num: '20+', label: 'Multiplayer Maps' },
              { icon: Zap, num: '100+', label: 'Weapons Available' },
              { icon: Shield, num: '50+', label: 'Playable Characters' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="gsap-reveal text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className="w-6 h-6 text-cyan-DEFAULT mx-auto mb-3" />
                <div className="font-orbitron text-2xl font-black text-white mb-1">{stat.num}</div>
                <div className="font-rajdhani text-[11px] tracking-[2px] text-white/40 uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEAPONS PREVIEW ─────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6" style={{ background: 'linear-gradient(180deg, #020d12 0%, #061820 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 gsap-reveal">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-px bg-cyan-DEFAULT" />
                <span className="font-orbitron text-[9px] tracking-[6px] text-cyan-DEFAULT uppercase">// Arsenal</span>
              </div>
              <h2 className="font-orbitron font-black text-4xl md:text-5xl uppercase tracking-tight">
                WEAPONS
              </h2>
            </div>
            <Link
              href="/weapons"
              className="clip-btn-sm font-rajdhani text-sm font-semibold tracking-[2px] uppercase text-cyan-DEFAULT border border-cyan-500/30 px-5 py-2.5 hover:bg-cyan-500/10 transition-all hidden md:block"
            >
              View All →
            </Link>
          </div>

          {/* Weapon preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-reveal">
            {[
              { name: 'Locus — Neptune', sub: 'Sniper Rifle · Bolt-Action', tier: 'Legendary', color: '#ffd700' },
              { name: 'Rytec AMR — Nautilus', sub: 'Anti-Material · Semi-Auto', tier: 'Mythic', color: '#ff6b9d' },
              { name: 'DL Q33 — Phantom', sub: 'Marksman · Long-Range', tier: 'Epic', color: '#9f7fff' },
            ].map((w, i) => (
              <Link key={w.name} href="/weapons" className="block group">
                <div
                  className="glass border clip-card p-6 transition-all duration-400 group-hover:-translate-y-2"
                  style={{ borderColor: `${w.color}20` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-orbitron text-[10px] tracking-[4px] text-white/30 uppercase">Sniper</span>
                    <span
                      className="font-orbitron text-[8px] tracking-[3px] uppercase px-2 py-1 clip-btn-sm"
                      style={{ color: w.color, border: `1px solid ${w.color}40`, background: `${w.color}12` }}
                    >
                      {w.tier}
                    </span>
                  </div>
                  <div
                    className="h-24 flex items-center justify-center mb-4"
                    style={{ filter: `drop-shadow(0 0 12px ${w.color}50)` }}
                  >
                    <svg viewBox="0 0 240 80" className="w-48">
                      <rect x="10" y="30" width="140" height="18" rx="3" fill="#0a2030" stroke={`${w.color}cc`} strokeWidth="1.5"/>
                      <rect x="130" y="32" width="85" height="7" rx="2" fill="#071520" stroke={`${w.color}66`} strokeWidth="1"/>
                      <rect x="3" y="32" width="20" height="12" rx="2" fill="#061820" stroke={`${w.color}55`} strokeWidth="1"/>
                      <rect x="50" y="19" width="50" height="13" rx="3" fill="#071520" stroke={`${w.color}aa`} strokeWidth="1"/>
                      <circle cx="75" cy="25.5" r="5" fill={`${w.color}44`} stroke={`${w.color}cc`} strokeWidth="1"/>
                      <rect x="75" y="44" width="14" height="18" rx="2" fill="#061820" stroke={`${w.color}55`} strokeWidth="1"/>
                      <rect x="105" y="21" width="18" height="8" rx="1" fill={`${w.color}66`} stroke={w.color} strokeWidth="1"/>
                    </svg>
                  </div>
                  <h3 className="font-orbitron text-sm font-bold tracking-wider mb-1">{w.name}</h3>
                  <p className="font-exo text-[11px] text-white/40">{w.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAME MODES ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6" style={{ background: '#03111a', borderTop: '1px solid rgba(0,229,255,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="gsap-reveal mb-16">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-px bg-cyan-DEFAULT" />
              <span className="font-orbitron text-[9px] tracking-[6px] text-cyan-DEFAULT uppercase">// Battlefields</span>
            </div>
            <h2 className="font-orbitron font-black text-4xl md:text-5xl uppercase tracking-tight">GAME MODES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px gsap-reveal">
            {gameModes.map((mode) => (
              <div
                key={mode.name}
                className="glass border border-cyan-500/6 p-8 flex items-center gap-6 group hover:border-cyan-500/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-DEFAULT to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="clip-hex w-14 h-14 flex-shrink-0 flex items-center justify-center text-2xl border border-cyan-500/20 bg-cyan-500/5 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all duration-300">
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-orbitron text-sm font-bold tracking-[2px] uppercase mb-2 group-hover:text-cyan-DEFAULT transition-colors">
                    {mode.name}
                  </h3>
                  <p className="font-exo text-xs text-white/45 leading-relaxed">{mode.desc}</p>
                </div>
                <span className="font-orbitron text-[10px] text-cyan-500/20 tracking-[2px]">{mode.num}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 text-center" style={{ background: 'linear-gradient(180deg, #03111a, #020d12)' }}>
        <div className="max-w-2xl mx-auto gsap-reveal">
          <div className="font-orbitron text-[9px] tracking-[6px] text-cyan-DEFAULT uppercase mb-4">// Ready Operator</div>
          <h2 className="font-orbitron font-black text-3xl md:text-5xl uppercase mb-6">
            BUILD YOUR<br />
            <span className="text-cyan-DEFAULT">LOADOUT</span>
          </h2>
          <p className="font-exo text-sm text-white/50 mb-10 leading-relaxed">
            Create an account to save your weapon loadout, select your character, and track your battle stats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="clip-btn font-orbitron text-xs font-bold tracking-[3px] uppercase text-dark-DEFAULT bg-cyan-DEFAULT px-10 py-4 hover:bg-white transition-all duration-300 hover:shadow-cyan-md"
            >
              Create Account
            </Link>
            <Link
              href="/characters"
              className="clip-btn font-rajdhani text-sm font-semibold tracking-[2px] uppercase text-cyan-DEFAULT border border-cyan-500/40 px-8 py-4 hover:bg-cyan-500/10 transition-all"
            >
              Browse Characters
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/8 py-10 px-6" style={{ background: '#020a10' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="clip-hex w-8 h-8 bg-cyan-DEFAULT/20 flex items-center justify-center">
              <span className="font-orbitron text-xs font-black text-cyan-DEFAULT">M</span>
            </div>
            <span className="font-orbitron text-[10px] tracking-[4px] text-cyan-DEFAULT uppercase">Call of Duty Mobile</span>
          </div>
          <p className="font-rajdhani text-xs text-white/30 tracking-wider">
            © 2026 CoD Gaming Hub.
          </p>
          <div className="flex gap-6">
            {['Weapons', 'Characters', 'Dashboard'].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="font-rajdhani text-xs tracking-[2px] uppercase text-white/30 hover:text-cyan-DEFAULT transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
