import { create } from 'zustand';
import { Candidate, mockCandidates, Stage } from '../lib/mockData';

interface DashboardState {
  candidates: Candidate[];
  searchQuery: string;
  stageFilter: Stage | "All";
  experienceFilter: [number, number]; // min, max
  scoreFilter: number; // min score
  selectedCandidateId: string | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setStageFilter: (stage: Stage | "All") => void;
  setExperienceFilter: (range: [number, number]) => void;
  setScoreFilter: (score: number) => void;
  moveCandidate: (id: string, newStage: Stage) => void;
  selectCandidate: (id: string | null) => void;
  updateCandidateNotes: (id: string, notes: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  candidates: mockCandidates,
  searchQuery: '',
  stageFilter: "All",
  experienceFilter: [0, 20],
  scoreFilter: 0,
  selectedCandidateId: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setStageFilter: (stage) => set({ stageFilter: stage }),
  setExperienceFilter: (range) => set({ experienceFilter: range }),
  setScoreFilter: (score) => set({ scoreFilter: score }),
  
  moveCandidate: (id, newStage) => set((state) => ({
    candidates: state.candidates.map(c => 
      c.id === id ? { ...c, stage: newStage, lastActivity: "Just now" } : c
    )
  })),

  selectCandidate: (id) => set({ selectedCandidateId: id }),

  updateCandidateNotes: (id, notes) => set((state) => ({
    candidates: state.candidates.map(c =>
      c.id === id ? { ...c, notes } : c
    )
  }))
}));
