import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, shadows } from '../theme';
import { DollarIcon, TextLinesIcon } from '../icons';
import { useStore } from '../store';
import { useUI } from '../ui';
import { parseAmount, tsFromTime } from '../utils';
import { CAT_LABEL } from '../constants';
import Field from './Field';

const fmtPicked = (p) => {
  const d = new Date();
  d.setHours(p.h, p.min, 0, 0);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export default function InputsCard() {
  const { state, addExpense } = useStore();
  const { showToast, openSheet } = useUI();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [picked, setPicked] = useState(null);

  const amt = parseAmount(amount);
  const canAdd = amt > 0;

  const onAdd = () => {
    if (!(amt > 0)) { showToast('Enter an amount'); return; }
    const trimmed = name.trim();
    if (state.cat === 'other' && !trimmed) { showToast('Describe this expense'); return; }
    addExpense({
      amount: amt,
      name: trimmed || CAT_LABEL[state.cat],
      category: state.cat,
      ts: tsFromTime(picked ? picked.str : ''),
    });
    setAmount('');
    setName('');
    setPicked(null);
    showToast('Added $' + amt.toFixed(2));
  };

  const openTimePicker = () => {
    openSheet('timepicker', {
      initial: picked,
      onPick: (val) => setPicked(val),
    });
  };

  const isSet = !!picked;

  return (
    <View style={styles.card}>
      <Field
        icon={<DollarIcon size={16} />}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="decimal-pad"
      />
      <Field
        icon={<TextLinesIcon size={16} />}
        value={name}
        onChangeText={setName}
        placeholder={state.cat === 'other' ? 'What is this expense?' : 'Expense name'}
        autoCapitalize="sentences"
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
      <Pressable
        onPress={onAdd}
        disabled={!canAdd}
        style={({ pressed }) => [
          styles.btn,
          !canAdd && styles.btnDisabled,
          pressed && canAdd && { transform: [{ scale: 0.98 }] },
        ]}
      >
        <Text style={styles.btnText}>Add expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    gap: 10,
    ...shadows.soft,
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
  btn: {
    backgroundColor: '#000',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.1 },
});
