import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_STATE, STORAGE_KEY, CATS } from './constants';
import { startOfToday, uid } from './utils';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const initial = useRef(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
      } catch {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (initial.current) { initial.current = false; return; }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const setCat = useCallback((cat) => setState((s) => ({ ...s, cat })), []);
  const setBudget = useCallback((budget) => setState((s) => ({ ...s, budget })), []);

  const addExpense = useCallback(({ amount, name, category, ts }) => {
    setState((s) => ({
      ...s,
      expenses: [...s.expenses, { id: uid(), amount, name, category, ts }],
    }));
  }, []);

  const removeExpense = useCallback((id) => {
    setState((s) => ({ ...s, expenses: s.expenses.filter((e) => e.id !== id) }));
  }, []);

  const clearExpenses = useCallback(() => {
    setState((s) => ({ ...s, expenses: [] }));
  }, []);

  const setAccount = useCallback(({ email, password }) => {
    setState((s) => ({ ...s, email, password }));
  }, []);

  const clearAccount = useCallback(() => {
    setState((s) => ({ ...s, email: '', password: '' }));
  }, []);

  const derived = useMemo(() => {
    const start = startOfToday();
    const todays = state.expenses.filter((e) => e.ts >= start);
    const todayTotal = todays.reduce((sum, e) => sum + e.amount, 0);
    const left = Math.max(0, state.budget - todayTotal);
    const pct = state.budget > 0 ? Math.min(100, Math.round((todayTotal / state.budget) * 100)) : 0;
    const catSums = Object.fromEntries(CATS.map((c) => [c, 0]));
    todays.forEach((e) => {
      catSums[e.category] = (catSums[e.category] || 0) + e.amount;
    });
    return { todays, todayTotal, left, pct, catSums };
  }, [state.budget, state.expenses]);

  const value = useMemo(
    () => ({
      state, ready, derived,
      setCat, setBudget, addExpense, removeExpense, clearExpenses,
      setAccount, clearAccount,
    }),
    [state, ready, derived, setCat, setBudget, addExpense, removeExpense, clearExpenses, setAccount, clearAccount],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
