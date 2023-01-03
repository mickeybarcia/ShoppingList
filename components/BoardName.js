import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import { AppStyles } from '../AppStyles';
import useAppContext from '../context/useAppContext';

const BoardName = ({ id }) => {
  const [boardName, setBoardName] = useState(null);
  const { loadBoardName, setBoardIdCtx } = useAppContext();

  useEffect(() => {
    loadBoardName(id, setBoardName, (error) => console.log(error));
  }, []);

  return (
    boardName && (
      <View style={AppStyles.listContainer}>
        <View style={AppStyles.itemContainer}>
          <Text style={AppStyles.item} onPress={() => setBoardIdCtx(id)}>
            {boardName}
          </Text>
        </View>
      </View>
    )
  );
};

BoardName.propTypes = {
  id: PropTypes.string.isRequired
};

export default BoardName;
