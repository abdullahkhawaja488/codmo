'use client';

import { characterImages } from '@/lib/characterImages'
import { motion } from 'framer-motion';
import { Character } from '@/types';
import TierBadge from '@/components/ui/TierBadge';
import { getTierColor } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useLoadout } from '@/hooks';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface CharacterCardProps {
  character: Character;
  index?: number;
  isSelected?: boolean;
}

export default function CharacterCard({ character, index = 0, isSelected = false }: CharacterCardProps) {
  const { user } = useAuth();
  const { selectCharacter } = useLoadout();
  const tierColor = getTierColor(character.tier);

  const handleSelect = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Login to select a character');
      return;
    }
    await selectCharacter(character._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
    >
      <div
        className="relative clip-card border overflow-hidden h-[420px] transition-all duration-500"
        style={{
          background: isSelected
            ? `linear-gradient(160deg, rgba(6,24,32,0.95), ${tierColor}18)`
            : 'rgba(6,24,32,0.85)',
          borderColor: isSelected ? `${tierColor}60` : `${tierColor}18`,
          boxShadow: isSelected ? `0 0 30px ${tierColor}20, 0 30px 60px rgba(0,0,0,0.5)` : '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${tierColor}10 0%, transparent 70%)` }}
        />

        {/* Selected indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 z-20 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: tierColor }}
          >
            <Check className="w-4 h-4 text-dark-DEFAULT" />
          </motion.div>
        )}

        {/* Number */}
        <div className="absolute top-4 left-4 z-10">
          <span className="font-orbitron text-[10px] tracking-[2px]" style={{ color: `${tierColor}60` }}>
            // {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Codename badge */}
        <div
          className="absolute top-4 right-4 clip-hex w-9 h-9 flex items-center justify-center font-orbitron text-sm font-black z-10"
          style={{ background: `${tierColor}18`, border: `1px solid ${tierColor}44`, color: tierColor }}
        >
          {character.codename?.charAt(0) ?? character.name?.charAt(0) ?? '?'}
        </div>

        {/* Character image area */}
        <div className="relative h-72 flex items-end justify-center overflow-hidden">
          {character.image ? (
            <img
              src={characterImages[character.name] || character.image}
              alt={character.name}
              className="h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
              style={{ filter: `drop-shadow(0 0 20px ${tierColor}50)` }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}

          {/* SVG fallback — shown if no image or image fails to load */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ display: character.image ? 'none' : 'flex' }}
          >
            <svg
              viewBox="0 0 200 280"
              className="w-48 h-auto transition-transform duration-500 group-hover:scale-105"
              style={{ filter: `drop-shadow(0 0 20px ${tierColor}50)` }}
            >
              <path d="M70 130 L55 210 L145 210 L130 130 Z" fill="#0a2030" stroke={`${tierColor}80`} strokeWidth="1.5"/>
              <path d="M78 138 L68 200 L132 200 L122 138 Z" fill="#0e3045" stroke={`${tierColor}40`} strokeWidth="1"/>
              <ellipse cx="100" cy="88" rx="28" ry="32" fill="#0a2030" stroke={`${tierColor}90`} strokeWidth="1.5"/>
              <path d="M78 85 Q100 76 122 85 L122 100 Q100 108 78 100 Z" fill={`${tierColor}30`} stroke={`${tierColor}cc`} strokeWidth="1"/>
              <ellipse cx="90" cy="90" rx="7" ry="5" fill={`${tierColor}50`} stroke={tierColor} strokeWidth="1">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
              </ellipse>
              <ellipse cx="110" cy="90" rx="7" ry="5" fill={`${tierColor}50`} stroke={tierColor} strokeWidth="1">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
              </ellipse>
              <path d="M68 135 L48 195 L60 198 L78 138 Z" fill="#0a2030" stroke={`${tierColor}60`} strokeWidth="1.5"/>
              <path d="M132 135 L152 195 L140 198 L122 138 Z" fill="#0a2030" stroke={`${tierColor}60`} strokeWidth="1.5"/>
              <ellipse cx="65" cy="135" rx="15" ry="9" fill="#0e3045" stroke={tierColor} strokeWidth="1.5"/>
              <ellipse cx="135" cy="135" rx="15" ry="9" fill="#0e3045" stroke={tierColor} strokeWidth="1.5"/>
              <path d="M80 210 L70 265 L88 265 L96 210 Z" fill="#0a2030" stroke={`${tierColor}50`} strokeWidth="1.5"/>
              <path d="M120 210 L130 265 L112 265 L104 210 Z" fill="#0a2030" stroke={`${tierColor}50`} strokeWidth="1.5"/>
              <rect x="62" y="260" width="34" height="12" rx="3" fill="#061820" stroke={`${tierColor}70`} strokeWidth="1"/>
              <rect x="104" y="260" width="34" height="12" rx="3" fill="#061820" stroke={`${tierColor}70`} strokeWidth="1"/>
              <rect x="88" y="158" width="24" height="14" rx="2" fill={`${tierColor}18`} stroke={`${tierColor}60`} strokeWidth="1"/>
            </svg>
          </div>

          {/* Ground glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full transition-all duration-500"
            style={{
              background: `radial-gradient(ellipse, ${tierColor}50 0%, transparent 70%)`,
              filter: 'blur(4px)',
            }}
          />
        </div>

        {/* Info overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{ background: 'linear-gradient(to top, rgba(2,13,18,0.98), transparent)' }}
        >
          <h3 className="font-orbitron text-base font-black tracking-[3px] uppercase text-white mb-1">
            · {character.name} ·
          </h3>
          <p className="font-rajdhani text-[10px] tracking-[3px] uppercase" style={{ color: tierColor }}>
            {character.role}
          </p>
          <div className="flex items-center justify-between mt-2">
            <TierBadge tier={character.tier} />
            <button
              onClick={handleSelect}
              className="font-orbitron text-[9px] tracking-[2px] uppercase px-3 py-1.5 clip-btn-sm transition-all duration-300"
              style={{
                background: isSelected ? tierColor : 'transparent',
                border: `1px solid ${tierColor}60`,
                color: isSelected ? '#020d12' : tierColor,
              }}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}