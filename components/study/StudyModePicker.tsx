'use client';
import { CardSet } from '@/types';
import { getDueCards } from '@/lib/srs';
import Button from '@/components/ui/Button';

interface Props {
  set: CardSet;
  onPick: (mode: 'flashcard' | 'speaking' | 'review') => void;
  onBack: () => void;
}

export default function StudyModePicker({ set, onPick, onBack }: Props) {
  const dueCount = getDueCards(set.cards).length;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>← Back</Button>
        <p className="text-xs font-semibold text-ink-400 tracking-tight truncate max-w-[50%] text-center">{set.name}</p>
        <div className="w-16" />
      </div>

      <div className="text-center">
        <p className="text-xl font-black tracking-tight text-ink-950">Choose study mode</p>
        <p className="text-sm text-ink-400 mt-1">{set.cards.length} cards</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onPick('flashcard')}
          className="w-full rounded-sm border border-ink-200 bg-white p-6 text-left shadow-sm hover:border-ink-400 transition-colors"
        >
          <p className="text-2xl mb-2">🃏</p>
          <p className="font-black tracking-tight text-ink-950 text-lg">Flashcards</p>
          <p className="text-sm text-ink-400 mt-0.5">Flip cards and mark what you know</p>
        </button>

        <button
          onClick={() => onPick('speaking')}
          className="w-full rounded-sm border border-ink-200 bg-white p-6 text-left shadow-sm hover:border-ink-400 transition-colors"
        >
          <p className="text-2xl mb-2">🎤</p>
          <p className="font-black tracking-tight text-ink-950 text-lg">Speaking Practice</p>
          <p className="text-sm text-ink-400 mt-0.5">Say the word out loud — mic grades your pronunciation</p>
        </button>

        <button
          onClick={() => dueCount > 0 && onPick('review')}
          disabled={dueCount === 0}
          className={`w-full rounded-sm border p-6 text-left shadow-sm transition-colors ${
            dueCount > 0
              ? 'border-ink-200 bg-white hover:border-ink-400'
              : 'border-ink-100 bg-ink-50 cursor-not-allowed'
          }`}
        >
          <p className="text-2xl mb-2">🔁</p>
          <div className="flex items-center gap-2">
            <p className={`font-black tracking-tight text-lg ${dueCount > 0 ? 'text-ink-950' : 'text-ink-300'}`}>
              Review Due
            </p>
            {dueCount > 0
              ? <span className="text-xs font-semibold bg-ink-950 text-white px-2 py-0.5 rounded-full">{dueCount}</span>
              : <span className="text-xs text-ink-300">모두 완료!</span>
            }
          </div>
          <p className={`text-sm mt-0.5 ${dueCount > 0 ? 'text-ink-400' : 'text-ink-300'}`}>
            {dueCount > 0
              ? `복습 주기가 된 카드 ${dueCount}장만 집중 학습`
              : '오늘 복습할 카드가 없어요'}
          </p>
        </button>
      </div>
    </div>
  );
}
