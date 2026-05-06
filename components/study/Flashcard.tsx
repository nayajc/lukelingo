'use client';
import { useEffect } from 'react';
import { VocabularyCard, SetLanguage } from '@/types';
import { useTTS, TTSLang } from '@/hooks/useTTS';

interface Props {
  card: VocabularyCard;
  isFlipped: boolean;
  showKoreanFirst: boolean;
  showRomanization: boolean;
  ttsRate: number;
  ttsPitch: number;
  setLanguage?: SetLanguage;
  onFlip: () => void;
}

export default function Flashcard({ card, isFlipped, showKoreanFirst, showRomanization, ttsRate, ttsPitch, setLanguage, onFlip }: Props) {
  const { speak, isSpeaking } = useTTS(ttsRate, ttsPitch);

  const targetLangCode: TTSLang = (setLanguage ?? 'korean') === 'chinese' ? 'zh-CN' : 'ko-KR';
  const frontLang: TTSLang = showKoreanFirst ? targetLangCode : 'en-US';
  const backLang: TTSLang  = showKoreanFirst ? 'en-US' : targetLangCode;
  const frontText = showKoreanFirst ? card.korean  : card.english;
  const backText  = showKoreanFirst ? card.english : card.korean;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.code === 'Space') { e.preventDefault(); onFlip(); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onFlip]);

  const SpeakerBtn = ({ text, lang }: { text: string; lang: TTSLang }) => (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text, lang); }}
      title="Hear pronunciation"
      className={`p-2 rounded-sm border transition-colors ${isSpeaking ? 'border-ink-950 bg-ink-950 text-white' : 'border-ink-200 text-ink-400 hover:border-ink-950 hover:text-ink-950'}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
      </svg>
    </button>
  );

  return (
    <div className="w-full cursor-pointer select-none" onClick={onFlip} style={{ perspective: '1000px' }}>
      <div
        className="relative w-full transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: '260px' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white border border-ink-200 rounded-xl flex flex-col items-center justify-center p-8 gap-4 shadow-card"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className={`text-center font-bold leading-snug ${showKoreanFirst ? 'text-5xl font-korean' : 'text-3xl tracking-tight'}`}>
            {frontText}
          </p>
          <SpeakerBtn text={frontText} lang={frontLang} />
          <p className="label mt-4">tap or press space</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-ink-950 border border-ink-950 rounded-xl flex flex-col items-center justify-center p-8 gap-4 shadow-card"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className={`text-center font-bold leading-snug text-white ${!showKoreanFirst ? 'text-5xl font-korean' : 'text-3xl tracking-tight'}`}>
            {backText}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); speak(backText, backLang); }}
            className={`p-2 rounded-sm border transition-colors ${isSpeaking ? 'border-white bg-white text-ink-950' : 'border-ink-600 text-ink-400 hover:border-white hover:text-white'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          </button>
          {showRomanization && card.romanization && (
            <p className="text-xs text-ink-400 tracking-wide italic">{card.romanization}</p>
          )}
          {card.notes && <p className="text-xs text-ink-600 text-center">{card.notes}</p>}
        </div>
      </div>
    </div>
  );
}
