'use client'

interface Lead {
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
}

interface LeadCardProps {
  lead: Lead
  onClick: () => void
  isSelected: boolean
}

export function LeadCard({ lead, onClick, isSelected }: LeadCardProps) {
  const statusColors = {
    hot: 'bg-red-100 text-red-800 border-red-300',
    warm: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    cold: 'bg-blue-100 text-blue-800 border-blue-300',
  }

  const scoreColor = lead.score > 70 ? 'text-green-600' : lead.score > 50 ? 'text-yellow-600' : 'text-slate-600'

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
          <p className="text-sm text-slate-600">{lead.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status as keyof typeof statusColors]}`}>
          {lead.status === 'hot' ? 'Sıcak' : lead.status === 'warm' ? 'Ilık' : 'Soğuk'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-600">
          <span className="w-20 font-medium">Email:</span>
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <span className="w-20 font-medium">Telefon:</span>
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <span className="w-20 font-medium">Kaynak:</span>
          <span>{lead.source}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <span className="w-20 font-medium">Değer:</span>
          <span className="font-semibold text-slate-900">{lead.value}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-slate-600 mb-1">Lead Score</p>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${lead.score > 70 ? 'bg-green-500' : lead.score > 50 ? 'bg-yellow-500' : 'bg-slate-400'}`}
                style={{ width: `${lead.score}%` }}
              />
            </div>
            <span className={`text-sm font-semibold ${scoreColor}`}>{lead.score}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-600">Son İletişim</p>
          <p className="text-sm font-medium text-slate-900">{lead.lastContact}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {lead.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
