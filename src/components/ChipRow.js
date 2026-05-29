import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { CATS, CAT_LABEL } from '../constants';
import { CategoryIcon } from '../icons';
import { money } from '../utils';
import { colors } from '../theme';

export default function ChipRow({ activeCat, onSelect, catSums }) {
  return (
    <View style={styles.row}>
      {CATS.map((c) => {
        const active = c === activeCat;
        const amt = catSums?.[c] || 0;
        return (
          <Pressable
            key={c}
            onPress={() => onSelect(c)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <CategoryIcon category={c} size={13} color={active ? '#fff' : '#000'} />
            <Text style={[styles.chipText, active && styles.chipTextActive]} numberOfLines={1}>
              {CAT_LABEL[c]}
            </Text>
            {amt > 0 ? (
              <Text style={[styles.chipAmt, active && styles.chipAmtActive]} numberOfLines={1}>
                {money(amt)}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: colors.chip,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  chipActive: { backgroundColor: '#000', borderColor: '#000' },
  chipText: { fontSize: 12, fontWeight: '700', color: '#000' },
  chipTextActive: { color: '#fff' },
  chipAmt: {
    marginLeft: 2,
    fontWeight: '800',
    color: colors.muted,
    fontSize: 11.5,
  },
  chipAmtActive: { color: '#fff' },
});
