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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="!px-2">✕</Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
