'use client';

import { useWeapons } from '@/hooks';
import WeaponCard from '@/components/weapons/WeaponCard';
import { WeaponCardSkeleton } from '@/components/ui/Skeleton';
import ParticleBackground from '@/components/three/ParticleBackground';
import { motion } from 'framer-motion';

export default function WeaponsPage() {
  const { weapons = [], loading } = useWeapons();

  return (
    <div className="min-h-screen noise pt-24 pb-12" style={{ background: 'linear-gradient(180deg, #020d12, #061820)' }}>
      <ParticleBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-orbitron font-black text-5xl uppercase mb-4">
            Weapon <span className="text-cyan-DEFAULT">Arsenal</span>
          </h1>
          <p className="font-rajdhani text-white/60 max-w-2xl">
            Browse and equip the most advanced weaponry available in the combat zone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <WeaponCardSkeleton key={i} />)
          ) : (
            (weapons || []).map((weapon) => (
              <WeaponCard key={weapon._id} weapon={weapon} />
            ))
          )}
          
          {!loading && (!weapons || weapons.length === 0) && (
            <div className="col-span-full text-center py-20">
              <p className="font-orbitron text-white/40">No weapons found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}