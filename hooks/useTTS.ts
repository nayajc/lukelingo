'use client';
import { useState, useCallback, useRef } from 'react';

export function useTTS(rate = 0.9, pitch = 1.0) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getVoice = (lang: string): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.lang.startsWith(lang)) ?? null;
  };

  const speak = useCallback((text: string, lang: 'ko-KR' | 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voice = getVoice(lang.slice(0, 2));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [rate, pitch]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
