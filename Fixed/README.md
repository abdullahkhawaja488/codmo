# 🎮 CALL OF DUTY MOBILE — Full Stack Web App

A production-ready full-stack gaming web application built with Next.js 14, MongoDB, Three.js, and Framer Motion.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 2. Clone & Install
```bash
git clone <your-repo>
cd cod-app
npm install
```

### 3. Configure Environment
```bash
cp .env.local.example .env.local
```
Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/cod-mobile
JWT_SECRET=your-super-secret-min-32-chars-change-this
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@codmobile.com
ADMIN_PASSWORD=Admin@123456
NODE_ENV=development
```

### 4. Seed Database
```bash
npm run seed
```
This creates:
- 6 weapons (Legendary, Mythic, Epic tiers)
- 4 characters (Ghost, Manta, Scyla, Makarov)
- Admin user: `admin@codmobile.com` / `Admin@123456`
- Demo user:  `demo@codmobile.com` / `Demo@12345`

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
cod-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Home page (hero, weapons preview, chars)
│   │   ├── weapons/
│   │   │   ├── page.tsx              # Weapons listing with filters
│   │   │   └── [id]/page.tsx         # Weapon detail with 3D viewer
│   │   ├── characters/
│   │   │   └── page.tsx              # Character select
│   │   ├── game/page.tsx             # Game info & features
│   │   ├── dashboard/page.tsx        # User dashboard (protected)
│   │   ├── admin/page.tsx            # Admin panel (admin only)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── api/                      # REST API Routes
│   │       ├── auth/                 # register, login, logout, me
│   │       ├── weapons/              # CRUD weapons
│   │       ├── characters/           # CRUD characters
│   │       ├── loadout/              # User loadout management
│   │       └── admin/                # Admin stats, user management
│   ├── components/
│   │   ├── layout/Navbar.tsx         # Responsive navigation
│   │   ├── auth/AuthProvider.tsx     # Auth context
│   │   ├── weapons/WeaponCard.tsx    # Animated weapon card
│   │   ├── characters/CharacterCard.tsx # Character selector card
│   │   ├── three/
│   │   │   ├── ThreeViewer.tsx       # 3D weapon & character viewer
│   │   │   └── ParticleBackground.tsx # Canvas particle system
│   │   └── ui/
│   │       ├── StatBar.tsx           # Animated stat bar
│   │       ├── TierBadge.tsx         # Tier label component
│   │       └── Skeleton.tsx          # Loading skeletons
│   ├── models/
│   │   ├── User.ts                   # User schema with loadouts
│   │   ├── Weapon.ts                 # Weapon schema with stats
│   │   └── Character.ts              # Character schema with abilities
│   ├── lib/
│   │   ├── db.ts                     # MongoDB connection
│   │   ├── auth.ts                   # JWT utilities
│   │   ├── api-helpers.ts            # API response helpers
│   │   └── utils.ts                  # Shared utilities
│   ├── store/AuthContext.tsx          # Global auth state
│   ├── hooks/index.ts                 # Custom React hooks
│   └── types/index.ts                 # TypeScript types
├── scripts/seed.js                    # Database seeder
├── .env.local                         # Environment variables
└── package.json
```

---

## 📡 API Reference

### Auth
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | - | Create account |
| POST | `/api/auth/login` | - | Login + JWT |
| POST | `/api/auth/logout` | - | Clear cookie |
| GET | `/api/auth/me` | ✓ | Current user |
| PATCH | `/api/auth/me` | ✓ | Update profile |

### Weapons
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/weapons` | - | List weapons (paginated, filterable) |
| GET | `/api/weapons/[id]` | - | Single weapon |

### Characters
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/characters` | - | List all characters |
| GET | `/api/characters/[id]` | - | Single character |

### Loadout
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/loadout` | ✓ | Get user's loadout |
| POST | `/api/loadout` | ✓ | Add/remove weapon, set character |

### Admin
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/admin` | Admin | Dashboard stats |
| GET | `/api/admin/users` | Admin | All users |
| POST | `/api/admin/weapons` | Admin | Create weapon |
| PUT | `/api/admin/weapons/[id]` | Admin | Update weapon |
| DELETE | `/api/admin/weapons/[id]` | Admin | Delete weapon |
| POST | `/api/admin/characters` | Admin | Create character |
| PUT | `/api/admin/characters/[id]` | Admin | Update character |
| DELETE | `/api/admin/characters/[id]` | Admin | Delete character |

---

## 🎨 Features

### Authentication
- JWT-based auth stored in HttpOnly cookie + localStorage
- Password hashing with bcrypt (12 rounds)
- Protected routes with auth guard
- Role-based access (user/admin)

### 3D Visuals
- Three.js weapon models with rotating animation
- Three.js character models with floating animation
- Canvas particle network background
- Parallax hero effect on mouse movement

### UI/UX
- Glassmorphism cards with backdrop-filter
- Neon cyan glow effects throughout
- Animated stat bars with IntersectionObserver
- Smooth Framer Motion page/element transitions
- Loading skeletons for all data-driven content
- Toast notifications for all user actions
- Fully responsive (mobile-first)

### Admin Panel
- Real-time stats dashboard
- Full CRUD for weapons (name, stats, tier, category)
- Full CRUD for characters (name, abilities, stats, faction)
- User management view
- Form validation with Zod

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Custom CSS |
| Animations | Framer Motion + GSAP |
| 3D | Three.js + React Three Fiber + Drei |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Notifications | React Hot Toast |

---

## 🚀 Production Deployment

```bash
# Build
npm run build

# Start
npm start
```

For production, update `.env.local`:
- Use a strong random `JWT_SECRET` (32+ chars)
- Use MongoDB Atlas URI
- Set `NODE_ENV=production`
