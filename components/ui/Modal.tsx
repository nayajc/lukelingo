'use client';
import { useEffect } from 'react';
import Button from './Button';

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl shadow-lift border border-ink-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="!px-2 !py-1 text-ink-400">✕</Button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
