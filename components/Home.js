import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { onValue } from 'firebase/database';
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

import Board from './Board';
import BoardForm from './BoardForm';
import HideKeyboard from './shared/HideKeyboard';
import { AppStyles, BACKGROUND_COLOR } from '../AppStyles';
import {
  actionCodeSettings,
  updateListsRef,
  getBoardsRef,
  getBoardRef,
  saveNewBoard,
  addBoardToUser,
  deleteBoardById,
  renameBoardById
} from '../Firebase';
import Menu from './Menu';
import Form from './Form';

const BOARD_KEY = 'boardId';
const EMAIL_KEY = 'emailForSignIn';

export default function Home() {
  const keyboardScrollView = useRef();

  const [user, setUser] = useState(null);
  const [boardIds, setBoardIds] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const [boardName, setBoardName] = useState(null);
  const [lists, setLists] = useState();
  const [showLowOnly, setShowLowOnly] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showShareBoard, setShowShareBoard] = useState(false);
  const [showRenameBoard, setShowRenameBoard] = useState(false);

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (boardId) {
      AsyncStorage.setItem(BOARD_KEY, boardId);
      loadBoard();
    }
  }, [boardId]);

  useEffect(() => {
    if (user) {
      loadCurrentBoard();
      loadBoards();
    }
  }, [user]);

  const updateLists = async (newLists) => {
    updateListsRef(boardId, newLists);
    keyboardScrollView.current.update();
  };

  const loadBoards = async () => {
    const boardsRef = getBoardsRef(user.email);
    onValue(
      boardsRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const boardIds = Object.entries(snapshot.val())
            .filter(([, isActive]) => isActive)
            .map(([id]) => id);
          setBoardIds(boardIds);
        }
      },
      (error) => error.code !== 'PERMISSION_DENIED' && handleError(error)
    );
  };

  const loadBoard = async () => {
    setShowMenu(false);
    const boardRef = getBoardRef(boardId);
    onValue(
      boardRef,
      (snapshot) => {
        handleSuccess();
        if (snapshot.exists()) {
          const { name, lists: newLists } = snapshot.val();
          if (!boardName) setBoardName(name);
          setLists(JSON.parse(newLists));
        }
      },
      (error) => error.code !== 'PERMISSION_DENIED' && handleError(error)
    );
  };

  const createBoard = async (name) => {
    setShowMenu(false);
    const id = await saveNewBoard(name, user.email);
    setBoardId(id);
  };

  const deleteBoard = async () => {
    await deleteBoardById(boardId, user.email);
    resetBoard();
  };

  const loadCurrentBoard = async () => {
    let currentBoardId = await AsyncStorage.getItem(BOARD_KEY);
    if (currentBoardId) {
      setBoardId(currentBoardId);
    } else {
      handleSuccess();
    }
  };

  const loadPage = async () => {
    // WEB ONLY
    const auth = getAuth();
    const url = window.location.href;
    // const url = ''
    // const url = await Linking.getInitialURL()
    if (isSignInWithEmailLink(auth, url)) {
      let email = await AsyncStorage.getItem(EMAIL_KEY);
      if (!email) return handleError(Error('email mismatch'));
      await AsyncStorage.removeItem(EMAIL_KEY);
      signInWithEmailLink(auth, email, url)
        .then((result) => {
          window.location.href = '/';
          loadPage();
        })
        .catch((error) => handleError(error));
    } else {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          handleSuccess();
        }
      });
    }
  };

  const signIn = async (email) => {
    resetBoard();
    const auth = getAuth();
    try {
      await AsyncStorage.setItem(EMAIL_KEY, email);
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      setError('email sent');
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    setLoading(true);
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    resetBoard();
  };

  const shareBoard = async (email) => {
    addBoardToUser(email, boardId);
    setError('user added');
  };

  const toggleShareBoard = () => {
    setShowShareBoard(!showShareBoard);
    setShowRenameBoard(false);
    setError('');
  };

  const toggleRenameBoard = async () => {
    setShowRenameBoard(!showRenameBoard);
    setShowShareBoard(false);
    setError('');
  };

  const renameBoard = async (newName) => {
    await renameBoardById(boardId, newName);
    setBoardName(newName);
  };

  const resetBoard = async () => {
    await AsyncStorage.removeItem(BOARD_KEY);
    setBoardId(null);
    setBoardName(null);
    setLists(null);
    setError('');
    setShowLowOnly(false);
    setLoading(false);
    setShowShareBoard(false);
    setShowMenu(false);
    setShowRenameBoard(false);
  };

  const handleError = (error, message = 'something went wrong') => {
    console.log(error);
    setLoading(false);
    setError(message);
  };

  const handleSuccess = () => {
    setError('');
    setLoading(false);
  };

  const MenuButton = () => {
    return (
      <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
        <MaterialIcons name="menu" size={30} color="white" />
      </TouchableOpacity>
    );
  };

  const Error = () => {
    return (
      error !== '' && (
        <View style={styles.error}>
          <Text style={AppStyles.subHeading}>{error}</Text>
        </View>
      )
    );
  };
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={AppStyles.title}>{boardName || 'shopping list app'}</Text>
          <View>
            <MenuButton />
            <Menu
              showMenu={showMenu}
              showLogout={user !== null}
              showBoardButtons={boardId !== null}
              logout={logout}
              switchBoard={resetBoard}
              toggleRenameBoard={toggleRenameBoard}
              renameBoard={renameBoard}
              showRenameBoard={showRenameBoard}
              deleteBoard={deleteBoard}
              toggleShareBoard={toggleShareBoard}
              showShareBoard={showShareBoard}
            />
          </View>
        </View>
        <Error />
        {loading && <ActivityIndicator animating={loading} />}
        <HideKeyboard>
          <KeyboardAwareScrollView ref={keyboardScrollView} extraHeight={150}>
            {lists && !showShareBoard && !showRenameBoard && (
              <Board
                lists={lists}
                showLowOnly={showLowOnly}
                onSwitchLowOnly={() => setShowLowOnly(!showLowOnly)}
                onUpdateLists={updateLists}
              />
            )}
            {!loading && user && !boardId && (
              <BoardForm onCreateBoard={createBoard} onLoadBoard={setBoardId} boardIds={boardIds} />
            )}
            {!loading && !user && (
              <Form
                onComplete={signIn}
                buttonText={'sign in / sign up'}
                placeholder={'mickey@mickey.com'}
              />
            )}
            {showShareBoard && (
              <Form
                onComplete={shareBoard}
                buttonText={'add email to board'}
                placeholder={'mickey@mickey.com'}
              />
            )}
            {showRenameBoard && (
              <Form onComplete={renameBoard} buttonText={'rename board'} initialValue={boardName} />
            )}
          </KeyboardAwareScrollView>
        </HideKeyboard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    paddingBottom: 500,
    maxWidth: 400
  },
  background: {
    backgroundColor: BACKGROUND_COLOR
  },
  topBar: {
    textAlign: 'right',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  error: {
    marginBottom: 10
  }
});

// https://javascript.plainenglish.io/build-a-todo-list-app-using-react-native-526f8fe11ff1
