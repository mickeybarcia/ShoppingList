import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { BACKGROUND_COLOR, WHITE_COLOR } from '../../AppStyles';

const Button = ({ onPress, text, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.indexContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

const styles = StyleSheet.create({
  indexContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingRight: 10,
    paddingLeft: 10,
    margin: 5
  },
  text: {
    color: BACKGROUND_COLOR,
    fontSize: 18,
    fontWeight: '400'
  }
});

export default Button;
