'use client'

import { Instagram, Image as ImageIcon, Calendar } from 'lucide-react'
import { useState } from 'react'

export function InstagramScheduler() {
  const [caption, setCaption] = useState('')

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Instagram size={24} />
          <h3 className="text-xl font-semibold">Instagram Post Zamanlayıcı</h3>
        </div>
        <p className="text-purple-100">Instagram postlarınızı planlayın ve zamanlayın</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Görsel Yükle
        </label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-primary-500 cursor-pointer">
          <ImageIcon className="mx-auto text-slate-400 mb-2" size={40} />
          <p className="text-sm text-slate-600">Tıklayın veya sürükleyip bırakın</p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG veya GIF (max. 10MB)</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Caption
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          rows={4}
          placeholder="Post açıklamanızı yazın..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Yayın Zamanı
        </label>
        <input
          type="datetime-local"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600">
        <Calendar size={18} />
        Postu Zamanla
      </button>

      <div>
        <h4 className="font-medium mb-3">Zamanlanmış Postlar</h4>
        <div className="space-y-3">
          {[
            { caption: 'Yeni ürün tanıtımı 🎉', scheduled: '05 Aralık, 10:00' },
            { caption: 'Hafta sonu indirimleri 🛍️', scheduled: '07 Aralık, 09:00' },
          ].map((post, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-900 mb-1">{post.caption}</p>
                <p className="text-xs text-slate-500">{post.scheduled}</p>
              </div>
              <button className="text-red-600 text-sm hover:underline">İptal</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
