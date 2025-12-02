'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Share2, 
  Users, 
  Settings,
  Menu,
  X,
  FileText,
  Building2,
  UserCircle2,
  TrendingUp
} from 'lucide-react'
import { useState } from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
    { name: 'CRM', href: '/dashboard/crm', icon: UserCircle2 },
    { name: 'Teklifler', href: '/dashboard/proposals', icon: FileText },
    { name: 'Kampanyalar', href: '/dashboard/campaigns', icon: Target },
    { name: 'Sosyal Medya', href: '/dashboard/social-media', icon: Share2 },
    { name: 'Raporlar', href: '/dashboard/reports', icon: TrendingUp },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Servis Ağı', href: '/service-network', icon: Building2 },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.svg" alt="SCE Digital CRM" className="h-12 w-12 transition-transform group-hover:scale-110" />
            <div>
              <div className="text-2xl font-bold text-primary-600 leading-none">SCE Digital</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">CRM Platform</div>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50'}
                `}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                U
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
