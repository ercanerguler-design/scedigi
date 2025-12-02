'use client'

import { ArrowRight, Sparkles, Zap, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-6xl text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse">
          <span className="flex items-center gap-2 text-white text-sm font-medium">
            <Sparkles size={16} />
            Software Circuit Engineer - Yenilikçi Çözümler
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dijital Dönüşüm
          </span>
          <br />
          Tek Platformda
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Yenilikçi ürünler ve çözümlerle <span className="font-semibold text-purple-600">müşteri sorunlarını çözüyoruz</span>.
          CRM, Kampanya Yönetimi, Sosyal Medya Otomasyonu ve daha fazlası.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            href="/dashboard"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all text-lg font-medium"
          >
            Ücretsiz Başla
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg hover:bg-purple-50 text-lg font-medium transition-all"
          >
            İletişime Geç
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-purple-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Hızlı Çözümler</h3>
            <p className="text-slate-600">Sorunu doğrula, çözüm oluştur, ölçeklenebilir operasyonlar</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Hedef Odaklı</h3>
            <p className="text-slate-600">Müşteri odaklı ekip çalışması ile zamanında kaliteli ürünler</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-yellow-100">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">Sürekli Gelişim</h3>
            <p className="text-slate-600">Yenilikçi teknolojiler ile sürekli iyileştirme ve optimizasyon</p>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-32 bottom-0 z-10" />
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-2xl p-6 border-2 border-purple-200 transform hover:scale-[1.02] transition-transform">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2"></div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <img src="/logo.svg" alt="SCE" className="w-12 h-12" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-slate-900">SCE Digital CRM</h3>
                    <p className="text-slate-600">Profesyonel İş Yönetimi</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Lead Yönetimi', value: '1,247', color: 'from-blue-500 to-blue-600' },
                    { label: 'Aktif Kampanya', value: '24', color: 'from-purple-500 to-purple-600' },
                    { label: 'Dönüşüm', value: '%3.8', color: 'from-pink-500 to-pink-600' },
                    { label: 'ROI', value: '₺487K', color: 'from-yellow-500 to-yellow-600' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-4 text-left border border-slate-200">
                      <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
