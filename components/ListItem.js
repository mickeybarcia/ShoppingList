import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const ListItem = ({ item, onSwitchItemStatus, onDeleteItem }) => {
  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <TouchableOpacity onPress={onSwitchItemStatus}>
          {item.isLow && <MaterialIcons name="warning" size={18} color="#fff" />}
          {!item.isLow && <MaterialIcons name="check" size={18} color="#fff" />}
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.name}</Text>
        <TouchableOpacity onPress={onDeleteItem}>
          <MaterialIcons style={styles.delete} name="delete" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSwitchItemStatus: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  indexContainer: {
    backgroundColor: '#3E3364',
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  },
  itemContainer: {
    backgroundColor: '#3E3364',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 30
  },
  item: {
    color: '#fff',
    width: '90%',
    fontSize: 16
  },
  delete: {
    marginLeft: 10
  }
});
