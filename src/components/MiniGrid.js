import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, shadows } from '../theme';
import { ArrowIcon, WalletIcon, NotebookIcon } from '../icons';
import { useStore } from '../store';
import { useUI } from '../ui';
import { money } from '../utils';

function MiniCard({ icon, titleLines, subtitle, value, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.mini, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <View style={styles.ic}>{icon}</View>
      <View>
        {titleLines.map((l) => (
          <Text key={l} style={styles.title}>{l}</Text>
        ))}
        <Text style={styles.sub}>{subtitle}</Text>
      </View>
      <View style={styles.foot}>
        <Text style={styles.val}>{value}</Text>
        <View style={styles.arrow}>
          <ArrowIcon size={14} color="#fff" />
        </View>
      </View>
    </Pressable>
  );
}

export default function MiniGrid() {
  const { state } = useStore();
  const { openSheet, setPage } = useUI();
  return (
    <View style={styles.row}>
      <MiniCard
        icon={<WalletIcon size={20} />}
        titleLines={['Daily', 'Budget']}
        subtitle="Set your limit"
        value={money(state.budget)}
        onPress={() => openSheet('budget')}
      />
      <MiniCard
        icon={<NotebookIcon size={20} />}
        titleLines={['Expense', 'History']}
        subtitle="View past costs"
        value={
          state.expenses.length === 1 ? '1 item' : state.expenses.length + ' items'
        }
        onPress={() => setPage('history')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  mini: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    minHeight: 130,
    gap: 8,
    ...shadows.soft,
  },
  ic: {
    width: 36,
    height: 36,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
  },
  title: { fontSize: 14.5, fontWeight: '800', letterSpacing: -0.2 },
  sub: { fontSize: 11.5, color: colors.muted, fontWeight: '600', marginTop: 2 },
  foot: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  val: { fontSize: 13, fontWeight: '800', letterSpacing: -0.1 },
  arrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
