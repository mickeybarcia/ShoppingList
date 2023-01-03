jest.mock('react-native-keyboard-aware-scroll-view');

jest.mock('firebase/auth/react-native', () => ({
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn()
}));
