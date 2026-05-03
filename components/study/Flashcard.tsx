'use client';
import { useEffect } from 'react';
import { VocabularyCard } from '@/types';
import { useTTS } from '@/hooks/useTTS';

interface Props {
  card: VocabularyCard;
  isFlipped: boolean;
  showKoreanFirst: boolean;
  showRomanization: boolean;
  ttsRate: number;
  ttsPitch: number;
  onFlip: () => void;
}

export default function Flashcard({ card, isFlipped, showKoreanFirst, showRomanization, ttsRate, ttsPitch, onFlip }: Props) {
  const { speak, isSpeaking } = useTTS(ttsRate, ttsPitch);

  const frontLang = showKoreanFirst ? 'ko-KR' : 'en-US';
  const backLang = showKoreanFirst ? 'en-US' : 'ko-KR';
  const frontText = showKoreanFirst ? card.korean : card.english;
  const backText = showKoreanFirst ? card.english : card.korean;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); onFlip(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onFlip]);

  const SpeakerButton = ({ text, lang, size = 'md' }: { text: string; lang: 'ko-KR' | 'en-US'; size?: 'sm' | 'md' }) => (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text, lang); }}
      className={`rounded-full transition-colors hover:bg-stone-100 active:scale-95 ${size === 'sm' ? 'p-1.5 text-base' : 'p-2 text-xl'} ${isSpeaking ? 'text-blue-500' : 'text-stone-400'}`}
      title={`Hear pronunciation`}
    >
      🔊
    </button>
  );

  return (
    <div className="w-full perspective-1000 cursor-pointer select-none" onClick={onFlip} style={{ perspective: '1000px' }}>
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '240px',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col items-center justify-center p-8 gap-3"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className={`text-center font-semibold leading-relaxed ${showKoreanFirst ? 'text-4xl' : 'text-2xl'}`}
            style={showKoreanFirst ? { fontFamily: "'Noto Sans KR', sans-serif" } : {}}
          >
            {frontText}
          </p>
          <SpeakerButton text={frontText} lang={frontLang} />
          <p className="text-xs text-stone-300 mt-4">tap or press space to reveal</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center justify-center p-8 gap-3"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className={`text-center font-semibold leading-relaxed ${!showKoreanFirst ? 'text-4xl' : 'text-2xl'}`}
            style={!showKoreanFirst ? { fontFamily: "'Noto Sans KR', sans-serif" } : {}}
          >
            {backText}
          </p>
          <SpeakerButton text={backText} lang={backLang} />
          {showRomanization && !showKoreanFirst && card.romanization && (
            <p className="text-sm text-stone-400 italic">{card.romanization}</p>
          )}
          {showRomanization && showKoreanFirst && card.romanization && (
            <p className="text-sm text-stone-400 italic">{card.romanization}</p>
          )}
          {card.notes && <p className="text-xs text-stone-400 text-center mt-1">{card.notes}</p>}
        </div>
      </div>
    </div>
  );
}
