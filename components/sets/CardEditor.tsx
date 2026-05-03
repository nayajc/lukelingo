'use client';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { VocabularyCard } from '@/types';

type CardInput = Pick<VocabularyCard, 'korean' | 'english' | 'romanization' | 'notes'>;

interface Props {
  existing?: VocabularyCard;
  onSave: (data: CardInput) => void;
  onClose: () => void;
}

export default function CardEditor({ existing, onSave, onClose }: Props) {
  const [korean, setKorean] = useState(existing?.korean ?? '');
  const [english, setEnglish] = useState(existing?.english ?? '');
  const [romanization, setRomanization] = useState(existing?.romanization ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!korean.trim() || !english.trim()) return;
    onSave({
      korean: korean.trim(),
      english: english.trim(),
      romanization: romanization.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  const field = (label: string, value: string, onChange: (v: string) => void, opts?: { required?: boolean; autoFocus?: boolean; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}{opts?.required && ' *'}</label>
      <input
        autoFocus={opts?.autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={opts?.placeholder}
        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );

  return (
    <Modal title={existing ? 'Edit Card' : 'New Card'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {field('Korean', korean, setKorean, { required: true, autoFocus: true, placeholder: '안녕하세요' })}
        {field('English', english, setEnglish, { required: true, placeholder: 'Hello' })}
        {field('Romanization', romanization, setRomanization, { placeholder: 'annyeonghaseyo (optional)' })}
        {field('Notes', notes, setNotes, { placeholder: 'Optional context or usage notes' })}
        <div className="flex gap-2 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!korean.trim() || !english.trim()}>Save</Button>
        </div>
      </form>
    </Modal>
  );
}
