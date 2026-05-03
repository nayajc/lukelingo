import { View } from '@/types';

interface Props {
  active: View;
  onChange: (v: View) => void;
}

const tabs: { id: View; label: string }[] = [
  { id: 'sets',     label: 'Sets'     },
  { id: 'study',    label: 'Study'    },
  { id: 'stats',    label: 'Progress' },
  { id: 'settings', label: 'Settings' },
];

export default function TabNav({ active, onChange }: Props) {
  return (
    <nav className="sticky top-14 z-30 bg-white border-b border-ink-200">
      <div className="max-w-2xl mx-auto px-5 flex gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-3 text-xs font-semibold tracking-widest uppercase transition-colors border-b-2 ${
              active === tab.id
                ? 'border-ink-950 text-ink-950'
                : 'border-transparent text-ink-400 hover:text-ink-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
