'use client'

import { Users, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function RealtimeVisitors() {
  const [visitors, setVisitors] = useState(1842)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 10) - 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const topPages = [
    { path: '/products', visitors: 423 },
    { path: '/pricing', visitors: 312 },
    { path: '/about', visitors: 245 },
    { path: '/blog', visitors: 189 },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Gerçek Zamanlı Ziyaretçiler</h3>
      
      <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 rounded-lg">
        <div className="relative">
          <Users size={40} className="text-green-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div>
          <p className="text-3xl font-bold text-green-600">{visitors.toLocaleString()}</p>
          <p className="text-sm text-slate-600">Aktif kullanıcı</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-3">Popüler Sayfalar</h4>
        <div className="space-y-3">
          {topPages.map((page, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-slate-600">{page.path}</span>
              <span className="text-sm font-semibold text-slate-900">{page.visitors}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
