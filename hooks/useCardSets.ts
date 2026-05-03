'use client';
import { useLocalStorage } from './useLocalStorage';
import { CardSet, VocabularyCard } from '@/types';
import { sampleSet } from '@/lib/sampleData';

const DEFAULT_SETS: CardSet[] = [sampleSet];

export function useCardSets() {
  const [sets, setSets, loaded] = useLocalStorage<CardSet[]>('lukelingo-sets', DEFAULT_SETS);

  const createSet = (name: string, description?: string) => {
    const newSet: CardSet = {
      id: crypto.randomUUID(),
      name,
      description,
      cards: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setSets((prev) => [...prev, newSet]);
    return newSet.id;
  };

  const updateSet = (id: string, updates: Partial<Pick<CardSet, 'name' | 'description'>>) => {
    setSets((prev) => prev.map((s) => s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s));
  };

  const deleteSet = (id: string) => {
    setSets((prev) => prev.filter((s) => s.id !== id));
  };

  const addCard = (setId: string, card: Omit<VocabularyCard, 'id' | 'confidence' | 'createdAt'>) => {
    const newCard: VocabularyCard = { ...card, id: crypto.randomUUID(), confidence: 'unrated', createdAt: Date.now() };
    setSets((prev) => prev.map((s) => s.id === setId ? { ...s, cards: [...s.cards, newCard], updatedAt: Date.now() } : s));
    return newCard.id;
  };

  const updateCard = (setId: string, cardId: string, updates: Partial<VocabularyCard>) => {
    setSets((prev) => prev.map((s) => s.id === setId
      ? { ...s, cards: s.cards.map((c) => c.id === cardId ? { ...c, ...updates } : c), updatedAt: Date.now() }
      : s
    ));
  };

  const deleteCard = (setId: string, cardId: string) => {
    setSets((prev) => prev.map((s) => s.id === setId
      ? { ...s, cards: s.cards.filter((c) => c.id !== cardId), updatedAt: Date.now() }
      : s
    ));
  };

  const importSets = (imported: CardSet[]) => {
    setSets((prev) => {
      const existingIds = new Set(prev.map((s) => s.id));
      const newSets = imported.filter((s) => !existingIds.has(s.id));
      return [...prev, ...newSets];
    });
  };

  return { sets, loaded, createSet, updateSet, deleteSet, addCard, updateCard, deleteCard, importSets };
}
