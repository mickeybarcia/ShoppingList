import React from 'react';
import { View, Text, Switch, StyleSheet, Keyboard, Platform } from 'react-native';
import PropTypes from 'prop-types';

import ListComponent from './List';
import InputField from './shared/InputField';
import { AppStyles } from '../AppStyles';

const Item = (name, isLow = false) => {
  return { name, isLow };
};

const List = (name, items = []) => {
  return { name, items };
};

const Board = ({ lists, showLowOnly, onSwitchLowOnly, onUpdateLists }) => {

  const dismissKeyboard = () => Platform.OS != 'web' && Keyboard.dismiss();

  const addList = (listName) => {
    if (listName == '') return;
    const newLists = [...lists];
    newLists.push(List(listName));
    dismissKeyboard();
    onUpdateLists(newLists);
  };

  const deleteList = (listIndex) => {
    const newLists = lists.filter((_, index) => index != listIndex);
    onUpdateLists(newLists);
  };

  const addItem = (listIndex, itemName) => {
    if (itemName == '') return;
    const newLists = [...lists];
    newLists[listIndex].items = [...newLists[listIndex].items, Item(itemName)];
    dismissKeyboard();
    onUpdateLists(newLists);
  };

  const deleteItem = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items = newLists[listIndex].items.filter((_, index) => index != itemIndex);
    onUpdateLists(newLists);
  };

  const switchItemStatus = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items[itemIndex].isLow = !newLists[listIndex].items[itemIndex].isLow;
    onUpdateLists(newLists);
  };

  const renameList = (listIndex, newName) => {
    const newLists = [...lists];
    newLists[listIndex].name = newName;
    onUpdateLists(newLists);
  };

  const moveListUp = (listIndex) => {
    if (listIndex === 0) {
      const newLists = [...lists].slice(1, lists.length).concat(lists[0]);
      onUpdateLists(newLists);
    } else {
      const newLists = [...lists]
        .slice(0, listIndex - 1)
        .concat(lists[listIndex])
        .concat([...lists][listIndex - 1])
        .concat(lists.slice(listIndex + 1, lists.length));
      onUpdateLists(newLists);
    }
  };

  const moveListDown = (listIndex) => {
    if (listIndex === lists.length - 1) {
      const newLists = lists
        .slice(lists.length - 1, lists.length)
        .concat(lists.slice(0, lists.length - 1));
      onUpdateLists(newLists);
    } else {
      moveListUp(listIndex + 1);
    }
  };

  return (
    <View style={{ paddingBottom: 150 }}>
      <View>
        <Text style={AppStyles.subHeading}>show only low stock items</Text>
      </View>
      <Switch style={styles.switch} onValueChange={onSwitchLowOnly} value={showLowOnly} />
      {lists.map(({ name, items }, index) => {
        return (
          <View key={index}>
            <ListComponent
              index={index}
              name={name}
              items={items}
              showLowOnly={showLowOnly}
              onDeleteList={() => deleteList(index)}
              onAddItem={(itemName) => addItem(index, itemName)}
              onDeleteItem={(itemIndex) => deleteItem(index, itemIndex)}
              onSwitchItemStatus={(itemIndex) => switchItemStatus(index, itemIndex)}
              onRenameList={(name) => renameList(index, name)}
              onMoveListUp={() => moveListUp(index)}
              onMoveListDown={() => moveListDown(index)}
            />
          </View>
        );
      })}
      {!showLowOnly && (
        <InputField onAddItem={(listName) => addList(listName)} placeholder={'new list'} />
      )}
    </View>
  );
};

Board.propTypes = {
  lists: PropTypes.array.isRequired,
  showLowOnly: PropTypes.bool.isRequired,
  onSwitchLowOnly: PropTypes.func.isRequired,
  onUpdateLists: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  switch: {
    margin: 10
  }
});

export default Board;
