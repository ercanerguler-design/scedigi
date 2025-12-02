'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { ChannelPerformance } from '@/components/Analytics/ChannelPerformance'
import { ConversionFunnel } from '@/components/Analytics/ConversionFunnel'
import { RealtimeVisitors } from '@/components/Analytics/RealtimeVisitors'
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Hub</h1>
          <p className="text-slate-600 mt-2">Detaylı performans analizi ve raporlama</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Toplam Görüntülenme', value: '245.8K', icon: Eye, color: 'bg-blue-500' },
            { title: 'Aktif Ziyaretçi', value: '1,842', icon: Users, color: 'bg-green-500' },
            { title: 'Engagement Rate', value: '%4.8', icon: TrendingUp, color: 'bg-purple-500' },
            { title: 'Avg. Session', value: '3:24', icon: BarChart3, color: 'bg-orange-500' },
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{metric.value}</p>
                </div>
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChannelPerformance />
          <RealtimeVisitors />
        </div>

        <ConversionFunnel />
      </div>
    </DashboardLayout>
  )
}
