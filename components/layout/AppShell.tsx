'use client';
import { useState } from 'react';
import { View } from '@/types';
import { useCardSets } from '@/hooks/useCardSets';
import { useSettings } from '@/hooks/useSettings';
import Header from './Header';
import TabNav from './TabNav';
import SetList from '@/components/sets/SetList';
import StudySession from '@/components/study/StudySession';
import SettingsView from './SettingsView';
import EmptyState from '@/components/ui/EmptyState';

export default function AppShell() {
  const [view, setView] = useState<View>('sets');
  const [activeSetId, setActiveSetId] = useState<string | null>(null);
  const cardSets = useCardSets();
  const { settings, update, recordStudySession } = useSettings();

  const handleStudy = (setId: string) => {
    setActiveSetId(setId);
    setView('study');
  };

  const handleExitStudy = () => {
    setActiveSetId(null);
    setView('sets');
  };

  const activeSet = activeSetId ? cardSets.sets.find((s) => s.id === activeSetId) ?? null : null;

  return (
    <div className="min-h-screen bg-stone-50">
      <Header streak={settings.streak} />
      <TabNav active={view} onChange={(v) => { if (v !== 'study') setActiveSetId(null); setView(v); }} />

      <main>
        {view === 'sets' && (
          <SetList sets={cardSets.sets} hooks={cardSets} onStudy={handleStudy} />
        )}

        {view === 'study' && activeSet && (
          <StudySession
            set={activeSet}
            settings={settings}
            onExit={handleExitStudy}
            onSessionComplete={recordStudySession}
            onUpdateCard={(cardId, data) => cardSets.updateCard(activeSet.id, cardId, data)}
          />
        )}

        {view === 'study' && !activeSet && (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <EmptyState
              icon="🃏"
              title="No set selected"
              description="Go to My Sets and tap Study on any card set."
              ctaLabel="Go to My Sets"
              onCta={() => setView('sets')}
            />
          </div>
        )}

        {view === 'settings' && (
          <SettingsView settings={settings} onUpdate={update} />
        )}
      </main>
    </div>
  );
}
