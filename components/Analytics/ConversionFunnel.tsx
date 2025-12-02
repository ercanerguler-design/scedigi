'use client'

export function ConversionFunnel() {
  const stages = [
    { name: 'Ziyaretçi', count: 245800, percentage: 100 },
    { name: 'Sayfa Görüntüleme', count: 89423, percentage: 36 },
    { name: 'Ürün İnceleme', count: 24567, percentage: 10 },
    { name: 'Sepete Ekleme', count: 8934, percentage: 3.6 },
    { name: 'Ödeme', count: 3421, percentage: 1.4 },
    { name: 'Tamamlanan', count: 2847, percentage: 1.2 },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">{stage.name}</span>
              <div className="text-right">
                <span className="text-sm font-semibold text-slate-900">{stage.count.toLocaleString()}</span>
                <span className="text-xs text-slate-500 ml-2">(%{stage.percentage})</span>
              </div>
            </div>
            <div className="relative h-12 bg-gradient-to-r from-primary-500 to-primary-400 rounded-lg flex items-center justify-center"
                 style={{ width: `${stage.percentage}%`, minWidth: '120px' }}>
              <span className="text-white text-sm font-medium">{stage.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
