import React from 'react';
import { fireEvent, waitFor, screen, render } from '@testing-library/react-native';

import ListItem from '../../components/ListItem';

describe('ListItem', () => {
    it('shows list item', () => {
        render(
          <ListItem
            item={{name: 'item name', isLow: false}}
            onSwitchItemStatus={jest.fn()}
            onDeleteItem={jest.fn()}
            showLowOnly={false}
          />
        );
        expect(screen.getByText('item name')).toBeDefined()
    });

    it('hides list item', () => {
        render(
          <ListItem
            item={{name: 'item name', isLow: false}}
            onSwitchItemStatus={jest.fn()}
            onDeleteItem={jest.fn()}
            showLowOnly={true}
          />
        );
        expect(screen.queryByText('item name')).toBeNull()
    });
})