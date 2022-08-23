import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import ItemInputField from './shared/InputField';
import ListItem from './ListItem';
import { AppStyles, LIGHT_BACKGROUND_COLOR, WHITE_COLOR } from '../AppStyles';

const List = ({
  name,
  items,
  onAddItem,
  onDeleteList,
  onDeleteItem,
  onSwitchItemStatus,
  showLowOnly,
  onRenameList,
  onMoveListDown,
  onMoveListUp
}) => {
  const [newName, setNewListName] = useState(name);
  const [showRenameList, setShowRenameList] = useState(false);

  const renameList = (newName) => {
    setShowRenameList(false);
    newName !== name && onRenameList(newName);
  };

  const filteredItems = items.filter((item) => !showLowOnly || (showLowOnly && item.isLow));
  if (filteredItems.length == 0 && showLowOnly) return null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {!showRenameList && (
            <View style={styles.titleContainer}>
              <TouchableOpacity
                style={{ visibility: showLowOnly ? 'hidden' : 'shown' }}
                onPress={onMoveListUp}>
                <MaterialIcons name="arrow-upward" size={18} color={LIGHT_BACKGROUND_COLOR} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ visibility: showLowOnly ? 'hidden' : 'shown' }}
                onPress={onMoveListDown}>
                <MaterialIcons name="arrow-downward" size={18} color={LIGHT_BACKGROUND_COLOR} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setShowRenameList(true)}>
                <Text style={styles.heading}>{name}</Text>
              </TouchableOpacity>
            </View>
          )}
          {showRenameList && (
            <TextInput
              style={AppStyles.inputField}
              value={newName}
              autoFocus={true}
              onChangeText={(text) => setNewListName(text)}
              placeholder={'list name'}
              placeholderTextColor={WHITE_COLOR}
              returnKeyType="done"
            />
          )}
          {!showLowOnly && !showRenameList && (
            <TouchableOpacity onPress={() => onDeleteList()}>
              <MaterialIcons style={AppStyles.delete} name="delete" size={18} color="white" />
            </TouchableOpacity>
          )}
          {showRenameList && (
            <TouchableOpacity onPress={() => renameList(newName)} style={{ paddingLeft: 10 }}>
              <Text style={AppStyles.subHeading}>{'done'}</Text>
            </TouchableOpacity>
          )}
        </View>
        {items.map((item, index) => {
          return (
            <View key={index}>
              <ListItem
                index={index}
                item={item}
                showLowOnly={showLowOnly}
                onDeleteItem={() => onDeleteItem(index)}
                onSwitchItemStatus={() => onSwitchItemStatus(index)}
              />
            </View>
          );
        })}
        {!showLowOnly && <ItemInputField onAddItem={onAddItem} />}
      </View>
    </ScrollView>
  );
};

export default List;

List.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  showLowOnly: PropTypes.bool.isRequired,
  onDeleteList: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onRenameList: PropTypes.func.isRequired,
  onMoveListDown: PropTypes.func.isRequired,
  onMoveListUp: PropTypes.func.isRequired,
  onSwitchItemStatus: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    maxWidth: 350
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heading: {
    color: WHITE_COLOR,
    fontSize: 20,
    fontWeight: '500'
  }
});
