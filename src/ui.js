import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const UIContext = createContext(null);

export const PAGES = ['home', 'stats', 'history', 'account'];

export const UIProvider = ({ children }) => {
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState('');
  const [page, setPageState] = useState('home');
  const toastTimer = useRef(null);

  const openSheet = useCallback((name, props = {}) => {
    setSheet({ name, props });
  }, []);

  const closeSheet = useCallback(() => setSheet(null), []);

  const setPage = useCallback((name) => {
    setPageState(PAGES.includes(name) ? name : 'home');
    setSheet(null);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  }, []);

  const value = useMemo(
    () => ({ sheet, openSheet, closeSheet, toast, showToast, page, setPage }),
    [sheet, openSheet, closeSheet, toast, showToast, page, setPage],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};
