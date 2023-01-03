import React from 'react';
import { fireEvent, waitFor, screen, render } from '@testing-library/react-native';

import List from '../../components/List';

describe('List', () => {
    it('shows list name', () => {
        render(
          <List
            name={'my list'}
            items={[]}
            showLowOnly={false}
            onDeleteList={jest.fn()}
            onAddItem={jest.fn()}
            onDeleteItem={jest.fn()}
            onRenameList={jest.fn()}
            onMoveListDown={jest.fn()}
            onMoveListUp={jest.fn()}
            onSwitchItemStatus={jest.fn()}
          />
        );
        expect(screen.getByText('my list')).toBeDefined()
      });

  it('shows buttons when showLowOnly false', () => {
    render(
      <List
        name={'my list'}
        items={[]}
        showLowOnly={false}
        onDeleteList={jest.fn()}
        onAddItem={jest.fn()}
        onDeleteItem={jest.fn()}
        onRenameList={jest.fn()}
        onMoveListDown={jest.fn()}
        onMoveListUp={jest.fn()}
        onSwitchItemStatus={jest.fn()}
      />
    );
    waitFor(() => expect(screen.getByTestId('move-up')).toHaveStyle('visible'));
  });

  it('hides buttons when showLowOnly false', () => {
    render(
      <List
        name={'my list'}
        items={[]}
        showLowOnly={true}
        onDeleteList={jest.fn()}
        onAddItem={jest.fn()}
        onDeleteItem={jest.fn()}
        onRenameList={jest.fn()}
        onMoveListDown={jest.fn()}
        onMoveListUp={jest.fn()}
        onSwitchItemStatus={jest.fn()}
      />
    );
   waitFor(() => expect(screen.getByTestId('move-up')).toHaveStyle('hidden'));
  });

  it('toggles renaming list', () => {
    render(
      <List
        name={'my list'}
        items={[]}
        showLowOnly={false}
        onDeleteList={jest.fn()}
        onAddItem={jest.fn()}
        onDeleteItem={jest.fn()}
        onRenameList={jest.fn()}
        onMoveListDown={jest.fn()}
        onMoveListUp={jest.fn()}
        onSwitchItemStatus={jest.fn()}
      />
    );
    fireEvent.press(screen.getByTestId('list-name'))
    expect(screen.getByTestId('list-name-input')).toBeDefined();
  });

});