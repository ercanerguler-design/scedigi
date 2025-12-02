# SCE Digital CRM - Admin Kullanıcı Bilgileri

## Admin Panel Giriş

### Admin Kullanıcı Bilgileri
- **Email**: `admin@sceinnovation.com`
- **Şifre**: `Admin123!`
- **Rol**: Admin

### Giriş Adımları
1. Tarayıcınızda `/auth/signin` sayfasına gidin
2. Email: `admin@sceinnovation.com` girin
3. Şifre: `Admin123!` girin
4. "Giriş Yap" butonuna tıklayın
5. Dashboard'a yönlendirileceksiniz

### Admin Paneline Erişim
- Giriş yaptıktan sonra `/admin` sayfasına gidin
- Sadece admin rolündeki kullanıcılar bu sayfaya erişebilir
- Burada:
  - Tüm kullanıcıları görebilirsiniz
  - Yeni kullanıcı oluşturabilirsiniz
  - Kullanıcı rollerini yönetebilirsiniz
  - Sistem istatistiklerini görüntüleyebilirsiniz

### Yeni Admin Kullanıcısı Oluşturma
Eğer yeni bir admin kullanıcısı oluşturmak isterseniz:

```bash
npm run create-admin
```

Bu komut otomatik olarak admin kullanıcısı oluşturur veya günceller.

### Manuel Kullanıcı Oluşturma
Admin panelden yeni kullanıcılar oluşturabilirsiniz:
1. `/admin` sayfasına gidin
2. "Yeni Kullanıcı Ekle" butonuna tıklayın
3. Kullanıcı bilgilerini doldurun
4. Rol seçin (admin veya user)
5. Kaydet

### Güvenlik Notları
- İlk kurulumdan sonra admin şifresini mutlaka değiştirin
- Güçlü şifreler kullanın
- Admin erişimini sadece güvenilir kişilere verin
- Üretim ortamında `.env` dosyasını güvenli tutun

### Sorun Giderme

**"Unauthorized" hatası alıyorum**
- Oturumunuzun açık olduğundan emin olun
- Çıkış yapıp tekrar giriş yapın
- Tarayıcı çerezlerini temizleyin

**Admin paneline erişemiyorum**
- Kullanıcınızın `role: 'admin'` olduğundan emin olun
- Database'de kontrol edin: `SELECT * FROM User WHERE email = 'admin@sceinnovation.com'`

**Şifremi unuttum**
- `npm run create-admin` komutunu çalıştırın
- Bu komut şifreyi `Admin123!` olarak sıfırlar

## Veritabanı Bağlantısı
- Platform Neon PostgreSQL kullanıyor
- Bağlantı bilgileri `.env` dosyasında

## İletişim
- Email: sce@scegrup.com
- Telefon: +90 0850 888 1 889
- WhatsApp: +90 543 392 92 30
