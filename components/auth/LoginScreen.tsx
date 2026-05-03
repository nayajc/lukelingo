'use client';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function LoginScreen() {
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="border-b border-ink-200 px-8 h-14 flex items-center">
        <div className="flex items-center gap-2">
          <span>🇰🇷</span>
          <span className="font-black tracking-tighter text-lg text-ink-950">lukelingo</span>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-10">
        <div className="max-w-sm">
          <p className="label mb-3">Korean vocabulary practice</p>
          <h1 className="text-5xl font-black tracking-tighter text-ink-950 leading-none mb-4">
            Learn Korean.<br />One card at a time.
          </h1>
          <p className="text-sm text-ink-400 leading-relaxed">
            Flashcards with pronunciation, spaced repetition, progress tracking, and AI-powered vocabulary extraction from PDFs.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-ink-950 hover:bg-ink-800 text-white text-sm font-semibold rounded-sm transition-colors tracking-tight"
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <p className="text-xs text-ink-300">Free forever. No credit card required.</p>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-left">
          {[
            ['🃏', 'Flashcard practice with TTS'],
            ['📊', 'Daily streak & progress graphs'],
            ['📄', 'PDF vocabulary extraction'],
            ['☁️', 'Synced across all devices'],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-start gap-2 p-3 border border-ink-100 rounded-sm">
              <span className="text-base">{icon}</span>
              <span className="text-xs text-ink-600 leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" fillOpacity="0.7"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" fillOpacity="0.7"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" fillOpacity="0.7"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" fillOpacity="0.7"/>
    </svg>
  );
}
