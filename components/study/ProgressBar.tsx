interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="label">{current} / {total}</span>
        <span className="label">{pct}%</span>
      </div>
      <div className="h-px bg-ink-200 w-full">
        <div className="h-px bg-ink-950 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
