import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useStore } from '../store';
import { useUI } from '../ui';
import { colors } from '../theme';
import { parseAmount, money } from '../utils';

const PRESETS = [50, 100, 200, 500];

export default function BudgetSheet() {
  const { state, setBudget } = useStore();
  const { closeSheet, showToast } = useUI();
  const [val, setVal] = useState(
    Number.isInteger(state.budget) ? String(state.budget) : state.budget.toFixed(2),
  );

  const save = () => {
    const v = parseAmount(val);
    if (!(v > 0)) { showToast('Enter a valid amount'); return; }
    setBudget(v);
    closeSheet();
    showToast('Budget set to ' + money(v));
  };

  return (
    <View>
      <Text style={styles.intro}>How much can you spend each day?</Text>
      <View style={styles.bigField}>
        <Text style={styles.dollar}>$</Text>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="0"
          placeholderTextColor="#9a9a9a"
          keyboardType="decimal-pad"
          autoFocus
          style={styles.bigInput}
        />
      </View>
      <View style={styles.presetRow}>
        {PRESETS.map((p) => (
          <Pressable key={p} style={styles.preset} onPress={() => setVal(String(p))}>
            <Text style={styles.presetText}>${p}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.save} onPress={save}>
        <Text style={styles.saveText}>Save budget</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.muted, fontSize: 12.5, fontWeight: '600', marginBottom: 12 },
  bigField: {
    backgroundColor: colors.fieldBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.fieldBorder,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dollar: { fontSize: 32, fontWeight: '900', color: colors.muted },
  bigInput: { flex: 1, fontSize: 32, fontWeight: '900', letterSpacing: -1, padding: 0 },
  presetRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
  preset: {
    backgroundColor: colors.chip,
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 13,
  },
  presetText: { fontWeight: '800', fontSize: 12, color: '#000' },
  save: {
    backgroundColor: '#000',
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 13.5 },
});
