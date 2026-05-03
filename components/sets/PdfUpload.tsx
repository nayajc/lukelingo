'use client';
import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { VocabularyCard, CardSet } from '@/types';

interface ExtractedCard { korean: string; english: string; romanization?: string; }

interface Props {
  sets: CardSet[];
  onAddCards: (setId: string, cards: Omit<VocabularyCard, 'id' | 'confidence' | 'createdAt'>[]) => void;
}

async function extractFromPdf(file: File): Promise<ExtractedCard[]> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set');

  // Check file size — Gemini inline limit is ~20MB
  if (file.size > 20 * 1024 * 1024) throw new Error('PDF is too large (max 20MB)');

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inline_data: { mime_type: 'application/pdf', data: base64 } },
            {
              text: `Look at this Korean language learning PDF carefully.
Find every Korean word or phrase that appears alongside an English translation.
This includes vocabulary tables, word lists, glossaries, or any Korean-English pairs.

Return a JSON array. Each item must have:
- "korean": the Korean text (한글)
- "english": the English meaning
- "romanization": romanized pronunciation (if you can determine it)

Example format:
[{"korean":"언제","english":"when","romanization":"eonje"},{"korean":"생일","english":"birthday","romanization":"saengil"}]

Return ONLY the JSON array, no explanation, no markdown code blocks.`,
            },
          ],
        }],
        generationConfig: { temperature: 0.1 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `API error ${res.status}`);
  }

  const json = await res.json();

  // Check for blocked content
  if (json.promptFeedback?.blockReason) {
    throw new Error(`Blocked: ${json.promptFeedback.blockReason}`);
  }

  const rawText: string = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  if (!rawText) throw new Error('Gemini returned an empty response');

  // Strip markdown code fences if present
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  // Find JSON array even if there's surrounding text
  const match = cleaned.match(/\[[\s\S]*\]/);
  if (!match) throw new Error(`Could not find vocabulary in this PDF.\n\nGemini said: ${rawText.slice(0, 200)}`);

  try {
    return JSON.parse(match[0]) as ExtractedCard[];
  } catch {
    throw new Error(`Failed to parse response.\n\nGemini said: ${rawText.slice(0, 300)}`);
  }
}

export default function PdfUpload({ sets, onAddCards }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<'idle' | 'loading' | 'preview'>('idle');
  const [cards, setCards] = useState<ExtractedCard[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [targetSetId, setTargetSetId] = useState(sets[0]?.id ?? '');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStep('loading');
    setError('');
    try {
      const extracted = await extractFromPdf(file);
      setCards(extracted);
      setSelected(new Set(extracted.map((_, i) => i)));
      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Extraction failed');
      setStep('idle');
    }
    e.target.value = '';
  };

  const handleAdd = () => {
    const toAdd = cards.filter((_, i) => selected.has(i));
    onAddCards(targetSetId, toAdd);
    setOpen(false);
    setStep('idle');
    setCards([]);
  };

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
  };

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>📄 PDF Extract</Button>

      {open && (
        <Modal title="Extract Vocabulary from PDF" onClose={() => { setOpen(false); setStep('idle'); }}>
          {step === 'idle' && (
            <div className="flex flex-col gap-4">
              <div
                className="border-2 border-dashed border-ink-200 rounded-sm p-8 text-center cursor-pointer hover:border-ink-400 transition-colors"
                onClick={() => inputRef.current?.click()}
              >
                <p className="text-2xl mb-2">📄</p>
                <p className="text-sm font-medium text-ink-600">Click to upload a PDF</p>
                <p className="text-xs text-ink-400 mt-1">Gemini AI will extract Korean vocabulary</p>
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleFile} />
            </div>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="w-6 h-6 border-2 border-ink-200 border-t-ink-950 rounded-full animate-spin" />
              <p className="text-sm text-ink-600">Extracting vocabulary with Gemini AI…</p>
            </div>
          )}

          {step === 'preview' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-800">{cards.length} words found</p>
                <button className="text-xs text-ink-400 hover:text-ink-800" onClick={() => setSelected(selected.size === cards.length ? new Set() : new Set(cards.map((_, i) => i)))}>
                  {selected.size === cards.length ? 'Deselect all' : 'Select all'}
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto divide-y divide-ink-100 border border-ink-100 rounded-sm">
                {cards.map((card, i) => (
                  <label key={i} className="flex items-center gap-3 px-3 py-2.5 hover:bg-ink-50 cursor-pointer">
                    <input type="checkbox" checked={selected.has(i)} onChange={() => toggle(i)} className="accent-ink-950" />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm font-korean text-ink-950">{card.korean}</span>
                      <span className="text-xs text-ink-500 ml-2">{card.english}</span>
                      {card.romanization && <span className="text-xs text-ink-300 ml-2 italic">{card.romanization}</span>}
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <p className="label mb-1.5">Add to set</p>
                <select
                  value={targetSetId}
                  onChange={(e) => setTargetSetId(e.target.value)}
                  className="w-full border border-ink-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ink-950"
                >
                  {sets.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <Button variant="secondary" onClick={() => setStep('idle')}>Back</Button>
                <Button onClick={handleAdd} disabled={selected.size === 0}>
                  Add {selected.size} card{selected.size !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
