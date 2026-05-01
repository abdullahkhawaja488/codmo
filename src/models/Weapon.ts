import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IWeaponStats {
  damage: number
  range: number
  accuracy: number
  fireRate: number
  mobility: number
  control: number
}

export interface IWeapon extends Document {
  _id: string
  name: string
  subtitle: string
  category: 'assault' | 'sniper' | 'smg' | 'shotgun' | 'lmg' | 'marksman' | 'pistol' | 'launcher'
  tier: 'Standard' | 'Epic' | 'Legendary' | 'Mythic'
  stats: IWeaponStats
  description: string
  lore: string
  image: string
  modelColor: string
  accentColor: string
  unlockLevel: number
  tags: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const WeaponSchema = new Schema<IWeapon>(
  {
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['assault', 'sniper', 'smg', 'shotgun', 'lmg', 'marksman', 'pistol', 'launcher'],
    },
    tier: {
      type: String,
      required: true,
      enum: ['Standard', 'Epic', 'Legendary', 'Mythic'],
      default: 'Standard',
    },
    stats: {
      damage: { type: Number, required: true, min: 0, max: 100 },
      range: { type: Number, required: true, min: 0, max: 100 },
      accuracy: { type: Number, required: true, min: 0, max: 100 },
      fireRate: { type: Number, required: true, min: 0, max: 100 },
      mobility: { type: Number, required: true, min: 0, max: 100 },
      control: { type: Number, required: true, min: 0, max: 100 },
    },
    description: { type: String, required: true },
    lore: { type: String, default: '' },
    image: { type: String, default: '' },
    modelColor: { type: String, default: '#00e5ff' },
    accentColor: { type: String, default: '#ffd700' },
    unlockLevel: { type: Number, default: 1 },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

WeaponSchema.index({ category: 1, tier: 1 })
WeaponSchema.index({ name: 'text', description: 'text' })

const Weapon: Model<IWeapon> = mongoose.models.Weapon || mongoose.model<IWeapon>('Weapon', WeaponSchema)
export default Weapon
