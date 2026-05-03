'use client';
import { useEffect } from 'react';
import { VocabularyCard } from '@/types';
import Button from '@/components/ui/Button';

type CardState = 'idle' | 'listening' | 'correct' | 'wrong';

interface Props {
  card: VocabularyCard;
  state: CardState;
  transcript: string;
  isSupported: boolean;
  onStartListening: () => void;
  onNext: (verdict: 'known' | 'learning') => void;
  onRetry: () => void;
}

export default function SpeakingCard({ card, state, transcript, isSupported, onStartListening, onNext, onRetry }: Props) {
  useEffect(() => {
    if (state === 'correct') {
      const t = setTimeout(() => onNext('known'), 1500);
      return () => clearTimeout(t);
    }
  }, [state, onNext]);

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {/* English word */}
      <div className="w-full max-w-sm rounded-sm border border-ink-200 bg-white p-10 text-center shadow-sm">
        <p className="label mb-3">Say in Korean</p>
        <p className="text-4xl font-black tracking-tighter text-ink-950">{card.english}</p>
        {card.notes && <p className="text-xs text-ink-400 mt-3">{card.notes}</p>}
      </div>

      {/* Mic / feedback area */}
      {!isSupported ? (
        <p className="text-sm text-ink-400 text-center">
          Speech recognition is not supported in this browser.<br />
          Use Chrome or Edge for this feature.
        </p>
      ) : state === 'idle' ? (
        <button
          onClick={onStartListening}
          className="w-16 h-16 rounded-full bg-ink-950 hover:bg-ink-800 text-white text-2xl flex items-center justify-center transition-colors shadow-md"
          aria-label="Start speaking"
        >
          🎤
        </button>
      ) : state === 'listening' ? (
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-ink-950 opacity-20 animate-ping" />
            <span className="w-16 h-16 rounded-full bg-ink-950 text-white text-2xl flex items-center justify-center">🎤</span>
          </div>
          <p className="text-xs text-ink-500">말하는 중...</p>
        </div>
      ) : state === 'correct' ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-3xl">✅</p>
          <p className="text-lg font-black tracking-tight text-ink-950">{transcript}</p>
          <p className="text-sm text-ink-400">Correct! 다음 카드로...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-3xl">❌</p>
          <div>
            <p className="text-sm text-ink-500">인식된 발음: <span className="font-semibold text-ink-800">{transcript || '—'}</span></p>
            <p className="text-sm text-ink-500 mt-0.5">정답: <span className="font-semibold text-ink-950 font-korean">{card.korean}</span>
              {card.romanization && <span className="text-ink-400 ml-1 italic">({card.romanization})</span>}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onRetry}>다시 말하기</Button>
            <Button size="sm" onClick={() => onNext('learning')}>다음 →</Button>
          </div>
        </div>
      )}
    </div>
  );
}
