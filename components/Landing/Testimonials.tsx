'use client'

import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Ayşe Demir',
      role: 'Marketing Director',
      company: 'TechCorp',
      avatar: 'AD',
      rating: 5,
      text: 'SCE Digital ile pazarlama süreçlerimizi tamamen otomatikleştirdik. ROI\'miz %150 arttı!'
    },
    {
      name: 'Mehmet Yılmaz',
      role: 'CEO',
      company: 'StartupX',
      avatar: 'MY',
      rating: 5,
      text: 'Tüm kampanyalarımızı tek yerden yönetebilmek inanılmaz zaman tasarrufu sağlıyor.'
    },
    {
      name: 'Zeynep Kaya',
      role: 'Growth Manager',
      company: 'E-Commerce Co',
      avatar: 'ZK',
      rating: 5,
      text: 'Lead scoring özelliği sayesinde conversion rate\'imiz %80 arttı. Harika bir platform!'
    }
  ]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-xl text-slate-600">
            Binlerce şirket SCE Digital ile büyüyor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-700 mb-6">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
