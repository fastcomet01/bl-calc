export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const money = (n) => '$' + Number(n).toFixed(2);

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const uid = () => Math.random().toString(36).slice(2, 10);

export const parseAmount = (v) => {
  if (!v) return NaN;
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? NaN : n;
};

export const tsFromTime = (timeStr) => {
  if (!timeStr) return Date.now();
  const [h, m] = String(timeStr).split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return Date.now();
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.getTime();
};

export const fmtDate = (ts) => {
  const d = new Date(ts);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const yest = new Date(today); yest.setDate(yest.getDate() - 1);
  const dStart = new Date(d); dStart.setHours(0, 0, 0, 0);
  const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  if (dStart.getTime() === today.getTime()) return 'Today · ' + time;
  if (dStart.getTime() === yest.getTime()) return 'Yesterday · ' + time;
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' · ' + time;
};

export const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
