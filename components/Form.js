import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Button from './shared/Button';
import { AppStyles, WHITE_COLOR } from '../AppStyles';

const Form = ({ onComplete, buttonText, initialValue, placeholder }) => {
  const [text, setText] = useState(initialValue || '');

  return (
    <View>
      <View style={AppStyles.inputContainer}>
        <TextInput
          style={AppStyles.inputField}
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder={placeholder || ''}
          placeholderTextColor={WHITE_COLOR}
          returnKeyType="done"
        />
      </View>
      <Button onPress={() => onComplete(text)} text={buttonText} disabled={text === ''} />
    </View>
  );
};

Form.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onComplete: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default Form;
