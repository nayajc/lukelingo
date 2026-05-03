'use client';
import { useState, useRef, useCallback } from 'react';

type SR = typeof window extends { SpeechRecognition: infer T } ? T : never;

declare global {
  interface Window {
    SpeechRecognition?: new () => SR;
    webkitSpeechRecognition?: new () => SR;
  }
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recRef = useRef<SR | null>(null);

  const isSupported = typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const start = useCallback(() => {
    if (!isSupported) return;
    const Rec = (window.SpeechRecognition || window.webkitSpeechRecognition)!;
    const rec = new Rec() as unknown as SpeechRecognition;
    rec.lang = 'ko-KR';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const text = e.results[0]?.[0]?.transcript ?? '';
      setTranscript(text);
    };
    rec.onend = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);
    recRef.current = rec as unknown as SR;
    rec.start();
  }, [isSupported]);

  const stop = useCallback(() => {
    (recRef.current as unknown as SpeechRecognition | null)?.stop();
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setIsListening(false);
  }, []);

  return { isListening, transcript, isSupported, start, stop, reset };
}
