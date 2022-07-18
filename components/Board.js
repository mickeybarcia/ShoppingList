import React from 'react';
import { ScrollView, View, Text, Switch, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import ListComponent from './List';
import InputField from './InputField';
import { AppStyles } from '../AppStyles';

const Item = (name, isLow = false) => {
  return { name, isLow };
};

const List = (name, items = []) => {
  return { name, items };
};

const Board = ({ lists, showLowOnly, onSwitchLowOnly, onUpdateLists }) => {
  const addList = (listName) => {
    if (listName == '') return;
    const newLists = [...lists];
    newLists.push(List(listName));
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

  return (
    <View>
      <ScrollView>
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
              />
            </View>
          );
        })}
        {!showLowOnly && (
          <InputField onAddItem={(listName) => addList(listName)} placeholder={'new list'} />
        )}
      </ScrollView>
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
