'use client';
import { useLocalStorage } from './useLocalStorage';
import { UserSettings } from '@/types';

const DEFAULT_SETTINGS: UserSettings = {
  ttsRate: 0.9,
  ttsPitch: 1.0,
  showRomanization: true,
  studyDirection: 'korean-first',
  streak: 0,
  lastStudyDate: '',
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<UserSettings>('lukelingo-settings', DEFAULT_SETTINGS);

  const update = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const recordStudySession = () => {
    const today = new Date().toISOString().split('T')[0];
    setSettings((prev) => {
      if (prev.lastStudyDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const streak = prev.lastStudyDate === yesterday ? prev.streak + 1 : 1;
      return { ...prev, streak, lastStudyDate: today };
    });
  };

  return { settings, update, recordStudySession };
}
