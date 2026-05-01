'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ParticleBackground from '@/components/three/ParticleBackground'

const features = [
  { icon: '🎯', title: 'Battle Royale', desc: '150 players on a massive map. Last squad standing wins. Loot, fight, survive.', stat: '150 Players' },
  { icon: '💀', title: 'Multiplayer Modes', desc: 'Team Deathmatch, Domination, Hardpoint, Search & Destroy, and more.', stat: '6 Modes' },
  { icon: '🧟', title: 'Zombie Survival', desc: 'Fight endless undead waves with up to 4 players in co-op.', stat: 'Co-op 4P' },
  { icon: '🔫', title: 'Weapon Arsenal', desc: 'Over 100 fully customizable weapons with attachments, camos, and blueprints.', stat: '100+ Guns' },
  { icon: '👤', title: 'Operator System', desc: 'Unlock and customize iconic operators from the COD universe.', stat: '50+ Ops' },
  { icon: '🏆', title: 'Ranked Play', desc: 'Climb from Rookie to Legendary through 6 competitive seasons per year.', stat: 'Season Rank' },
]

const seasons = [
  { num: '01', name: 'Dark Waters', date: 'Jan 2025', status: 'current' },
  { num: '02', name: 'Ghost Protocol', date: 'Mar 2025', status: 'upcoming' },
  { num: '03', name: 'Iron Curtain', date: 'May 2025', status: 'upcoming' },
]

export default function GamePage() {
  return (
    <div className="min-h-screen noise" style={{ background: 'linear-gradient(180deg, #020d12, #061820)' }}>
      <ParticleBackground />

      <div className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-px bg-[#00e5ff]" />
              <span className="font-['Orbitron'] text-[9px] tracking-[6px] text-[#00e5ff] uppercase">// Game Overview</span>
              <div className="w-16 h-px bg-[#00e5ff]" />
            </div>
            <h1 className="font-['Orbitron'] font-black text-5xl md:text-7xl uppercase tracking-tight mb-6">
              <span className="text-white">CALL OF </span>
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #00e5ff' }}>DUTY</span>
            </h1>
            <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
              Call of Duty: Mobile is the definitive free-to-play battle experience. Featuring iconic maps, weapons, and game modes from across the franchise, available on iOS and Android.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-green-400/30 bg-green-400/08">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-['Orbitron'] text-[10px] tracking-[3px] text-green-400 uppercase">Season 01 — Active</span>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-px bg-[#00e5ff]" />
              <span className="font-['Orbitron'] text-[9px] tracking-[6px] text-[#00e5ff] uppercase">// Features</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="glass border border-[#00e5ff]/08 p-6 hover:border-[#00e5ff]/20 transition-all group"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-['Orbitron'] font-bold text-sm tracking-wider uppercase text-white mb-2">{f.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-4">{f.desc}</p>
                  <div className="font-['Orbitron'] text-[10px] tracking-[3px] text-[#00e5ff]">{f.stat}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Seasons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-px bg-[#00e5ff]" />
              <span className="font-['Orbitron'] text-[9px] tracking-[6px] text-[#00e5ff] uppercase">// Seasons Roadmap</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {seasons.map((s) => (
                <div key={s.num} className={`glass border p-6 relative ${s.status === 'current' ? 'border-[#00e5ff]/40 active-glow' : 'border-[#00e5ff]/10'}`}
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
                  {s.status === 'current' && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-['Orbitron'] text-[8px] tracking-[2px] text-green-400 uppercase">Live</span>
                    </div>
                  )}
                  <div className="font-['Orbitron'] text-4xl font-black text-[#00e5ff]/20 mb-2">{s.num}</div>
                  <h3 className="font-['Orbitron'] font-bold text-base uppercase text-white">{s.name}</h3>
                  <p className="text-white/40 text-xs mt-1">{s.date}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-center">
            <div className="glass border border-[#00e5ff]/15 p-12 relative overflow-hidden"
              style={{ clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))' }}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(0,229,255,0.05)_0%,transparent_70%)]" />
              <h2 className="font-['Orbitron'] font-black text-3xl uppercase mb-4 relative z-10">Ready to Deploy?</h2>
              <p className="text-white/50 mb-8 relative z-10">Create your operator profile, select your weapons, choose your character, and dominate.</p>
              <div className="flex justify-center gap-4 relative z-10">
                <Link href="/auth/register"
                  className="font-['Orbitron'] text-xs font-bold tracking-[3px] uppercase bg-[#00e5ff] text-[#020d12] px-8 py-3.5 hover:bg-white transition-colors"
                  style={{ clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}>
                  Create Account
                </Link>
                <Link href="/weapons"
                  className="font-['Orbitron'] text-xs font-bold tracking-[3px] uppercase text-[#00e5ff] border border-[#00e5ff]/40 px-8 py-3.5 hover:bg-[#00e5ff]/10 transition-colors"
                  style={{ clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}>
                  Browse Arsenal
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
