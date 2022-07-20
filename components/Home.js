import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
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

import Board from './Board';
import BoardForm from './BoardForm';
import ShareBoardForm from './ShareBoardForm';
import SignInForm from './SignInForm';
import HideKeyboard from './HideKeyboard';
import Button from './Button';
import { AppStyles } from '../AppStyles';
import {
  actionCodeSettings,
  updateListsRef,
  getBoardsRef,
  getBoardRef,
  saveNewBoard,
  addBoardToUser
} from '../Firebase';

const BOARD_KEY = 'boardId';
const EMAIL_KEY = 'emailForSignIn';

export default function Home() {
  const keyboardScrollView = useRef();
  const [user, setUser] = useState();
  const [boards, setBoards] = useState();
  const [boardId, setBoardId] = useState();
  const [boardName, setBoardName] = useState();
  const [lists, setLists] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLowOnly, setShowLowOnly] = useState(false);
  const [showShareBoard, setShowShareBoard] = useState(false);

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
      (snapshot) => snapshot.exists() && setBoards(snapshot.val()),
      (error) => error.code !== 'PERMISSION_DENIED' && handleError(error)
    );
  };

  const loadBoard = async () => {
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
      (error) => handleError(error)
    );
  };

  const createBoard = async (name) => {
    const id = await saveNewBoard(name, user.email);
    setBoardId(id);
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
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = await AsyncStorage.getItem(EMAIL_KEY);
      if (!email) return handleError(Error('email mismatch'));
      await AsyncStorage.removeItem(EMAIL_KEY);
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.location.href = '/';
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
    addBoardToUser(email, boardId, boardName);
    setError('user added');
  };

  const toggleShareBoard = () => {
    setShowShareBoard(!showShareBoard);
    setError('');
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

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={AppStyles.title}>{boardName || 'shopping list app'}</Text>
          <View>
            {user && <Button onPress={logout} text={'log out'} />}
            {boardId && (
              <View>
                <Button onPress={resetBoard} text={'switch board'} />
                <Button
                  onPress={toggleShareBoard}
                  text={showShareBoard ? 'done sharing' : 'share board'}
                />
              </View>
            )}
          </View>
        </View>
        {error !== '' && (
          <View style={styles.error}>
            <Text style={AppStyles.subHeading}>{error}</Text>
          </View>
        )}
        {loading && <ActivityIndicator animating={loading} />}
        <HideKeyboard>
          <KeyboardAwareScrollView ref={keyboardScrollView} extraHeight={150}>
            {lists && !showShareBoard && (
              <Board
                lists={lists}
                showLowOnly={showLowOnly}
                onSwitchLowOnly={() => setShowLowOnly(!showLowOnly)}
                onUpdateLists={updateLists}
              />
            )}
            {!loading && user && !boardId && (
              <BoardForm onCreateBoard={createBoard} onLoadBoard={setBoardId} boards={boards} />
            )}
            {!loading && !user && <SignInForm onSignIn={signIn} />}
            {showShareBoard && <ShareBoardForm onShareBoard={shareBoard} />}
          </KeyboardAwareScrollView>
        </HideKeyboard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    maxWidth: 400
  },
  background: {
    backgroundColor: '#1E1A3C'
  },
  topBar: {
    textAlign: 'right',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  error: {
    marginBottom: 10
  }
});

// https://javascript.plainenglish.io/build-a-todo-list-app-using-react-native-526f8fe11ff1
