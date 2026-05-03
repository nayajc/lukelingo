interface Props {
  onMark: (verdict: 'known' | 'learning') => void;
}

export default function ConfidenceButtons({ onMark }: Props) {
  return (
    <div className="flex gap-3 w-full">
      <button
        onClick={() => onMark('learning')}
        className="flex-1 py-3 rounded-sm border-2 border-ink-200 text-ink-600 text-xs font-semibold tracking-widest uppercase hover:border-ink-950 hover:text-ink-950 transition-colors"
      >
        Need Practice
      </button>
      <button
        onClick={() => onMark('known')}
        className="flex-1 py-3 rounded-sm bg-ink-950 text-white text-xs font-semibold tracking-widest uppercase hover:bg-ink-800 transition-colors"
      >
        Got It
      </button>
    </div>
  );
}
