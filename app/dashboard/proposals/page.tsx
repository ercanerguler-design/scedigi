'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import { Plus, Loader2, FileText, Trash2, Send, CheckCircle, XCircle, Eye } from 'lucide-react'

interface ProposalItem {
  id: string
  name: string
  description?: string
  quantity: number
  unitPrice: number
  total: number
}

interface Proposal {
  id: string
  title: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  status: string
  validUntil: string
  notes?: string
  subtotal: number
  tax: number
  total: number
  items: ProposalItem[]
  createdAt: string
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newProposal, setNewProposal] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    validUntil: '',
    notes: '',
    tax: 0
  })
  const [items, setItems] = useState<Array<{name: string, description: string, quantity: number, unitPrice: number}>>([
    { name: '', description: '', quantity: 1, unitPrice: 0 }
  ])

  const fetchProposals = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/proposals')
      const data = await response.json()
      if (response.ok) {
        setProposals(data)
      }
    } catch (error) {
      console.error('Error fetching proposals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProposals()
  }, [])

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProposal, items })
      })

      if (response.ok) {
        setShowCreateModal(false)
        setNewProposal({ title: '', clientName: '', clientEmail: '', clientPhone: '', validUntil: '', notes: '', tax: 0 })
        setItems([{ name: '', description: '', quantity: 1, unitPrice: 0 }])
        fetchProposals()
      }
    } catch (error) {
      console.error('Error creating proposal:', error)
    }
  }

  const handleDeleteProposal = async (id: string) => {
    if (!confirm('Bu teklifi silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/proposals/${id}`, { method: 'DELETE' })
      if (response.ok) fetchProposals()
    } catch (error) {
      console.error('Error deleting proposal:', error)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/proposals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (response.ok) fetchProposals()
    } catch (error) {
      console.error('Error updating proposal:', error)
    }
  }

  const addItem = () => {
    setItems([...items, { name: '', description: '', quantity: 1, unitPrice: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const statusColors = {
    draft: 'bg-slate-100 text-slate-800',
    sent: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    draft: 'Taslak',
    sent: 'Gönderildi',
    approved: 'Onaylandı',
    rejected: 'Reddedildi'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Teklif Yönetimi</h1>
            <p className="text-slate-600 mt-2">Müşterilerinize teklif oluşturun ve yönetin</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            <Plus size={20} />
            Yeni Teklif
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={48} />
          </div>
        ) : proposals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <FileText className="mx-auto text-slate-400 mb-4" size={64} />
            <p className="text-xl text-slate-600 mb-4">Henüz teklif oluşturulmadı</p>
            <button onClick={() => setShowCreateModal(true)} className="text-primary-600 hover:text-primary-700 font-medium">
              İlk teklifinizi oluşturun
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{proposal.title}</h3>
                    <p className="text-sm text-slate-600">{proposal.clientName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[proposal.status as keyof typeof statusColors]}`}>
                    {statusLabels[proposal.status as keyof typeof statusLabels]}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Ara Toplam:</span>
                    <span className="font-semibold">{formatCurrency(proposal.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">KDV:</span>
                    <span className="font-semibold">{formatCurrency(proposal.tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Toplam:</span>
                    <span className="text-primary-600">{formatCurrency(proposal.total)}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 mb-4">
                  Geçerlilik: {new Date(proposal.validUntil).toLocaleDateString('tr-TR')}
                </div>

                <div className="flex gap-2">
                  {proposal.status === 'draft' && (
                    <button
                      onClick={() => handleUpdateStatus(proposal.id, 'sent')}
                      className="flex-1 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      Gönder
                    </button>
                  )}
                  {proposal.status === 'sent' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(proposal.id, 'approved')}
                        className="flex-1 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Onayla
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(proposal.id, 'rejected')}
                        className="flex-1 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <XCircle size={16} />
                        Reddet
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteProposal(proposal.id)}
                    className="py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold">Yeni Teklif Oluştur</h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <Plus className="rotate-45" size={20} />
                </button>
              </div>
              <form onSubmit={handleCreateProposal} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Teklif Başlığı *</label>
                  <input
                    type="text"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Müşteri Adı *</label>
                    <input
                      type="text"
                      value={newProposal.clientName}
                      onChange={(e) => setNewProposal({...newProposal, clientName: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={newProposal.clientEmail}
                      onChange={(e) => setNewProposal({...newProposal, clientEmail: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={newProposal.clientPhone}
                      onChange={(e) => setNewProposal({...newProposal, clientPhone: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Geçerlilik Tarihi *</label>
                    <input
                      type="date"
                      value={newProposal.validUntil}
                      onChange={(e) => setNewProposal({...newProposal, validUntil: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ürün/Hizmetler</label>
                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Ürün/Hizmet"
                        value={item.name}
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        className="col-span-5 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Adet"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                        className="col-span-2 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Birim Fiyat"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                        className="col-span-3 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="col-span-2 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addItem}
                    className="mt-2 px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 text-sm"
                  >
                    + Ürün/Hizmet Ekle
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Notlar</label>
                  <textarea
                    value={newProposal.notes}
                    onChange={(e) => setNewProposal({...newProposal, notes: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Teklif Oluştur
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
