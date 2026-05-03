'use client';
import { useState } from 'react';
import { CardSet, UserSettings } from '@/types';
import { useStudySession } from '@/hooks/useStudySession';
import Flashcard from './Flashcard';
import ProgressBar from './ProgressBar';
import ConfidenceButtons from './ConfidenceButtons';
import SessionSummary from './SessionSummary';
import Button from '@/components/ui/Button';

interface Props {
  set: CardSet;
  settings: UserSettings;
  onExit: () => void;
  onSessionComplete: () => void;
  onUpdateCard: (cardId: string, data: { confidence: 'known' | 'learning'; lastReviewedAt: number }) => void;
}

export default function StudySession({ set, settings, onExit, onSessionComplete, onUpdateCard }: Props) {
  const [key, setKey] = useState(0);
  const session = useStudySession(set.cards);
  const [sessionDone, setSessionDone] = useState(false);

  const handleMark = (verdict: 'known' | 'learning') => {
    if (!session.currentCard) return;
    onUpdateCard(session.currentCard.id, { confidence: verdict, lastReviewedAt: Date.now() });
    session.markConfidence(verdict);
    if (session.cardIndex + 1 >= session.totalCards) {
      onSessionComplete();
      setSessionDone(true);
    }
  };

  if (sessionDone || session.isComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <SessionSummary
          total={session.totalCards}
          knownCount={session.knownCount}
          learningCount={session.learningCount}
          onRetry={() => { setKey((k) => k + 1); setSessionDone(false); }}
          onExit={onExit}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onExit}>← Back</Button>
        <p className="text-sm font-medium text-stone-500 truncate max-w-[60%] text-center">{set.name}</p>
        <div className="w-16" />
      </div>

      <ProgressBar current={session.cardIndex} total={session.totalCards} />

      <Flashcard
        key={`${key}-${session.cardIndex}`}
        card={session.currentCard!}
        isFlipped={session.isFlipped}
        showKoreanFirst={settings.studyDirection === 'korean-first'}
        showRomanization={settings.showRomanization}
        ttsRate={settings.ttsRate}
        ttsPitch={settings.ttsPitch}
        onFlip={session.flip}
      />

      {session.isFlipped ? (
        <ConfidenceButtons onMark={handleMark} />
      ) : (
        <p className="text-center text-xs text-stone-400">Tap the card or press <kbd className="bg-stone-100 px-1 rounded">Space</kbd> to reveal</p>
      )}
    </div>
  );
}
