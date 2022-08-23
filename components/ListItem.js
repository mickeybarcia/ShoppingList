import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { AppStyles, LIGHT_BACKGROUND_COLOR } from '../AppStyles';

const ListItem = ({ item, onSwitchItemStatus, onDeleteItem, showLowOnly }) => {
  const show = !showLowOnly || (showLowOnly && item.isLow);
  return (
    show && (
      <View style={AppStyles.listContainer}>
        <View style={styles.indexContainer}>
          <TouchableOpacity onPress={onSwitchItemStatus}>
            {item.isLow && <MaterialIcons name="warning" size={18} color="white" />}
            {!item.isLow && <MaterialIcons name="check" size={18} color="white" />}
          </TouchableOpacity>
        </View>
        <View style={AppStyles.itemContainer}>
          <Text style={AppStyles.item}>{item.name}</Text>
          <TouchableOpacity onPress={onDeleteItem}>
            <MaterialIcons style={AppStyles.delete} name="delete" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default ListItem;

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSwitchItemStatus: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  showLowOnly: PropTypes.bool
};

const styles = StyleSheet.create({
  indexContainer: {
    backgroundColor: LIGHT_BACKGROUND_COLOR,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  }
});
