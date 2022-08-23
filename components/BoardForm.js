import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { AppStyles } from '../AppStyles';
import BoardName from './BoardName';
import Form from './Form';

const BoardForm = ({ onCreateBoard, onLoadBoard, boardIds }) => {
  return (
    <View>
      <Form onComplete={onCreateBoard} buttonText={'create new board'} placeholder={'new board'} />
      {boardIds && (
        <View style={{ marginTop: 30 }}>
          <Text style={AppStyles.title}>select from my boards</Text>
          {boardIds.map((id, index) => {
            return <BoardName key={index} onLoadBoard={onLoadBoard} id={id} />;
          })}
        </View>
      )}
    </View>
  );
};

BoardForm.propTypes = {
  onCreateBoard: PropTypes.func.isRequired,
  onLoadBoard: PropTypes.func.isRequired,
  boardIds: PropTypes.array.isRequired
};

export default BoardForm;
