import { Tier } from '@/types';
import { getTierColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TierBadgeProps {
  tier: Tier;
  className?: string;
}

export default function TierBadge({ tier, className }: TierBadgeProps) {
  const color = getTierColor(tier);
  return (
    <span
      className={cn(
        'font-orbitron text-[8px] font-bold tracking-[3px] uppercase px-2.5 py-1 clip-btn-sm',
        className
      )}
      style={{
        color,
        border: `1px solid ${color}40`,
        background: `${color}12`,
      }}
    >
      {tier}
    </span>
  );
}
