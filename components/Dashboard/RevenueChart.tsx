'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function RevenueChart() {
  const data = [
    { month: 'Oca', revenue: 35000 },
    { month: 'Şub', revenue: 42000 },
    { month: 'Mar', revenue: 38000 },
    { month: 'Nis', revenue: 51000 },
    { month: 'May', revenue: 49000 },
    { month: 'Haz', revenue: 58000 },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Gelir Trendi</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
