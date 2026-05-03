import {
  doc, collection, setDoc, getDoc, getDocs,
  deleteDoc, onSnapshot, query, orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { CardSet, UserSettings } from '@/types';

// ── Card Sets ──────────────────────────────────────────────

export function subscribeCardSets(
  userId: string,
  cb: (sets: CardSet[]) => void,
  onError?: (err: Error) => void,
) {
  const ref = collection(db, 'users', userId, 'cardSets');
  return onSnapshot(
    query(ref, orderBy('createdAt')),
    (snap) => { cb(snap.docs.map((d) => d.data() as CardSet)); },
    (err) => {
      console.error('Firestore read failed:', err.code, err.message);
      onError?.(err);
    },
  );
}

function stripUndefined<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export async function saveCardSet(userId: string, set: CardSet) {
  await setDoc(doc(db, 'users', userId, 'cardSets', set.id), stripUndefined(set));
}

export async function deleteCardSet(userId: string, setId: string) {
  await deleteDoc(doc(db, 'users', userId, 'cardSets', setId));
}

// ── Settings ──────────────────────────────────────────────

export async function loadSettings(userId: string): Promise<Partial<UserSettings>> {
  const snap = await getDoc(doc(db, 'users', userId, 'meta', 'settings'));
  return snap.exists() ? (snap.data() as UserSettings) : {};
}

export async function saveSettings(userId: string, settings: UserSettings) {
  await setDoc(doc(db, 'users', userId, 'meta', 'settings'), stripUndefined(settings));
}

// ── Study Logs ────────────────────────────────────────────

export interface StudyLog {
  date: string; // YYYY-MM-DD
  cardsStudied: number;
  knownCount: number;
  learningCount: number;
}

export async function recordStudyLog(userId: string, log: StudyLog) {
  const ref = doc(db, 'users', userId, 'studyLogs', log.date);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const prev = snap.data() as StudyLog;
    await setDoc(ref, {
      date: log.date,
      cardsStudied: prev.cardsStudied + log.cardsStudied,
      knownCount: prev.knownCount + log.knownCount,
      learningCount: prev.learningCount + log.learningCount,
    });
  } else {
    await setDoc(ref, log);
  }
}

export async function loadStudyLogs(userId: string): Promise<StudyLog[]> {
  const snap = await getDocs(collection(db, 'users', userId, 'studyLogs'));
  return snap.docs.map((d) => d.data() as StudyLog).sort((a, b) => a.date.localeCompare(b.date));
}
