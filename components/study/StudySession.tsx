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
  onSessionComplete: (known: number, learning: number) => void;
  onUpdateCard: (cardId: string, data: { confidence: 'known' | 'learning'; lastReviewedAt: number }) => void;
}

export default function StudySession({ set, settings, onExit, onSessionComplete, onUpdateCard }: Props) {
  const [key, setKey] = useState(0);
  const [done, setDone] = useState(false);
  const session = useStudySession(set.cards);

  const handleMark = (verdict: 'known' | 'learning') => {
    if (!session.currentCard) return;
    onUpdateCard(session.currentCard.id, { confidence: verdict, lastReviewedAt: Date.now() });
    session.markConfidence(verdict);
    if (session.cardIndex + 1 >= session.totalCards) {
      onSessionComplete(
        verdict === 'known' ? session.knownCount + 1 : session.knownCount,
        verdict === 'learning' ? session.learningCount + 1 : session.learningCount,
      );
      setDone(true);
    }
  };

  if (done || session.isComplete) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-8">
        <SessionSummary
          total={session.totalCards}
          knownCount={session.knownCount}
          learningCount={session.learningCount}
          onRetry={() => { setKey((k) => k + 1); setDone(false); }}
          onExit={onExit}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onExit}>← Back</Button>
        <p className="text-xs font-semibold text-ink-400 tracking-tight truncate max-w-[50%] text-center">{set.name}</p>
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

      {session.isFlipped
        ? <ConfidenceButtons onMark={handleMark} />
        : <p className="text-center label">tap card or press <kbd className="bg-ink-100 border border-ink-200 px-1.5 py-0.5 rounded-sm font-sans">space</kbd></p>
      }
    </div>
  );
}
