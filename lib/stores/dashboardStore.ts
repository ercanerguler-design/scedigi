import { create } from 'zustand'

interface DashboardState {
  metrics: {
    revenue: number
    campaigns: number
    leads: number
    conversionRate: number
  }
  activities: Array<{
    action: string
    campaign: string
    time: string
  }>
  updateMetrics: (metrics: Partial<DashboardState['metrics']>) => void
  addActivity: (activity: DashboardState['activities'][0]) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: {
    revenue: 487245,
    campaigns: 24,
    leads: 1847,
    conversionRate: 3.2
  },
  activities: [],
  
  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics }
  })),
  
  addActivity: (activity) => set((state) => ({
    activities: [activity, ...state.activities].slice(0, 10)
  }))
}))
