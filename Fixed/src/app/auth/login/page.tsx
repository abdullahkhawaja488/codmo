'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/store/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});
type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    const success = await login(data.email, data.password);
    setIsLoading(false);
    if (success) router.push('/dashboard');
  };

  return (
    <div className="min-h-screen noise flex items-center justify-center px-4" style={{ background: 'linear-gradient(160deg, #020d12, #061820)' }}>
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="clip-hex w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(0,229,255,0.15)', border: '1px solid rgba(0,229,255,0.3)' }}>
            <span className="font-orbitron text-2xl font-black text-cyan-DEFAULT">M</span>
          </div>
          <div className="font-orbitron text-[10px] tracking-[5px] text-cyan-DEFAULT uppercase mb-2">Call of Duty</div>
          <h1 className="font-orbitron font-black text-2xl uppercase">Operator Login</h1>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass border border-cyan-500/15 clip-card p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="font-orbitron text-[9px] tracking-[3px] uppercase text-white/50 block mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="operator@codmobile.com"
                className="w-full px-4 py-3 rounded-sm font-exo text-sm clip-card-sm"
              />
              {errors.email && (
                <p className="mt-1 font-rajdhani text-xs text-red-400 tracking-wider">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="font-orbitron text-[9px] tracking-[3px] uppercase text-white/50 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-sm font-exo text-sm clip-card-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-cyan-DEFAULT transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 font-rajdhani text-xs text-red-400 tracking-wider">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full clip-btn font-orbitron text-xs font-bold tracking-[3px] uppercase text-dark-DEFAULT py-3.5 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-cyan-md disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ background: isLoading ? '#00b8cc' : '#00e5ff' }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark-DEFAULT/30 border-t-dark-DEFAULT rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Deploy Operator
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-cyan-500/10 text-center">
            <p className="font-rajdhani text-sm text-white/40 tracking-wider">
              No account?{' '}
              <Link href="/auth/register" className="text-cyan-DEFAULT hover:text-white transition-colors">
                Create Operator Profile
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
