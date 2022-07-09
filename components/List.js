import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import ItemInputField from './InputField';
import ListItem from './ListItem';

const List = ({
  name,
  items,
  onAddItem,
  onDeleteList,
  onDeleteItem,
  onSwitchItemStatus,
  showLowOnly
}) => {
  const filteredItems = items.filter((item) => !showLowOnly || (showLowOnly && item.isLow));
  if (filteredItems.length == 0 && showLowOnly) return null;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>{name}</Text>
          {!showLowOnly && (
            <TouchableOpacity onPress={onDeleteList}>
              <MaterialIcons style={styles.delete} name="delete" size={18} color="#fff" />
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
  onSwitchItemStatus: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
    margin: 20,
    maxWidth: 350
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500'
  },
  delete: {
    marginLeft: 10
  }
});
