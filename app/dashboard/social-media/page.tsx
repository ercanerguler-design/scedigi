'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { TwitterBot } from '@/components/SocialMedia/TwitterBot'
import { InstagramScheduler } from '@/components/SocialMedia/InstagramScheduler'
import { LinkedInPoster } from '@/components/SocialMedia/LinkedInPoster'
import { useState } from 'react'

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState('twitter')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sosyal Medya Otomasyonu</h1>
          <p className="text-slate-600 mt-2">Tüm sosyal medya kanallarınızı otomatikleştirin</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b">
            <nav className="flex gap-4 px-6">
              {[
                { id: 'twitter', label: 'Twitter Bot' },
                { id: 'instagram', label: 'Instagram Scheduler' },
                { id: 'linkedin', label: 'LinkedIn Poster' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'twitter' && <TwitterBot />}
            {activeTab === 'instagram' && <InstagramScheduler />}
            {activeTab === 'linkedin' && <LinkedInPoster />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
