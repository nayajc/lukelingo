'use client';
import { useState } from 'react';
import { View } from '@/types';
import { useCardSets } from '@/hooks/useCardSets';
import { useSettings } from '@/hooks/useSettings';
import { useAuth } from '@/components/auth/AuthProvider';
import Header from './Header';
import TabNav from './TabNav';
import SetList from '@/components/sets/SetList';
import StudySession from '@/components/study/StudySession';
import SettingsView from './SettingsView';
import StatsView from '@/components/dashboard/StatsView';
import LoginScreen from '@/components/auth/LoginScreen';
import EmptyState from '@/components/ui/EmptyState';

export default function AppShell() {
  const { user, loading, signOut } = useAuth();
  const [view, setView] = useState<View>('sets');
  const [activeSetId, setActiveSetId] = useState<string | null>(null);

  const cardSets = useCardSets(user?.uid ?? null);
  const { settings, update, recordSession } = useSettings(user?.uid ?? null);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-ink-200 border-t-ink-950 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  const activeSet = activeSetId ? cardSets.sets.find((s) => s.id === activeSetId) ?? null : null;

  const handleStudy = (setId: string) => { setActiveSetId(setId); setView('study'); };
  const handleExitStudy = () => { setActiveSetId(null); setView('sets'); };
  const handleTabChange = (v: View) => { if (v !== 'study') setActiveSetId(null); setView(v); };

  return (
    <div className="min-h-screen bg-ink-50">
      <Header
        streak={settings.streak}
        userPhoto={user.photoURL}
        userName={user.displayName}
        onSignOut={signOut}
      />
      <TabNav active={view} onChange={handleTabChange} />

      <main>
        {view === 'sets' && (
          <SetList sets={cardSets.sets} hooks={cardSets} onStudy={handleStudy} />
        )}

        {view === 'study' && activeSet && (
          <StudySession
            set={activeSet}
            settings={settings}
            onExit={handleExitStudy}
            onSessionComplete={(known, learning) => recordSession(known, learning, known + learning)}
            onUpdateCard={(cardId, data) => cardSets.updateCard(activeSet.id, cardId, data)}
          />
        )}

        {view === 'study' && !activeSet && (
          <div className="max-w-2xl mx-auto px-5 py-6">
            <EmptyState
              icon="🃏"
              title="No set selected"
              description="Go to Sets and tap Study on any card set."
              ctaLabel="Go to Sets"
              onCta={() => setView('sets')}
            />
          </div>
        )}

        {view === 'stats' && (
          <StatsView userId={user.uid} streak={settings.streak} />
        )}

        {view === 'settings' && (
          <SettingsView settings={settings} onUpdate={update} />
        )}
      </main>
    </div>
  );
}
