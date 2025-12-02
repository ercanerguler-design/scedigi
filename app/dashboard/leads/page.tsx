'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import { Plus, Loader2, Search, Filter, Trash2, Edit, TrendingUp, Users as UsersIcon, DollarSign } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  source?: string
  status: string
  score: number
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    source: '',
    status: 'pending',
    score: 50
  })

  const fetchLeads = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/leads/list')
      const data = await response.json()
      
      if (response.ok && data.leads) {
        setLeads(data.leads)
        setFilteredLeads(data.leads)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter)
    }

    setFilteredLeads(filtered)
  }, [searchTerm, statusFilter, leads])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingLead) {
        await fetch('/api/leads/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingLead.id, ...formData })
        })
      } else {
        await fetch('/api/leads/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }

      setShowModal(false)
      setEditingLead(null)
      setFormData({ name: '', email: '', phone: '', company: '', message: '', source: '', status: 'pending', score: 50 })
      fetchLeads()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu lead\'i silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch('/api/leads/update', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      
      if (response.ok) {
        console.log('Lead successfully deleted')
        fetchLeads()
      } else {
        const error = await response.json()
        console.error('Delete failed:', error)
        alert('Lead silinemedi: ' + (error.error || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('Error deleting lead:', error)
      alert('Lead silinirken bir hata oluştu')
    }
  }

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead)
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || '',
      message: lead.message || '',
      source: lead.source || '',
      status: lead.status,
      score: lead.score
    })
    setShowModal(true)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      qualified: 'bg-green-100 text-green-800',
      contacted: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      converted: 'bg-purple-100 text-purple-800',
      lost: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-800'
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      qualified: 'Kalifiye',
      contacted: 'İletişimde',
      pending: 'Beklemede',
      converted: 'Dönüştü',
      lost: 'Kayıp'
    }
    return labels[status as keyof typeof labels] || status
  }

  const stats = {
    total: leads.length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    avgScore: leads.length > 0 ? Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length) : 0
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead Yönetimi</h1>
            <p className="text-slate-600 mt-2">Potansiyel müşterilerinizi yönetin</p>
          </div>
          <button
            onClick={() => { setEditingLead(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 shadow-lg transition-all"
          >
            <Plus size={20} />
            Yeni Lead
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Toplam</p>
                <p className="text-4xl font-bold mt-2">{stats.total}</p>
              </div>
              <UsersIcon size={32} className="opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Kalifiye</p>
                <p className="text-4xl font-bold mt-2">{stats.qualified}</p>
              </div>
              <TrendingUp size={32} className="opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Ort. Skor</p>
                <p className="text-4xl font-bold mt-2">{stats.avgScore}</p>
              </div>
              <DollarSign size={32} className="opacity-80" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Lead ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Beklemede</option>
                <option value="contacted">İletişimde</option>
                <option value="qualified">Kalifiye</option>
                <option value="converted">Dönüştü</option>
                <option value="lost">Kayıp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={48} />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <UsersIcon className="mx-auto text-slate-400 mb-4" size={64} />
            <p className="text-xl text-slate-600">Henüz lead yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{lead.name}</h3>
                    {lead.company && <p className="text-sm text-slate-600">{lead.company}</p>}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                    {getStatusLabel(lead.status)}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div><span className="font-medium">Email:</span> {lead.email}</div>
                  {lead.phone && <div><span className="font-medium">Tel:</span> {lead.phone}</div>}
                  {lead.source && <div><span className="font-medium">Kaynak:</span> {lead.source}</div>}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Skor</span>
                    <span className="font-bold">{lead.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${lead.score >= 70 ? 'bg-green-500' : lead.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                </div>

                {lead.message && (
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg text-sm line-clamp-2">{lead.message}</div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(lead)}
                    className="flex-1 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 text-sm flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="py-2 px-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold">{editingLead ? 'Lead Düzenle' : 'Yeni Lead'}</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Şirket</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Kaynak</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Website">Website</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Facebook">Facebook</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral">Tavsiye</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Durum</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="pending">Beklemede</option>
                      <option value="contacted">İletişimde</option>
                      <option value="qualified">Kalifiye</option>
                      <option value="converted">Dönüştü</option>
                      <option value="lost">Kayıp</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Skor: {formData.score}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.score}
                    onChange={(e) => setFormData({...formData, score: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Mesaj</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={4}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingLead(null); }}
                    className="flex-1 py-3 border rounded-lg"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    {editingLead ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
