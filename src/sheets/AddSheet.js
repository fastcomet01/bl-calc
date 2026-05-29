import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useStore } from '../store';
import { useUI } from '../ui';
import { CATS, CAT_LABEL } from '../constants';
import { CategoryIcon, TextLinesIcon } from '../icons';
import { colors } from '../theme';
import { parseAmount, tsFromTime } from '../utils';
import Field from '../components/Field';

const fmtPicked = (p) => {
  const d = new Date();
  d.setHours(p.h, p.min, 0, 0);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export default function AddSheet({ presetCat }) {
  const { state, setCat, addExpense } = useStore();
  const { closeSheet, showToast, openSheet } = useUI();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [picked, setPicked] = useState(null);

  React.useEffect(() => {
    if (presetCat && CAT_LABEL[presetCat]) setCat(presetCat);
  }, [presetCat, setCat]);

  const commit = () => {
    const v = parseAmount(amount);
    if (!(v > 0)) { showToast('Enter an amount'); return; }
    const trimmed = name.trim();
    if (state.cat === 'other' && !trimmed) { showToast('Describe this expense'); return; }
    addExpense({
      amount: v,
      name: trimmed || CAT_LABEL[state.cat],
      category: state.cat,
      ts: tsFromTime(picked ? picked.str : ''),
    });
    closeSheet();
    showToast('Added $' + v.toFixed(2));
  };

  const openTimePicker = () => {
    openSheet('timepicker', {
      initial: picked,
      onPick: (val) => setPicked(val),
    });
  };

  const isSet = !!picked;

  return (
    <View>
      <Text style={styles.intro}>Log a new expense in seconds.</Text>
      <View style={styles.bigField}>
        <Text style={styles.dollar}>$</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          placeholderTextColor="#9a9a9a"
          keyboardType="decimal-pad"
          autoFocus
          style={styles.bigInput}
        />
      </View>
      <Field
        icon={<TextLinesIcon size={16} />}
        value={name}
        onChangeText={setName}
        placeholder={state.cat === 'other' ? 'What is this expense?' : 'Expense name'}
        autoCapitalize="sentences"
        style={{ marginBottom: 10 }}
      />
      <Pressable
        onPress={openTimePicker}
        style={({ pressed }) => [
          styles.timeBtn,
          isSet && styles.timeBtnSet,
          pressed && { transform: [{ scale: 0.985 }] },
        ]}
      >
        <Text style={[styles.timeBtnLabel, isSet && styles.timeBtnLabelSet]}>
          {isSet ? fmtPicked(picked) : 'Choose time'}
        </Text>
        {isSet ? (
          <Pressable
            onPress={() => setPicked(null)}
            hitSlop={10}
            style={styles.clear}
          >
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        ) : null}
      </Pressable>
      <View style={styles.chips}>
        {CATS.map((c) => {
          const active = c === state.cat;
          return (
            <Pressable
              key={c}
              onPress={() => setCat(c)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <CategoryIcon category={c} size={13} color={active ? '#fff' : '#000'} />
              <Text style={[styles.chipText, active && { color: '#fff' }]}>{CAT_LABEL[c]}</Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.save} onPress={commit}>
        <Text style={styles.saveText}>Save expense</Text>
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
  bigInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
    padding: 0,
  },
  timeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  timeBtnSet: { backgroundColor: '#fff', borderColor: '#000' },
  timeBtnLabel: { fontSize: 13.5, fontWeight: '800', color: '#6b6b6b', letterSpacing: -0.2 },
  timeBtnLabelSet: { color: '#000', fontWeight: '900' },
  clear: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#f2f2f2',
    borderColor: '#ececec',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: { fontSize: 16, fontWeight: '800', color: '#000', lineHeight: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.chip,
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chipActive: { backgroundColor: '#000', borderColor: '#000' },
  chipText: { fontSize: 12, fontWeight: '700', color: '#000' },
  save: {
    backgroundColor: '#000',
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 13.5 },
});
