'use client'

import { Twitter, Send, Calendar, Sparkles } from 'lucide-react'
import { useState } from 'react'

const SCE_TEMPLATES = [
  {
    id: 1,
    category: 'Hizmet Tanıtımı',
    content: '🚀 SCE INNOVATION ile dijital dönüşümünüzü hızlandırın!\n\n✨ Web & Mobil Uygulama Geliştirme\n📊 Veri Analizi & İş Zekası\n🤖 Yapay Zeka Çözümleri\n\nSizin için en iyi çözümü üretiyoruz! 💡\n\n#SCEInnovation #DijitalDönüşüm #Teknoloji'
  },
  {
    id: 2,
    category: 'Başarı Hikayesi',
    content: '🎯 Bir diğer başarılı proje tamamlandı!\n\nMüşterimizin dijital süreçlerini %40 hızlandırdık. 📈\n\nSCE INNOVATION olarak, işletmelerin büyümesine katkı sağlamaktan gurur duyuyoruz! 💪\n\n#SCEInnovation #BaşarıHikayesi #DigitalTransformation'
  },
  {
    id: 3,
    category: 'Teknoloji Trendi',
    content: '💡 2025\'te Yapay Zeka trendleri:\n\n🔹 Generative AI iş süreçlerinde\n🔹 AI-powered automation\n🔹 Akıllı veri analizi\n\nSCE INNOVATION ile geleceğe hazır olun! 🚀\n\n#AI #YapayZeka #SCEInnovation #Innovation'
  },
  {
    id: 4,
    category: 'Müşteri Odaklı',
    content: '🤝 SCE INNOVATION farkı:\n\n✅ Müşteri memnuniyeti odaklı\n✅ Hızlı ve güvenilir çözümler\n✅ 7/24 destek\n✅ Uzman ekip\n\nProjeniz için doğru adres! 💼\n\n#SCEInnovation #MüşteriMemnuniyeti #Kalite'
  },
  {
    id: 5,
    category: 'Motivasyon',
    content: '🌟 "İnovasyon, hayal gücünü gerçeğe dönüştürmektir."\n\nSCE INNOVATION olarak her gün yenilikçi çözümler üretiyoruz! 💡\n\nSizin hayalleriniz, bizim projelerimiz! 🚀\n\n#SCEInnovation #Innovation #Motivasyon #Technology'
  },
  {
    id: 6,
    category: 'Ürün/Hizmet',
    content: '📱 Mobil uygulama mı geliştirmek istiyorsunuz?\n\nSCE INNOVATION ile:\n✨ iOS & Android\n✨ Cross-platform çözümler\n✨ Modern UI/UX tasarım\n✨ Performans odaklı kod\n\nHemen iletişime geçin! 📞\n\n#MobileApp #SCEInnovation #AppDevelopment'
  }
]

export function TwitterBot() {
  const [tweet, setTweet] = useState('')
  const [isScheduling, setIsScheduling] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [scheduleTime, setScheduleTime] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handlePostTweet = async () => {
    if (!tweet.trim()) {
      setMessage({ type: 'error', text: 'Tweet içeriği boş olamaz!' })
      return
    }

    setIsPosting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/twitter/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isScheduling ? 'schedule' : 'tweet',
          content: tweet,
          schedule: scheduleTime
        })
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: isScheduling ? 'Tweet zamanlandı! 📅' : 'Tweet gönderildi! 🚀' 
        })
        setTweet('')
        setScheduleTime('')
        setIsScheduling(false)
      } else {
        setMessage({ type: 'error', text: data.error || 'Bir hata oluştu!' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bağlantı hatası!' })
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Twitter size={24} />
          <h3 className="text-xl font-semibold">Twitter Otomatik Post</h3>
        </div>
        <p className="text-blue-100">Tweetlerinizi otomatik olarak zamanlayın ve yayınlayın</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Tweet İçeriği
        </label>
        <textarea
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          rows={4}
          placeholder="Tweetinizi buraya yazın..."
          maxLength={280}
        />
        <div className="text-right text-sm text-slate-500 mt-1">
          {tweet.length}/280
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
        <button 
          onClick={() => setIsScheduling(!isScheduling)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
        >
          <Calendar size={18} />
          Zamanla
        </button>
        <button 
          onClick={handlePostTweet}
          disabled={isPosting || !tweet.trim()}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
          {isPosting ? 'Gönderiliyor...' : (isScheduling ? 'Zamanla' : 'Şimdi Gönder')}
        </button>
      </div>

      {showTemplates && (
        <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
          <h4 className="font-medium mb-3">SCE INNOVATION Tweet Template'leri</h4>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {SCE_TEMPLATES.map((template) => (
              <div 
                key={template.id}
                className="p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => setTweet(template.content)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3 whitespace-pre-line">
                  {template.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isScheduling && (
        <div className="p-4 border border-slate-200 rounded-lg">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Yayın Zamanı
          </label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      )}

      <div>
        <h4 className="font-medium mb-3">Son Tweetler</h4>
        <div className="space-y-3">
          {[
            { content: 'Yeni ürün lansmanımız yakında! 🚀', engagement: 245, time: '2 saat önce' },
            { content: 'Müşteri memnuniyeti bizim önceliğimiz', engagement: 189, time: '1 gün önce' },
          ].map((tweet, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg">
              <p className="text-sm text-slate-900 mb-2">{tweet.content}</p>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{tweet.engagement} etkileşim</span>
                <span>{tweet.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
