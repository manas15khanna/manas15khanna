import { useCallback, useEffect, useState } from 'react';
import { EASTER_EGGS, EasterEggDefinition } from '../data/portfolioData';

const STORAGE_KEY = 'manas_easter_eggs_v1';

export interface ActiveToast {
  id: string;
  title: string;
  message: string;
  category: string;
}

export function useEasterEggs() {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [toast, setToast] = useState<ActiveToast | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(discoveredIds));
    } catch {
      // ignore
    }
  }, [discoveredIds]);

  const unlockEgg = useCallback((eggId: string, customMessage?: string) => {
    const def: EasterEggDefinition | undefined = EASTER_EGGS.find((e) => e.id === eggId);
    if (!def) return;

    setDiscoveredIds((prev) => (prev.includes(eggId) ? prev : [...prev, eggId]));

    setToast({
      id: `${eggId}-${Date.now()}`,
      title: def.title,
      message: customMessage || def.unlockedMessage,
      category: def.category
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return {
    discoveredIds,
    totalCount: EASTER_EGGS.length,
    unlockEgg,
    toast,
    dismissToast: () => setToast(null)
  };
}
