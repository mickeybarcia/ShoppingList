import React from 'react';
import { StyleSheet, View } from 'react-native';

import Home from './components/Home';
import { AppContextProvider } from './app-context';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { BACKGROUND_COLOR } from './AppStyles';

export default function App() {
  return (
    <View style={styles.container}>
      <AppContextProvider>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </AppContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  }
});
