'use client';

import { useCharacters } from '@/hooks';
import CharacterCard from '@/components/characters/CharacterCard';
import { CharacterCardSkeleton } from '@/components/ui/Skeleton';
import ParticleBackground from '@/components/three/ParticleBackground';
import { motion } from 'framer-motion';

export default function CharactersPage() {
  const { characters = [], loading } = useCharacters();

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
            Operator <span className="text-cyan-DEFAULT">Roster</span>
          </h1>
          <p className="font-rajdhani text-white/60 max-w-2xl">
            Select your specialist. Each operator brings unique tactical advantages to the battlefield.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <CharacterCardSkeleton key={i} />)
          ) : (
            (characters || []).map((char) => (
              <CharacterCard key={char._id} character={char} />
            ))
          )}
          
          {!loading && (!characters || characters.length === 0) && (
            <div className="col-span-full text-center py-20">
              <p className="font-orbitron text-white/40">No operators found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}