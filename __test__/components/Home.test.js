import React from 'react';
import { screen, render } from '@testing-library/react-native';

import Home from '../../components/Home';

describe('Home', () => {
  it('shows title when not logged in', () => {
    render(
      <Home
        loadBoard={jest.fn()}
        loadHome={jest.fn()}
        loadBoards={jest.fn()}
        emailSignInLink={jest.fn()}
        renameBoard={jest.fn()}
        createBoard={jest.fn()}
        resetBoard={jest.fn()}
        shareBoard={jest.fn()}
        updateLists={jest.fn()}
        deleteBoard={jest.fn()}
        logout={jest.fn()}
      />
    );
    expect(screen.getByText("mickey's shopping list")).toBeDefined();
  });

  it('shows title when no board selected', () => {
    render(
      <Home
        user={{ email: 'email' }}
        loadBoard={jest.fn()}
        loadHome={jest.fn()}
        loadBoards={jest.fn()}
        emailSignInLink={jest.fn()}
        renameBoard={jest.fn()}
        createBoard={jest.fn()}
        resetBoard={jest.fn()}
        shareBoard={jest.fn()}
        updateLists={jest.fn()}
        deleteBoard={jest.fn()}
        logout={jest.fn()}
      />
    );
    expect(screen.getByText("mickey's shopping list")).toBeDefined();
  });

  it('does not show title when board selected', () => {
    render(
      <Home
        user={{ email: 'email' }}
        boardId={'123'}
        boardName={'name'}
        loadBoard={jest.fn()}
        loadHome={jest.fn()}
        loadBoards={jest.fn()}
        emailSignInLink={jest.fn()}
        renameBoard={jest.fn()}
        createBoard={jest.fn()}
        resetBoard={jest.fn()}
        shareBoard={jest.fn()}
        updateLists={jest.fn()}
        deleteBoard={jest.fn()}
        logout={jest.fn()}
      />
    );
    expect(screen.queryByText("mickey's shopping list")).toBeNull();
  });

  it('shows messages', () => {
    render(
      <Home
        user={{ email: 'email' }}
        boardId={'123'}
        boardName={'name'}
        loadBoard={jest.fn()}
        loadHome={jest.fn()}
        loadBoards={jest.fn()}
        emailSignInLink={jest.fn()}
        renameBoard={jest.fn()}
        createBoard={jest.fn()}
        resetBoard={jest.fn()}
        shareBoard={jest.fn()}
        updateLists={jest.fn()}
        deleteBoard={jest.fn()}
        logout={jest.fn()}
      />
    );
    expect(screen.queryByText("mickey's shopping list")).toBeNull();
  });
});
