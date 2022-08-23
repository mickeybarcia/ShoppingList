import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { onValue } from 'firebase/database';

import { getBoardNameRef } from '../Firebase';
import { AppStyles } from '../AppStyles';

const BoardName = ({ id, onLoadBoard }) => {
  const [boardName, setBoardName] = useState(null);

  const loadBoardName = async () => {
    const boardRef = getBoardNameRef(id);
    onValue(
      boardRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setBoardName(snapshot.val());
        }
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    loadBoardName();
  }, []);

  return (
    boardName && (
      <View style={AppStyles.listContainer}>
        <View style={AppStyles.itemContainer}>
          <Text style={AppStyles.item} onPress={() => onLoadBoard(id)}>
            {boardName}
          </Text>
        </View>
      </View>
    )
  );
};

BoardName.propTypes = {
  onLoadBoard: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default BoardName;
