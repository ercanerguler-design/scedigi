'use client'

import Link from 'next/link'
import { Target, Users, Zap, Award, TrendingUp, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.svg" alt="SCE Digital CRM Logo" className="h-12 w-12 transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary-600 leading-none">SCE Digital</span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">CRM</span>
            </div>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-slate-600 hover:text-primary-600">
              Ana Sayfa
            </Link>
            <Link href="/service-network" className="text-slate-600 hover:text-primary-600">
              Servis Ağı
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-primary-600">
              İletişim
            </Link>
            <Link href="/auth/signin" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
              Giriş Yap
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <span className="flex items-center gap-2 text-white text-sm font-medium">
                <Sparkles size={16} />
                Software Circuit Engineer
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hakkımızda
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Yenilikçi yeni ürünler ve çözümler geliştirerek akut müşteri sorunlarını çözüyoruz
            </p>
          </div>

          {/* Company Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 mb-16 border-2 border-purple-200">
            <div className="flex items-center gap-6 mb-8">
              <img src="/logo.svg" alt="SCE Innovation" className="h-24 w-24" />
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-2">SCE INNOVATION LTD. ŞTİ.</h2>
                <p className="text-xl text-purple-600 font-semibold">Software Circuit Engineer</p>
              </div>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Sorunu hızla doğrulamak, çözümü oluşturmak ve müşterinin ödeme isteğini test etmek için ekipler halinde çalışıyoruz. 
              Müşterilere zamanında kaliteli ürünler sunmak için ölçeklenebilir operasyon süreçleri oluşturuyoruz.
            </p>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Misyonumuz</h3>
              <p className="text-slate-600 leading-relaxed">
                Yenilikçi teknolojiler ve çözümler geliştirerek müşterilerimizin dijital dönüşüm yolculuğunda 
                en güvenilir iş ortağı olmak.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Vizyonumuz</h3>
              <p className="text-slate-600 leading-relaxed">
                Türkiye'nin lider dijital çözüm sağlayıcılarından biri olmak ve uluslararası pazarda 
                tanınan bir marka haline gelmek.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-pink-100">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Değerlerimiz</h3>
              <p className="text-slate-600 leading-relaxed">
                Yenilikçilik, müşteri odaklılık, kalite, güvenilirlik ve sürekli gelişim ilkelerimizle 
                hareket ediyoruz.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-12 text-white mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">Neden SCE Innovation?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Hızlı Çözümler</h4>
                <p className="text-slate-300">Akut sorunlara anında çözüm üretiyoruz</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Ekip Çalışması</h4>
                <p className="text-slate-300">Uzman ekibimizle birlikte çalışıyoruz</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Ölçeklenebilir</h4>
                <p className="text-slate-300">Büyüyen işletmenizle birlikte büyüyoruz</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Kaliteli Ürünler</h4>
                <p className="text-slate-300">Zamanında, kaliteli teslimat garantisi</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Hizmetlerimiz</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'CRM Yönetimi',
                  description: 'Müşteri ilişkilerinizi tek platformdan yönetin. Lead takibi, görev yönetimi ve raporlama.',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Kampanya Yönetimi',
                  description: 'Dijital kampanyalarınızı planlayın, yönetin ve sonuçlarını analiz edin.',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  title: 'Sosyal Medya Otomasyonu',
                  description: 'Sosyal medya hesaplarınızı otomatik yönetin. Zamanlı paylaşım ve analiz.',
                  color: 'from-pink-500 to-pink-600'
                },
                {
                  title: 'Analitik & Raporlama',
                  description: 'Detaylı raporlar ve analizlerle işinizi daha iyi anlayın ve optimize edin.',
                  color: 'from-yellow-500 to-yellow-600'
                },
                {
                  title: 'Teklif Yönetimi',
                  description: 'Profesyonel teklifler oluşturun, takip edin ve müşterilerinize sunun.',
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: 'Servis Ağı',
                  description: 'Bayi ve servis ağınızı tek platformdan yönetin ve koordine edin.',
                  color: 'from-indigo-500 to-indigo-600'
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-slate-200">
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Başlamaya Hazır mısınız?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Dijital dönüşüm yolculuğunuzda size eşlik edelim
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signin"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-slate-100 transition-all font-medium text-lg"
              >
                Hemen Başla
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-medium text-lg"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.svg" alt="SCE Digital CRM" className="h-10 w-10" />
                <div>
                  <h3 className="text-xl font-bold leading-none">SCE INNOVATION</h3>
                  <p className="text-sm text-slate-400 uppercase tracking-wide">LTD. ŞTİ.</p>
                </div>
              </div>
              <p className="text-slate-300 mb-3 font-medium">Software Circuit Engineer</p>
              <p className="text-slate-400 text-sm">Yenilikçi yeni ürünler ve çözümler geliştirerek akut müşteri sorunlarını çözüyoruz.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Ürünler</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/dashboard/campaigns" className="hover:text-purple-300 transition-colors">Kampanya Yönetimi</Link></li>
                <li><Link href="/dashboard/social-media" className="hover:text-purple-300 transition-colors">Sosyal Medya</Link></li>
                <li><Link href="/dashboard/analytics" className="hover:text-purple-300 transition-colors">Analytics</Link></li>
                <li><Link href="/dashboard/crm" className="hover:text-purple-300 transition-colors">CRM</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Şirket</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/about" className="hover:text-purple-300 transition-colors">Hakkımızda</Link></li>
                <li><Link href="/contact" className="hover:text-purple-300 transition-colors">İletişim</Link></li>
                <li><a href="https://www.scegrup.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">SCE Grup</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">İletişim</h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center gap-2">
                  <span className="text-purple-400">✉</span>
                  <a href="mailto:sce@scegrup.com" className="hover:text-purple-300">sce@scegrup.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-400">☎</span>
                  <a href="tel:+908508881889" className="hover:text-purple-300">+90 0850 888 1 889</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-400">💬</span>
                  <a href="https://wa.me/905433929230" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">+90 543 392 92 30</a>
                </p>
                <p className="text-sm mt-3">Çetin Emeç Bulvarı 25/3<br/>Çankaya, Ankara</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; 2025 SCE INNOVATION LTD. ŞTİ. Tüm hakları saklıdır.</p>
            <p className="text-sm mt-2">
              <a href="https://www.scegrup.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">www.scegrup.com</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
