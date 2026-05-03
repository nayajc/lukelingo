'use client';
import { UserSettings } from '@/types';
import { useTTS } from '@/hooks/useTTS';

interface Props {
  settings: UserSettings;
  onUpdate: (updates: Partial<UserSettings>) => void;
}

function Toggle({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-ink-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-ink-800">{label}</p>
        <p className="text-xs text-ink-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-ink-950' : 'bg-ink-200'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

export default function SettingsView({ settings, onUpdate }: Props) {
  const { speak } = useTTS(settings.ttsRate, settings.ttsPitch);

  return (
    <div className="max-w-2xl mx-auto px-5 py-7">
      <p className="label mb-0.5">Preferences</p>
      <h1 className="text-xl font-black tracking-tighter text-ink-950 mb-6">Settings</h1>

      <div className="flex flex-col gap-5">
        {/* TTS */}
        <section className="border border-ink-200 rounded-sm p-5">
          <p className="label mb-4">Text-to-Speech</p>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-ink-700">Speed</label>
                <span className="label">{settings.ttsRate.toFixed(1)}×</span>
              </div>
              <input type="range" min="0.5" max="1.5" step="0.1"
                value={settings.ttsRate}
                onChange={(e) => onUpdate({ ttsRate: parseFloat(e.target.value) })}
                className="w-full accent-ink-950"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-ink-700">Pitch</label>
                <span className="label">{settings.ttsPitch.toFixed(1)}</span>
              </div>
              <input type="range" min="0.5" max="1.5" step="0.1"
                value={settings.ttsPitch}
                onChange={(e) => onUpdate({ ttsPitch: parseFloat(e.target.value) })}
                className="w-full accent-ink-950"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => speak('안녕하세요', 'ko-KR')} className="px-3 py-1.5 border border-ink-200 rounded-sm text-xs text-ink-600 hover:border-ink-950 transition-colors">
                🔊 Korean
              </button>
              <button onClick={() => speak('Hello, how are you?', 'en-US')} className="px-3 py-1.5 border border-ink-200 rounded-sm text-xs text-ink-600 hover:border-ink-950 transition-colors">
                🔊 English
              </button>
            </div>
          </div>
        </section>

        {/* Study */}
        <section className="border border-ink-200 rounded-sm p-5">
          <p className="label mb-2">Study</p>
          <Toggle
            label="Show romanization"
            description="Show Latin pronunciation hints on cards"
            value={settings.showRomanization}
            onChange={(v) => onUpdate({ showRomanization: v })}
          />
          <div className="pt-3">
            <p className="text-xs font-medium text-ink-700 mb-2">Study direction</p>
            <div className="flex gap-2">
              {(['korean-first', 'english-first'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => onUpdate({ studyDirection: dir })}
                  className={`flex-1 py-2 text-xs font-semibold rounded-sm border transition-colors ${
                    settings.studyDirection === dir
                      ? 'bg-ink-950 border-ink-950 text-white'
                      : 'border-ink-200 text-ink-500 hover:border-ink-950'
                  }`}
                >
                  {dir === 'korean-first' ? '🇰🇷 Korean first' : '🇬🇧 English first'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {settings.streak > 0 && (
          <div className="border border-ink-200 rounded-sm p-5 flex items-center gap-4">
            <div>
              <p className="text-sm font-black tracking-tighter text-ink-950">{settings.streak}-day streak</p>
              <p className="text-xs text-ink-400 mt-0.5">Keep studying daily to maintain it.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
