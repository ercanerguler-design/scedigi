import Link from 'next/link'
import { Hero } from '@/components/Landing/Hero'
import { ServicesGrid } from '@/components/Landing/ServicesGrid'
import { Testimonials } from '@/components/Landing/Testimonials'
import { ContactForm } from '@/components/Landing/ContactForm'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            <Link href="/service-network" className="text-slate-600 hover:text-primary-600">
              Servis Ağı
            </Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-primary-600">
              Dashboard
            </Link>
            <Link href="/dashboard" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Başla
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <ServicesGrid />
      <Testimonials />
      <ContactForm />

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
                <li><Link href="/dashboard/proposals" className="hover:text-purple-300 transition-colors">Teklif Sistemi</Link></li>
                <li><Link href="/service-network" className="hover:text-purple-300 transition-colors">Servis Ağı</Link></li>
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
