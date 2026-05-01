'use client';

interface ThreeViewerProps {
  type?: 'character' | 'weapon';
  color?: string;
  className?: string;
}

export default function ThreeViewer({ type = 'character', color = '#00e5ff', className = '' }: ThreeViewerProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)`,
        animation: 'pulse 3s ease-in-out infinite',
      }} />
      <svg
        viewBox="0 0 200 280"
        style={{
          width: type === 'character' ? '60%' : '80%',
          maxHeight: '80%',
          filter: `drop-shadow(0 0 24px ${color}80)`,
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        {type === 'character' ? (
          <>
            <path d="M70 130 L55 210 L145 210 L130 130 Z" fill="#0a2030" stroke={`${color}80`} strokeWidth="1.5"/>
            <path d="M78 138 L68 200 L132 200 L122 138 Z" fill="#0e3045" stroke={`${color}40`} strokeWidth="1"/>
            <ellipse cx="100" cy="88" rx="28" ry="32" fill="#0a2030" stroke={`${color}90`} strokeWidth="1.5"/>
            <path d="M78 85 Q100 76 122 85 L122 100 Q100 108 78 100 Z" fill={`${color}30`} stroke={`${color}cc`} strokeWidth="1"/>
            <ellipse cx="90" cy="90" rx="7" ry="5" fill={`${color}50`} stroke={color} strokeWidth="1">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="110" cy="90" rx="7" ry="5" fill={`${color}50`} stroke={color} strokeWidth="1">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
            </ellipse>
            <path d="M68 135 L48 195 L60 198 L78 138 Z" fill="#0a2030" stroke={`${color}60`} strokeWidth="1.5"/>
            <path d="M132 135 L152 195 L140 198 L122 138 Z" fill="#0a2030" stroke={`${color}60`} strokeWidth="1.5"/>
            <ellipse cx="65" cy="135" rx="15" ry="9" fill="#0e3045" stroke={color} strokeWidth="1.5"/>
            <ellipse cx="135" cy="135" rx="15" ry="9" fill="#0e3045" stroke={color} strokeWidth="1.5"/>
            <path d="M80 210 L70 265 L88 265 L96 210 Z" fill="#0a2030" stroke={`${color}50`} strokeWidth="1.5"/>
            <path d="M120 210 L130 265 L112 265 L104 210 Z" fill="#0a2030" stroke={`${color}50`} strokeWidth="1.5"/>
            <rect x="62" y="260" width="34" height="12" rx="3" fill="#061820" stroke={`${color}70`} strokeWidth="1"/>
            <rect x="104" y="260" width="34" height="12" rx="3" fill="#061820" stroke={`${color}70`} strokeWidth="1"/>
            <rect x="88" y="158" width="24" height="14" rx="2" fill={`${color}18`} stroke={`${color}60`} strokeWidth="1">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
            </rect>
          </>
        ) : (
          <>
            <rect x="10" y="110" width="140" height="18" rx="3" fill="#0a2030" stroke={`${color}cc`} strokeWidth="1.5"/>
            <rect x="130" y="112" width="85" height="7" rx="2" fill="#071520" stroke={`${color}66`} strokeWidth="1"/>
            <rect x="3" y="112" width="20" height="12" rx="2" fill="#061820" stroke={`${color}55`} strokeWidth="1"/>
            <rect x="50" y="99" width="50" height="13" rx="3" fill="#071520" stroke={`${color}aa`} strokeWidth="1"/>
            <circle cx="75" cy="105" r="5" fill={`${color}44`} stroke={`${color}cc`} strokeWidth="1"/>
            <rect x="75" y="124" width="14" height="18" rx="2" fill="#061820" stroke={`${color}55`} strokeWidth="1"/>
            <rect x="105" y="101" width="18" height="8" rx="1" fill={`${color}66`} stroke={color} strokeWidth="1">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
            </rect>
            <circle cx="218" cy="115" r="5" fill={color}>
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
          </>
        )}
      </svg>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}