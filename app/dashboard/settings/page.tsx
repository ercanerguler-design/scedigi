'use client'

import { useSession } from 'next-auth/react'
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import { User, Lock, Bell, Save, Check } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    leadNotifications: true,
    campaignNotifications: false,
    weeklyReport: true
  })

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: '',
        company: ''
      })
    }
  }, [session])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage('Profil bilgileriniz güncellendi')
        await update()
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        setErrorMessage(data.error || 'Güncelleme başarısız')
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Yeni şifreler eşleşmiyor')
      setIsLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage('Şifre en az 6 karakter olmalı')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage('Şifreniz başarıyla güncellendi')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        setErrorMessage(data.error || 'Şifre güncellenemedi')
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setIsLoading(true)
    setSuccessMessage('')

    try {
      const response = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifications)
      })

      if (response.ok) {
        setSuccessMessage('Bildirim ayarları güncellendi')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ayarlar</h1>
          <p className="text-slate-600 mt-2">Hesap ve platform ayarlarınızı yönetin</p>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <Check size={20} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <User className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Profil Bilgileri</h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad</label>
                <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" value={profileData.email} disabled className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 cursor-not-allowed" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              <Save size={20} />
              {isLoading ? 'Kaydediliyor...' : 'Profili Güncelle'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-lg">
              <Lock className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Şifre Değiştir</h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mevcut Şifre</label>
              <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Yeni Şifre</label>
                <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" required minLength={6} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Yeni Şifre (Tekrar)</label>
                <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" required minLength={6} />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
              <Lock size={20} />
              {isLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Bell className="text-purple-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Bildirim Tercihleri</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', title: 'Email Bildirimleri', desc: 'Önemli güncellemeler için email alın' },
              { key: 'leadNotifications', title: 'Lead Bildirimleri', desc: 'Yeni lead geldiğinde bildirim al' },
              { key: 'campaignNotifications', title: 'Kampanya Bildirimleri', desc: 'Kampanya durumu değişikliklerinde bildir' },
              { key: 'weeklyReport', title: 'Haftalık Rapor', desc: 'Her hafta özet rapor gönder' }
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                <div>
                  <div className="font-medium text-slate-900">{item.title}</div>
                  <div className="text-sm text-slate-600">{item.desc}</div>
                </div>
                <input type="checkbox" checked={notifications[item.key as keyof typeof notifications]} onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})} className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500" />
              </label>
            ))}
            <button onClick={handleNotificationUpdate} disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">
              <Save size={20} />
              {isLoading ? 'Kaydediliyor...' : 'Bildirimleri Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
