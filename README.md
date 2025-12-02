# SCE Digital Platform

Tam entegre dijital pazarlama ve CRM platformu. Sosyal medya otomasyonu, lead yönetimi, kampanya takibi ve analytics hub.

## 🚀 Özellikler

- **Dashboard**: Gerçek zamanlı metrikleri ve KPI'ları görüntüleme
- **Kampanya Yönetimi**: Multi-channel kampanya oluşturma ve takip
- **Sosyal Medya Otomasyonu**: Twitter, Instagram, LinkedIn otomatik paylaşım
- **CRM & Lead Yönetimi**: Müşteri takibi, lead scoring, görev yönetimi
- **Analytics Hub**: Kanal performansı, conversion funnel, gerçek zamanlı ziyaretçiler
- **WhatsApp Business**: Otomatik mesajlaşma ve webhook entegrasyonu
- **AI Destekli Yanıtlar**: OpenAI ile otomatik müşteri yanıtları

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env.local dosyasını oluştur
cp .env.local.example .env.local

# Database'i kur
npm run migrate

# Geliştirme sunucusunu başlat
npm run dev
```

## 🔧 Konfigürasyon

1. `.env.local` dosyasını düzenleyin
2. Sosyal medya API anahtarlarınızı ekleyin
3. Database bağlantınızı yapılandırın
4. Redis sunucunuzu ayarlayın

## 🚀 Deployment

```bash
# Tek komutla tüm platformu deploy et
npm run deploy
```

## 📚 Dokümantasyon

- API Dokümantasyonu: `/docs/api`
- Kullanım Kılavuzu: `/docs/guide`
- Video Eğitimler: `/docs/videos`

## 🛠️ Teknolojiler

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- Zustand (State Management)
- TailwindCSS
- Recharts (Analytics)
- Bull (Job Queue)
- OpenAI API

## 📞 Destek

support@scedigital.com
