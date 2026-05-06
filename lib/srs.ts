import { VocabularyCard } from '@/types';

const DAY = 86400000;

export function isDue(card: VocabularyCard): boolean {
  if (card.confidence === 'unrated') return true;
  if (!card.lastReviewedAt) return true;
  const elapsed = Date.now() - card.lastReviewedAt;
  if (card.confidence === 'learning') return elapsed >= DAY;
  return elapsed >= 7 * DAY;
}

export function getDueCards(cards: VocabularyCard[]): VocabularyCard[] {
  return cards.filter(isDue);
}
