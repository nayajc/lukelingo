'use client';
import { useState } from 'react';
import { VocabularyCard } from '@/types';
import Button from '@/components/ui/Button';
import CardEditor from './CardEditor';
import EmptyState from '@/components/ui/EmptyState';

const confidenceDot: Record<VocabularyCard['confidence'], string> = {
  unrated: 'bg-stone-300',
  learning: 'bg-yellow-400',
  known: 'bg-green-400',
};

interface Props {
  setId: string;
  cards: VocabularyCard[];
  onAdd: (data: Pick<VocabularyCard, 'korean' | 'english' | 'romanization' | 'notes'>) => void;
  onUpdate: (cardId: string, data: Partial<VocabularyCard>) => void;
  onDelete: (cardId: string) => void;
}

export default function CardList({ setId, cards, onAdd, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState<VocabularyCard | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-stone-500">{cards.length} card{cards.length !== 1 ? 's' : ''}</span>
        <Button size="sm" onClick={() => setAdding(true)}>+ Add Card</Button>
      </div>

      {cards.length === 0 ? (
        <EmptyState icon="🃏" title="No cards yet" description="Add your first card to start practicing." ctaLabel="Add Card" onCta={() => setAdding(true)} />
      ) : (
        <div className="divide-y divide-stone-100">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center gap-3 py-2.5">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${confidenceDot[card.confidence]}`} title={card.confidence} />
              <div className="flex-1 min-w-0">
                <span className="font-medium text-stone-800 mr-2" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{card.korean}</span>
                <span className="text-stone-500 text-sm">{card.english}</span>
                {card.romanization && <span className="ml-2 text-xs text-stone-400 italic">{card.romanization}</span>}
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" className="!px-2 !py-1" onClick={() => setEditing(card)}>✏️</Button>
                <Button variant="ghost" size="sm" className="!px-2 !py-1" onClick={() => onDelete(card.id)}>🗑</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adding && (
        <CardEditor onSave={onAdd} onClose={() => setAdding(false)} />
      )}
      {editing && (
        <CardEditor
          existing={editing}
          onSave={(data) => onUpdate(editing.id, data)}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
