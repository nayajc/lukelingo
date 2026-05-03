'use client';
import { useState, useEffect, useRef } from 'react';
import { CardSet, VocabularyCard } from '@/types';
import { sampleSet } from '@/lib/sampleData';
import { subscribeCardSets, saveCardSet, deleteCardSet } from '@/lib/firestore';
import { useLocalStorage } from './useLocalStorage';

export function useCardSets(userId: string | null = null) {
  const [localSets, setLocalSets] = useLocalStorage<CardSet[]>('lukelingo-sets', [sampleSet]);
  const [cloudSets, setCloudSets] = useState<CardSet[] | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveStatusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!userId) { setCloudSets(null); return; }
    return subscribeCardSets(userId, setCloudSets);
  }, [userId]);

  const sets = userId ? (cloudSets ?? []) : localSets;

  // Always-fresh ref so mutations never read stale closure state
  const setsRef = useRef(sets);
  setsRef.current = sets;

  const persist = async (changedSet?: CardSet, deletedId?: string) => {
    if (userId) {
      setSaveStatus('saving');
      try {
        if (changedSet) await saveCardSet(userId, changedSet);
        if (deletedId) await deleteCardSet(userId, deletedId);
        setSaveError(null);
        setSaveStatus('saved');
        if (saveStatusTimerRef.current) clearTimeout(saveStatusTimerRef.current);
        saveStatusTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Save failed';
        console.error('Firestore write failed:', err);
        setSaveError(msg);
        setSaveStatus('idle');
        setCloudSets(setsRef.current);
      }
    }
  };

  // For local (non-Firebase) path — functional update avoids stale state
  const setLocal = (fn: (prev: CardSet[]) => CardSet[]) => {
    setLocalSets(fn);
  };

  const applyAndSave = (fn: (prev: CardSet[]) => CardSet[], getChanged?: (next: CardSet[]) => CardSet | undefined, deletedId?: string) => {
    const prev = setsRef.current;
    const next = fn(prev);
    if (userId) {
      const changed = getChanged ? getChanged(next) : undefined;
      persist(changed, deletedId);
      // Optimistic local update for instant UI feedback
      setCloudSets(next);
    } else {
      setLocal(() => next);
    }
  };

  const createSet = (name: string, description?: string) => {
    const s: CardSet = { id: crypto.randomUUID(), name, description, cards: [], createdAt: Date.now(), updatedAt: Date.now() };
    applyAndSave((prev) => [...prev, s], () => s);
    return s.id;
  };

  const updateSet = (id: string, updates: Partial<Pick<CardSet, 'name' | 'description'>>) => {
    applyAndSave(
      (prev) => prev.map((s) => s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s),
      (next) => next.find((s) => s.id === id),
    );
  };

  const deleteSet = (id: string) => {
    applyAndSave((prev) => prev.filter((s) => s.id !== id), undefined, id);
  };

  const addCard = (setId: string, card: Omit<VocabularyCard, 'id' | 'confidence' | 'createdAt'>) => {
    const c: VocabularyCard = { ...card, id: crypto.randomUUID(), confidence: 'unrated', createdAt: Date.now() };
    applyAndSave(
      (prev) => prev.map((s) => s.id === setId ? { ...s, cards: [...s.cards, c], updatedAt: Date.now() } : s),
      (next) => next.find((s) => s.id === setId),
    );
    return c.id;
  };

  const addCards = (setId: string, cards: Omit<VocabularyCard, 'id' | 'confidence' | 'createdAt'>[]) => {
    const newCards: VocabularyCard[] = cards.map((card) => ({
      ...card, id: crypto.randomUUID(), confidence: 'unrated', createdAt: Date.now(),
    }));
    applyAndSave(
      (prev) => prev.map((s) => s.id === setId ? { ...s, cards: [...s.cards, ...newCards], updatedAt: Date.now() } : s),
      (next) => next.find((s) => s.id === setId),
    );
  };

  const updateCard = (setId: string, cardId: string, updates: Partial<VocabularyCard>) => {
    applyAndSave(
      (prev) => prev.map((s) => s.id === setId
        ? { ...s, cards: s.cards.map((c) => c.id === cardId ? { ...c, ...updates } : c), updatedAt: Date.now() }
        : s),
      (next) => next.find((s) => s.id === setId),
    );
  };

  const deleteCard = (setId: string, cardId: string) => {
    applyAndSave(
      (prev) => prev.map((s) => s.id === setId
        ? { ...s, cards: s.cards.filter((c) => c.id !== cardId), updatedAt: Date.now() }
        : s),
      (next) => next.find((s) => s.id === setId),
    );
  };

  const importSets = (imported: CardSet[]) => {
    const existing = new Set(setsRef.current.map((s) => s.id));
    const toAdd = imported.filter((s) => !existing.has(s.id));
    applyAndSave((prev) => [...prev, ...toAdd]);
  };

  return { sets, saveError, saveStatus, createSet, updateSet, deleteSet, addCard, addCards, updateCard, deleteCard, importSets };
}
