'use client'

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import { FileText, Download, TrendingUp, Users, DollarSign, Target, Loader2 } from 'lucide-react'

interface LeadReport {
  totalLeads: number
  byStatus: { status: string; count: number }[]
  bySource: { source: string; count: number }[]
  avgScore: number
  recentLeads: any[]
}

interface ProposalReport {
  totalProposals: number
  byStatus: { status: string; count: number; value: number }[]
  totalValue: number
  avgValue: number
  recentProposals: any[]
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'proposals'>('leads')
  const [leadReport, setLeadReport] = useState<LeadReport | null>(null)
  const [proposalReport, setProposalReport] = useState<ProposalReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  useEffect(() => {
    fetchReports()
  }, [activeTab, dateRange])

  const fetchReports = async () => {
    setLoading(true)
    try {
      if (activeTab === 'leads') {
        const params = new URLSearchParams()
        if (dateRange.start) params.append('startDate', dateRange.start)
        if (dateRange.end) params.append('endDate', dateRange.end)
        
        const response = await fetch(`/api/reports/leads?${params}`)
        const data = await response.json()
        setLeadReport(data)
      } else {
        const params = new URLSearchParams()
        if (dateRange.start) params.append('startDate', dateRange.start)
        if (dateRange.end) params.append('endDate', dateRange.end)
        
        const response = await fetch(`/api/reports/proposals?${params}`)
        const data = await response.json()
        setProposalReport(data)
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (activeTab === 'leads' && leadReport) {
      const csv = [
        ['Lead Raporu'],
        [''],
        ['Toplam Lead', leadReport.totalLeads],
        ['Ortalama Skor', leadReport.avgScore.toFixed(1)],
        [''],
        ['Durum', 'Adet'],
        ...leadReport.byStatus.map(s => [s.status, s.count]),
        [''],
        ['Kaynak', 'Adet'],
        ...leadReport.bySource.map(s => [s.source || 'Belirtilmemiş', s.count])
      ].map(row => row.join(',')).join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lead-raporu-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
    } else if (activeTab === 'proposals' && proposalReport) {
      const csv = [
        ['Teklif Raporu'],
        [''],
        ['Toplam Teklif', proposalReport.totalProposals],
        ['Toplam Değer', proposalReport.totalValue],
        ['Ortalama Değer', proposalReport.avgValue.toFixed(2)],
        [''],
        ['Durum', 'Adet', 'Toplam Değer'],
        ...proposalReport.byStatus.map(s => [s.status, s.count, s.value])
      ].map(row => row.join(',')).join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `teklif-raporu-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Beklemede',
      contacted: 'İletişimde',
      qualified: 'Kalifiye',
      converted: 'Dönüştü',
      lost: 'Kayıp',
      draft: 'Taslak',
      sent: 'Gönderildi',
      accepted: 'Kabul Edildi',
      rejected: 'Reddedildi'
    }
    return labels[status] || status
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Raporlar</h1>
            <p className="text-slate-600 mt-2">Lead ve teklif analizleri</p>
          </div>
          <button
            onClick={exportToCSV}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <Download size={20} />
            CSV İndir
          </button>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Tarih Aralığı</h3>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Başlangıç</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="border border-slate-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Bitiş</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="border border-slate-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b">
            <nav className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'leads'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Lead Raporu
              </button>
              <button
                onClick={() => setActiveTab('proposals')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'proposals'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Teklif Raporu
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-primary-600" size={32} />
              </div>
            ) : (
              <>
                {activeTab === 'leads' && leadReport && (
                  <div className="space-y-6">
                    {/* Lead Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-100 text-sm">Toplam Lead</p>
                            <p className="text-3xl font-bold mt-2">{leadReport.totalLeads}</p>
                          </div>
                          <Users className="opacity-80" size={40} />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100 text-sm">Ortalama Skor</p>
                            <p className="text-3xl font-bold mt-2">{leadReport.avgScore.toFixed(1)}</p>
                          </div>
                          <TrendingUp className="opacity-80" size={40} />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100 text-sm">Kaynaklar</p>
                            <p className="text-3xl font-bold mt-2">{leadReport.bySource.length}</p>
                          </div>
                          <Target className="opacity-80" size={40} />
                        </div>
                      </div>
                    </div>

                    {/* By Status */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4">Duruma Göre Dağılım</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {leadReport.byStatus.map((item) => (
                          <div key={item.status} className="bg-white rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-slate-900">{item.count}</p>
                            <p className="text-sm text-slate-600 mt-1">{getStatusLabel(item.status)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* By Source */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4">Kaynağa Göre Dağılım</h3>
                      <div className="space-y-3">
                        {leadReport.bySource.map((item) => (
                          <div key={item.source || 'unknown'} className="flex items-center justify-between bg-white rounded-lg p-4">
                            <span className="font-medium text-slate-700">{item.source || 'Belirtilmemiş'}</span>
                            <span className="text-2xl font-bold text-primary-600">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Leads */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Son Leadler</h3>
                      <div className="space-y-3">
                        {leadReport.recentLeads.map((lead) => (
                          <div key={lead.id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium text-slate-900">{lead.name}</p>
                              <p className="text-sm text-slate-600">{lead.email}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                                lead.status === 'qualified' ? 'bg-blue-100 text-blue-700' :
                                lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                                lead.status === 'lost' ? 'bg-red-100 text-red-700' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {getStatusLabel(lead.status)}
                              </span>
                              <p className="text-sm text-slate-500 mt-2">Skor: {lead.score}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'proposals' && proposalReport && (
                  <div className="space-y-6">
                    {/* Proposal Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100 text-sm">Toplam Teklif</p>
                            <p className="text-3xl font-bold mt-2">{proposalReport.totalProposals}</p>
                          </div>
                          <FileText className="opacity-80" size={40} />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100 text-sm">Toplam Değer</p>
                            <p className="text-3xl font-bold mt-2">₺{proposalReport.totalValue.toLocaleString('tr-TR')}</p>
                          </div>
                          <DollarSign className="opacity-80" size={40} />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-100 text-sm">Ortalama Değer</p>
                            <p className="text-3xl font-bold mt-2">₺{proposalReport.avgValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</p>
                          </div>
                          <TrendingUp className="opacity-80" size={40} />
                        </div>
                      </div>
                    </div>

                    {/* By Status */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4">Duruma Göre Dağılım</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {proposalReport.byStatus.map((item) => (
                          <div key={item.status} className="bg-white rounded-lg p-4">
                            <p className="text-2xl font-bold text-slate-900">{item.count}</p>
                            <p className="text-sm text-slate-600 mt-1">{getStatusLabel(item.status)}</p>
                            <p className="text-lg font-semibold text-primary-600 mt-2">
                              ₺{item.value.toLocaleString('tr-TR')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Proposals */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Son Teklifler</h3>
                      <div className="space-y-3">
                        {proposalReport.recentProposals.map((proposal) => (
                          <div key={proposal.id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium text-slate-900">{proposal.clientName}</p>
                              <p className="text-sm text-slate-600">{proposal.clientEmail}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-slate-900">₺{proposal.totalAmount.toLocaleString('tr-TR')}</p>
                              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                                proposal.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                proposal.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                                proposal.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {getStatusLabel(proposal.status)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
