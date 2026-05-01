'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/store/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import ParticleBackground from '@/components/three/ParticleBackground';

const registerSchema = z.object({
  username: z.string()
    .min(3, 'Min 3 characters')
    .max(20, 'Max 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Letters, numbers, _ and - only'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    const success = await registerUser(data.username, data.email, data.password);
    setIsLoading(false);
    if (success) router.push('/dashboard');
  };

  return (
    <div className="min-h-screen noise flex items-center justify-center px-4 py-20" style={{ background: 'linear-gradient(160deg, #020d12, #061820)' }}>
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="clip-hex w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(0,229,255,0.15)', border: '1px solid rgba(0,229,255,0.3)' }}>
            <span className="font-orbitron text-2xl font-black text-cyan-DEFAULT">M</span>
          </div>
          <div className="font-orbitron text-[10px] tracking-[5px] text-cyan-DEFAULT uppercase mb-2">Call of Duty</div>
          <h1 className="font-orbitron font-black text-2xl uppercase">Create Operator</h1>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass border border-cyan-500/15 clip-card p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="font-orbitron text-[9px] tracking-[3px] uppercase text-white/50 block mb-2">Call Sign</label>
              <input
                {...register('username')}
                type="text"
                placeholder="YourCallSign"
                className="w-full px-4 py-3 rounded-sm font-exo text-sm clip-card-sm"
              />
              {errors.username && <p className="mt-1 font-rajdhani text-xs text-red-400">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="font-orbitron text-[9px] tracking-[3px] uppercase text-white/50 block mb-2">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="operator@codmobile.com"
                className="w-full px-4 py-3 rounded-sm font-exo text-sm clip-card-sm"
              />
              {errors.email && <p className="mt-1 font-rajdhani text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="font-orbitron text-[9px] tracking-[3px] uppercase text-white/50 block mb-2">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 pr-10 rounded-sm font-exo text-sm clip-card-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-cyan-DEFAULT transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 font-rajdhani text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="font-orbitron text-[9px] tracking-[3px] uppercase text-white/50 block mb-2">Confirm Password</label>
              <input
                {...register('confirmPassword')}
                type={showPass ? 'text' : 'password'}
                placeholder="Repeat password"
                className="w-full px-4 py-3 rounded-sm font-exo text-sm clip-card-sm"
              />
              {errors.confirmPassword && <p className="mt-1 font-rajdhani text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full clip-btn font-orbitron text-xs font-bold tracking-[3px] uppercase text-dark-DEFAULT py-3.5 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-cyan-md disabled:opacity-50 mt-2"
              style={{ background: '#00e5ff' }}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-dark-DEFAULT/30 border-t-dark-DEFAULT rounded-full animate-spin" />
              ) : (
                <><UserPlus className="w-4 h-4" /> Enlist Now</>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-cyan-500/10 text-center">
            <p className="font-rajdhani text-sm text-white/40 tracking-wider">
              Already enlisted?{' '}
              <Link href="/auth/login" className="text-cyan-DEFAULT hover:text-white transition-colors">Login Here</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
