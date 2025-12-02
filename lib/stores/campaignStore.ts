import { create } from 'zustand'

interface Campaign {
  id: number
  name: string
  status: string
  channels: string[]
  budget: string
  spent: string
  leads: number
  conversions: number
  startDate: string
  endDate: string
}

interface CampaignState {
  campaigns: Campaign[]
  selectedCampaign: Campaign | null
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: number, updates: Partial<Campaign>) => void
  selectCampaign: (campaign: Campaign | null) => void
}

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  selectedCampaign: null,
  
  addCampaign: (campaign) => set((state) => ({
    campaigns: [...state.campaigns, campaign]
  })),
  
  updateCampaign: (id, updates) => set((state) => ({
    campaigns: state.campaigns.map(c => 
      c.id === id ? { ...c, ...updates } : c
    )
  })),
  
  selectCampaign: (campaign) => set({ selectedCampaign: campaign })
}))
