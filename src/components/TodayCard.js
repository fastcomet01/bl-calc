import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, shadows } from '../theme';
import { money } from '../utils';
import { ArrowIcon } from '../icons';
import Ring from './Ring';
import ChipRow from './ChipRow';
import { useStore } from '../store';
import { useUI } from '../ui';

export default function TodayCard() {
  const { state, derived, setCat } = useStore();
  const { setPage } = useUI();

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Today's Spending</Text>
            <Pressable style={styles.seeAll} onPress={() => setPage('history')}>
              <Text style={styles.seeAllText}>See all</Text>
              <ArrowIcon size={11} color="#fff" />
            </Pressable>
          </View>
          <Text style={styles.amount}>{money(derived.todayTotal)}</Text>
          <Text style={styles.subAmount}>
            Budget left: <Text style={styles.subAmountBold}>{money(derived.left)}</Text>
          </Text>
        </View>
        <Ring percent={derived.pct} />
      </View>
      <ChipRow activeCat={state.cat} onSelect={setCat} catSums={derived.catSums} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    ...shadows.card,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#000',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  seeAllText: { color: '#fff', fontSize: 10.5, fontWeight: '800', letterSpacing: 0.4 },
  amount: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -1.4,
    lineHeight: 42,
    marginTop: 8,
    marginBottom: 2,
    color: colors.ink,
  },
  subAmount: { fontSize: 12.5, color: colors.muted, fontWeight: '600' },
  subAmountBold: { color: '#000', fontWeight: '800' },
});
