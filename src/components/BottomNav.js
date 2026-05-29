import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { HomeIcon, StatsIcon, AddCircleIcon, HistoryClockIcon, ProfileIcon } from '../icons';
import { useUI } from '../ui';

export default function BottomNav({ active = 'home', onHome }) {
  const { openSheet, closeSheet, setPage } = useUI();

  const tabs = [
    {
      key: 'home',
      icon: HomeIcon,
      onPress: () => {
        closeSheet();
        if (active === 'home') {
          onHome && onHome();
        } else {
          setPage('home');
        }
      },
    },
    { key: 'stats',   icon: StatsIcon,         onPress: () => setPage('stats') },
    { key: 'add',     icon: AddCircleIcon,     onPress: () => openSheet('add') },
    { key: 'history', icon: HistoryClockIcon,  onPress: () => setPage('history') },
    { key: 'account', icon: ProfileIcon,       onPress: () => setPage('account') },
  ];

  return (
    <View style={styles.nav}>
      {tabs.map(({ key, icon: Icon, onPress }) => {
        const isActive = key === active;
        return (
          <Pressable
            key={key}
            onPress={onPress}
            style={[styles.btn, isActive && styles.btnActive]}
          >
            <Icon size={key === 'add' ? 22 : 20} color={isActive ? '#000' : '#9b9b9b'} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
    backgroundColor: '#000',
    borderRadius: 999,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: { backgroundColor: '#fff' },
});
