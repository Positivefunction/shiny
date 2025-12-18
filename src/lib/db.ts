import Dexie, { type Table } from 'dexie';
import type {
  User,
  ChildProfile,
  Pack,
  Card,
  Attempt,
  Session,
  SOAPNote,
  TherapyPlan,
  ProgressSnapshot,
  Symbol,
  SyncQueueItem,
  QuestMap,
  CommunityPost,
  AppSettings,
} from '@/types';

// VANI AI IndexedDB Database
export class VaniDatabase extends Dexie {
  // Tables
  users!: Table<User>;
  childProfiles!: Table<ChildProfile>;
  packs!: Table<Pack>;
  cards!: Table<Card>;
  attempts!: Table<Attempt>;
  sessions!: Table<Session>;
  soapNotes!: Table<SOAPNote>;
  therapyPlans!: Table<TherapyPlan>;
  progressSnapshots!: Table<ProgressSnapshot>;
  symbols!: Table<Symbol>;
  syncQueue!: Table<SyncQueueItem>;
  questMaps!: Table<QuestMap>;
  communityPosts!: Table<CommunityPost>;
  settings!: Table<AppSettings & { id: string }>;

  constructor() {
    super('vani-ai-db');

    this.version(1).stores({
      users: 'id, email, phone, role, createdAt',
      childProfiles: 'id, userId, therapistId, primaryLanguage, streak, level, lastActiveAt',
      packs: 'id, language, difficulty, level, authorId, isPublished, createdAt',
      cards: 'id, packId, type, order, *targetPhonemes',
      attempts: 'id, timestamp, childId, packId, cardId, sessionId, language, synced',
      sessions: 'id, therapistId, childId, packId, startedAt, synced',
      soapNotes: 'id, sessionId, childId, therapistId, createdAt',
      therapyPlans: 'id, childId, therapistId, status, createdAt',
      progressSnapshots: 'id, childId, date',
      symbols: 'id, category, *tags, isIndiaRelevant',
      syncQueue: 'id, kind, status, createdAt',
      questMaps: '[childId+language], childId, language',
      communityPosts: 'id, authorId, createdAt, isLocal',
      settings: 'id',
    });
  }
}

export const db = new VaniDatabase();

// Helper functions for common operations
export const dbHelpers = {
  // User operations
  async getCurrentUser(): Promise<User | undefined> {
    const users = await db.users.toArray();
    return users[0]; // Simple MVP - single user per device
  },

  async setCurrentUser(user: User): Promise<void> {
    await db.users.put(user);
  },

  // Child profile operations
  async getChildProfile(id: string): Promise<ChildProfile | undefined> {
    return db.childProfiles.get(id);
  },

  async getChildrenByTherapist(therapistId: string): Promise<ChildProfile[]> {
    return db.childProfiles.where('therapistId').equals(therapistId).toArray();
  },

  async updateChildXP(childId: string, xpToAdd: number): Promise<void> {
    await db.childProfiles.where('id').equals(childId).modify((profile) => {
      profile.xp += xpToAdd;
      profile.updatedAt = Date.now();
    });
  },

  async updateChildStreak(childId: string, increment: boolean): Promise<void> {
    await db.childProfiles.where('id').equals(childId).modify((profile) => {
      profile.streak = increment ? profile.streak + 1 : 0;
      profile.lastActiveAt = Date.now();
      profile.updatedAt = Date.now();
    });
  },

  async updateChildHearts(childId: string, hearts: number): Promise<void> {
    await db.childProfiles.where('id').equals(childId).modify((profile) => {
      profile.hearts = Math.max(0, Math.min(hearts, profile.maxHearts));
      profile.updatedAt = Date.now();
    });
  },

  // Pack operations
  async getPacksByLanguage(language: string): Promise<Pack[]> {
    return db.packs.where('language').equals(language).toArray();
  },

  async getPublishedPacks(): Promise<Pack[]> {
    return db.packs.where('isPublished').equals(1).toArray();
  },

  async getPackWithCards(packId: string): Promise<(Pack & { cards: Card[] }) | undefined> {
    const pack = await db.packs.get(packId);
    if (!pack) return undefined;
    
    const cards = await db.cards.where('packId').equals(packId).sortBy('order');
    return { ...pack, cards };
  },

  // Attempt operations
  async getAttemptsByChild(childId: string, limit?: number): Promise<Attempt[]> {
    let query = db.attempts.where('childId').equals(childId).reverse();
    if (limit) {
      return query.limit(limit).sortBy('timestamp');
    }
    return query.sortBy('timestamp');
  },

  async getAttemptsBySession(sessionId: string): Promise<Attempt[]> {
    return db.attempts.where('sessionId').equals(sessionId).sortBy('timestamp');
  },

  async getUnsyncedAttempts(): Promise<Attempt[]> {
    return db.attempts.where('synced').equals(0).toArray();
  },

  // Session operations
  async getSessionsByChild(childId: string): Promise<Session[]> {
    return db.sessions.where('childId').equals(childId).reverse().sortBy('startedAt');
  },

  async getSessionsByTherapist(therapistId: string): Promise<Session[]> {
    return db.sessions.where('therapistId').equals(therapistId).reverse().sortBy('startedAt');
  },

  // Progress operations
  async getProgressHistory(childId: string, days: number = 30): Promise<ProgressSnapshot[]> {
    const startDate = Date.now() - days * 24 * 60 * 60 * 1000;
    return db.progressSnapshots
      .where('childId')
      .equals(childId)
      .and((snap) => snap.date >= startDate)
      .sortBy('date');
  },

  // Symbol operations
  async getSymbolsByCategory(category: string): Promise<Symbol[]> {
    return db.symbols.where('category').equals(category).toArray();
  },

  async searchSymbols(query: string): Promise<Symbol[]> {
    const lowerQuery = query.toLowerCase();
    return db.symbols
      .filter((symbol) => 
        symbol.name.toLowerCase().includes(lowerQuery) ||
        symbol.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .toArray();
  },

  // Sync queue operations
  async addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'createdAt' | 'retryCount' | 'status'>): Promise<void> {
    await db.syncQueue.add({
      ...item,
      id: crypto.randomUUID(),
      status: 'pending',
      retryCount: 0,
      createdAt: Date.now(),
    });
  },

  async getPendingSyncItems(): Promise<SyncQueueItem[]> {
    return db.syncQueue.where('status').anyOf(['pending', 'failed']).toArray();
  },

  async markSynced(id: string): Promise<void> {
    await db.syncQueue.update(id, { status: 'synced' });
  },

  // Quest map operations
  async getQuestMap(childId: string, language: string): Promise<QuestMap | undefined> {
    return db.questMaps.get([childId, language]);
  },

  async updateQuestNode(childId: string, language: string, nodeId: string, updates: Partial<QuestMap['nodes'][0]>): Promise<void> {
    const questMap = await db.questMaps.get([childId, language]);
    if (!questMap) return;

    const nodeIndex = questMap.nodes.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return;

    questMap.nodes[nodeIndex] = { ...questMap.nodes[nodeIndex], ...updates };
    questMap.updatedAt = Date.now();
    await db.questMaps.put(questMap);
  },

  // Settings
  async getSettings(): Promise<AppSettings | undefined> {
    const settings = await db.settings.get('app-settings');
    return settings ? { ...settings, id: undefined } as unknown as AppSettings : undefined;
  },

  async updateSettings(settings: Partial<AppSettings>): Promise<void> {
    const existing = await db.settings.get('app-settings');
    await db.settings.put({ ...existing, ...settings, id: 'app-settings' } as AppSettings & { id: string });
  },
};

// Default settings
export const defaultSettings: AppSettings = {
  theme: 'light',
  fontSize: 'normal',
  highContrast: false,
  hapticFeedback: true,
  soundEffects: true,
  lowBandwidthMode: false,
  offlineMode: false,
  autoSync: true,
  language: 'english',
};

// Initialize default settings
export async function initializeDatabase(): Promise<void> {
  const settings = await db.settings.get('app-settings');
  if (!settings) {
    await db.settings.put({ ...defaultSettings, id: 'app-settings' });
  }
}
