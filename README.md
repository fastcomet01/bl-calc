# Expense Tracker (Expo / React Native)

Cross-platform iOS + Android build of the expense tracker, written in React Native via Expo.

## Setup

```bash
npm install
```

If you don't have Node.js, install it first (e.g. via [nvm](https://github.com/nvm-sh/nvm) or `brew install node`).

## Run

```bash
npx expo start
```

Then:
- Press **i** to open the iOS simulator (requires Xcode on macOS)
- Press **a** to open the Android emulator (requires Android Studio)
- Or scan the QR code with the **Expo Go** app on your phone

## Project structure

```
App.js                       # Root: providers + Home screen layout
index.js                     # Expo entry
src/
  store.js                   # Expense state + AsyncStorage persistence
  ui.js                      # Sheet/toast UI context
  constants.js               # Categories, default state, storage key
  utils.js                   # money/parse/date helpers
  theme.js                   # Colors, radii, shadows
  icons.js                   # All SVG icons (react-native-svg)
  components/
    Header.js                # Brand row + avatar (opens Profile)
    TodayCard.js             # Today's total, "See all" link, ring, chips
    Ring.js                  # Progress ring (used-of-budget %)
    ChipRow.js               # Category chips with per-cat amounts
    Field.js                 # Reusable text field
    InputsCard.js            # Amount / name / time + Add button
    MiniGrid.js              # Daily Budget + Expense History tiles
    BottomNav.js             # Floating pill nav (home/stats/add/history/profile)
    Sheet.js                 # Animated slide-up modal
    SheetHost.js             # Switches between sheet bodies
    Toast.js                 # Bottom toast notification
  sheets/
    AddSheet.js              # Add expense (big amount field + chips)
    BudgetSheet.js           # Set daily budget
    HistorySheet.js          # Full expense list, delete, clear-all
    StatsSheet.js            # Today's per-category bars
    ProfileSheet.js          # Avatar, account row, quick-add tiles
    AccountSheet.js          # Email + password (saved locally)
```

## Notes

- State persists via `AsyncStorage` (key `expense.app.v3`).
- The Account sheet stores email/password in plaintext on-device. No backend, no hashing — fine for a personal local app; don't reuse a sensitive password.
- The fake phone frame, status bar, and home indicator from the original web mock are gone — on a real device the OS handles that.
- Time input is a free-text `HH:MM` field rather than a native picker, to keep it dependency-free. Swap in `@react-native-community/datetimepicker` if you want a native picker.

## Build & distribute

Use [EAS Build](https://docs.expo.dev/build/introduction/) to produce signed iOS/Android binaries:

```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```
