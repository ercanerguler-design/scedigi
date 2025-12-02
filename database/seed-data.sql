-- Demo data for SCE Digital Platform

-- Insert demo users
INSERT INTO users (email, name, password_hash, role) VALUES
('admin@scedigital.com', 'Admin User', '$2a$10$hashedpassword', 'admin'),
('user@scedigital.com', 'Demo User', '$2a$10$hashedpassword', 'user');

-- Insert demo campaigns
INSERT INTO campaigns (user_id, name, status, budget, spent, channels, start_date, end_date) VALUES
(1, 'Yaz İndirimleri 2025', 'active', 15000, 8450, '["Facebook", "Instagram", "Google Ads"]', '2025-06-01', '2025-08-31'),
(1, 'Yeni Ürün Lansmanı', 'scheduled', 25000, 0, '["Twitter", "LinkedIn", "Email"]', '2025-12-15', '2026-01-15'),
(1, 'Müşteri Kazanım', 'active', 10000, 6200, '["WhatsApp", "SMS", "Email"]', '2025-11-01', '2025-12-31');

-- Insert demo leads
INSERT INTO leads (user_id, name, email, phone, company, source, score, status, value, tags) VALUES
(1, 'Ahmet Yılmaz', 'ahmet@abctech.com', '+90 532 123 45 67', 'ABC Tech', 'Google Ads', 85, 'hot', 45000, '["Premium", "B2B"]'),
(1, 'Zeynep Kaya', 'zeynep@xyz.com', '+90 533 234 56 78', 'XYZ Danışmanlık', 'LinkedIn', 72, 'warm', 28000, '["B2B", "Consulting"]'),
(1, 'Mehmet Demir', 'mehmet@startup.co', '+90 534 345 67 89', 'Startup Co', 'Website', 45, 'cold', 12000, '["Startup"]');

-- Insert demo lead activities
INSERT INTO lead_activities (lead_id, activity_type, title, description) VALUES
(1, 'email', 'Email gönderildi', 'Teklif sunumu gönderildi'),
(1, 'call', 'Telefon görüşmesi', '15 dakika görüşüldü'),
(2, 'message', 'WhatsApp mesajı', 'Ürün bilgisi paylaşıldı'),
(2, 'email', 'İlk temas', 'Hoşgeldin emaili gönderildi');

-- Insert demo tasks
INSERT INTO tasks (user_id, lead_id, title, priority, status, due_date) VALUES
(1, 1, 'Ahmet ile follow up yap', 'high', 'pending', '2025-12-05'),
(1, 2, 'Zeynep''e teklif gönder', 'medium', 'pending', '2025-12-06'),
(1, 3, 'Toplantı notlarını kaydet', 'low', 'completed', '2025-12-01');

-- Insert demo social media posts
INSERT INTO social_posts (user_id, platform, content, status, scheduled_for) VALUES
(1, 'twitter', 'Yeni ürün lansmanımız yakında! 🚀', 'published', '2025-12-01 10:00:00'),
(1, 'instagram', 'Yaz koleksiyonu 2025 ☀️', 'published', '2025-12-01 14:00:00'),
(1, 'linkedin', 'Dijital pazarlama trendleri 2025', 'scheduled', '2025-12-05 09:00:00');
