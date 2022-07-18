import { StyleSheet } from 'react-native';

const WHITE_COLOR = '#fff';
const LIGHT_BACKGROUND_COLOR = '#3E3364';

const AppStyles = StyleSheet.create({
  inputField: {
    color: WHITE_COLOR,
    height: 40,
    flex: 1
  },
  inputContainer: {
    borderColor: WHITE_COLOR,
    backgroundColor: LIGHT_BACKGROUND_COLOR,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    height: 40,
    maxWidth: 400,
    marginBottom: 20
  },
  subHeading: {
    color: WHITE_COLOR,
    fontSize: 15,
    fontWeight: '400'
  }
});

export { WHITE_COLOR, LIGHT_BACKGROUND_COLOR, AppStyles };
