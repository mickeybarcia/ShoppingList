/* eslint-disable react/prop-types */

import { TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Platform.OS != 'web' && Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default HideKeyboard;