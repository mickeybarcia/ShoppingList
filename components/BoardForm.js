import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const BoardForm = ({ onLoadBoard, onCreateBoard }) => {
  const [boardName, setBoardName] = useState();

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={boardName}
          onChangeText={(text) => setBoardName(text)}
          placeholder={'board name'}
          placeholderTextColor={'#fff'}
          returnKeyType="done"
        />
      </View>
      <TouchableOpacity onPress={() => onLoadBoard(boardName)} disabled={boardName === ''}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>load board</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onCreateBoard(boardName)} disabled={boardName === ''}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>save board</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

BoardForm.propTypes = {
  onCreateBoard: PropTypes.func.isRequired,
  onLoadBoard: PropTypes.func.isRequired
};

export default BoardForm;

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  },
  inputContainer: {
    borderColor: '#fff',
    backgroundColor: '#3E3364',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    margin: 10,
    height: 40,
    maxWidth: 400,
    marginBottom: 20
  },
  buttonContainer: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    margin: 10,
    height: 40,
    maxWidth: 200,
    alignItems: 'center'
  },
  inputField: {
    color: '#fff',
    height: 40,
    flex: 1
  }
});
