import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICharacter extends Document {
  _id: string
  name: string
  codename: string
  role: string
  faction: 'Ghost' | 'Makarov' | 'Operator' | 'Shadow' | 'Phantom'
  tier: 'Standard' | 'Epic' | 'Legendary' | 'Mythic'
  description: string
  lore: string
  abilities: {
    name: string
    description: string
    icon: string
  }[]
  stats: {
    health: number
    speed: number
    stealth: number
    strength: number
  }
  image: string
  modelColor: string
  accentColor: string
  skinVariants: {
    name: string
    image: string
    tier: string
  }[]
  unlockLevel: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true, trim: true },
    codename: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    faction: {
      type: String,
      required: true,
      enum: ['Ghost', 'Makarov', 'Operator', 'Shadow', 'Phantom'],
    },
    tier: {
      type: String,
      required: true,
      enum: ['Standard', 'Epic', 'Legendary', 'Mythic'],
      default: 'Standard',
    },
    description: { type: String, required: true },
    lore: { type: String, default: '' },
    abilities: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: '⚡' },
      },
    ],
    stats: {
      health: { type: Number, min: 0, max: 100, default: 50 },
      speed: { type: Number, min: 0, max: 100, default: 50 },
      stealth: { type: Number, min: 0, max: 100, default: 50 },
      strength: { type: Number, min: 0, max: 100, default: 50 },
    },
    image: { type: String, default: '' },
    modelColor: { type: String, default: '#00e5ff' },
    accentColor: { type: String, default: '#00e5ff' },
    skinVariants: [
      {
        name: String,
        image: String,
        tier: String,
      },
    ],
    unlockLevel: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Character: Model<ICharacter> =
  mongoose.models.Character || mongoose.model<ICharacter>('Character', CharacterSchema)
export default Character
