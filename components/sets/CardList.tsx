'use client';
import { useState } from 'react';
import { VocabularyCard } from '@/types';
import Button from '@/components/ui/Button';
import CardEditor from './CardEditor';
import EmptyState from '@/components/ui/EmptyState';

const confidenceDot: Record<VocabularyCard['confidence'], string> = {
  unrated: 'bg-ink-200',
  learning: 'bg-ink-500',
  known: 'bg-ink-950',
};

interface Props {
  cards: VocabularyCard[];
  onAdd: (data: Pick<VocabularyCard, 'korean' | 'english' | 'romanization' | 'notes'>) => void;
  onUpdate: (cardId: string, data: Partial<VocabularyCard>) => void;
  onDelete: (cardId: string) => void;
}

export default function CardList({ cards, onAdd, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState<VocabularyCard | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="pt-3">
      <div className="flex items-center justify-between mb-3">
        <span className="label">{cards.length} card{cards.length !== 1 ? 's' : ''}</span>
        <Button size="sm" onClick={() => setAdding(true)}>+ Add Card</Button>
      </div>

      {cards.length === 0 ? (
        <EmptyState icon="🃏" title="No cards yet" description="Add your first card." ctaLabel="Add Card" onCta={() => setAdding(true)} />
      ) : (
        <div className="divide-y divide-ink-100">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center gap-3 py-2.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${confidenceDot[card.confidence]}`} />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-sm text-ink-950 mr-2 font-korean">{card.korean}</span>
                <span className="text-xs text-ink-500">{card.english}</span>
                {card.romanization && <span className="ml-2 text-xs text-ink-300 italic">{card.romanization}</span>}
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" className="!px-1.5 !py-1 text-ink-400" onClick={() => setEditing(card)}>✏</Button>
                <Button variant="ghost" size="sm" className="!px-1.5 !py-1 text-ink-400" onClick={() => onDelete(card.id)}>✕</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adding && <CardEditor onSave={onAdd} onClose={() => setAdding(false)} />}
      {editing && <CardEditor existing={editing} onSave={(data) => onUpdate(editing.id, data)} onClose={() => setEditing(null)} />}
    </div>
  );
}
