'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { CampaignCard } from '@/components/Campaigns/CampaignCard'
import { CreateCampaign } from '@/components/Campaigns/CreateCampaign'
import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function CampaignsPage() {
  const [showCreate, setShowCreate] = useState(false)

  const campaigns = [
    {
      id: 1,
      name: 'Yaz İndirimleri 2025',
      status: 'active',
      channels: ['Facebook', 'Instagram', 'Google Ads'],
      budget: '₺15,000',
      spent: '₺8,450',
      leads: 234,
      conversions: 18,
      startDate: '2025-06-01',
      endDate: '2025-08-31'
    },
    {
      id: 2,
      name: 'Yeni Ürün Lansmanı',
      status: 'scheduled',
      channels: ['Twitter', 'LinkedIn', 'Email'],
      budget: '₺25,000',
      spent: '₺0',
      leads: 0,
      conversions: 0,
      startDate: '2025-12-15',
      endDate: '2026-01-15'
    },
    {
      id: 3,
      name: 'Müşteri Kazanım',
      status: 'active',
      channels: ['WhatsApp', 'SMS', 'Email'],
      budget: '₺10,000',
      spent: '₺6,200',
      leads: 156,
      conversions: 12,
      startDate: '2025-11-01',
      endDate: '2025-12-31'
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Kampanya Yönetimi</h1>
            <p className="text-slate-600 mt-2">Tüm kampanyalarınızı tek yerden yönetin</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            <Plus size={20} />
            Yeni Kampanya
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {showCreate && (
          <CreateCampaign onClose={() => setShowCreate(false)} />
        )}
      </div>
    </DashboardLayout>
  )
}
