import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { useUI } from '../ui';
import { CATS, CAT_LABEL } from '../constants';
import {
  AvatarIcon,
  CategoryIcon,
  ChevronRightIcon,
  MailIcon,
} from '../icons';
import { colors, shadows } from '../theme';
import { money } from '../utils';

export default function AccountPage() {
  const { state } = useStore();
  const { openSheet } = useUI();

  const total = state.expenses.reduce((s, e) => s + e.amount, 0);
  const days = new Set(state.expenses.map((e) => new Date(e.ts).toDateString())).size;
  const displayName = state.email || 'You';

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subTitle}>You and your money.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.headRow}>
          <View style={styles.avatar}>
            <AvatarIcon size={28} />
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.name} numberOfLines={1}>{displayName}</Text>
            <Text style={styles.sub}>
              {days} day{days === 1 ? '' : 's'} tracked · {money(total)} total
            </Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.acctTile} onPress={() => openSheet('account')}>
        <View style={styles.acctIc}>
          <MailIcon size={16} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.acctTitle}>Sign-in details</Text>
          <Text style={styles.acctSub} numberOfLines={1}>
            {state.email || 'Add email and password'}
          </Text>
        </View>
        <ChevronRightIcon size={14} />
      </Pressable>

      <Text style={styles.section}>Quick add</Text>
      <View style={styles.grid}>
        {CATS.map((c) => (
          <Pressable
            key={c}
            style={styles.tile}
            onPress={() => openSheet('add', { presetCat: c })}
          >
            <View style={styles.tileIc}>
              <CategoryIcon category={c} size={16} />
            </View>
            <Text style={styles.tileTitle}>{CAT_LABEL[c]}</Text>
            <Text style={styles.tileSub}>Tap to add</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.save} onPress={() => openSheet('add')}>
        <Text style={styles.saveText}>+ Add expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: 12 },
  title: { fontSize: 26, fontWeight: '800', letterSpacing: -0.8, marginTop: 4 },
  subTitle: { fontSize: 13.5, color: colors.muted, fontWeight: '500', marginTop: 4 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 18,
  },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 17, fontWeight: '900', letterSpacing: -0.4 },
  sub: { fontSize: 12, color: colors.muted, fontWeight: '600', marginTop: 2 },
  acctTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    ...shadows.soft,
  },
  acctIc: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acctTitle: { fontSize: 13.5, fontWeight: '800', letterSpacing: -0.1 },
  acctSub: { fontSize: 11, color: colors.muted, fontWeight: '600' },
  section: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.muted,
    marginTop: 6,
    marginBottom: 4,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: {
    width: '48%',
    backgroundColor: '#fff',
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    gap: 6,
    ...shadows.soft,
  },
  tileIc: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tileTitle: { fontSize: 13.5, fontWeight: '800', letterSpacing: -0.1 },
  tileSub: { fontSize: 11, color: colors.muted, fontWeight: '600' },
  save: {
    backgroundColor: '#000',
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 13.5 },
});
