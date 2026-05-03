import Button from '@/components/ui/Button';

interface Props {
  total: number;
  knownCount: number;
  learningCount: number;
  onRetry: () => void;
  onExit: () => void;
}

export default function SessionSummary({ total, knownCount, learningCount, onRetry, onExit }: Props) {
  const pct = total > 0 ? Math.round((knownCount / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="text-5xl">{pct >= 80 ? '🎉' : pct >= 50 ? '📈' : '💪'}</div>
      <div>
        <h2 className="text-2xl font-bold text-stone-800">Session Complete!</h2>
        <p className="text-stone-500 mt-1">{total} cards reviewed</p>
      </div>

      <div className="flex gap-4 w-full max-w-xs">
        <div className="flex-1 bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-2xl font-bold text-green-600">{knownCount}</p>
          <p className="text-xs text-green-500 mt-1">Got It</p>
        </div>
        <div className="flex-1 bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <p className="text-2xl font-bold text-yellow-600">{learningCount}</p>
          <p className="text-xs text-yellow-500 mt-1">Need Practice</p>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-sm text-stone-400 mt-2">{pct}% known</p>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onExit}>Back to Sets</Button>
        <Button onClick={onRetry}>Study Again</Button>
      </div>
    </div>
  );
}
