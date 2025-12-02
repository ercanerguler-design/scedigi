'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { MetricsCard } from '@/components/Dashboard/MetricsCard'
import { RevenueChart } from '@/components/Dashboard/RevenueChart'
import { LeadsPipeline } from '@/components/Dashboard/LeadsPipeline'
import { TrendingUp, Users, DollarSign, Target, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DashboardStats {
  totalLeads: number
  qualifiedLeads: number
  avgLeadScore: number
  activeCampaigns: number
  totalProposals: number
  proposalValue: number
  completedTasks: number
  totalTasks: number
  conversionRate: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-primary-600" size={32} />
        </div>
      </DashboardLayout>
    )
  }

  const metrics = [
    { 
      title: 'Toplam Lead', 
      value: stats?.totalLeads.toString() || '0', 
      change: `${stats?.qualifiedLeads || 0} Kalifiye`, 
      icon: Users, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Aktif Kampanya', 
      value: stats?.activeCampaigns.toString() || '0', 
      change: 'Devam Eden', 
      icon: Target, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Toplam Teklif Değeri', 
      value: `₺${(stats?.proposalValue || 0).toLocaleString('tr-TR')}`, 
      change: `${stats?.totalProposals || 0} Teklif`, 
      icon: DollarSign, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Conversion Rate', 
      value: `%${stats?.conversionRate.toFixed(1) || '0.0'}`, 
      change: `${stats?.completedTasks || 0}/${stats?.totalTasks || 0} Görev`, 
      icon: TrendingUp, 
      color: 'bg-orange-500' 
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Platformunuzun genel görünümü</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricsCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <LeadsPipeline />
        </div>
      </div>
    </DashboardLayout>
  )
}
