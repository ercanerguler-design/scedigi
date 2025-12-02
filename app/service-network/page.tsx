'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, Globe, Search, Loader2 } from 'lucide-react'

interface Service {
  id: string
  name: string
  description?: string
  address: string
  city: string
  district?: string
  phone: string
  email?: string
  workingHours?: string
  services: string[]
}

interface Dealer {
  id: string
  name: string
  description?: string
  address: string
  city: string
  district?: string
  phone: string
  email?: string
  website?: string
  workingHours?: string
  products: string[]
}

export default function ServiceNetworkPage() {
  const [activeTab, setActiveTab] = useState<'services' | 'dealers'>('services')
  const [services, setServices] = useState<Service[]>([])
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const endpoint = activeTab === 'services' ? '/api/services' : '/api/dealers'
      const response = await fetch(endpoint)
      const data = await response.json()
      
      if (response.ok) {
        if (activeTab === 'services') {
          setServices(data)
        } else {
          setDealers(data)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredServices = searchCity 
    ? services.filter(s => s.city.toLowerCase().includes(searchCity.toLowerCase()))
    : services

  const filteredDealers = searchCity
    ? dealers.filter(d => d.city.toLowerCase().includes(searchCity.toLowerCase()))
    : dealers

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Servis ve Bayi Ağımız</h1>
          <p className="text-xl text-primary-100">Size en yakın servis ve bayi noktalarını bulun</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                activeTab === 'services'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Servis Noktaları
            </button>
            <button
              onClick={() => setActiveTab('dealers')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                activeTab === 'dealers'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Bayi Noktaları
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Şehir ara..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={48} />
          </div>
        ) : activeTab === 'services' ? (
          <div>
            {filteredServices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <MapPin className="mx-auto text-slate-400 mb-4" size={64} />
                <p className="text-xl text-slate-600">Henüz servis noktası eklenmedi</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div key={service.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                    {service.description && (
                      <p className="text-sm text-slate-600 mb-4">{service.description}</p>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-slate-900">{service.address}</p>
                          <p className="text-sm text-slate-600">{service.district ? `${service.district}, ` : ''}{service.city}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="text-primary-600 flex-shrink-0" size={18} />
                        <a href={`tel:${service.phone}`} className="text-sm text-slate-900 hover:text-primary-600">
                          {service.phone}
                        </a>
                      </div>
                      
                      {service.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="text-primary-600 flex-shrink-0" size={18} />
                          <a href={`mailto:${service.email}`} className="text-sm text-slate-900 hover:text-primary-600">
                            {service.email}
                          </a>
                        </div>
                      )}
                      
                      {service.workingHours && (
                        <div className="flex items-center gap-3">
                          <Clock className="text-primary-600 flex-shrink-0" size={18} />
                          <p className="text-sm text-slate-900">{service.workingHours}</p>
                        </div>
                      )}
                    </div>

                    {service.services.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs font-semibold text-slate-700 mb-2">Hizmetler:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.services.map((s, idx) => (
                            <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {filteredDealers.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <MapPin className="mx-auto text-slate-400 mb-4" size={64} />
                <p className="text-xl text-slate-600">Henüz bayi noktası eklenmedi</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDealers.map((dealer) => (
                  <div key={dealer.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{dealer.name}</h3>
                    {dealer.description && (
                      <p className="text-sm text-slate-600 mb-4">{dealer.description}</p>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-slate-900">{dealer.address}</p>
                          <p className="text-sm text-slate-600">{dealer.district ? `${dealer.district}, ` : ''}{dealer.city}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="text-primary-600 flex-shrink-0" size={18} />
                        <a href={`tel:${dealer.phone}`} className="text-sm text-slate-900 hover:text-primary-600">
                          {dealer.phone}
                        </a>
                      </div>
                      
                      {dealer.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="text-primary-600 flex-shrink-0" size={18} />
                          <a href={`mailto:${dealer.email}`} className="text-sm text-slate-900 hover:text-primary-600">
                            {dealer.email}
                          </a>
                        </div>
                      )}

                      {dealer.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="text-primary-600 flex-shrink-0" size={18} />
                          <a href={dealer.website} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-900 hover:text-primary-600">
                            Web Sitesi
                          </a>
                        </div>
                      )}
                      
                      {dealer.workingHours && (
                        <div className="flex items-center gap-3">
                          <Clock className="text-primary-600 flex-shrink-0" size={18} />
                          <p className="text-sm text-slate-900">{dealer.workingHours}</p>
                        </div>
                      )}
                    </div>

                    {dealer.products.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs font-semibold text-slate-700 mb-2">Ürünler:</p>
                        <div className="flex flex-wrap gap-2">
                          {dealer.products.map((p, idx) => (
                            <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
