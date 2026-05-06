'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { loadStudyLogs, StudyLog } from '@/lib/firestore';
import { calcLevel, getLevelTitle, xpProgressPct, xpToNextLevel } from '@/lib/xp';

interface Props { userId: string | null; streak: number; xp: number; }

function buildHeatmap(logs: StudyLog[]) {
  const map = new Map(logs.map((l) => [l.date, l.cardsStudied]));
  const today = new Date();
  const days: { date: string; count: number }[] = [];
  for (let i = 111; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days.push({ date: key, count: map.get(key) ?? 0 });
  }
  return days;
}

function buildBarData(logs: StudyLog[]) {
  return logs.slice(-14).map((l) => ({
    date: l.date.slice(5),
    cards: l.cardsStudied,
    known: l.knownCount,
  }));
}

function buildAccuracyData(logs: StudyLog[]) {
  return logs.slice(-14).map((l) => ({
    date: l.date.slice(5),
    pct: l.cardsStudied > 0 ? Math.round((l.knownCount / l.cardsStudied) * 100) : 0,
  }));
}

export default function StatsView({ userId, streak, xp }: Props) {
  const level = calcLevel(xp);
  const title = getLevelTitle(level);
  const pct = xpProgressPct(xp);
  const toNext = xpToNextLevel(xp);
  const [logs, setLogs] = useState<StudyLog[]>([]);

  useEffect(() => {
    if (!userId) return;
    loadStudyLogs(userId).then(setLogs);
  }, [userId]);

  const heatmap = buildHeatmap(logs);
  const barData = buildBarData(logs);
  const accData = buildAccuracyData(logs);
  const totalCards = logs.reduce((s, l) => s + l.cardsStudied, 0);
  const avgAccuracy = logs.length
    ? Math.round(logs.reduce((s, l) => s + (l.cardsStudied > 0 ? l.knownCount / l.cardsStudied : 0), 0) / logs.length * 100)
    : 0;

  if (!userId) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <p className="label mb-2">Progress</p>
        <p className="text-sm text-ink-400">Sign in to track your progress across sessions.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-7">
      <p className="label mb-0.5">Your learning</p>
      <h1 className="text-xl font-black tracking-tighter text-ink-950 mb-6">Progress</h1>

      {/* XP / Level */}
      <div className="border border-ink-200 rounded-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-2xl font-black tracking-tighter text-ink-950">Lv.{level}</span>
            <span className="ml-2 text-sm font-semibold text-ink-400">{title}</span>
          </div>
          <span className="text-xs text-ink-400">{xp} XP · {toNext} to next</span>
        </div>
        <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
          <div className="h-2 bg-ink-950 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: streak, label: 'Day Streak' },
          { value: totalCards, label: 'Cards Studied' },
          { value: `${avgAccuracy}%`, label: 'Avg Accuracy' },
        ].map(({ value, label }) => (
          <div key={label} className="border border-ink-200 rounded-sm p-4">
            <p className="text-2xl font-black tracking-tighter text-ink-950">{value}</p>
            <p className="label mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <section className="mb-8">
        <p className="label mb-3">16-week activity</p>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(16, 1fr)' }}>
          {Array.from({ length: 16 }, (_, week) =>
            heatmap.slice(week * 7, week * 7 + 7).map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} cards`}
                className="aspect-square rounded-sm"
                style={{ background: day.count === 0 ? '#f5f5f5' : day.count < 5 ? '#a3a3a3' : day.count < 15 ? '#525252' : '#0a0a0a' }}
              />
            ))
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <p className="label">Less</p>
          {['#f5f5f5', '#a3a3a3', '#525252', '#0a0a0a'].map((c) => (
            <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
          ))}
          <p className="label">More</p>
        </div>
      </section>

      {logs.length === 0 ? (
        <div className="text-center py-12 border border-ink-100 rounded-sm">
          <p className="text-sm font-semibold text-ink-600">No study sessions yet</p>
          <p className="text-xs text-ink-400 mt-1">Complete a study session to see your graphs.</p>
        </div>
      ) : (
        <>
          {/* Daily cards bar chart */}
          <section className="mb-8">
            <p className="label mb-3">Cards studied (last 14 days)</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={barData} barSize={16}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ border: '1px solid #e5e5e5', borderRadius: 2, fontSize: 11 }}
                  cursor={{ fill: '#f5f5f5' }}
                />
                <Bar
                  dataKey="cards"
                  radius={[2, 2, 0, 0]}
                  fill="#d4d4d4"
                />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* Accuracy trend */}
          <section>
            <p className="label mb-3">Accuracy trend (last 14 days)</p>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={accData}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  contentStyle={{ border: '1px solid #e5e5e5', borderRadius: 2, fontSize: 11 }}
                  formatter={(v) => [`${v}%`, 'Accuracy']}
                />
                <Line type="monotone" dataKey="pct" stroke="#0a0a0a" strokeWidth={2} dot={{ r: 3, fill: '#0a0a0a' }} />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </>
      )}
    </div>
  );
}
