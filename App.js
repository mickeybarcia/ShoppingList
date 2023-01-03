import React from 'react';
import { StyleSheet, View } from 'react-native';

import HomeWrapper from './components/HomeWrapper';
import AppContextProvider from './context/AppContextProvider';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { BACKGROUND_COLOR } from './AppStyles';

export default function App() {
  return (
    <View style={styles.container}>
      <AppContextProvider>
        <ErrorBoundary>
          <HomeWrapper />
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
