import { View } from '@/types';

interface Props {
  active: View;
  onChange: (v: View) => void;
}

const tabs: { id: View; label: string; emoji: string }[] = [
  { id: 'sets',     label: 'Sets',     emoji: '📚' },
  { id: 'study',    label: 'Study',    emoji: '🃏' },
  { id: 'stats',    label: 'Progress', emoji: '📊' },
  { id: 'settings', label: 'Settings', emoji: '⚙️' },
];

export default function TabNav({ active, onChange }: Props) {
  return (
    <nav className="sticky top-14 z-30 bg-white border-b border-brand-purple/10 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 flex gap-1 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl text-xs font-bold tracking-tight transition-all ${
              active === tab.id
                ? 'bg-brand-purple-light text-brand-purple'
                : 'text-ink-400 hover:text-brand-purple hover:bg-brand-purple-light/50'
            }`}
          >
            <span className="text-base">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
