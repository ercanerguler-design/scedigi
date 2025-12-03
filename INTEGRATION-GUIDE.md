# Entegrasyon Kullanım Kılavuzu

## Genel Bakış

SCE Digital CRM platformu, her müşterinin kendi sosyal medya hesaplarını kullanabilmesi için **Multi-Tenant Entegrasyon Sistemi** sunar. Her kullanıcı kendi API anahtarlarını ekleyerek Twitter, LinkedIn, Instagram ve WhatsApp hesaplarını yönetebilir.

---

## Entegrasyonlar Sayfasına Erişim

1. Dashboard'a giriş yapın
2. Sol menüden **"Entegrasyonlar"** seçeneğine tıklayın
3. Bağlamak istediğiniz platform için API bilgilerini girin

---

## Twitter / X API Entegrasyonu

### API Anahtarları Nasıl Alınır?

1. [Twitter Developer Portal](https://developer.twitter.com) adresine gidin
2. "Projects & Apps" menüsünden yeni bir App oluşturun
3. App ayarlarından şu bilgileri kopyalayın:
   - **API Key** (Consumer Key)
   - **API Secret** (Consumer Secret)
   - **Access Token**
   - **Access Secret**
   - **Bearer Token** (Opsiyonel)

### Entegrasyon Sayfasında Girmeniz Gerekenler

```
API Key: xxxxxxxxxxxxxxxxxxxxxxxxxxx
API Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxx
Access Token: xxxxxxxxxxxxxxxxxxxxxxxxxxx
Access Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxx
Bearer Token: xxxxxxxxxxxxxxxxxxxxxxxxxxx (opsiyonel)
```

### Test Etme

- **Sosyal Medya** sayfasına gidin
- **Twitter Bot** sekmesinden bir tweet yazın
- "Tweet Gönder" butonuna tıklayın
- Tweet **kendi Twitter hesabınızdan** yayınlanacaktır

---

## LinkedIn API Entegrasyonu

### API Anahtarları Nasıl Alınır?

1. [LinkedIn Developer Portal](https://www.linkedin.com/developers/) adresine gidin
2. "Create App" butonuna tıklayarak yeni bir uygulama oluşturun
3. App ayarlarından şu bilgileri kopyalayın:
   - **Client ID**
   - **Client Secret**
4. OAuth 2.0 akışını tamamlayarak **Access Token** alın

### Entegrasyon Sayfasında Girmeniz Gerekenler

```
Client ID: xxxxxxxxxxxxxxxxxxx
Client Secret: xxxxxxxxxxxxxxxxxxx
Access Token: xxxxxxxxxxxxxxxxxxx
```

### OAuth 2.0 Access Token Alma

```bash
# 1. Authorization URL'e gidin
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=w_member_social

# 2. İzin verdikten sonra code parametresini alın
# 3. Token endpoint'ine POST request gönderin
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=YOUR_REDIRECT_URI&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
```

---

## Instagram API Entegrasyonu

### API Anahtarları Nasıl Alınır?

1. [Facebook Developer Portal](https://developers.facebook.com) adresine gidin
2. Bir uygulama oluşturun ve **Instagram Basic Display API** veya **Instagram Graph API** ekleyin
3. Instagram Business hesabınızı bağlayın
4. Şu bilgileri alın:
   - **Access Token**
   - **Business Account ID**

### Entegrasyon Sayfasında Girmeniz Gerekenler

```
Access Token: xxxxxxxxxxxxxxxxxxx
Business Account ID: 1234567890123456
```

### Önemli Notlar

- Instagram API sadece **Business** veya **Creator** hesaplarıyla çalışır
- Kişisel hesaplar için önce Business hesaba dönüşüm yapılmalıdır
- Access Token'ın süresi dolabilir, yenileme gerekebilir

---

## WhatsApp Business API Entegrasyonu

### API Anahtarları Nasıl Alınır?

1. [Facebook Developer Portal](https://developers.facebook.com) adresine gidin
2. WhatsApp Business API için başvuru yapın
3. Onaylandıktan sonra şu bilgileri alın:
   - **Phone Number ID**
   - **Access Token**

### Entegrasyon Sayfasında Girmeniz Gerekenler

```
Phone Number ID: 1234567890123456
Access Token: xxxxxxxxxxxxxxxxxxx
```

### Önemli Notlar

- WhatsApp Business API kullanmak için Facebook Business Manager hesabı gereklidir
- Telefon numaranızı verify etmeniz gerekmektedir
- Mesaj şablonları (templates) önceden onaylanmalıdır

---

## Google Ads API (Gelecek Özellik)

### API Anahtarları Nasıl Alınır?

1. [Google Ads API](https://developers.google.com/google-ads/api/docs/start) dokümantasyonunu takip edin
2. Google Cloud Console'dan bir proje oluşturun
3. Şu bilgileri alın:
   - **Client ID**
   - **Client Secret**
   - **Developer Token**

### Entegrasyon Sayfasında Girmeniz Gerekenler

```
Client ID: xxxxxxxxxxxxxxxxxxx
Client Secret: xxxxxxxxxxxxxxxxxxx
Developer Token: xxxxxxxxxxxxxxxxxxx
```

---

## Güvenlik

### API Anahtarlarınız Güvende Mi?

✅ **EVET!** Tüm API anahtarlarınız:
- Veritabanında şifreli olarak saklanır
- Sadece size özel olup, diğer kullanıcılar göremez
- HTTPS ile şifreli bağlantıdan iletilir
- Hiçbir zaman loglanmaz veya üçüncü taraflarla paylaşılmaz

### Öneriler

- API anahtarlarınızı düzenli olarak yenileyin
- Kullanmadığınız platformların entegrasyonlarını kaldırın
- Developer Portal'dan API kullanımınızı izleyin
- Şüpheli aktivite görürseniz anahtarlarınızı hemen iptal edin

---

## Sorun Giderme

### "Entegrasyon yapılmamış" hatası

**Çözüm**: Entegrasyonlar sayfasından ilgili platformun API bilgilerini ekleyin.

### "API bilgileri eksik" hatası

**Çözüm**: Tüm zorunlu alanları doldurduğunuzdan emin olun.

### "Authentication failed" hatası

**Çözüm**: 
- API anahtarlarınızın doğru olduğunu kontrol edin
- Developer Portal'dan yetkilerin verildiğini doğrulayın
- Access Token'ın süresinin dolmadığından emin olun

### "Rate limit exceeded" hatası

**Çözüm**: API kullanım limitinizi aştınız. Birkaç dakika bekleyip tekrar deneyin.

---

## Sık Sorulan Sorular

### Her platform için ayrı hesap kullanabilir miyim?
**Evet**, her platform için farklı hesapların API anahtarlarını girebilirsiniz.

### API anahtarlarımı güncelleyebilir miyim?
**Evet**, istediğiniz zaman Entegrasyonlar sayfasından güncelleyebilirsiniz.

### Entegrasyonları silmek güvenli mi?
**Evet**, platformdaki verilerinize zarar vermez, sadece bağlantıyı koparır.

### Birden fazla kullanıcı aynı Twitter hesabını kullanabilir mi?
**Hayır**, her kullanıcı kendi API anahtarlarını kullanmalıdır. Twitter API, hesap başına sınırlı sayıda uygulamaya izin verir.

---

## Destek

Entegrasyon konusunda yardıma mı ihtiyacınız var?

📧 Email: sce@scegrup.com  
📱 WhatsApp: +90 543 392 92 30  
🌐 Website: https://scedigi.vercel.app

---

## Versiyon Geçmişi

- **v1.0** (2025-01-24): Multi-tenant entegrasyon sistemi canlıya alındı
- Twitter, LinkedIn, Instagram, WhatsApp desteği eklendi
- Kullanıcı bazlı API yönetimi aktif

---

**Not**: Bu sistem sayesinde her müşteri kendi sosyal medya hesaplarını bağımsız olarak yönetebilir. Platform sahibi olarak, müşterilerinizin API anahtarlarına erişiminiz yoktur ve olamaz. Bu, güvenlik ve gizlilik açısından en iyi pratiktir.
