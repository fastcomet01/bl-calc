import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import TodayCard from '../components/TodayCard';
import InputsCard from '../components/InputsCard';
import MiniGrid from '../components/MiniGrid';
import { colors } from '../theme';

export default function HomePage() {
  return (
    <View style={styles.page}>
      <Text style={styles.heroSub}>Track what you spend. Know what's left.</Text>
      <TodayCard />
      <InputsCard />
      <MiniGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: 16 },
  heroSub: {
    fontSize: 13.5,
    color: colors.muted,
    fontWeight: '500',
    paddingHorizontal: 2,
    marginTop: -4,
  },
});
