import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { onValue, push, set } from 'firebase/database';
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
import { AppStyles, WHITE_COLOR } from '../AppStyles';
import { actionCodeSettings, db} from '../Firebase';

const BOARD_KEY = 'board';
const EMAIL_KEY = 'emailForSignIn';

export default function Home() {
  const keyboardScrollView = useRef();
  const [user, setUser] = useState();
  const [boardId, setBoardId] = useState();
  const [boardName, setBoardName] = useState()
  const [lists, setLists] = useState()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLowOnly, setShowLowOnly] = useState(false);

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    if (boardId && lists) {
      loadBoard()
      keyboardScrollView.current.update();
    }
  }, [lists]);

  useEffect(() => {
    if (user) loadCurrentBoard();
  }, [user]);

  const loadBoard = async (boardName) => {
    const listsRef = getListsRef(boardName, user.uid);
    onValue(
      listsRef,
      (snapshot) => {
        handleSuccess();
        if (snapshot.exists()) {
          const { name, } = snapshot.val();
          if (!boardName) setBoardName()
        } else {
          set(listsRef, JSON.stringify([]));
          setNewBoardUsers(boardName, user.uid, user.email);
        }
      },
      (error) => handleError(error)
    );
  };

  const createBoard = async (name) => {
    // create new board
    const boardsRef = ref(db, 'boards')
    const { id } = boardsRef.push({ name })
    // add user to board
    const boardUserRef = ref(db, `boards/${id}/users/${user.uid}`)
    set(boardUserRef, true)
    // add board to user
    const userBoardsRef = ref(db, `users/${user.uid}/boards`)
    push(userBoardsRef, id)
    //
    await AsyncStorage.setItem(BOARD_KEY, id);
    setLists(JSON.stringify([]))
  }

  const loadCurrentBoard = async () => {
    const currentBoardId = await AsyncStorage.getItem(BOARD_KEY);
    if (currentBoardId) {
      setBoardId(currentBoardId)
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
    signOut(auth)
      .then(() => {
        resetBoard();
        setUser(null);
      })
      .catch((error) => handleError(error));
  };

  const resetBoard = async () => {
    setBoard(null);
    setLists(null);
    setError('');
    setShowLowOnly(false);
    setLoading(false);
    await AsyncStorage.removeItem(BOARD_KEY);
  };

  const shareBoard = async () => {};

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
          <Text style={styles.heading}>{boardName || 'shopping list app'}</Text>
          <View>
            {user && <Button onPress={logout} text={'log out'}/>}
            {board && (
              <View>
                <Button onPress={resetBoard} text={'switch board'}/>
                <Button onPress={resetBoard} text={'share board'}/>
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
            {lists && (
              <Board
                lists={lists}
                showLowOnly={showLowOnly}
                onSwitchLowOnly={() => setShowLowOnly(!showLowOnly)}
                onUpdateLists={setLists}
              />
            )}
            {!loading && user && !board && <BoardForm onCreateBoard={createBoard} />}
            {!loading && !user && <SignInForm onSignIn={signIn} />}
            {false && <ShareBoardForm onSignIn={signIn} />}
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
  heading: {
    color: WHITE_COLOR,
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 15
  },
  error: {
    margin: 10
  }
});

// https://javascript.plainenglish.io/build-a-todo-list-app-using-react-native-526f8fe11ff1
