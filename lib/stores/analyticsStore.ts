import { create } from 'zustand'

interface AnalyticsState {
  pageviews: number
  visitors: number
  sessions: number
  bounceRate: number
  channels: Array<{
    name: string
    visitors: number
    conversions: number
  }>
  trackEvent: (event: string, properties: Record<string, any>) => void
  updateMetrics: (metrics: Partial<Omit<AnalyticsState, 'channels' | 'trackEvent' | 'updateMetrics'>>) => void
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  pageviews: 245800,
  visitors: 12453,
  sessions: 18924,
  bounceRate: 42.3,
  channels: [
    { name: 'Organic Search', visitors: 5820, conversions: 145 },
    { name: 'Social Media', visitors: 3245, conversions: 82 },
    { name: 'Direct', visitors: 2134, conversions: 68 },
    { name: 'Email', visitors: 1254, conversions: 47 }
  ],
  
  trackEvent: (event, properties) => {
    console.log('Event tracked:', event, properties)
    // Send to analytics service
  },
  
  updateMetrics: (newMetrics) => set((state) => ({
    ...state,
    ...newMetrics
  }))
}))
