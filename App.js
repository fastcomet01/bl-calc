import React from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import { StoreProvider, useStore } from './src/store';
import { UIProvider, useUI } from './src/ui';
import { colors } from './src/theme';

import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import SheetHost from './src/components/SheetHost';
import Toast from './src/components/Toast';

import HomePage from './src/pages/HomePage';
import StatsPage from './src/pages/StatsPage';
import HistoryPage from './src/pages/HistoryPage';
import AccountPage from './src/pages/AccountPage';

const PAGE_COMPONENTS = {
  home: HomePage,
  stats: StatsPage,
  history: HistoryPage,
  account: AccountPage,
};

function Shell() {
  const insets = useSafeAreaInsets();
  const { ready } = useStore();
  const { toast, page, setPage } = useUI();
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [page]);

  if (!ready) return <View style={[styles.app, { backgroundColor: '#fff' }]} />;

  const Page = PAGE_COMPONENTS[page] || HomePage;

  return (
    <View style={[styles.app, { paddingTop: insets.top }]}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 100 + insets.bottom },
        ]}
      >
        <Header onAvatarPress={() => setPage('account')} />
        <Page />
      </ScrollView>
      <BottomNav
        active={page}
        onHome={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
      />
      <SheetHost />
      <Toast message={toast} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <UIProvider>
          <StatusBar style="dark" />
          <Shell />
        </UIProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 22, gap: 16 },
});
