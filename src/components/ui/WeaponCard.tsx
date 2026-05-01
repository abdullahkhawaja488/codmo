import Link from 'next/link';
import { Weapon } from '@/types';
import TierBadge from '@/components/ui/TierBadge';
import { Crosshair, Zap } from 'lucide-react';

export default function WeaponCard({ weapon }: { weapon: Weapon }) {
  return (
    <Link href={`/weapons/${weapon._id}`} className="group relative block h-full">
      <div className="glass border border-cyan-500/10 clip-card p-4 h-full transition-all duration-300 group-hover:border-cyan-500/30 group-hover:translate-y-[-4px]">
        <div className="absolute top-4 right-4">
          <TierBadge tier={weapon.tier} />
        </div>
        
        <div className="h-32 flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
           <div className="text-5xl">🔫</div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-orbitron font-bold text-lg tracking-wide group-hover:text-cyan-DEFAULT transition-colors truncate pr-2">
              {weapon.name}
            </h3>
          </div>
          <p className="font-rajdhani text-xs text-white/50 uppercase tracking-wider mb-4">
            {weapon.category}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-dark-3/50 p-2 rounded flex items-center gap-2">
              <Crosshair className="w-3 h-3 text-white/40" />
              <span className="font-orbitron text-xs">{weapon.stats.damage}</span>
            </div>
            <div className="bg-dark-3/50 p-2 rounded flex items-center gap-2">
              <Zap className="w-3 h-3 text-white/40" />
              <span className="font-orbitron text-xs">{weapon.stats.fireRate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}