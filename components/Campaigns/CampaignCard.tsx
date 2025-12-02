'use client'

interface Campaign {
  id: number
  name: string
  status: string
  channels: string[]
  budget: string
  spent: string
  leads: number
  conversions: number
}

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    scheduled: 'bg-blue-100 text-blue-800',
    paused: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-slate-100 text-slate-800',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{campaign.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status as keyof typeof statusColors]}`}>
          {campaign.status === 'active' ? 'Aktif' : 
           campaign.status === 'scheduled' ? 'Planlandı' : 
           campaign.status === 'paused' ? 'Duraklatıldı' : 'Tamamlandı'}
        </span>
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
          <p className="text-sm font-semibold">{campaign.budget}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600">Harcanan</p>
          <p className="text-sm font-semibold">{campaign.spent}</p>
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

      <button className="w-full py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium">
        Detayları Görüntüle
      </button>
    </div>
  )
}
