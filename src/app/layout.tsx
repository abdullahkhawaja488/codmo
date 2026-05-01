import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'CALL OF DUTY MOBILE — Official Web App',
  description: 'The most iconic FPS franchise on mobile. Drop in, gear up, and dominate.',
  keywords: ['call of duty', 'mobile', 'fps', 'battle royale', 'weapons', 'characters'],
  openGraph: {
    title: 'CALL OF DUTY MOBILE',
    description: 'Drop in, gear up, dominate.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="font-exo">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#061820',
                color: '#e8f4f8',
                border: '1px solid rgba(0,229,255,0.2)',
                fontFamily: '"Exo 2", sans-serif',
              },
              success: { iconTheme: { primary: '#00e5ff', secondary: '#020d12' } },
              error: { iconTheme: { primary: '#ff3c3c', secondary: '#020d12' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
