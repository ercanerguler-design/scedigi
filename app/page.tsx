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
          <Link href="/" className="text-2xl font-bold text-primary-600">
            SCE Digital
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/dashboard" className="text-slate-600 hover:text-primary-600">
              Dashboard
            </Link>
            <Link href="/dashboard" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">
              Başla
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <ServicesGrid />
      <Testimonials />
      <ContactForm />

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SCE Digital</h3>
              <p className="text-slate-400">Dijital pazarlamada yeni nesil çözümler</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürünler</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/dashboard/campaigns">Kampanya Yönetimi</Link></li>
                <li><Link href="/dashboard/social-media">Sosyal Medya</Link></li>
                <li><Link href="/dashboard/analytics">Analytics</Link></li>
                <li><Link href="/dashboard/leads">CRM</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Şirket</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/about">Hakkımızda</Link></li>
                <li><Link href="/contact">İletişim</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <p className="text-slate-400">support@scedigital.com</p>
              <p className="text-slate-400">+90 212 XXX XX XX</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; 2025 SCE Digital Platform. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
