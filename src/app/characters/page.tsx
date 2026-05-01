'use client';

import { motion } from 'framer-motion';
import { useCharacters, useLoadout } from '@/hooks';
import CharacterCard from '@/components/characters/CharacterCard';
import { CharacterCardSkeleton } from '@/components/ui/Skeleton';
import ParticleBackground from '@/components/three/ParticleBackground';

export default function CharactersPage() {
  const { characters, loading, error } = useCharacters();
  const { selectedCharacter } = useLoadout();

  return (
    <div className="min-h-screen noise" style={{ background: 'linear-gradient(180deg, #020d12, #061820)' }}>
      <ParticleBackground />

      <div className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-px bg-cyan-DEFAULT" />
              <span className="font-orbitron text-[9px] tracking-[6px] text-cyan-DEFAULT uppercase">// Roster</span>
            </div>
            <h1 className="font-orbitron font-black text-5xl md:text-6xl uppercase tracking-tight mb-4">
              CHARACTER SELECT
            </h1>
            <p className="text-white/40 text-sm max-w-lg font-light">
              Choose your operator. Click a character to view details or select them as your active operator.
            </p>
          </motion.div>

          {/* Selected character info */}
          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 glass border border-cyan-500/20 clip-card-sm px-5 py-3 inline-flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-pulse" />
              <span className="font-rajdhani text-sm tracking-wider text-white/70">Active Operator:</span>
              <span className="font-orbitron text-sm font-bold text-cyan-DEFAULT">{selectedCharacter.name}</span>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-20 text-red-400 font-rajdhani tracking-wider">{error}</div>
          )}

          {/* Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <CharacterCardSkeleton key={i} />)
              : (characters || []).map((character, i) => (
                  <CharacterCard
                    key={character._id}
                    character={character}
                    index={i}
                    isSelected={selectedCharacter?._id === character._id}
                  />
                ))}
          </div>

          {!loading && (characters || []).length === 0 && !error && (
            <div className="text-center py-24">
              <div className="font-orbitron text-4xl mb-4">👥</div>
              <h3 className="font-orbitron text-lg font-bold mb-2">No Characters Available</h3>
              <p className="text-white/40 font-rajdhani tracking-wider">Check back soon for new operators</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
