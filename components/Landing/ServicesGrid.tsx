'use client'

import { Target, BarChart3, Share2, Users, Zap, Lock } from 'lucide-react'

export function ServicesGrid() {
  const services = [
    {
      icon: Target,
      title: 'Kampanya Yönetimi',
      description: 'Multi-channel kampanyalarınızı tek yerden planlayın ve yönetin.',
      color: 'bg-blue-500'
    },
    {
      icon: Share2,
      title: 'Sosyal Medya Otomasyonu',
      description: 'Twitter, Instagram, LinkedIn postlarınızı otomatikleştirin.',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Raporlama',
      description: 'Detaylı analytics ve gerçek zamanlı performans takibi.',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'CRM & Lead Yönetimi',
      description: 'Müşterilerinizi takip edin, lead scoring ile önceliklendirin.',
      color: 'bg-orange-500'
    },
    {
      icon: Zap,
      title: 'Otomatik Deployment',
      description: 'Tek tıkla production\'a deploy edin, otomatik CI/CD.',
      color: 'bg-yellow-500'
    },
    {
      icon: Lock,
      title: 'Güvenli & Ölçeklenebilir',
      description: 'Enterprise-grade güvenlik ve sınırsız ölçeklenebilirlik.',
      color: 'bg-red-500'
    }
  ]

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Güçlü Özellikler
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            İşinizi büyütmek için ihtiyacınız olan her şey, tek bir platformda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
