'use client';
import { CardSet } from '@/types';
import Button from '@/components/ui/Button';

interface Props {
  set: CardSet;
  onPick: (mode: 'flashcard' | 'speaking') => void;
  onBack: () => void;
}

export default function StudyModePicker({ set, onPick, onBack }: Props) {
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
          <p className="text-sm text-ink-400 mt-0.5">Say the Korean word out loud — mic grades your pronunciation</p>
        </button>
      </div>
    </div>
  );
}
