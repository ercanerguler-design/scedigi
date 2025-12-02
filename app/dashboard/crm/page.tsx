'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { TaskManager } from '@/components/CRM/TaskManager'
import { useState, useEffect } from 'react'
import { Plus, Loader2, Users, Building, Mail, Phone, Tag, Trash2 } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  tags: string[]
  notes?: string
  createdAt: string
}

export default function CRMPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    notes: ''
  })

  const fetchContacts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/crm/contacts')
      const data = await response.json()
      if (response.ok) {
        setContacts(data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/crm/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      })

      if (response.ok) {
        setShowCreateModal(false)
        setNewContact({ name: '', email: '', phone: '', company: '', position: '', notes: '' })
        fetchContacts()
      }
    } catch (error) {
      console.error('Error creating contact:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">CRM Yönetimi</h1>
            <p className="text-slate-600 mt-2">İletişim bilgilerinizi ve görevlerinizi yönetin</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            <Plus size={20} />
            Yeni İletişim
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">İletişim Listesi</h2>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-primary-600" size={40} />
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto text-slate-400 mb-4" size={48} />
                  <p className="text-slate-600 mb-4">Henüz iletişim eklenmedi</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    İlk iletişiminizi ekleyin
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900">{contact.name}</h3>
                          {contact.position && contact.company && (
                            <p className="text-sm text-slate-600">{contact.position} @ {contact.company}</p>
                          )}
                          <div className="mt-3 space-y-2">
                            {contact.email && (
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail size={16} />
                                <a href={`mailto:${contact.email}`} className="hover:text-primary-600">
                                  {contact.email}
                                </a>
                              </div>
                            )}
                            {contact.phone && (
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone size={16} />
                                <a href={`tel:${contact.phone}`} className="hover:text-primary-600">
                                  {contact.phone}
                                </a>
                              </div>
                            )}
                          </div>
                          {contact.tags && contact.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {contact.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={async () => {
                            if (confirm('Bu iletişimi silmek istediğinizden emin misiniz?')) {
                              try {
                                await fetch(`/api/crm/contacts/${contact.id}`, { method: 'DELETE' })
                                fetchContacts()
                              } catch (error) {
                                console.error('Error deleting contact:', error)
                              }
                            }
                          }}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <TaskManager />
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold">Yeni İletişim Ekle</h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <Plus className="rotate-45" size={20} />
                </button>
              </div>
              <form onSubmit={handleCreateContact} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({...newContact, email: e.target.value})}
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
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Şirket</label>
                    <input
                      type="text"
                      value={newContact.company}
                      onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pozisyon</label>
                  <input
                    type="text"
                    value={newContact.position}
                    onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Notlar</label>
                  <textarea
                    value={newContact.notes}
                    onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  İletişim Ekle
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
