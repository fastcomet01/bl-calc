import React, { useRef, useState } from 'react';
import { View, Text, Pressable, PanResponder, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { useUI } from '../ui';

const pad2 = (n) => String(n).padStart(2, '0');

const fmtPreview = (h, m) => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

function Slider({ value, onChange, min = 0, max = 100 }) {
  const widthRef = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const updateFromX = (x) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const ratio = Math.max(0, Math.min(1, x / w));
    const v = Math.round(min + ratio * (max - min));
    onChangeRef.current(v);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => updateFromX(e.nativeEvent.locationX),
      onPanResponderMove: (e) => updateFromX(e.nativeEvent.locationX),
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  const range = max - min;
  const percent = range > 0 ? ((value - min) / range) * 100 : 0;

  return (
    <View
      onLayout={(e) => {
        widthRef.current = e.nativeEvent.layout.width;
      }}
      style={styles.track}
      hitSlop={{ top: 16, bottom: 16, left: 8, right: 8 }}
      {...panResponder.panHandlers}
    >
      <View style={styles.trackBg} />
      <View style={[styles.trackFill, { width: `${percent}%` }]} />
      <View
        pointerEvents="none"
        style={[styles.thumb, { left: `${percent}%` }]}
      />
    </View>
  );
}

export default function TimePickerSheet({ initial, onPick }) {
  const { closeSheet } = useUI();
  const now = new Date();
  const [h, setH] = useState(initial?.h ?? now.getHours());
  const [m, setM] = useState(initial?.min ?? now.getMinutes());

  const setPreset = (mins) => {
    const d = new Date(Date.now() - mins * 60000);
    setH(d.getHours());
    setM(d.getMinutes());
  };

  const save = () => {
    onPick && onPick({ h, min: m, str: `${pad2(h)}:${pad2(m)}` });
    closeSheet();
  };

  const presets = [
    { label: 'Now', mins: 0 },
    { label: '15m ago', mins: 15 },
    { label: '30m ago', mins: 30 },
    { label: '1h ago', mins: 60 },
    { label: '2h ago', mins: 120 },
  ];

  return (
    <View>
      <Text style={styles.preview}>{fmtPreview(h, m)}</Text>

      <View style={styles.row}>
        <View style={styles.rowHead}>
          <Text style={styles.rowLabel}>Hours</Text>
          <Text style={styles.rowVal}>{pad2(h)}</Text>
        </View>
        <Slider value={h} onChange={setH} min={0} max={23} />
      </View>

      <View style={styles.row}>
        <View style={styles.rowHead}>
          <Text style={styles.rowLabel}>Minutes</Text>
          <Text style={styles.rowVal}>{pad2(m)}</Text>
        </View>
        <Slider value={m} onChange={setM} min={0} max={59} />
      </View>

      <View style={styles.presets}>
        {presets.map((p) => (
          <Pressable
            key={p.label}
            onPress={() => setPreset(p.mins)}
            style={({ pressed }) => [styles.preset, pressed && { backgroundColor: '#000' }]}
          >
            {({ pressed }) => (
              <Text style={[styles.presetText, pressed && { color: '#fff' }]}>{p.label}</Text>
            )}
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={save}
        style={({ pressed }) => [styles.save, pressed && { transform: [{ scale: 0.98 }] }]}
      >
        <Text style={styles.saveText}>Save time</Text>
      </Pressable>
    </View>
  );
}

const THUMB = 24;

const styles = StyleSheet.create({
  preview: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
    color: colors.ink,
    marginVertical: 8,
  },
  row: {
    backgroundColor: colors.fieldBg,
    borderColor: colors.fieldBorder,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  rowHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.muted,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  rowVal: { fontSize: 18, fontWeight: '900', letterSpacing: -0.4, color: '#000' },
  track: {
    height: 24,
    justifyContent: 'center',
    position: 'relative',
  },
  trackBg: {
    height: 8,
    backgroundColor: '#e8e8e8',
    borderRadius: 999,
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: '#000',
    borderWidth: 3,
    borderColor: '#fff',
    top: (24 - THUMB) / 2,
    marginLeft: -THUMB / 2,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
    marginBottom: 14,
  },
  preset: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 13,
  },
  presetText: { fontSize: 12, fontWeight: '800', color: '#000' },
  save: {
    backgroundColor: '#000',
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 13.5 },
});
