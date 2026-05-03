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
    <div className="flex flex-col items-center gap-8 py-12 text-center">
      <div>
        <p className="label mb-2">Session complete</p>
        <p className="text-6xl font-black tracking-tighter text-ink-950">{pct}%</p>
        <p className="text-sm text-ink-400 mt-1">{total} cards reviewed</p>
      </div>

      <div className="w-full max-w-xs grid grid-cols-2 gap-3">
        <div className="border border-ink-200 rounded-sm p-4 text-left">
          <p className="text-2xl font-black text-ink-950">{knownCount}</p>
          <p className="label mt-1">Got It</p>
        </div>
        <div className="border border-ink-200 rounded-sm p-4 text-left">
          <p className="text-2xl font-black text-ink-950">{learningCount}</p>
          <p className="label mt-1">Practicing</p>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <div className="h-px bg-ink-100">
          <div className="h-px bg-ink-950 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onExit}>Back to Sets</Button>
        <Button onClick={onRetry}>Study Again</Button>
      </div>
    </div>
  );
}
