const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cod-mobile'

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB')

    // Clear collections
    await mongoose.connection.dropCollection('users').catch(() => {})
    await mongoose.connection.dropCollection('weapons').catch(() => {})
    await mongoose.connection.dropCollection('characters').catch(() => {})
    console.log('✓ Cleared existing data')

    // === WEAPONS ===
    const Weapon = mongoose.model('Weapon', new mongoose.Schema({
      name: String, subtitle: String, category: String, tier: String,
      stats: { damage: Number, range: Number, accuracy: Number, fireRate: Number, mobility: Number, control: Number },
      description: String, lore: String, image: String, modelColor: String, accentColor: String,
      unlockLevel: Number, tags: [String], isActive: Boolean, slug: String,
    }, { timestamps: true }))

    const weapons = await Weapon.insertMany([
      {
        name: 'Locus — Neptune', subtitle: 'Sniper Rifle · Bolt-Action', category: 'sniper', tier: 'legendary',
        stats: { damage: 94, range: 88, accuracy: 78, fireRate: 32, mobility: 40, control: 65 },
        description: 'The Neptune variant brings aquatic camouflage and enhanced barrel technology for extreme long-range elimination.',
        lore: 'Forged in the deep-sea labs of Nautilus Corp, this weapon has seen more action at 1000 yards than most guns see in a lifetime.',
        modelColor: '#ffd700', accentColor: '#ffd700', unlockLevel: 50, slug: 'locus-neptune',
        tags: ['long-range', 'one-shot', 'bolt-action'], isActive: true,
      },
      {
        name: 'Rytec AMR — Nautilus', subtitle: 'Anti-Material · Semi-Auto', category: 'sniper', tier: 'mythic',
        stats: { damage: 98, range: 72, accuracy: 65, fireRate: 45, mobility: 28, control: 55 },
        description: 'The Nautilus mythology comes alive in this devastating anti-material rifle capable of penetrating vehicle armor.',
        lore: 'Used by Ghost Tier operatives in classified operations. The Nautilus rounds can pierce six inches of hardened steel.',
        modelColor: '#ff6b9d', accentColor: '#ff6b9d', unlockLevel: 100, slug: 'rytec-amr-nautilus',
        tags: ['anti-material', 'vehicle-damage', 'mythic'], isActive: true,
      },
      {
        name: 'DL Q33 — Phantom', subtitle: 'Marksman · Long-Range', category: 'marksman', tier: 'epic',
        stats: { damage: 86, range: 91, accuracy: 83, fireRate: 40, mobility: 55, control: 70 },
        description: 'A precise marksman rifle with ghost-tech suppressor technology. Silent. Deadly. Untraceable.',
        lore: 'The Phantom variant was developed for black ops missions requiring zero acoustic signature.',
        modelColor: '#9f7fff', accentColor: '#9f7fff', unlockLevel: 30, slug: 'dl-q33-phantom',
        tags: ['suppressed', 'marksman', 'high-accuracy'], isActive: true,
      },
      {
        name: 'AK117 — Dragonfyre', subtitle: 'Assault Rifle · Full-Auto', category: 'assault', tier: 'legendary',
        stats: { damage: 72, range: 68, accuracy: 74, fireRate: 85, mobility: 65, control: 60 },
        description: 'The Dragonfyre AK117 combines classic Soviet engineering with modern thermal-imaging sights.',
        lore: 'Seized from a weapons dealer in Urzikstan, modified in the field and certified for Ghost Tier use.',
        modelColor: '#ff6b35', accentColor: '#ffd700', unlockLevel: 20, slug: 'ak117-dragonfyre',
        tags: ['full-auto', 'versatile', 'mid-range'], isActive: true,
      },
      {
        name: 'MP5 — Spectre', subtitle: 'SMG · Close Quarter', category: 'smg', tier: 'epic',
        stats: { damage: 58, range: 40, accuracy: 68, fireRate: 95, mobility: 88, control: 72 },
        description: 'The Spectre SMG is engineered for tight corridors and rapid room-clearing operations.',
        lore: 'Preferred by Spectre unit operators in urban warfare scenarios across Eastern Europe.',
        modelColor: '#9f7fff', accentColor: '#00e5ff', unlockLevel: 10, slug: 'mp5-spectre',
        tags: ['fast', 'cqb', 'high-rpm'], isActive: true,
      },
      {
        name: 'Striker — Terminus', subtitle: 'Shotgun · Pump-Action', category: 'shotgun', tier: 'legendary',
        stats: { damage: 99, range: 18, accuracy: 45, fireRate: 22, mobility: 58, control: 50 },
        description: 'The Terminus Striker delivers unmatched close-range devastation. One shot ends battles.',
        lore: 'Named by operators in memory of enemies who never saw it coming. The Terminus has zero mercy.',
        modelColor: '#ffd700', accentColor: '#ff6b35', unlockLevel: 60, slug: 'striker-terminus',
        tags: ['one-shot', 'close-range', 'pump'], isActive: true,
      },
    ])
    console.log(`✓ Inserted ${weapons.length} weapons`)

    // === CHARACTERS ===
    const Character = mongoose.model('Character', new mongoose.Schema({
      name: String, codename: String, role: String, faction: String, tier: String,
      description: String, lore: String,
      abilities: [{ name: String, description: String, icon: String }],
      stats: { health: Number, speed: Number, stealth: Number, strength: Number },
      image: String, modelColor: String, accentColor: String,
      skinVariants: [{ name: String, image: String, tier: String }],
      unlockLevel: Number, isActive: Boolean, slug: String, level: String,
    }, { timestamps: true }))

    const characters = await Character.insertMany([
      {
        _id: "69a1c3da0a3fa3cdeaad36f5",
        name: 'Manta', codename: 'MANTA-7', role: 'Combat Specialist', faction: 'Ghost', tier: 'legendary',
        description: 'Elite underwater combat specialist and infiltration expert. Manta specializes in amphibious operations and aquatic stealth.',
        lore: 'Originally recruited from the Typhoon Special Forces unit, Manta has completed 147 classified missions with a 100% extraction rate.',
        abilities: [
          { _id: "69a1c3da0a3fa3cdeaad36f6", name: 'Aqua Shield', description: 'Deploy a nanite water shield absorbing 300 damage', icon: '🛡️' },
          { _id: "69a1c3da0a3fa3cdeaad36f7", name: 'Depth Charge', description: 'Throw a devastating proximity mine with AoE damage', icon: '💣' },
          { _id: "69a1c3da0a3fa3cdeaad36f8", name: 'Sonar Pulse', description: 'Reveal all enemies within 40m through walls', icon: '📡' },
        ],
        stats: { health: 75, speed: 88, stealth: 92, strength: 70 },
        modelColor: '#00e5ff', accentColor: '#00b8cc', unlockLevel: 20, isActive: true, slug: 'manta', level: 'A',
      },
      {
        _id: "69a1c3da0a3fa3cdeaad36f9",
        name: 'Ghost', codename: 'GHOST-1', role: 'Shadow Operative', faction: 'Ghost', tier: 'mythic',
        image: 'https://assetsio.gnwcdn.com/cod-mw2-wyciek-kampanii-head.jpg',
        description: 'The legendary operator who has haunted enemy intelligence for a decade. Ghost operates in total silence.',
        lore: 'Ghost\'s real identity remains classified at the highest levels. Multiple enemy factions believe they have eliminated Ghost — all were wrong.',
        abilities: [
          { _id: "69a1c3da0a3fa3cdeaad36fa", name: 'Phantom Cloak', description: 'Become nearly invisible for 8 seconds', icon: '👻' },
          { _id: "69a1c3da0a3fa3cdeaad36fb", name: 'Skull Grenade', description: 'Deploy a fear grenade that causes enemies to flee', icon: '💀' },
          { _id: "69a1c3da0a3fa3cdeaad36fc", name: 'Death Mark', description: 'Mark an enemy — deal 50% bonus damage to them', icon: '🎯' },
        ],
        stats: { health: 70, speed: 85, stealth: 99, strength: 80 },
        modelColor: '#4a7a8a', accentColor: '#00e5ff', unlockLevel: 80, isActive: true, slug: 'ghost', level: 'S',
      },
      {
        _id: "69a1c3da0a3fa3cdeaad36fd",
        name: 'Scyla', codename: 'SCYLA-9', role: 'Cyborg Infiltrator', faction: 'Phantom', tier: 'epic',
        description: 'A next-generation cybernetic operative enhanced with experimental neural implants and sub-dermal armor plating.',
        lore: 'After a catastrophic mission left Scyla at 20% organic mass, Project SCYLA rebuilt her into the most technologically advanced operative alive.',
        abilities: [
          { _id: "69a1c3da0a3fa3cdeaad36fe", name: 'Neural Hack', description: 'Temporarily disable enemy tech and vehicles nearby', icon: '⚡' },
          { _id: "69a1c3da0a3fa3cdeaad36ff", name: 'Nano Repair', description: 'Self-repair 150 health over 5 seconds', icon: '🔧' },
          { _id: "69a1c3da0a3fa3cdeaad3700", name: 'Optics Override', description: 'See through smoke and all visual obstructions for 6s', icon: '👁️' },
        ],
        stats: { health: 90, speed: 70, stealth: 75, strength: 85 },
        modelColor: '#c0d8ff', accentColor: '#9f7fff', unlockLevel: 40, isActive: true, slug: 'scyla', level: 'B',
      },
      {
        _id: "69a1c3da0a3fa3cdeaad3701",
        name: 'Makarov', codename: 'MAKAROV-X', role: 'Assault Vanguard', faction: 'Makarov', tier: 'legendary',
        description: 'Ruthless and strategic. Makarov leads from the front, using psychological warfare as much as firepower.',
        lore: 'The ghost of Ultranationalism. Makarov has orchestrated three major geopolitical crises and remains three steps ahead of all pursuit.',
        abilities: [
          { _id: "69a1c3da0a3fa3cdeaad3702", name: 'Iron Will', description: 'Reduce incoming damage by 40% for 10 seconds', icon: '⚔️' },
          { _id: "69a1c3da0a3fa3cdeaad3703", name: 'Tactical Nuke Threat', description: 'Boost all ally damage by 25% for 15 seconds', icon: '☢️' },
          { _id: "69a1c3da0a3fa3cdeaad3704", name: 'Wolf Pack', description: 'Call in a 3-man AI support squad', icon: '🐺' },
        ],
        stats: { health: 95, speed: 60, stealth: 45, strength: 99 },
        modelColor: '#ff3c3c', accentColor: '#ffd700', unlockLevel: 70, isActive: true, slug: 'makarov', level: 'S',
      },
    ])
    console.log(`✓ Inserted ${characters.length} characters`)

    // === ADMIN USER ===
    const User = mongoose.model('User', new mongoose.Schema({
      username: String, email: String, password: String, role: String,
      selectedCharacter: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', default: null },
      loadout: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' }],
      loadouts: Array,
      stats: { kills: Number, deaths: Number, wins: Number, matches: Number, rank: String },
      avatar: String,
    }, { timestamps: true }))

    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 12)
    const admin = await User.create({
      username: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@codmobile.com',
      password: adminPassword,
      role: 'admin',
      stats: { kills: 9999, deaths: 0, wins: 500, matches: 500, rank: 'General' },
    })
    console.log(`✓ Created admin user: ${admin.email}`)

    // Demo user
    const userPassword = await bcrypt.hash('Demo@12345', 12)
    await User.create({
      username: 'GhostOperator',
      email: 'demo@codmobile.com',
      password: userPassword,
      role: 'user',
      selectedCharacter: characters[1]._id,
      loadout: [weapons[0]._id, weapons[2]._id],
      stats: { kills: 1240, deaths: 320, wins: 87, matches: 210, rank: 'Captain' },
    })
    console.log('✓ Created demo user: demo@codmobile.com / Demo@12345')

    // Close connection properly
    await mongoose.connection.close()
    console.log('\n🎉 Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
