'use client'

import { LucideIcon } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
}

export function MetricsCard({ title, value, change, icon: Icon, color }: MetricsCardProps) {
  const isPositive = change.startsWith('+')

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="text-white" size={24} />
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm text-slate-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  )
}
