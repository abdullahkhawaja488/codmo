'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/store/AuthContext';
import { useAdminStats, useWeapons, useCharacters } from '@/hooks';
import { getTierColor } from '@/lib/utils';
import { Plus, Trash2, Edit3, Shield, Users, Crosshair, User } from 'lucide-react';

const weaponFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
  category: z.enum(['assault', 'sniper', 'smg', 'shotgun', 'lmg', 'marksman', 'pistol', 'launcher']),
  tier: z.enum(['Standard', 'Epic', 'Legendary', 'Mythic']),
  description: z.string().min(1, 'Required'),
  'stats.damage': z.coerce.number().min(0).max(100),
  'stats.range': z.coerce.number().min(0).max(100),
  'stats.accuracy': z.coerce.number().min(0).max(100),
  'stats.fireRate': z.coerce.number().min(0).max(100),
  'stats.mobility': z.coerce.number().min(0).max(100),
  'stats.control': z.coerce.number().min(0).max(100),
});
type WeaponFormData = z.infer<typeof weaponFormSchema>;

function AdminSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass border border-cyan-500/15 clip-card p-6">
      <h2 className="font-orbitron text-sm font-bold tracking-[4px] uppercase text-white/60 mb-5 flex items-center gap-2">
        <div className="w-4 h-px bg-cyan-DEFAULT" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="glass border border-cyan-500/10 clip-card-sm p-4 flex items-center gap-4">
      <div className="clip-hex w-12 h-12 flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div className="font-orbitron text-2xl font-black" style={{ color }}>{value}</div>
        <div className="font-rajdhani text-[10px] tracking-[2px] text-white/40 uppercase">{label}</div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { stats = {}, recentUsers = [] } = useAdminStats();
  const { weapons = [], refetch: refetchWeapons } = useWeapons();
  const { characters = [], refetch: refetchCharacters } = useCharacters();
  const [activeTab, setActiveTab] = useState<'overview' | 'weapons' | 'characters'>('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWeaponForm, setShowWeaponForm] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  const weaponForm = useForm<WeaponFormData>({ resolver: zodResolver(weaponFormSchema) });

  const handleCreateWeapon = async (data: WeaponFormData) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/admin/weapons', {
        name: data.name,
        subtitle: data.subtitle,
        category: data.category,
        tier: data.tier,
        description: data.description,
        stats: {
          damage: data['stats.damage'],
          range: data['stats.range'],
          accuracy: data['stats.accuracy'],
          fireRate: data['stats.fireRate'],
          mobility: data['stats.mobility'],
          control: data['stats.control'],
        },
      });
      toast.success('Weapon created!');
      weaponForm.reset();
      setShowWeaponForm(false);
      refetchWeapons();
    } catch (e) {
      if (axios.isAxiosError(e)) toast.error(e.response?.data?.error || 'Failed to create weapon');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWeapon = async (id: string) => {
    if (!confirm('Delete this weapon?')) return;
    try {
      await axios.delete(`/api/admin/weapons/${id}`);
      toast.success('Weapon deleted');
      refetchWeapons();
    } catch { toast.error('Failed to delete'); }
  };

  const handleDeleteCharacter = async (id: string) => {
    if (!confirm('Delete this character?')) return;
    try {
      await axios.delete(`/api/admin/characters/${id}`);
      toast.success('Character deleted');
      refetchCharacters();
    } catch { toast.error('Failed to delete'); }
  };

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  const TABS = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'weapons', label: 'Weapons', icon: Crosshair },
    { id: 'characters', label: 'Characters', icon: User },
  ] as const;

  return (
    <div className="min-h-screen noise pt-20" style={{ background: 'linear-gradient(160deg, #020d12, #0a1a10)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-orbitron text-[9px] tracking-[5px] text-amber-400 uppercase">// Admin Panel</span>
          </div>
          <h1 className="font-orbitron font-black text-4xl uppercase">
            <span className="text-amber-400">ADMIN</span> CONTROL
          </h1>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 font-rajdhani text-xs font-semibold tracking-[2px] uppercase px-4 py-2.5 clip-btn-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-dark-DEFAULT bg-amber-400'
                  : 'text-white/50 border border-white/10 hover:border-amber-400/40 hover:text-amber-400'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Users} label="Total Users" value={stats.totalUsers || 0} color="#00e5ff" />
              <StatCard icon={Crosshair} label="Weapons" value={stats.totalWeapons || 0} color="#ffd700" />
              <StatCard icon={User} label="Characters" value={stats.totalCharacters || 0} color="#9f7fff" />
              <StatCard icon={Shield} label="Admins" value={stats.activeAdmins || 0} color="#ff6b9d" />
            </div>

            <AdminSection title="Recent Users">
              <div className="space-y-2">
                {(recentUsers || []).map((u: { _id: string; username: string; email: string; role: string; createdAt: string }) => (
                  <div key={u._id} className="flex items-center justify-between glass-light border border-cyan-500/8 px-4 py-3 clip-card-sm">
                    <div>
                      <span className="font-orbitron text-xs font-bold">{u.username}</span>
                      <span className="font-rajdhani text-[10px] text-white/40 ml-3">{u.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {u.role === 'admin' && <span className="font-orbitron text-[8px] tracking-[2px] text-amber-400 border border-amber-400/30 px-2 py-0.5 clip-btn-sm">ADMIN</span>}
                      <span className="font-rajdhani text-[10px] text-white/30">{new Date(u.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {recentUsers.length === 0 && <p className="font-rajdhani text-sm text-white/30 tracking-wider">No users yet</p>}
              </div>
            </AdminSection>
          </motion.div>
        )}

        {/* Weapons Tab */}
        {activeTab === 'weapons' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setShowWeaponForm(!showWeaponForm)}
                className="clip-btn-sm font-orbitron text-[10px] font-bold tracking-[3px] uppercase text-dark-DEFAULT bg-amber-400 px-4 py-2.5 flex items-center gap-2 hover:bg-white transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> New Weapon
              </button>
            </div>

            {showWeaponForm && (
              <AdminSection title="Create Weapon">
                <form onSubmit={weaponForm.handleSubmit(handleCreateWeapon)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-orbitron text-[9px] tracking-[2px] uppercase text-white/40 block mb-1.5">Name</label>
                    <input {...weaponForm.register('name')} className="w-full px-3 py-2 rounded-sm font-exo text-sm clip-card-sm" placeholder="Weapon Name" />
                    {weaponForm.formState.errors.name && <p className="mt-1 text-red-400 text-xs">{weaponForm.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="font-orbitron text-[9px] tracking-[2px] uppercase text-white/40 block mb-1.5">Subtitle</label>
                    <input {...weaponForm.register('subtitle')} className="w-full px-3 py-2 rounded-sm font-exo text-sm clip-card-sm" placeholder="Category · Type" />
                  </div>
                  <div>
                    <label className="font-orbitron text-[9px] tracking-[2px] uppercase text-white/40 block mb-1.5">Category</label>
                    <select {...weaponForm.register('category')} className="w-full px-3 py-2 rounded-sm font-exo text-sm clip-card-sm">
                      {['assault', 'sniper', 'smg', 'shotgun', 'lmg', 'marksman', 'pistol', 'launcher'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-orbitron text-[9px] tracking-[2px] uppercase text-white/40 block mb-1.5">Tier</label>
                    <select {...weaponForm.register('tier')} className="w-full px-3 py-2 rounded-sm font-exo text-sm clip-card-sm">
                      {['Standard', 'Epic', 'Legendary', 'Mythic'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-orbitron text-[9px] tracking-[2px] uppercase text-white/40 block mb-1.5">Description</label>
                    <textarea {...weaponForm.register('description')} rows={2} className="w-full px-3 py-2 rounded-sm font-exo text-sm clip-card-sm resize-none" placeholder="Weapon description..." />
                  </div>
                  {/* Stats */}
                  {[
                    { key: 'stats.damage' as const, label: 'Damage' },
                    { key: 'stats.range' as const, label: 'Range' },
                    { key: 'stats.accuracy' as const, label: 'Accuracy' },
                    { key: 'stats.fireRate' as const, label: 'Fire Rate' },
                    { key: 'stats.mobility' as const, label: 'Mobility' },
                    { key: 'stats.control' as const, label: 'Control' },
                  ].map((s) => (
                    <div key={s.key}>
                      <label className="font-orbitron text-[9px] tracking-[2px] uppercase text-white/40 block mb-1.5">{s.label} (0-100)</label>
                      <input {...weaponForm.register(s.key)} type="number" min="0" max="100" className="w-full px-3 py-2 rounded-sm font-exo text-sm clip-card-sm" placeholder="0" />
                    </div>
                  ))}
                  <div className="md:col-span-2 flex gap-3">
                    <button type="submit" disabled={isSubmitting} className="clip-btn font-orbitron text-[10px] font-bold tracking-[3px] uppercase text-dark-DEFAULT bg-amber-400 px-6 py-2.5 disabled:opacity-50 hover:bg-white transition-all">
                      {isSubmitting ? 'Creating...' : 'Create Weapon'}
                    </button>
                    <button type="button" onClick={() => setShowWeaponForm(false)} className="font-rajdhani text-sm text-white/40 hover:text-white transition-colors">Cancel</button>
                  </div>
                </form>
              </AdminSection>
            )}

            <AdminSection title={`Weapons (${weapons.length})`}>
              <div className="space-y-2">
                {(weapons || []).map((w) => {
                  const tc = getTierColor(w.tier);
                  return (
                    <div key={w._id} className="flex items-center gap-3 glass-light border clip-card-sm px-4 py-3 group" style={{ borderColor: `${tc}15` }}>
                      <div className="flex-1">
                        <span className="font-orbitron text-xs font-bold">{w.name}</span>
                        <span className="font-rajdhani text-[10px] text-white/40 ml-3">{w.category}</span>
                      </div>
                      <span className="font-orbitron text-[8px] tracking-[2px] px-2 py-1 clip-btn-sm" style={{ color: tc, border: `1px solid ${tc}30`, background: `${tc}10` }}>
                        {w.tier}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button onClick={() => handleDeleteWeapon(w._id)} className="text-red-400/60 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {weapons.length === 0 && <p className="font-rajdhani text-sm text-white/30 tracking-wider">No weapons yet. Create one above.</p>}
              </div>
            </AdminSection>
          </motion.div>
        )}

        {/* Characters Tab */}
        {activeTab === 'characters' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <AdminSection title={`Characters (${characters.length})`}>
              <div className="mb-4 text-right">
                <a href="/api/characters" target="_blank" className="font-rajdhani text-xs tracking-[2px] uppercase text-cyan-DEFAULT hover:text-white transition-colors">
                  + Add via API
                </a>
              </div>
              <div className="space-y-2">
                {(characters || []).map((c) => {
                  const tc = getTierColor(c.tier);
                  return (
                    <div key={c._id} className="flex items-center gap-3 glass-light border clip-card-sm px-4 py-3 group" style={{ borderColor: `${tc}15` }}>
                      <div className="clip-hex w-8 h-8 flex items-center justify-center font-orbitron text-xs font-black" style={{ background: `${tc}15`, color: tc }}>
                        {c.level}
                      </div>
                      <div className="flex-1">
                        <span className="font-orbitron text-xs font-bold">{c.name}</span>
                        <span className="font-rajdhani text-[10px] text-white/40 ml-3">{c.role}</span>
                      </div>
                      <span className="font-orbitron text-[8px] tracking-[2px] px-2 py-1 clip-btn-sm" style={{ color: tc, border: `1px solid ${tc}30`, background: `${tc}10` }}>
                        {c.tier}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDeleteCharacter(c._id)} className="text-red-400/60 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {characters.length === 0 && <p className="font-rajdhani text-sm text-white/30 tracking-wider">No characters yet. Use the POST /api/characters endpoint.</p>}
              </div>
            </AdminSection>
          </motion.div>
        )}
      </div>
    </div>
  );
}
