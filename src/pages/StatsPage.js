import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { useUI } from '../ui';
import { CATS, CAT_LABEL } from '../constants';
import { PlusIcon } from '../icons';
import { colors } from '../theme';
import { money } from '../utils';

export default function StatsPage() {
  const { derived } = useStore();
  const { openSheet } = useUI();
  const max = Math.max(1, ...Object.values(derived.catSums));

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.title}>Stats</Text>
        <Text style={styles.subTitle}>Today's breakdown</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.headRow}>
          <Text style={styles.headLabel}>Spent today</Text>
          <Text style={styles.headTotal}>{money(derived.todayTotal)}</Text>
        </View>

        {CATS.map((c) => (
          <View key={c} style={styles.row}>
            <Text style={styles.name}>{CAT_LABEL[c]}</Text>
            <View style={styles.bar}>
              <View style={[styles.fill, { width: `${(derived.catSums[c] / max) * 100}%` }]} />
            </View>
            <Text style={styles.amt}>{money(derived.catSums[c] || 0)}</Text>
          </View>
        ))}

        {derived.todays.length === 0 ? (
          <Text style={styles.empty}>No expenses logged today yet.</Text>
        ) : null}
      </View>

      <Pressable style={styles.pillCta} onPress={() => openSheet('add')}>
        <View style={styles.plus}><PlusIcon size={14} /></View>
        <Text style={styles.pillText}>Add expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: 16 },
  title: { fontSize: 26, fontWeight: '800', letterSpacing: -0.8, marginTop: 4 },
  subTitle: { fontSize: 13.5, color: colors.muted, fontWeight: '500', marginTop: 4 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 18,
  },
  headRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  headLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  headTotal: { fontSize: 22, fontWeight: '900', letterSpacing: -0.6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  name: { width: 78, fontSize: 12.5, fontWeight: '800' },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: '#000', borderRadius: 999 },
  amt: { width: 64, textAlign: 'right', fontSize: 12.5, fontWeight: '800' },
  empty: { textAlign: 'center', paddingVertical: 16, color: colors.muted, fontWeight: '600' },
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
});
