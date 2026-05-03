'use client';
import { useRef } from 'react';
import Button from '@/components/ui/Button';
import { CardSet } from '@/types';

interface Props {
  sets: CardSet[];
  onImport: (sets: CardSet[]) => void;
}

export default function ImportExport({ sets, onImport }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(sets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lukelingo-sets.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) onImport(data as CardSet[]);
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={handleExport}>⬇ Export</Button>
      <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>⬆ Import</Button>
      <input ref={inputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
    </div>
  );
}
