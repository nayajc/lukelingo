'use client';
import { useState, useEffect } from 'react';
import { CardSet, VocabularyCard } from '@/types';
import { sampleSet } from '@/lib/sampleData';
import { subscribeCardSets, saveCardSet, deleteCardSet } from '@/lib/firestore';

// localStorage fallback for unauthenticated use
import { useLocalStorage } from './useLocalStorage';

function useSets(userId: string | null) {
  const [localSets, setLocalSets] = useLocalStorage<CardSet[]>('lukelingo-sets', [sampleSet]);
  const [cloudSets, setCloudSets] = useState<CardSet[] | null>(null);

  useEffect(() => {
    if (!userId) { setCloudSets(null); return; }
    return subscribeCardSets(userId, setCloudSets);
  }, [userId]);

  const sets = userId ? (cloudSets ?? []) : localSets;

  const persist = async (updated: CardSet[], set?: CardSet, deletedId?: string) => {
    if (userId) {
      if (set) await saveCardSet(userId, set);
      if (deletedId) await deleteCardSet(userId, deletedId);
    } else {
      setLocalSets(updated);
    }
  };

  return { sets, persist };
}

export function useCardSets(userId: string | null = null) {
  const { sets, persist } = useSets(userId);

  const mutate = (fn: (prev: CardSet[]) => { next: CardSet[]; changed?: CardSet; deletedId?: string }) => {
    const { next, changed, deletedId } = fn(sets);
    persist(next, changed, deletedId);
  };

  const createSet = (name: string, description?: string) => {
    const s: CardSet = { id: crypto.randomUUID(), name, description, cards: [], createdAt: Date.now(), updatedAt: Date.now() };
    mutate((prev) => ({ next: [...prev, s], changed: s }));
    return s.id;
  };

  const updateSet = (id: string, updates: Partial<Pick<CardSet, 'name' | 'description'>>) => {
    mutate((prev) => {
      const next = prev.map((s) => s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s);
      return { next, changed: next.find((s) => s.id === id) };
    });
  };

  const deleteSet = (id: string) => {
    mutate((prev) => ({ next: prev.filter((s) => s.id !== id), deletedId: id }));
  };

  const addCard = (setId: string, card: Omit<VocabularyCard, 'id' | 'confidence' | 'createdAt'>) => {
    const c: VocabularyCard = { ...card, id: crypto.randomUUID(), confidence: 'unrated', createdAt: Date.now() };
    mutate((prev) => {
      const next = prev.map((s) => s.id === setId ? { ...s, cards: [...s.cards, c], updatedAt: Date.now() } : s);
      return { next, changed: next.find((s) => s.id === setId) };
    });
    return c.id;
  };

  const updateCard = (setId: string, cardId: string, updates: Partial<VocabularyCard>) => {
    mutate((prev) => {
      const next = prev.map((s) => s.id === setId
        ? { ...s, cards: s.cards.map((c) => c.id === cardId ? { ...c, ...updates } : c), updatedAt: Date.now() }
        : s);
      return { next, changed: next.find((s) => s.id === setId) };
    });
  };

  const deleteCard = (setId: string, cardId: string) => {
    mutate((prev) => {
      const next = prev.map((s) => s.id === setId
        ? { ...s, cards: s.cards.filter((c) => c.id !== cardId), updatedAt: Date.now() }
        : s);
      return { next, changed: next.find((s) => s.id === setId) };
    });
  };

  const importSets = (imported: CardSet[]) => {
    mutate((prev) => {
      const existing = new Set(prev.map((s) => s.id));
      const toAdd = imported.filter((s) => !existing.has(s.id));
      return { next: [...prev, ...toAdd] };
    });
  };

  return { sets, createSet, updateSet, deleteSet, addCard, updateCard, deleteCard, importSets };
}
