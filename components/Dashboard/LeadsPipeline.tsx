'use client'

export function LeadsPipeline() {
  const stages = [
    { name: 'Yeni Lead', count: 156, color: 'bg-blue-500' },
    { name: 'İletişimde', count: 89, color: 'bg-yellow-500' },
    { name: 'Teklif', count: 45, color: 'bg-orange-500' },
    { name: 'Müzakere', count: 23, color: 'bg-purple-500' },
    { name: 'Kapanış', count: 12, color: 'bg-green-500' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Lead Pipeline</h3>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">{stage.name}</span>
              <span className="text-sm font-semibold text-slate-900">{stage.count}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className={`${stage.color} h-2 rounded-full transition-all`}
                style={{ width: `${(stage.count / 156) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
