'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { CampaignCard } from '@/components/Campaigns/CampaignCard'
import { CreateCampaign } from '@/components/Campaigns/CreateCampaign'
import { useState, useEffect } from 'react'
import { Plus, Loader2 } from 'lucide-react'

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

export default function CampaignsPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      
      if (response.ok) {
        setCampaigns(data)
      } else {
        setError(data.error || 'Kampanyalar yüklenemedi')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const handleCampaignCreated = () => {
    setShowCreate(false)
    fetchCampaigns()
  }

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm('Bu kampanyayı silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchCampaigns()
      } else {
        alert('Kampanya silinemedi')
      }
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary-600" size={40} />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-slate-600">Henüz kampanya oluşturulmadı</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              İlk kampanyanızı oluşturun
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign}
                onDelete={() => handleDeleteCampaign(campaign.id)}
              />
            ))}
          </div>
        )}

        {showCreate && (
          <CreateCampaign 
            onClose={() => setShowCreate(false)}
            onSuccess={handleCampaignCreated}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
