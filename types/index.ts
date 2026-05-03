export interface VocabularyCard {
  id: string;
  korean: string;
  english: string;
  romanization?: string;
  notes?: string;
  confidence: 'unrated' | 'learning' | 'known';
  createdAt: number;
  lastReviewedAt?: number;
}

export interface CardSet {
  id: string;
  name: string;
  description?: string;
  cards: VocabularyCard[];
  createdAt: number;
  updatedAt: number;
}

export interface UserSettings {
  ttsRate: number;
  ttsPitch: number;
  showRomanization: boolean;
  studyDirection: 'korean-first' | 'english-first';
  streak: number;
  lastStudyDate: string;
}

export type View = 'sets' | 'study' | 'settings';
