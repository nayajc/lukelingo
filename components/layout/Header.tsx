import Image from 'next/image';
import { calcLevel } from '@/lib/xp';

interface Props {
  streak: number;
  xp: number;
  userPhoto?: string | null;
  userName?: string | null;
  onSignOut?: () => void;
  saveStatus?: 'idle' | 'saving' | 'saved';
}

export default function Header({ streak, xp, userPhoto, userName, onSignOut, saveStatus }: Props) {
  const level = calcLevel(xp);
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-ink-200">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.jpg" alt="LukeLingo" width={120} height={45} className="object-contain" priority />
        </div>
        <div className="flex items-center gap-4">
          {saveStatus === 'saving' && (
            <span className="text-xs text-ink-400 tracking-tight">Saving…</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-xs text-ink-400 tracking-tight">Saved ✓</span>
          )}
          <span className="text-xs font-semibold text-ink-500 tracking-tight border border-ink-200 rounded-full px-2 py-0.5">
            Lv.{level}
          </span>
          {streak > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-ink-950 inline-block" />
              <span className="text-xs font-semibold text-ink-600 tracking-tight">{streak}d streak</span>
            </div>
          )}
          {userPhoto && (
            <div className="relative group">
              <Image src={userPhoto} alt={userName ?? ''} width={28} height={28} className="rounded-full border border-ink-200 cursor-pointer" />
              {onSignOut && (
                <div className="absolute right-0 top-9 hidden group-hover:block bg-white border border-ink-200 rounded-sm shadow-lift z-50 min-w-[120px]">
                  <div className="px-3 py-2 text-xs text-ink-400 border-b border-ink-100 truncate">{userName}</div>
                  <button onClick={onSignOut} className="w-full text-left px-3 py-2 text-xs text-ink-800 hover:bg-ink-50 transition-colors">Sign out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
