'use client'

import { X, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface CreateCampaignProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateCampaign({ onClose, onSuccess }: CreateCampaignProps) {
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    channels: [] as string[],
    startDate: '',
    endDate: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const channels = ['Facebook', 'Instagram', 'Google Ads', 'Twitter', 'LinkedIn', 'Email', 'WhatsApp', 'SMS']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.channels.length === 0) {
      setError('En az bir kanal seçmelisiniz')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        setError(data.error || 'Kampanya oluşturulamadı')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Yeni Kampanya Oluştur</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg" disabled={isLoading}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Kampanya Adı
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Örn: Yaz İndirimleri 2025"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bütçe
            </label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="₺25,000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Kanallar
            </label>
            <div className="grid grid-cols-2 gap-3">
              {channels.map((channel) => (
                <label key={channel} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channels.includes(channel)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, channels: [...formData.channels, channel] })
                      } else {
                        setFormData({ ...formData, channels: formData.channels.filter(c => c !== channel) })
                      }
                    }}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <span className="text-sm">{channel}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium disabled:opacity-50"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={20} className="animate-spin" />}
              {isLoading ? 'Oluşturuluyor...' : 'Kampanya Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
