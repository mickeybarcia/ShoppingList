import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { WHITE_COLOR, AppStyles } from '../AppStyles';

const BoardForm = ({ onLoadBoard }) => {
  const [boardName, setBoardName] = useState();

  return (
    <View>
      <View style={AppStyles.inputContainer}>
        <TextInput
          style={AppStyles.inputField}
          value={boardName}
          onChangeText={(text) => setBoardName(text)}
          placeholder={'board name'}
          placeholderTextColor={WHITE_COLOR}
          returnKeyType="done"
        />
      </View>
      <TouchableOpacity onPress={() => onLoadBoard(boardName)} disabled={boardName === ''}>
        <Text style={AppStyles.subHeading}>load board</Text>
      </TouchableOpacity>
    </View>
  );
};

BoardForm.propTypes = {
  onCreateBoard: PropTypes.func.isRequired,
  onLoadBoard: PropTypes.func.isRequired
};

export default BoardForm;
