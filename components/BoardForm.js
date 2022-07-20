import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

import { WHITE_COLOR, AppStyles } from '../AppStyles';
import Button from './Button';

const BoardForm = ({ onCreateBoard, onLoadBoard, boards }) => {
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
      <Button
        onPress={() => onCreateBoard(boardName)}
        text={'create new board'}
        disabled={boardName === ''}
      />
      {boards && (
        <View style={{ marginTop: 30 }}>
          <Text style={AppStyles.title}>select from my boards</Text>
          {Object.entries(boards).map(([key, val], index) => {
            return (
              <View key={index}>
                <Button onPress={() => onLoadBoard(key)} text={val} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

BoardForm.propTypes = {
  onCreateBoard: PropTypes.func.isRequired,
  onLoadBoard: PropTypes.func.isRequired,
  boards: PropTypes.object
};

export default BoardForm;
