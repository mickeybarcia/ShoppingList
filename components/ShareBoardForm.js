import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { WHITE_COLOR, AppStyles } from '../AppStyles';
import Button from './Button';

const ShareBoardForm = ({ onShareBoard }) => {
  const [email, setEmail] = useState('');
  return (
    <View>
      <View style={AppStyles.inputContainer}>
        <TextInput
          style={AppStyles.inputField}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder={'email'}
          placeholderTextColor={WHITE_COLOR}
          returnKeyType="done"
        />
      </View>
      <Button
        onPress={() => onShareBoard(email)}
        text={'add email to board'}
        disabled={email === ''}
      />
    </View>
  );
};

ShareBoardForm.propTypes = {
  onShareBoard: PropTypes.func.isRequired
};

export default ShareBoardForm;
