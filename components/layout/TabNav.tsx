import { View } from '@/types';

interface Props {
  active: View;
  onChange: (v: View) => void;
}

const tabs: { id: View; label: string; icon: string }[] = [
  { id: 'sets', label: 'My Sets', icon: '📚' },
  { id: 'study', label: 'Study', icon: '🃏' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function TabNav({ active, onChange }: Props) {
  return (
    <nav className="sticky top-14 z-30 bg-white border-b border-stone-100">
      <div className="max-w-2xl mx-auto px-4 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              active === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
