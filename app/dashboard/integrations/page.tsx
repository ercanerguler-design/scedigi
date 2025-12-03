'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import { Save, Loader2, Twitter, Linkedin, Instagram, MessageCircle, Lock, Eye, EyeOff } from 'lucide-react'

interface Integration {
  // Twitter
  twitterApiKey?: string
  twitterApiSecret?: string
  twitterAccessToken?: string
  twitterAccessSecret?: string
  twitterBearerToken?: string
  
  // LinkedIn
  linkedinClientId?: string
  linkedinClientSecret?: string
  linkedinAccessToken?: string
  
  // Instagram
  instagramAccessToken?: string
  instagramBusinessId?: string
  
  // WhatsApp
  whatsappPhoneId?: string
  whatsappAccessToken?: string
  
  // Google Ads
  googleAdsClientId?: string
  googleAdsClientSecret?: string
  googleAdsDeveloperToken?: string
}

export default function IntegrationsPage() {
  const [formData, setFormData] = useState<Integration>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    try {
      const response = await fetch('/api/integrations')
      if (response.ok) {
        const data = await response.json()
        setFormData(data.integration || {})
      }
    } catch (error) {
      console.error('Error fetching integrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Entegrasyonlar başarıyla kaydedildi!' })
      } else {
        setMessage({ type: 'error', text: 'Kaydetme başarısız oldu.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bir hata oluştu.' })
    } finally {
      setSaving(false)
    }
  }

  const toggleSecret = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const maskValue = (value?: string) => {
    if (!value) return ''
    return value.length > 8 ? value.substring(0, 4) + '••••••••' + value.substring(value.length - 4) : '••••••••'
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Entegrasyonlar</h1>
          <p className="text-slate-600 mt-2">Sosyal medya ve reklam platformlarınızı bağlayın</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Twitter/X Integration */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Twitter className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Twitter / X API</h2>
                <p className="text-sm text-slate-600">Twitter Developer Portal'dan alınan API bilgileri</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">API Key</label>
                <div className="relative">
                  <input
                    type={showSecrets['twitterApiKey'] ? 'text' : 'password'}
                    value={formData.twitterApiKey || ''}
                    onChange={(e) => setFormData({ ...formData, twitterApiKey: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Enter API Key"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSecret('twitterApiKey')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showSecrets['twitterApiKey'] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">API Secret</label>
                <div className="relative">
                  <input
                    type={showSecrets['twitterApiSecret'] ? 'text' : 'password'}
                    value={formData.twitterApiSecret || ''}
                    onChange={(e) => setFormData({ ...formData, twitterApiSecret: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Enter API Secret"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSecret('twitterApiSecret')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showSecrets['twitterApiSecret'] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Access Token</label>
                <input
                  type="password"
                  value={formData.twitterAccessToken || ''}
                  onChange={(e) => setFormData({ ...formData, twitterAccessToken: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Access Token"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Access Secret</label>
                <input
                  type="password"
                  value={formData.twitterAccessSecret || ''}
                  onChange={(e) => setFormData({ ...formData, twitterAccessSecret: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Access Secret"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Bearer Token (Opsiyonel)</label>
                <input
                  type="password"
                  value={formData.twitterBearerToken || ''}
                  onChange={(e) => setFormData({ ...formData, twitterBearerToken: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Bearer Token"
                />
              </div>
            </div>
          </div>

          {/* LinkedIn Integration */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Linkedin className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">LinkedIn API</h2>
                <p className="text-sm text-slate-600">LinkedIn Developer Portal'dan alınan OAuth bilgileri</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Client ID</label>
                <input
                  type="text"
                  value={formData.linkedinClientId || ''}
                  onChange={(e) => setFormData({ ...formData, linkedinClientId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Client ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Client Secret</label>
                <input
                  type="password"
                  value={formData.linkedinClientSecret || ''}
                  onChange={(e) => setFormData({ ...formData, linkedinClientSecret: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Client Secret"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Access Token</label>
                <input
                  type="password"
                  value={formData.linkedinAccessToken || ''}
                  onChange={(e) => setFormData({ ...formData, linkedinAccessToken: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Access Token"
                />
              </div>
            </div>
          </div>

          {/* Instagram Integration */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Instagram className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Instagram API</h2>
                <p className="text-sm text-slate-600">Facebook Developer'dan alınan Instagram Business API bilgileri</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Access Token</label>
                <input
                  type="password"
                  value={formData.instagramAccessToken || ''}
                  onChange={(e) => setFormData({ ...formData, instagramAccessToken: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter Access Token"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Business Account ID</label>
                <input
                  type="text"
                  value={formData.instagramBusinessId || ''}
                  onChange={(e) => setFormData({ ...formData, instagramBusinessId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter Business Account ID"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Integration */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">WhatsApp Business API</h2>
                <p className="text-sm text-slate-600">Facebook Developer'dan alınan WhatsApp Business API bilgileri</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number ID</label>
                <input
                  type="text"
                  value={formData.whatsappPhoneId || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappPhoneId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Phone Number ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Access Token</label>
                <input
                  type="password"
                  value={formData.whatsappAccessToken || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappAccessToken: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Access Token"
                />
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <Lock className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-blue-900 font-medium">Güvenlik Bilgisi</p>
              <p className="text-sm text-blue-700 mt-1">
                Tüm API bilgileriniz şifreli olarak güvenli bir şekilde saklanır. Sadece siz bu bilgilere erişebilirsiniz.
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Kaydet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
