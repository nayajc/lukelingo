'use client';
import { useState } from 'react';
import { CardSet } from '@/types';
import Button from '@/components/ui/Button';
import SetEditor from './SetEditor';
import CardList from './CardList';
import ImportExport from './ImportExport';
import EmptyState from '@/components/ui/EmptyState';
import { useCardSets } from '@/hooks/useCardSets';

interface Props {
  sets: CardSet[];
  hooks: ReturnType<typeof useCardSets>;
  onStudy: (setId: string) => void;
}

export default function SetList({ sets, hooks, onStudy }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [editingSet, setEditingSet] = useState<CardSet | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-stone-800">My Sets</h1>
        <div className="flex items-center gap-2">
          <ImportExport sets={sets} onImport={hooks.importSets} />
          <Button size="sm" onClick={() => setCreating(true)}>+ New Set</Button>
        </div>
      </div>

      {sets.length === 0 ? (
        <EmptyState icon="📚" title="No sets yet" description="Create your first card set to start learning Korean." ctaLabel="Create Set" onCta={() => setCreating(true)} />
      ) : (
        <div className="flex flex-col gap-3">
          {sets.map((set) => (
            <div key={set.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-stone-50 transition-colors" onClick={() => setExpanded(expanded === set.id ? null : set.id)}>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-800 truncate">{set.name}</p>
                  {set.description && <p className="text-xs text-stone-400 truncate mt-0.5">{set.description}</p>}
                  <p className="text-xs text-stone-400 mt-0.5">{set.cards.length} card{set.cards.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="primary" onClick={(e) => { e.stopPropagation(); onStudy(set.id); }} disabled={set.cards.length === 0}>
                    Study
                  </Button>
                  <Button size="sm" variant="ghost" className="!px-2" onClick={(e) => { e.stopPropagation(); setEditingSet(set); }}>✏️</Button>
                  <Button size="sm" variant="ghost" className="!px-2" onClick={(e) => { e.stopPropagation(); hooks.deleteSet(set.id); }}>🗑</Button>
                </div>
              </div>

              {expanded === set.id && (
                <div className="border-t border-stone-100 p-4 bg-stone-50">
                  <CardList
                    setId={set.id}
                    cards={set.cards}
                    onAdd={(data) => hooks.addCard(set.id, data)}
                    onUpdate={(cardId, data) => hooks.updateCard(set.id, cardId, data)}
                    onDelete={(cardId) => hooks.deleteCard(set.id, cardId)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {creating && (
        <SetEditor
          onSave={(name, desc) => hooks.createSet(name, desc)}
          onClose={() => setCreating(false)}
        />
      )}
      {editingSet && (
        <SetEditor
          existing={editingSet}
          onSave={(name, desc) => hooks.updateSet(editingSet.id, { name, description: desc })}
          onClose={() => setEditingSet(null)}
        />
      )}
    </div>
  );
}
