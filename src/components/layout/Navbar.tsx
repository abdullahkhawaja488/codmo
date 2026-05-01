'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/auth/AuthProvider'
import { Menu, X, User, LogOut, Shield, Crosshair } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/weapons', label: 'Weapons' },
  { href: '/characters', label: 'Characters' },
  { href: '/game', label: 'Game Info' },
]

export default function Navbar() {
  const { user, logout, loading } = useAuth()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#020d12]/95 backdrop-blur-md border-b border-[#00e5ff]/10' : 'bg-transparent')}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#00e5ff] to-[#00b8cc] flex items-center justify-center font-['Orbitron'] font-black text-[#020d12] text-sm"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            M
          </div>
          <span className="font-['Orbitron'] text-xs font-bold tracking-[4px] text-[#00e5ff] hidden sm:block">COD MOBILE</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn('font-["Rajdhani"] font-semibold text-sm tracking-widest uppercase transition-all duration-200 relative group',
                pathname === link.href ? 'text-[#00e5ff]' : 'text-white/60 hover:text-[#00e5ff]')}>
              {link.label}
              <span className={cn('absolute -bottom-1 left-0 h-px bg-[#00e5ff] transition-all duration-300',
                pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full')} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-24 h-8 bg-[#00e5ff]/10 animate-pulse rounded" />
          ) : user ? (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#00e5ff]/20 hover:border-[#00e5ff]/50 transition-all bg-[#061820]/50"
                style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}>
                <User size={12} className="text-[#00e5ff]" />
                <span className="font-semibold text-sm text-white/80">{user.username}</span>
                {user.role === 'admin' && <Shield size={12} className="text-yellow-400" />}
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-[#061820]/95 backdrop-blur border border-[#00e5ff]/10 py-1 z-50">
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-[#00e5ff] hover:bg-[#00e5ff]/5 transition-colors"
                      onClick={() => setUserMenuOpen(false)}><User size={14} /> Dashboard</Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5 transition-colors"
                        onClick={() => setUserMenuOpen(false)}><Shield size={14} /> Admin Panel</Link>
                    )}
                    <hr className="border-[#00e5ff]/10 my-1" />
                    <button onClick={() => { logout(); setUserMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 transition-colors">
                      <LogOut size={14} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="font-semibold text-sm tracking-widest uppercase text-white/60 hover:text-[#00e5ff] transition-colors px-3 py-1.5">Login</Link>
              <Link href="/auth/register" className="font-['Orbitron'] text-xs font-bold tracking-widest uppercase bg-[#00e5ff] text-[#020d12] px-4 py-2 hover:bg-white transition-colors"
                style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}>Join</Link>
            </div>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1.5 text-[#00e5ff]/70 hover:text-[#00e5ff]">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#020d12]/98 border-b border-[#00e5ff]/10 overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={cn('font-semibold text-base tracking-widest uppercase', pathname === link.href ? 'text-[#00e5ff]' : 'text-white/60')}
                  onClick={() => setMobileOpen(false)}>{link.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
