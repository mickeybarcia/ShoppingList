import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { AppStyles, WHITE_COLOR } from '../AppStyles';

const SignInForm = ({ onSignIn }) => {
  const [email, setEmail] = useState();

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
      <TouchableOpacity onPress={() => onSignIn(email)} disabled={email === ''}>
        <Text style={AppStyles.subHeading}>sign in / sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

SignInForm.propTypes = {
    onSignIn: PropTypes.func.isRequired,
};

export default SignInForm;
