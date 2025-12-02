-- İlk kullanıcıyı admin yap
UPDATE User SET role = 'admin' WHERE email = 'your-email@example.com';

-- Tüm kullanıcıları listele
SELECT id, name, email, role, createdAt FROM User;
