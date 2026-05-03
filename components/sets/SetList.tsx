'use client';
import { useState } from 'react';
import { CardSet } from '@/types';
import Button from '@/components/ui/Button';
import SetEditor from './SetEditor';
import CardList from './CardList';
import ImportExport from './ImportExport';
import PdfUpload from './PdfUpload';
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
    <div className="max-w-2xl mx-auto px-5 py-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="label mb-0.5">Vocabulary</p>
          <h1 className="text-xl font-black tracking-tighter text-ink-950">My Sets</h1>
        </div>
        <div className="flex items-center gap-2">
          <PdfUpload sets={sets} onAddCards={(setId, cards) => cards.forEach((c) => hooks.addCard(setId, c))} />
          <ImportExport sets={sets} onImport={hooks.importSets} />
          <Button size="sm" onClick={() => setCreating(true)}>+ New Set</Button>
        </div>
      </div>

      {sets.length === 0 ? (
        <EmptyState icon="📚" title="No sets yet" description="Create your first card set to start practicing." ctaLabel="Create Set" onCta={() => setCreating(true)} />
      ) : (
        <div className="flex flex-col divide-y divide-ink-100">
          {sets.map((set) => (
            <div key={set.id}>
              <div
                className="flex items-center gap-4 py-4 cursor-pointer hover:bg-ink-50 -mx-2 px-2 rounded-sm transition-colors"
                onClick={() => setExpanded(expanded === set.id ? null : set.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-ink-950 tracking-tight">{set.name}</p>
                  {set.description && <p className="text-xs text-ink-400 mt-0.5">{set.description}</p>}
                  <p className="label mt-1">{set.cards.length} cards</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); onStudy(set.id); }} disabled={set.cards.length === 0}>
                    Study
                  </Button>
                  <Button size="sm" variant="ghost" className="!px-2" onClick={(e) => { e.stopPropagation(); setEditingSet(set); }}>✏</Button>
                  <Button size="sm" variant="ghost" className="!px-2 text-ink-400" onClick={(e) => { e.stopPropagation(); hooks.deleteSet(set.id); }}>✕</Button>
                </div>
              </div>

              {expanded === set.id && (
                <div className="pb-4 pl-2 border-l-2 border-ink-100 ml-1 mb-2">
                  <CardList
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

      {creating && <SetEditor onSave={(name, desc) => hooks.createSet(name, desc)} onClose={() => setCreating(false)} />}
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
