import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export default function Field({
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  label,
  rightSlot,
  autoCapitalize = 'none',
  autoCorrect = false,
  returnKeyType,
  onSubmitEditing,
  style,
}) {
  return (
    <View style={[styles.field, style]}>
      {icon}
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9a9a9a"
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
      {rightSlot}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.fieldBg,
    borderRadius: 18,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.fieldBorder,
  },
  input: {
    flex: 1,
    fontWeight: '700',
    fontSize: 13.5,
    color: '#000',
    padding: 0,
  },
  label: {
    fontWeight: '700',
    fontSize: 13.5,
    color: '#9a9a9a',
  },
});
