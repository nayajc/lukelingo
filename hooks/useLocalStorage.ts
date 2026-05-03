'use client';
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, [key]);

  const set = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof newValue === 'function' ? (newValue as (p: T) => T)(prev) : newValue;
      try { window.localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return [value, set, loaded] as const;
}
