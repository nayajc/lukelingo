'use client';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { CardSet, SetLanguage } from '@/types';

interface Props {
  existing?: CardSet;
  onSave: (name: string, description?: string, language?: SetLanguage) => void;
  onClose: () => void;
}

export default function SetEditor({ existing, onSave, onClose }: Props) {
  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [language, setLanguage] = useState<SetLanguage>(existing?.language ?? 'korean');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), description.trim() || undefined, language);
    onClose();
  };

  return (
    <Modal title={existing ? 'Edit Set' : 'New Card Set'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Set Name *</label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. TOPIK Basics"
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Language</label>
          <div className="flex gap-2">
            {(['korean', 'chinese'] as SetLanguage[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  language === lang
                    ? 'border-ink-950 bg-ink-950 text-white'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                {lang === 'korean' ? '🇰🇷 Korean' : '🇨🇳 Chinese'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!name.trim()}>Save</Button>
        </div>
      </form>
    </Modal>
  );
}
