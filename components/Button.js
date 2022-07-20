import PropTypes from 'prop-types';
import { AppStyles } from '../AppStyles';
import { View, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text, disabled }) => {
  return (
    <View style={{ margin: 2 }}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text style={AppStyles.subHeading}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Button;
