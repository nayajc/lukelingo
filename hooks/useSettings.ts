'use client';
import { useState, useEffect } from 'react';
import { UserSettings } from '@/types';
import { useLocalStorage } from './useLocalStorage';
import { loadSettings, saveSettings, recordStudyLog } from '@/lib/firestore';

const DEFAULT: UserSettings = {
  ttsRate: 0.9, ttsPitch: 1.0,
  showRomanization: true,
  studyDirection: 'korean-first',
  streak: 0, lastStudyDate: '',
  xp: 0,
};

export function useSettings(userId: string | null = null) {
  const [local, setLocal] = useLocalStorage<UserSettings>('lukelingo-settings', DEFAULT);
  const [cloud, setCloud] = useState<UserSettings | null>(null);

  useEffect(() => {
    if (!userId) { setCloud(null); return; }
    loadSettings(userId).then((s) => setCloud({ ...DEFAULT, ...s } as UserSettings));
  }, [userId]);

  const settings = userId ? (cloud ?? DEFAULT) : local;

  const update = (updates: Partial<UserSettings>) => {
    const next = { ...settings, ...updates };
    if (userId) { setCloud(next); saveSettings(userId, next); }
    else setLocal(next);
  };

  const recordSession = async (knownCount: number, learningCount: number, total: number) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const streak = settings.lastStudyDate === yesterday ? settings.streak + 1
      : settings.lastStudyDate === today ? settings.streak : 1;

    const gained = knownCount * 3 + learningCount * 1;
    const newXp = (settings.xp ?? 0) + gained;
    update({ streak, lastStudyDate: today, xp: newXp });

    if (userId) {
      await recordStudyLog(userId, {
        date: today,
        cardsStudied: total,
        knownCount,
        learningCount,
      });
    }
  };

  return { settings, update, recordSession };
}
