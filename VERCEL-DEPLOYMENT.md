# SCE Digital Platform - Vercel Deployment Guide

## 🚀 Vercel'e Deploy Etme Adımları

### 1. Vercel CLI Kurulumu (Opsiyonel)
```bash
npm i -g vercel
```

### 2. Vercel Web Dashboard ile Deploy
1. https://vercel.com adresine gidin
2. "Import Project" butonuna tıklayın
3. GitHub repository'yi seçin: `ercanerguler-design/scedigi`
4. Framework Preset: **Next.js** (otomatik algılanır)
5. Root Directory: `./` (varsayılan)

### 3. Environment Variables Ekleme
Vercel Dashboard'da **Settings > Environment Variables** bölümünde şu değişkenleri ekleyin:

#### Database
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```
**NOT:** Vercel'de SQLite çalışmaz. **PostgreSQL** kullanın (Neon, Supabase, Railway önerilir)

#### NextAuth
```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret-key
```

#### Google OAuth (Opsiyonel)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Social Media APIs
```
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
TWITTER_ACCESS_TOKEN=your-twitter-access-token
TWITTER_ACCESS_SECRET=your-twitter-access-secret
TWITTER_BEARER_TOKEN=your-twitter-bearer-token

LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_ACCESS_TOKEN=your-linkedin-access-token

RESEND_API_KEY=your-resend-api-key
```

### 4. PostgreSQL Veritabanı Kurulumu (ÖNEMLİ!)

#### Seçenek A: Neon (Önerilen - Ücretsiz)
1. https://neon.tech adresine gidin
2. Yeni proje oluşturun
3. Connection string'i kopyalayın:
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb
```

#### Seçenek B: Supabase (Önerilen)
1. https://supabase.com adresine gidin
2. Yeni proje oluşturun
3. Settings > Database > Connection string (Connection pooling)

#### Seçenek C: Railway
1. https://railway.app adresine gidin
2. New Project > Provision PostgreSQL
3. Connection string'i kopyalayın

### 5. Prisma Migration (Production)
Vercel'e deploy ettikten sonra, veritabanı tablolarını oluşturmak için:

**Yöntem 1: Prisma Studio veya SQL Client ile**
- `prisma/migrations/20251202203141_init/migration.sql` dosyasındaki SQL'i çalıştırın

**Yöntem 2: Local'den Production DB'ye**
```bash
# .env dosyasında DATABASE_URL'i production DB'ye ayarlayın
npx prisma migrate deploy
```

### 6. Deploy Butonu

"Deploy" butonuna tıklayın! 🚀

### 7. Domain ve Callback URLs Güncelleme

Deploy sonrası:
1. Google OAuth: Authorized redirect URIs'ye ekleyin:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```

2. LinkedIn OAuth: Redirect URLs'ye ekleyin:
   ```
   https://your-app.vercel.app/api/linkedin/callback
   ```

## 🔧 Vercel CLI ile Deploy (Terminal)

```bash
# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## 📊 Vercel Özellikleri

✅ Otomatik SSL sertifikası  
✅ Global CDN  
✅ Serverless Functions  
✅ Preview deployments (her branch için)  
✅ Otomatik Git integration  
✅ Zero-config Next.js deployment  

## ⚡ Build Optimizasyonları

`vercel.json` dosyası hazır:
- Prisma Client otomatik generate
- Next.js production build
- Optimized caching

## 🎯 Son Kontroller

- [ ] DATABASE_URL production database'e işaret ediyor
- [ ] NEXTAUTH_URL production URL
- [ ] NEXTAUTH_SECRET güçlü ve farklı bir key
- [ ] Prisma migrations çalıştırıldı
- [ ] OAuth redirect URLs güncellendi
- [ ] Environment variables Vercel'e eklendi

## 🚨 Önemli Notlar

1. **SQLite Vercel'de çalışmaz** - Mutlaka PostgreSQL kullanın
2. **Prisma schema** üretim veritabanı için güncellenecek
3. **.env.local** dosyası GitHub'a yüklenmiyor (güvenlik için)
4. Her deployment sonrası Prisma Client otomatik generate edilir

## 🆘 Sorun Giderme

**Build Hatası: "Cannot find Prisma Client"**
```bash
# package.json'da postinstall script'i var: "prisma generate"
```

**Database Connection Error**
```bash
# DATABASE_URL formatını kontrol edin
# SSL gerektiren DB'ler için: ?sslmode=require ekleyin
```

**NextAuth Error**
```bash
# NEXTAUTH_URL'in https:// ile başladığından emin olun
# NEXTAUTH_SECRET'in production'da farklı olduğunu kontrol edin
```

## 🎉 Deploy Sonrası

Admin hesabı oluşturmak için:
1. `/auth/signup` sayfasından kayıt olun
2. Veritabanında (Neon dashboard vb.) User tablosunda role'ü "admin" yapın
3. `/admin` paneline erişin

**Kolay gelsin!** 🚀
