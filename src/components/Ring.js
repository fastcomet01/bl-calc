import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SIZE = 56;
const STROKE = 7;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

export default function Ring({ percent = 0 }) {
  const dash = C * Math.min(100, Math.max(0, percent)) / 100;
  return (
    <View style={styles.wrap}>
      <View style={styles.ringCell}>
        <Svg width={SIZE} height={SIZE} style={styles.svg}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="#ececec"
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="#000"
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={`${dash} ${C - dash}`}
            strokeDashoffset={C / 4}
            strokeLinecap="butt"
          />
        </Svg>
        <Text style={styles.pct}>{percent}%</Text>
      </View>
      <Text style={styles.cap}>used</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 4 },
  ringCell: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: { position: 'absolute', transform: [{ rotate: '-90deg' }] },
  pct: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: -0.1,
  },
  cap: {
    fontSize: 10,
    color: '#6b6b6b',
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
