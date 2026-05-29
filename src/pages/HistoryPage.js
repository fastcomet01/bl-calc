import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { useUI } from '../ui';
import { CategoryIcon, PlusIcon } from '../icons';
import { colors } from '../theme';
import { money, capitalize, fmtDate } from '../utils';

export default function HistoryPage() {
  const { state, removeExpense, clearExpenses } = useStore();
  const { openSheet, showToast } = useUI();

  const total = state.expenses.reduce((s, e) => s + e.amount, 0);
  const count = state.expenses.length;
  const rows = state.expenses.slice().reverse();

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subTitle}>
          {count === 1 ? '1 expense' : count + ' expenses'} · {money(total)} total
        </Text>
      </View>

      <Pressable style={styles.pillCta} onPress={() => openSheet('add')}>
        <View style={styles.plus}><PlusIcon size={14} /></View>
        <Text style={styles.pillText}>Add expense</Text>
      </Pressable>

      <View style={styles.card}>
        {count === 0 ? (
          <Text style={styles.empty}>No expenses yet.{'\n'}Tap Add to get started.</Text>
        ) : (
          rows.map((e, i) => (
            <View key={e.id} style={[styles.row, i === rows.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.icon}>
                <CategoryIcon category={e.category} size={16} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.name} numberOfLines={1}>{e.name}</Text>
                <Text style={styles.sub}>{capitalize(e.category)} · {fmtDate(e.ts)}</Text>
              </View>
              <Text style={styles.amt}>{money(e.amount)}</Text>
              <Pressable
                onPress={() => { removeExpense(e.id); showToast('Removed'); }}
                style={styles.del}
              >
                <Text style={styles.delText}>×</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>

      {count ? (
        <Pressable
          style={styles.ghost}
          onPress={() => { clearExpenses(); showToast('History cleared'); }}
        >
          <Text style={styles.ghostText}>Clear all</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: 16 },
  title: { fontSize: 26, fontWeight: '800', letterSpacing: -0.8, marginTop: 4 },
  subTitle: { fontSize: 13.5, color: colors.muted, fontWeight: '500', marginTop: 4 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  pillCta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingLeft: 6,
    paddingRight: 16,
    borderRadius: 999,
  },
  plus: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: { color: '#fff', fontWeight: '800', fontSize: 13.5 },
  empty: { textAlign: 'center', paddingVertical: 32, color: colors.muted, fontSize: 13, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 13.5, fontWeight: '800', letterSpacing: -0.1 },
  sub: { fontSize: 11, color: colors.muted, fontWeight: '600', marginTop: 2 },
  amt: { fontSize: 14, fontWeight: '900', letterSpacing: -0.4 },
  del: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delText: { fontSize: 16, fontWeight: '800', color: '#000', lineHeight: 18 },
  ghost: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  ghostText: { fontSize: 13, fontWeight: '800', color: '#000' },
});
