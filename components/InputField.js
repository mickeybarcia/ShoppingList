import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const ItemInputField = ({ onAddItem, placeholder }) => {
  const [item, setItem] = useState('');
  const textInput = useRef();

  const handleAddItem = (value) => {
    onAddItem(value);
    setItem('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        value={item}
        onChangeText={(text) => setItem(text)}
        placeholder={placeholder || 'new item'}
        placeholderTextColor={'#fff'}
        ref={textInput}
        returnKeyType="done"
        onSubmitEditing={() => {
          handleAddItem(item);
          textInput.current.focus();
        }}
        blurOnSubmit={false}
      />
      <TouchableOpacity onPress={() => handleAddItem(item)}>
        <View style={styles.button}>
          <MaterialIcons name="keyboard-arrow-up" size={18} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

ItemInputField.propTypes = {
  placeholder: PropTypes.string,
  onAddItem: PropTypes.func.isRequired
};

export default ItemInputField;

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    backgroundColor: '#3E3364',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    maxWidth: 400
  },
  inputField: {
    color: '#fff',
    height: 40,
    flex: 1
  },
  button: {
    height: 20,
    width: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
