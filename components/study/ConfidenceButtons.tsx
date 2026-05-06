interface Props {
  onMark: (verdict: 'known' | 'learning') => void;
}

export default function ConfidenceButtons({ onMark }: Props) {
  return (
    <div className="flex gap-3 w-full">
      <button
        onClick={() => onMark('learning')}
        className="flex-1 py-3 rounded-2xl border-2 border-brand-coral/30 bg-brand-coral-light text-brand-coral text-sm font-bold hover:border-brand-coral transition-all"
      >
        😅 Need Practice
      </button>
      <button
        onClick={() => onMark('known')}
        className="flex-1 py-3 rounded-2xl bg-brand-green text-white text-sm font-bold hover:bg-green-400 transition-all shadow-sm"
      >
        🎉 Got It!
      </button>
    </div>
  );
}
