'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { LeadCard } from '@/components/CRM/LeadCard'
import { CustomerTimeline } from '@/components/CRM/CustomerTimeline'
import { TaskManager } from '@/components/CRM/TaskManager'
import { Plus, Download, FileText, CheckCircle } from 'lucide-react'
import { useState } from 'react'

type Lead = {
  id: number
  name: string
  company: string
  email: string
  phone: string
  score: number
  status: string
  source: string
  value: string
  lastContact: string
  tags: string[]
  proposalStatus?: 'pending' | 'approved' | 'rejected'
  message?: string
}

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'proposals'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      company: 'ABC Tech',
      email: 'ahmet@abctech.com',
      phone: '+90 532 123 45 67',
      score: 85,
      status: 'hot',
      source: 'Google Ads',
      value: '₺45,000',
      lastContact: '2 saat önce',
      tags: ['Premium', 'B2B'],
      proposalStatus: 'approved',
      message: 'Web uygulaması geliştirme talebi'
    },
    {
      id: 2,
      name: 'Zeynep Kaya',
      company: 'XYZ Danışmanlık',
      email: 'zeynep@xyz.com',
      phone: '+90 533 234 56 78',
      score: 72,
      status: 'warm',
      source: 'LinkedIn',
      value: '₺28,000',
      lastContact: '1 gün önce',
      tags: ['B2B', 'Consulting'],
      proposalStatus: 'pending',
      message: 'CRM sistemi entegrasyonu'
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      company: 'Startup Co',
      email: 'mehmet@startup.co',
      phone: '+90 534 345 67 89',
      score: 45,
      status: 'cold',
      source: 'Website',
      value: '₺12,000',
      lastContact: '1 hafta önce',
      tags: ['Startup'],
      proposalStatus: 'pending',
      message: 'Mobil uygulama geliştirme'
    },
  ])

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    message: ''
  })

  const handleAddLead = async () => {
    try {
      const response = await fetch('/api/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      })
      
      const data = await response.json()
      if (data.success) {
        setLeads([...leads, {
          ...data.lead,
          value: '₺0',
          lastContact: 'Şimdi',
          tags: [],
          proposalStatus: 'pending' as const,
          message: newLead.message
        }])
        setShowAddModal(false)
        setNewLead({ name: '', email: '', phone: '', company: '', source: '', message: '' })
      }
    } catch (error) {
      console.error('Lead eklenemedi:', error)
    }
  }

  const updateProposalStatus = (leadId: number, status: 'approved' | 'rejected') => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, proposalStatus: status } : lead
    ))
  }

  const filteredLeads = activeTab === 'proposals' 
    ? leads.filter(lead => lead.proposalStatus)
    : leads

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead & Müşteri Yönetimi</h1>
            <p className="text-slate-600 mt-2">Tüm lead'lerinizi takip edin ve yönetin</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50">
              <Download size={18} />
              Dışa Aktar
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              <Plus size={18} />
              Yeni Lead
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'all'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tüm Lead'ler ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className={`pb-3 px-4 font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'proposals'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText size={16} />
            Teklifler ({leads.filter(l => l.proposalStatus).length})
          </button>
        </div>

        {activeTab === 'all' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onClick={() => setSelectedLead(lead.id)}
                  isSelected={selectedLead === lead.id}
                />
              ))}
            </div>
            <div className="space-y-6">
              {selectedLead && <CustomerTimeline leadId={selectedLead} />}
              <TaskManager />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
                    <p className="text-sm text-slate-600">{lead.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lead.proposalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                    lead.proposalStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lead.proposalStatus === 'approved' ? '✓ Onaylandı' :
                     lead.proposalStatus === 'rejected' ? '✗ Reddedildi' :
                     '⏳ Beklemede'}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm"><span className="font-medium">Email:</span> {lead.email}</p>
                  <p className="text-sm"><span className="font-medium">Telefon:</span> {lead.phone}</p>
                  <p className="text-sm"><span className="font-medium">Değer:</span> {lead.value}</p>
                  <p className="text-sm"><span className="font-medium">Mesaj:</span> {lead.message}</p>
                </div>
                {lead.proposalStatus === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateProposalStatus(lead.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle size={16} />
                      Onayla
                    </button>
                    <button
                      onClick={() => updateProposalStatus(lead.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reddet
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Yeni Lead Ekle</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ad Soyad"
                value={newLead.name}
                onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={newLead.email}
                onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={newLead.phone}
                onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Şirket"
                value={newLead.company}
                onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Kaynak (örn: Website)"
                value={newLead.source}
                onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Mesaj"
                value={newLead.message}
                onChange={(e) => setNewLead({...newLead, message: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-slate-50"
              >
                İptal
              </button>
              <button
                onClick={handleAddLead}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
