'use client'

import { Trash2, Edit, Pause, Play } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  status: string
  channels: string[]
  budget: number
  spent: number
  leads: number
  conversions: number
  startDate: string
  endDate: string
}

interface CampaignCardProps {
  campaign: Campaign
  onDelete: () => void
}

export function CampaignCard({ campaign, onDelete }: CampaignCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-slate-100 text-slate-800',
    paused: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
  }

  const statusLabels = {
    active: 'Aktif',
    draft: 'Taslak',
    paused: 'Duraklatıldı',
    completed: 'Tamamlandı'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-slate-900 flex-1">{campaign.name}</h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status as keyof typeof statusColors]}`}>
            {statusLabels[campaign.status as keyof typeof statusLabels]}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {campaign.channels.map((channel, index) => (
          <span key={index} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded">
            {channel}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-600">Bütçe</p>
          <p className="text-sm font-semibold">{formatCurrency(campaign.budget)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600">Harcanan</p>
          <p className="text-sm font-semibold">{formatCurrency(campaign.spent)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600">Lead</p>
          <p className="text-sm font-semibold">{campaign.leads}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600">Dönüşüm</p>
          <p className="text-sm font-semibold">{campaign.conversions}</p>
        </div>
      </div>

      <div className="text-xs text-slate-600 mb-4">
        {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onDelete}
          className="flex-1 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Sil
        </button>
      </div>
    </div>
  )
}
