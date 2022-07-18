import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Button from './Button';
import { AppStyles, WHITE_COLOR } from '../AppStyles';

const SignInForm = ({ onSignIn }) => {
  const [email, setEmail] = useState('mickeydbarcia@gmail.com');

  return (
    <View>
      <View style={AppStyles.inputContainer}>
        <TextInput
          style={AppStyles.inputField}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder={'huggy@wuggy.com'}
          placeholderTextColor={WHITE_COLOR}
          returnKeyType="done"
        />
      </View>
      <Button
        onPress={() => onSignIn(email)}
        text={'sign in / sign up'}
        disabled={email === ''}
      />
    </View>
  );
};

SignInForm.propTypes = {
  onSignIn: PropTypes.func.isRequired
};

export default SignInForm;
