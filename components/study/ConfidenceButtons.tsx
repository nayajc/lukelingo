interface Props {
  onMark: (verdict: 'known' | 'learning') => void;
}

export default function ConfidenceButtons({ onMark }: Props) {
  return (
    <div className="flex gap-3 w-full">
      <button
        onClick={() => onMark('learning')}
        className="flex-1 py-3 rounded-xl border-2 border-yellow-300 bg-yellow-50 text-yellow-700 font-medium text-sm hover:bg-yellow-100 transition-colors active:scale-95"
      >
        🔄 Need Practice
      </button>
      <button
        onClick={() => onMark('known')}
        className="flex-1 py-3 rounded-xl border-2 border-green-300 bg-green-50 text-green-700 font-medium text-sm hover:bg-green-100 transition-colors active:scale-95"
      >
        ✓ Got It
      </button>
    </div>
  );
}
