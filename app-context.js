import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Linking } from 'react-native';

import * as fb from './Firebase';

const AppContext = React.createContext();

const BOARD_KEY = 'boardId';
const EMAIL_KEY = 'emailForSignIn';

export function useAppContext() {
  return React.useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [boardName, setBoardName] = useState(null);
  const [boardIds, setBoardIds] = useState([]);
  const [lists, setLists] = useState();

  const setBoardIdCtx = (boardId) => setBoardId(boardId);

  const logout = async (successCallback, errorCallback) => {
    try {
      await fb.logout();
      setUser(null);
      successCallback();
    } catch (error) {
      errorCallback(error);
    }
  };

  const emailSignInLink = async (email, successCallback, errorCallback) => {
    await AsyncStorage.setItem(EMAIL_KEY, email);
    try {
      await fb.emailSignInLink(email);
      successCallback();
    } catch (error) {
      errorCallback(error);
    }
  };

  const createBoard = async (name, errorCallback) => {
    try {
      const id = await fb.createBoard(name, user.email);
      setBoardId(id);
    } catch (error) {
      errorCallback(error);
    }
  };

  const resetBoard = async () => {
    await AsyncStorage.removeItem(BOARD_KEY);
    setBoardId(null);
    setBoardName(null);
    setLists(null);
  };

  const loadBoard = async (errorCallback) => {
    await AsyncStorage.setItem(BOARD_KEY, boardId);
    await fb.onLoadBoard(
      boardId,
      (data) => {
        if (data) {
          const { name, lists: newLists } = data;
          if (!boardName) setBoardName(name);
          setLists(JSON.parse(newLists));
        }
      },
      (error) => error.code !== 'PERMISSION_DENIED' && errorCallback(error)
    );
  };

  const loadBoards = async () => {
    const currentBoardId = await AsyncStorage.getItem(BOARD_KEY);
    if (currentBoardId) setBoardId(currentBoardId);
    fb.onLoadBoards(
      user.email,
      (data) => {
        const boardIds = Object.entries(data)
          .filter(([, isActive]) => isActive)
          .map(([id]) => id);
        setBoardIds(boardIds);
      },
      (error) => console.log(error)
    );
  };

  const processLogin = async (url, errorCallback, successCallback) => {
    if (fb.checkIfSignInLink(url)) {
      const email = await AsyncStorage.getItem(EMAIL_KEY);
      if (!email) return errorCallback(Error('email mismatch'));
      await AsyncStorage.removeItem(EMAIL_KEY);
      try {
        await fb.signInWithLink(email, url);
        successCallback();
        fb.detectAuth((user) => user && setUser(user));
      } catch (error) {
        errorCallback(error);
      }
    } else {
      fb.detectAuth((user) => user && setUser(user));
      successCallback();
    }
  };

  // TODO refactor
  const loadHome = async (errorCallback, successCallback) => {
    if (Platform.OS === 'web') {
      processLogin(window.location.href, errorCallback, successCallback);
    } else {
      Linking.getInitialURL().then((link) => {
        processLogin('', errorCallback, successCallback);
      }); // this doesn't work with remote debugging
      const linkingListener = Linking.addEventListener('url', (link) =>
        processLogin(link.url, errorCallback, successCallback)
      );
      return () => {
        linkingListener();
      };
    }
  };

  const renameBoard = async (name, errorCallback) => {
    try {
      await fb.renameBoardById(boardId, name);
      setBoardName(name);
    } catch (error) {
      errorCallback();
    }
  };

  const shareBoard = async (email, successCallback, errorCallback) => {
    try {
      await fb.addBoardToUser(email, boardId);
      successCallback();
    } catch (error) {
      errorCallback(error);
    }
  };

  const updateLists = async (newLists) => fb.updateLists(boardId, newLists);

  const deleteBoard = async (successCallback, errorCallback) => {
    try {
      await fb.deleteBoardById(boardId, user.email);
      successCallback();
    } catch (error) {
      errorCallback();
    }
  };

  const loadBoardName = async (id, successCallback, errorCallback) =>
    fb.onLoadBoardName(id, successCallback, errorCallback);

  const value = {
    user,
    boardId,
    boardName,
    boardIds,
    lists,
    logout,
    createBoard,
    resetBoard,
    loadBoard,
    loadHome,
    renameBoard,
    loadBoards,
    shareBoard,
    updateLists,
    deleteBoard,
    emailSignInLink,
    loadBoardName,
    setBoardIdCtx
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
