export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  selectedCharacter?: Character | null;
  loadout?: Weapon[];
  stats: {
    kills: number;
    wins: number;
    matches: number;
    rank: string;
  };
  createdAt: string;
}

export interface WeaponStats {
  damage: number;
  range: number;
  accuracy: number;
  fireRate: number;
  mobility: number;
  control: number;
}

export type Tier = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface Weapon {
  _id: string;
  name: string;
  subtitle: string;
  category: string;
  tier: Tier;
  description: string;
  lore: string;
  image: string;
  modelColor: string;
  accentColor: string;
  model3d?: string;
  stats: WeaponStats;
  tags: string[];
  unlockLevel: number;
  isActive: boolean;
  createdAt: string;
}

export interface CharacterAbility {
  name: string;
  description: string;
  cooldown: number;
}

export interface CharacterStats {
  health: number;
  speed: number;
  stealth: number;
  strength: number;
}

export interface Character {
  _id: string;
  name: string;
  codename: string;
  role: string;
  faction: string;
  tier: Tier;
  description: string;
  lore: string;
  image: string;
  modelColor: string;
  accentColor: string;
  model3d?: string;
  abilities: CharacterAbility[];
  stats: CharacterStats;
  unlockLevel: number;
  isActive: boolean;
  createdAt: string;
}

export interface Loadout {
  weapons: Weapon[];
  selectedCharacter: Character | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export type WeaponCategory =
  | 'all'
  | 'Sniper Rifle'
  | 'Assault Rifle'
  | 'SMG'
  | 'LMG'
  | 'Shotgun'
  | 'Pistol'
  | 'Launcher'
  | 'Marksman';
