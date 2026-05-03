'use client';
import { useState, useCallback } from 'react';
import { VocabularyCard } from '@/types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useStudySession(cards: VocabularyCard[]) {
  const [deck] = useState(() => shuffle(cards));
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, 'known' | 'learning'>>({});

  const currentCard = deck[index] ?? null;
  const isComplete = index >= deck.length;

  const flip = useCallback(() => setIsFlipped((f) => !f), []);

  const markConfidence = useCallback((verdict: 'known' | 'learning') => {
    if (!currentCard) return;
    setResults((prev) => ({ ...prev, [currentCard.id]: verdict }));
    setIsFlipped(false);
    setIndex((i) => i + 1);
  }, [currentCard]);

  const knownCount = Object.values(results).filter((v) => v === 'known').length;
  const learningCount = Object.values(results).filter((v) => v === 'learning').length;

  return {
    currentCard,
    cardIndex: index,
    totalCards: deck.length,
    isFlipped,
    isComplete,
    flip,
    markConfidence,
    results,
    knownCount,
    learningCount,
  };
}
