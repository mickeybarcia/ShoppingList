import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { WHITE_COLOR, AppStyles } from '../AppStyles';
import Button from './Button';

const BoardForm = ({ onLoadBoard }) => {
  const [boardName, setBoardName] = useState();
  const [boards, setBoards] = useState([])

  // const loadBoards = async () => {

  // }

  // useEffect(() => {
  //   loadBoards();
  // }, []);

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
        onPress={() => onLoadBoard(boardName)}
        text={'create new board'}
        disabled={boardName === ''}
      />
      {
        boards.map((boardName, index) => {
          return (
            <View key={index}>
              <Button
                onPress={() => onLoadBoard(boardName)}
                text={boardName}
              />
            </View>
          )
        })
      }
    </View>
  );
};

BoardForm.propTypes = {
  onLoadBoard: PropTypes.func.isRequired
};

export default BoardForm;
