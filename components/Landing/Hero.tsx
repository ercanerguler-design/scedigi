'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-primary-50 rounded-full">
          <span className="flex items-center gap-2 text-primary-600 text-sm font-medium">
            <Sparkles size={16} />
            Yeni Nesil Dijital Pazarlama Platformu
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Dijital Pazarlama<br />
          <span className="text-primary-600">Tek Platform</span>da
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Kampanya yönetimi, sosyal medya otomasyonu, CRM ve analytics.
          Tüm dijital pazarlama ihtiyaçlarınız için tek çözüm.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 text-lg font-medium"
          >
            Ücretsiz Başla
            <ArrowRight size={20} />
          </Link>
          <button className="inline-flex items-center gap-2 border-2 border-slate-300 px-8 py-4 rounded-lg hover:border-primary-600 text-lg font-medium">
            Demo İzle
          </button>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent h-32 bottom-0 z-10" />
          <div className="bg-white rounded-xl shadow-2xl p-4 border border-slate-200">
            <img 
              src="/images/hero/dashboard-preview.png" 
              alt="Dashboard Preview" 
              className="w-full rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><rect fill="%23f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2364748b">Dashboard Preview</text></svg>'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
