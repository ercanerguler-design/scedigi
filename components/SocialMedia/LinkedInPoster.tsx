'use client'

import { Linkedin, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'

const LINKEDIN_TEMPLATES = [
  {
    id: 1,
    category: 'Şirket Tanıtımı',
    content: `🚀 SCE INNOVATION - Dijital Geleceğinizi Şekillendiriyoruz

Teknoloji ve inovasyonun gücüyle işletmelerin dijital dönüşüm yolculuğunda yanındayız.

✨ Hizmetlerimiz:
• Web & Mobil Uygulama Geliştirme
• Kurumsal Yazılım Çözümleri
• Veri Analizi & Business Intelligence
• Yapay Zeka Entegrasyonları
• Dijital Pazarlama Otomasyonu

Projeleriniz için doğru teknoloji partneri arıyorsanız, bize ulaşın! 💼

#SCEInnovation #DijitalDönüşüm #Teknoloji #Innovation #SoftwareDevelopment`
  },
  {
    id: 2,
    category: 'Başarı Hikayesi',
    content: `🎯 Müşteri Başarı Hikayesi

Geçtiğimiz ay tamamladığımız projeyle müşterimizin:

📊 İş süreçlerini %40 hızlandırdık
💰 Operasyon maliyetlerini %30 azalttık
📈 Müşteri memnuniyetini %25 artırdık

SCE INNOVATION olarak, her projenin arkasında gerçek değer yaratmayı hedefliyoruz.

Sizin başarı hikayenizi birlikte yazalım! 🚀

#BaşarıHikayesi #DijitalDönüşüm #ROI #SCEInnovation #CaseStudy`
  },
  {
    id: 3,
    category: 'Thought Leadership',
    content: `💡 2025'te İşletmelerin Odaklanması Gereken 5 Teknoloji Trendi:

1️⃣ Generative AI - İş süreçlerinde yapay zeka kullanımı
2️⃣ Low-Code/No-Code Platformlar - Hızlı uygulama geliştirme
3️⃣ IoT & Edge Computing - Gerçek zamanlı veri işleme
4️⃣ Blockchain - Güvenli ve şeffaf iş süreçleri
5️⃣ Hyperautomation - Akıllı otomasyon çözümleri

Bu trendleri işinize entegre etmek için stratejiniz hazır mı?

SCE INNOVATION ile geleceğe hazırlanın! 🚀

#TechTrends #AI #Innovation #DigitalTransformation #FutureOfWork`
  },
  {
    id: 4,
    category: 'Ekip & Kültür',
    content: `👥 SCE INNOVATION'da Çalışmak

Biz sadece kod yazmıyoruz, geleceği şekillendiriyoruz! 💡

✨ Neden SCE INNOVATION?
• İnovasyon odaklı projeler
• Sürekli öğrenme ve gelişim
• Uzman ekiplerle çalışma fırsatı
• Hybrid çalışma modeli
• Rekabetçi maaş ve yan haklar

Ekibimize katılmak ister misiniz?

Açık pozisyonlarımız için profil linkimizi ziyaret edin! 🚀

#KariyerFırsatları #SCEInnovation #WeAreHiring #TechJobs #Innovation`
  },
  {
    id: 5,
    category: 'Ürün/Hizmet Tanıtımı',
    content: `📱 Mobil Uygulama Geliştirme Hizmetimiz

İşletmenizi cebinize taşıyın! SCE INNOVATION'ın mobil uygulama çözümleriyle:

✅ iOS & Android platformlarında native geliştirme
✅ Cross-platform çözümler (React Native, Flutter)
✅ Modern UI/UX tasarım
✅ Cloud entegrasyonu ve API geliştirme
✅ Güvenlik ve performans odaklı mimari
✅ Bakım ve destek hizmetleri

Fikrinizi gerçeğe dönüştürelim! 💡

Detaylı bilgi için bizimle iletişime geçin.

#MobileApp #AppDevelopment #iOS #Android #SCEInnovation #DigitalSolutions`
  },
  {
    id: 6,
    category: 'Etkinlik/Duyuru',
    content: `📢 Heyecan Verici Bir Duyuru!

SCE INNOVATION olarak yeni bir döneme başlıyoruz! 🎉

Son 1 yılda:
✨ 50+ başarılı proje
✨ 30+ mutlu müşteri
✨ %200 büyüme

Ve şimdi daha büyük hedeflerle yola devam ediyoruz!

Önümüzdeki dönemde:
🚀 Yeni ürün lansmanları
🚀 Uluslararası pazara açılım
🚀 Genişleyen ekip

Bu heyecan verici yolculukta bizimle olun! 💪

#SCEInnovation #Announcement #Growth #Innovation #Success`
  },
  {
    id: 7,
    category: 'Eğitim/İçgörü',
    content: `📚 Dijital Dönüşüm Yolculuğunuza Nasıl Başlamalısınız?

5 Temel Adım:

1️⃣ Mevcut Durumu Analiz Edin
   • İş süreçlerinizi haritalayın
   • Dijital olgunluk seviyenizi belirleyin

2️⃣ Hedeflerinizi Netleştirin
   • Hangi problemleri çözmek istiyorsunuz?
   • Başarıyı nasıl ölçeceksiniz?

3️⃣ Doğru Teknolojileri Seçin
   • İhtiyacınıza uygun çözümler
   • Ölçeklenebilir altyapı

4️⃣ Ekibinizi Hazırlayın
   • Eğitim ve change management
   • Dijital kültür oluşturma

5️⃣ Adım Adım İlerleyin
   • Pilot projelerle başlayın
   • Sürekli iyileştirme yapın

SCE INNOVATION ile bu yolculukta yalnız değilsiniz! 🚀

#DigitalTransformation #BusinessStrategy #SCEInnovation #Technology`
  }
]

export function LinkedInPoster() {
  const [post, setPost] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [recentPosts, setRecentPosts] = useState([
    { id: 1, content: 'Yeni blog yazımız yayında: "Dijital Pazarlama Trendleri 2025"', likes: 342, comments: 28, time: '2 saat önce' },
    { id: 2, content: 'Ekibimiz büyüyor! Yeni pozisyonlar için başvurular açık.', likes: 567, comments: 45, time: '1 gün önce' },
  ])

  const handlePostLinkedIn = async () => {
    if (!post.trim()) {
      setMessage({ type: 'error', text: 'Post içeriği boş olamaz!' })
      return
    }

    setIsPosting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/linkedin/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: post })
      })

      const data = await response.json()

      if (data.success) {
        const newPost = {
          id: Date.now(),
          content: post.substring(0, 100) + (post.length > 100 ? '...' : ''),
          likes: Math.floor(Math.random() * 200) + 50,
          comments: Math.floor(Math.random() * 30) + 5,
          time: 'Şimdi'
        }
        setRecentPosts([newPost, ...recentPosts.slice(0, 4)])
        
        setMessage({ 
          type: 'success', 
          text: '✅ LinkedIn\'de başarıyla paylaşıldı!' 
        })
        setPost('')
      } else {
        if (data.needsAuth) {
          setMessage({ 
            type: 'error', 
            text: '⚠️ LinkedIn ile bağlantı gerekli. Lütfen "LinkedIn\'e Bağlan" butonuna tıklayın.' 
          })
        } else {
          setMessage({ type: 'error', text: data.error || 'Bir hata oluştu!' })
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bağlantı hatası!' })
    } finally {
      setIsPosting(false)
    }
  }

  const connectLinkedIn = () => {
    window.open('/api/linkedin/auth', '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Linkedin size={24} />
              <h3 className="text-xl font-semibold">LinkedIn Otomatik Paylaşım</h3>
            </div>
            <p className="text-blue-100">Profesyonel içeriklerinizi LinkedIn'de paylaşın</p>
          </div>
          <button
            onClick={connectLinkedIn}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm flex items-center gap-2"
          >
            <Linkedin size={16} />
            LinkedIn'e Bağlan
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Post İçeriği
        </label>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          rows={6}
          placeholder="LinkedIn postunuzu yazın..."
        />
        <div className="text-right text-sm text-slate-500 mt-1">
          {post.length} karakter
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-3">
        <button 
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
        >
          <Sparkles size={18} />
          Template
        </button>
        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
          Taslak Kaydet
        </button>
        <button 
          onClick={handlePostLinkedIn}
          disabled={isPosting || !post.trim()}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
          {isPosting ? 'Paylaşılıyor...' : "LinkedIn'de Paylaş"}
        </button>
      </div>

      {showTemplates && (
        <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
          <h4 className="font-medium mb-3">SCE INNOVATION LinkedIn Template'leri</h4>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {LINKEDIN_TEMPLATES.map((template) => (
              <div 
                key={template.id}
                className="p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-blue-600 transition-colors"
                onClick={() => {
                  setPost(template.content)
                  setShowTemplates(false)
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-4 whitespace-pre-line">
                  {template.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-medium mb-3">Son Paylaşımlar</h4>
        <div className="space-y-3">
          {recentPosts.map((postItem) => (
            <div key={postItem.id} className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
              <p className="text-sm text-slate-900 mb-2">{postItem.content}</p>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <div className="flex gap-4">
                  <span>👍 {postItem.likes} beğeni</span>
                  <span>💬 {postItem.comments} yorum</span>
                </div>
                <span>{postItem.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
