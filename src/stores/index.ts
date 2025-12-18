import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { 
  User, 
  ChildProfile, 
  AppSettings, 
  FeatureFlags,
  SupportedLanguage 
} from '@/types';
import { defaultSettings } from '@/lib/db';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'vani-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Child Game Store
interface GameState {
  currentProfile: ChildProfile | null;
  currentLanguage: SupportedLanguage;
  currentPackId: string | null;
  currentCardIndex: number;
  sessionId: string | null;
  isRecording: boolean;
  isProcessing: boolean;
  hearts: number;
  streak: number;
  xp: number;
  // Actions
  setProfile: (profile: ChildProfile | null) => void;
  setLanguage: (language: SupportedLanguage) => void;
  startSession: (packId: string) => void;
  nextCard: () => void;
  setRecording: (recording: boolean) => void;
  setProcessing: (processing: boolean) => void;
  updateHearts: (hearts: number) => void;
  updateStreak: (streak: number) => void;
  addXP: (xp: number) => void;
  resetSession: () => void;
}

export const useGameStore = create<GameState>()((set) => ({
  currentProfile: null,
  currentLanguage: 'english',
  currentPackId: null,
  currentCardIndex: 0,
  sessionId: null,
  isRecording: false,
  isProcessing: false,
  hearts: 5,
  streak: 0,
  xp: 0,
  setProfile: (profile) => set({ 
    currentProfile: profile,
    hearts: profile?.hearts ?? 5,
    streak: profile?.streak ?? 0,
    xp: profile?.xp ?? 0,
    currentLanguage: profile?.primaryLanguage ?? 'english',
  }),
  setLanguage: (language) => set({ currentLanguage: language }),
  startSession: (packId) => set({ 
    currentPackId: packId, 
    currentCardIndex: 0,
    sessionId: crypto.randomUUID(),
  }),
  nextCard: () => set((state) => ({ currentCardIndex: state.currentCardIndex + 1 })),
  setRecording: (recording) => set({ isRecording: recording }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  updateHearts: (hearts) => set({ hearts: Math.max(0, Math.min(5, hearts)) }),
  updateStreak: (streak) => set({ streak }),
  addXP: (xpToAdd) => set((state) => ({ xp: state.xp + xpToAdd })),
  resetSession: () => set({ 
    currentPackId: null, 
    currentCardIndex: 0,
    sessionId: null,
  }),
}));

// Therapist Store
interface TherapistState {
  selectedPatientId: string | null;
  selectedPackId: string | null;
  isAuthoringMode: boolean;
  currentSessionId: string | null;
  // Actions
  selectPatient: (id: string | null) => void;
  selectPack: (id: string | null) => void;
  setAuthoringMode: (mode: boolean) => void;
  startClinicSession: (sessionId: string) => void;
  endClinicSession: () => void;
}

export const useTherapistStore = create<TherapistState>()((set) => ({
  selectedPatientId: null,
  selectedPackId: null,
  isAuthoringMode: false,
  currentSessionId: null,
  selectPatient: (id) => set({ selectedPatientId: id }),
  selectPack: (id) => set({ selectedPackId: id }),
  setAuthoringMode: (mode) => set({ isAuthoringMode: mode }),
  startClinicSession: (sessionId) => set({ currentSessionId: sessionId }),
  endClinicSession: () => set({ currentSessionId: null }),
}));

// Settings Store
interface SettingsState {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => 
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
    }),
    {
      name: 'vani-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Feature Flags Store
interface FeatureFlagsState {
  flags: FeatureFlags;
  setFlags: (flags: Partial<FeatureFlags>) => void;
}

export const useFeatureFlagsStore = create<FeatureFlagsState>()((set) => ({
  flags: {
    cloudSync: false, // MVP: disabled
    asrProduction: false, // MVP: use Web Speech API
    llmSoap: false, // MVP: templates only
    llmTherapyPlan: false, // MVP: templates only
    teletherapy: true, // MVP: basic audio
    parentCommunity: true, // MVP: local only
  },
  setFlags: (newFlags) => 
    set((state) => ({ flags: { ...state.flags, ...newFlags } })),
}));

// UI Store for global UI state
interface UIState {
  isSidebarOpen: boolean;
  isBottomSheetOpen: boolean;
  bottomSheetContent: React.ReactNode | null;
  toastQueue: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openBottomSheet: (content: React.ReactNode) => void;
  closeBottomSheet: () => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  isBottomSheetOpen: false,
  bottomSheetContent: null,
  toastQueue: [],
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  openBottomSheet: (content) => set({ isBottomSheetOpen: true, bottomSheetContent: content }),
  closeBottomSheet: () => set({ isBottomSheetOpen: false, bottomSheetContent: null }),
  addToast: (message, type) => {
    const id = crypto.randomUUID();
    set((state) => ({ 
      toastQueue: [...state.toastQueue, { id, message, type }] 
    }));
    // Auto-remove after 3 seconds
    setTimeout(() => {
      set((state) => ({ 
        toastQueue: state.toastQueue.filter((t) => t.id !== id) 
      }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({ 
    toastQueue: state.toastQueue.filter((t) => t.id !== id) 
  })),
}));

// Sync Store for offline-first
interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncAt: number | null;
  pendingCount: number;
  // Actions
  setOnline: (online: boolean) => void;
  setSyncing: (syncing: boolean) => void;
  setLastSync: (timestamp: number) => void;
  setPendingCount: (count: number) => void;
}

export const useSyncStore = create<SyncState>()((set) => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  isSyncing: false,
  lastSyncAt: null,
  pendingCount: 0,
  setOnline: (online) => set({ isOnline: online }),
  setSyncing: (syncing) => set({ isSyncing: syncing }),
  setLastSync: (timestamp) => set({ lastSyncAt: timestamp }),
  setPendingCount: (count) => set({ pendingCount: count }),
}));

// Initialize online/offline listeners
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => useSyncStore.getState().setOnline(true));
  window.addEventListener('offline', () => useSyncStore.getState().setOnline(false));
}
