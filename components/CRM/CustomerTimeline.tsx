'use client'

import { Clock, Mail, Phone, MessageSquare } from 'lucide-react'

interface CustomerTimelineProps {
  leadId: number
}

export function CustomerTimeline({ leadId }: CustomerTimelineProps) {
  const activities = [
    { type: 'email', title: 'Email gönderildi', description: 'Teklif sunumu gönderildi', time: '2 saat önce', icon: Mail },
    { type: 'call', title: 'Telefon görüşmesi', description: '15 dakika görüşüldü', time: '1 gün önce', icon: Phone },
    { type: 'message', title: 'WhatsApp mesajı', description: 'Ürün bilgisi paylaşıldı', time: '3 gün önce', icon: MessageSquare },
    { type: 'email', title: 'İlk temas', description: 'Hoşgeldin emaili gönderildi', time: '1 hafta önce', icon: Mail },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Müşteri Zaman Çizelgesi</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <activity.icon size={18} className="text-primary-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
              <p className="text-sm text-slate-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
