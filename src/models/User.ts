import mongoose, { Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  _id: string
  username: string
  email: string
  password: string
  role: 'user' | 'admin'
  avatar?: string
  selectedCharacter?: mongoose.Types.ObjectId | null
  loadout: mongoose.Types.ObjectId[]
  loadouts: {
    _id: mongoose.Types.ObjectId
    name: string
    weapons: mongoose.Types.ObjectId[]
    createdAt: Date
  }[]
  stats: {
    kills: number
    deaths: number
    wins: number
    matches: number
    rank: string
  }
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [20, 'Username cannot exceed 20 characters'],
      match: [/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, _ and - allowed'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: '' },
    selectedCharacter: { type: Schema.Types.ObjectId, ref: 'Character', default: null },
    loadout: [{ type: Schema.Types.ObjectId, ref: 'Weapon' }],
    loadouts: [
      {
        name: { type: String, required: true },
        weapons: [{ type: Schema.Types.ObjectId, ref: 'Weapon' }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    stats: {
      kills: { type: Number, default: 0 },
      deaths: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      matches: { type: Number, default: 0 },
      rank: { type: String, default: 'Rookie' },
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

UserSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.password
    return ret
  },
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export default User
