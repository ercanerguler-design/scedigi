'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { Settings, Bell, Lock, Database, Webhook, Key } from 'lucide-react'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ayarlar</h1>
          <p className="text-slate-600 mt-2">Platform ayarlarınızı yönetin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Settings className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">Genel Ayarlar</h3>
            </div>
            <p className="text-slate-600 text-sm">Platform genel konfigürasyonu</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Key className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">API Anahtarları</h3>
            </div>
            <p className="text-slate-600 text-sm">Sosyal medya ve servis entegrasyonları</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Bell className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">Bildirimler</h3>
            </div>
            <p className="text-slate-600 text-sm">Bildirim tercihlerinizi ayarlayın</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Lock className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">Güvenlik</h3>
            </div>
            <p className="text-slate-600 text-sm">Şifre ve güvenlik ayarları</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Database className="text-orange-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">Veritabanı</h3>
            </div>
            <p className="text-slate-600 text-sm">Database bağlantı ayarları</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Webhook className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">Webhooks</h3>
            </div>
            <p className="text-slate-600 text-sm">WhatsApp ve diğer webhook'lar</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
