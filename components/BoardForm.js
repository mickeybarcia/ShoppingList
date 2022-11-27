import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { AppStyles } from '../AppStyles';
import BoardName from './BoardName';
import Form from './Form';
import { useAppContext } from '../app-context';

const BoardForm = ({ createBoard }) => {
  const { boardIds } = useAppContext();
  return (
    <View>
      <Form onComplete={createBoard} buttonText={'create new board'} placeholder={'new board'} />
      {boardIds && (
        <View style={{ marginTop: 30 }}>
          <Text style={AppStyles.title}>select from my boards</Text>
          {boardIds.map((id, index) => {
            return <BoardName key={index} id={id} />;
          })}
        </View>
      )}
    </View>
  );
};

BoardForm.propTypes = {
  createBoard: PropTypes.func.isRequired
};

export default BoardForm;
