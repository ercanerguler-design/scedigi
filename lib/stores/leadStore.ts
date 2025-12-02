import { create } from 'zustand'

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

interface LeadState {
  leads: Lead[]
  selectedLead: Lead | null
  addLead: (lead: Lead) => void
  updateLead: (id: number, updates: Partial<Lead>) => void
  selectLead: (lead: Lead | null) => void
  filterByStatus: (status: string) => Lead[]
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  selectedLead: null,
  
  addLead: (lead) => set((state) => ({
    leads: [...state.leads, lead]
  })),
  
  updateLead: (id, updates) => set((state) => ({
    leads: state.leads.map(l => 
      l.id === id ? { ...l, ...updates } : l
    )
  })),
  
  selectLead: (lead) => set({ selectedLead: lead }),
  
  filterByStatus: (status) => {
    return get().leads.filter(l => l.status === status)
  }
}))
