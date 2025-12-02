'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function ChannelPerformance() {
  const data = [
    { channel: 'Google Ads', clicks: 5420, conversions: 145, cost: 12500 },
    { channel: 'Facebook', clicks: 4230, conversions: 112, cost: 8900 },
    { channel: 'Instagram', clicks: 3245, conversions: 82, cost: 6700 },
    { channel: 'LinkedIn', clicks: 2134, conversions: 68, cost: 5400 },
    { channel: 'Twitter', clicks: 1856, conversions: 41, cost: 3200 },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Kanal Performansı</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="channel" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="clicks" fill="#0ea5e9" name="Tıklamalar" />
          <Bar dataKey="conversions" fill="#10b981" name="Dönüşümler" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
