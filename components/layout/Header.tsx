interface Props {
  streak: number;
}

export default function Header({ streak }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-stone-100">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇰🇷</span>
          <span className="font-bold text-stone-800 tracking-tight">lukelingo</span>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 text-sm text-orange-500 font-medium">
            <span>🔥</span>
            <span>{streak} day{streak !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </header>
  );
}
