'use client';
import { UserSettings } from '@/types';
import { useTTS } from '@/hooks/useTTS';

interface Props {
  settings: UserSettings;
  onUpdate: (updates: Partial<UserSettings>) => void;
}

export default function SettingsView({ settings, onUpdate }: Props) {
  const { speak } = useTTS(settings.ttsRate, settings.ttsPitch);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800 mb-6">Settings</h1>

      <div className="flex flex-col gap-4">
        {/* TTS */}
        <section className="bg-white rounded-xl border border-stone-200 p-5">
          <h2 className="font-semibold text-stone-700 mb-4">Text-to-Speech</h2>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label className="text-stone-600">Speed</label>
                <span className="text-stone-400">{settings.ttsRate.toFixed(1)}×</span>
              </div>
              <input type="range" min="0.5" max="1.5" step="0.1"
                value={settings.ttsRate}
                onChange={(e) => onUpdate({ ttsRate: parseFloat(e.target.value) })}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label className="text-stone-600">Pitch</label>
                <span className="text-stone-400">{settings.ttsPitch.toFixed(1)}</span>
              </div>
              <input type="range" min="0.5" max="1.5" step="0.1"
                value={settings.ttsPitch}
                onChange={(e) => onUpdate({ ttsPitch: parseFloat(e.target.value) })}
                className="w-full accent-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => speak('안녕하세요', 'ko-KR')}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-sm text-stone-700 transition-colors">
                🔊 Korean preview
              </button>
              <button onClick={() => speak('Hello, how are you?', 'en-US')}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-sm text-stone-700 transition-colors">
                🔊 English preview
              </button>
            </div>
          </div>
        </section>

        {/* Study */}
        <section className="bg-white rounded-xl border border-stone-200 p-5">
          <h2 className="font-semibold text-stone-700 mb-4">Study</h2>
          <div className="flex flex-col gap-3">
            <Toggle
              label="Show romanization"
              description="Display Latin pronunciation hints on cards"
              value={settings.showRomanization}
              onChange={(v) => onUpdate({ showRomanization: v })}
            />
            <div>
              <label className="block text-sm text-stone-600 mb-1.5">Study direction</label>
              <div className="flex gap-2">
                {(['korean-first', 'english-first'] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => onUpdate({ studyDirection: dir })}
                    className={`flex-1 py-2 text-sm rounded-lg border transition-colors font-medium ${
                      settings.studyDirection === dir
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {dir === 'korean-first' ? '🇰🇷 Korean first' : '🇬🇧 English first'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Streak */}
        {settings.streak > 0 && (
          <section className="bg-orange-50 rounded-xl border border-orange-100 p-5 flex items-center gap-4">
            <span className="text-4xl">🔥</span>
            <div>
              <p className="font-semibold text-orange-700">{settings.streak}-day streak!</p>
              <p className="text-sm text-orange-500">Keep it up — come back tomorrow to continue.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Toggle({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-stone-700">{label}</p>
        <p className="text-xs text-stone-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-blue-500' : 'bg-stone-200'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}
