import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { useUI } from '../ui';
import { MailIcon, LockIcon } from '../icons';
import { colors } from '../theme';
import { isValidEmail } from '../utils';
import Field from '../components/Field';

export default function AccountSheet() {
  const { state, setAccount, clearAccount } = useStore();
  const { closeSheet, showToast } = useUI();
  const [email, setEmail] = useState(state.email || '');
  const [password, setPassword] = useState(state.password || '');
  const [show, setShow] = useState(false);

  const commit = () => {
    const e = email.trim();
    if (e && !isValidEmail(e)) { showToast('Enter a valid email'); return; }
    setAccount({ email: e, password });
    closeSheet();
    showToast('Account saved');
  };

  const onClear = () => {
    clearAccount();
    closeSheet();
    showToast('Account cleared');
  };

  return (
    <View>
      <Text style={styles.intro}>Your sign-in details. Saved locally on this device.</Text>
      <Field
        icon={<MailIcon size={16} />}
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        keyboardType="email-address"
        style={{ marginBottom: 10 }}
      />
      <Field
        icon={<LockIcon size={16} />}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={!show}
        style={{ marginBottom: 14 }}
        rightSlot={
          <Pressable onPress={() => setShow((v) => !v)}>
            <Text style={styles.toggle}>{show ? 'Hide' : 'Show'}</Text>
          </Pressable>
        }
      />
      <Pressable style={styles.save} onPress={commit}>
        <Text style={styles.saveText}>Save account</Text>
      </Pressable>
      {(state.email || state.password) ? (
        <Pressable style={styles.ghost} onPress={onClear}>
          <Text style={styles.ghostText}>Clear account</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.muted, fontSize: 12.5, fontWeight: '600', marginBottom: 12 },
  toggle: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  save: {
    backgroundColor: '#000',
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 13.5 },
  ghost: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 11,
    alignItems: 'center',
  },
  ghostText: { fontWeight: '800', fontSize: 13, color: '#000' },
});
