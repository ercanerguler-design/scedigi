'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { MetricsCard } from '@/components/Dashboard/MetricsCard'
import { RevenueChart } from '@/components/Dashboard/RevenueChart'
import { LeadsPipeline } from '@/components/Dashboard/LeadsPipeline'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'

export default function DashboardPage() {
  const metrics = [
    { title: 'Toplam Gelir', value: '₺487,245', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Aktif Kampanya', value: '24', change: '+3', icon: Target, color: 'bg-blue-500' },
    { title: 'Toplam Lead', value: '1,847', change: '+18.2%', icon: Users, color: 'bg-purple-500' },
    { title: 'Conversion Rate', value: '%3.2', change: '+0.8%', icon: TrendingUp, color: 'bg-orange-500' },
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

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
          <div className="space-y-4">
            {[
              { action: 'Yeni kampanya başlatıldı', campaign: 'Yaz İndirimleri 2025', time: '5 dakika önce' },
              { action: 'Lead dönüştürüldü', campaign: 'Premium Paket', time: '1 saat önce' },
              { action: 'Instagram postu yayınlandı', campaign: 'Ürün Lansmanı', time: '3 saat önce' },
              { action: 'WhatsApp mesajı gönderildi', campaign: '150 kişiye', time: '5 saat önce' },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-500">{activity.campaign}</p>
                </div>
                <span className="text-sm text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
