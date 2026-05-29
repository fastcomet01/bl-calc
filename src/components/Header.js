import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { AvatarIcon, BrandIcon } from '../icons';

export default function Header({ onAvatarPress }) {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <View style={styles.brandMark}>
          <BrandIcon size={16} color="#fff" />
        </View>
        <Text style={styles.brandText}>
          expense<Text style={styles.dot}>.</Text>
        </Text>
      </View>
      <Pressable onPress={onAvatarPress} style={styles.avatar}>
        <AvatarIcon size={18} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: {
    width: 32,
    height: 32,
    backgroundColor: '#000',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: -0.4,
    color: colors.ink,
  },
  dot: { color: colors.muted },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
