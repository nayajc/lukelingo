'use client';
import { useState, useEffect } from 'react';
import { CardSet, UserSettings } from '@/types';
import { useStudySession } from '@/hooks/useStudySession';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { isKoreanMatch } from '@/lib/korean';
import SpeakingCard from './SpeakingCard';
import ProgressBar from './ProgressBar';
import SessionSummary from './SessionSummary';
import Button from '@/components/ui/Button';

interface Props {
  set: CardSet;
  settings: UserSettings;
  onExit: () => void;
  onSessionComplete: (known: number, learning: number) => void;
  onUpdateCard: (cardId: string, data: { confidence: 'known' | 'learning'; lastReviewedAt: number }) => void;
}

type CardState = 'idle' | 'listening' | 'correct' | 'wrong';

export default function SpeakingSession({ set, onExit, onSessionComplete, onUpdateCard }: Props) {
  const [key, setKey] = useState(0);
  const [done, setDone] = useState(false);
  const [cardState, setCardState] = useState<CardState>('idle');
  const session = useStudySession(set.cards);
  const srLang = (set.language ?? 'korean') === 'chinese' ? 'zh-CN' : 'ko-KR';
  const speech = useSpeechRecognition(srLang);

  // Evaluate transcript when it changes
  useEffect(() => {
    if (!speech.transcript || !session.currentCard) return;
    const match = isKoreanMatch(speech.transcript, session.currentCard.korean);
    setCardState(match ? 'correct' : 'wrong');
  }, [speech.transcript, session.currentCard]);

  // Reset card state when moving to next card
  useEffect(() => {
    setCardState('idle');
    speech.reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.cardIndex]);

  const handleNext = (verdict: 'known' | 'learning') => {
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

  const handleStartListening = () => {
    speech.reset();
    setCardState('listening');
    speech.start();
  };

  const handleRetry = () => {
    speech.reset();
    setCardState('idle');
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
    <div key={key} className="max-w-2xl mx-auto px-5 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onExit}>← Back</Button>
        <div className="text-center">
          <p className="text-xs font-semibold text-ink-400 tracking-tight truncate max-w-[50%]">{set.name}</p>
          <p className="text-xs text-ink-300 tracking-tight">Speaking Practice</p>
        </div>
        <div className="w-16" />
      </div>

      <ProgressBar current={session.cardIndex} total={session.totalCards} />

      {session.currentCard && (
        <SpeakingCard
          key={session.cardIndex}
          card={session.currentCard}
          state={cardState}
          transcript={speech.transcript}
          isSupported={speech.isSupported}
          onStartListening={handleStartListening}
          onNext={handleNext}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
