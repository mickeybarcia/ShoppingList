import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Switch,
  Text,
  TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ref, onValue, set } from 'firebase/database';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListComponent from './List';
import InputField from './InputField';
import BoardForm from './BoardForm';
import HideKeyboard from './HideKeyboard';
import db from '../FirebaseDb';
import { AppStyles } from '../AppStyles';
import SignInForm from './SignInForm';

const Item = (name, isLow = false) => {
  return { name, isLow };
};

const List = (name, items = []) => {
  return { name, items };
};

const STORAGE_KEY = 'board';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:19006/',
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'example.page.link'
};

export default function Home() {
  const keyboardScrollView = useRef();
  const [email, setEmail] = useState();
  const [board, setBoard] = useState();
  const [lists, setLists] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLowOnly, setShowLowOnly] = useState(false);

  const reset = () => {
    setBoard(null);
    setLists(null);
    setError('');
    setShowLowOnly(false);
    setLoading(false);
  };

  const getRef = (boardName) => ref(db, `boards/${boardName}`);

  const loadBoard = async (boardName) => {
    const boardRef = getRef(boardName);
    onValue(
      boardRef,
      (snapshot) => {
        setError('');
        setLoading(false);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setLists(JSON.parse(data));
          if (!board) setBoard(boardName);
        } else {
          set(boardRef, JSON.stringify([]));
        }
      },
      (error) => {
        console.log(error);
        setError('unable to load board');
      }
    );
  };

  const storeLists = () => {
    const boardRef = getRef(board);
    return set(boardRef, JSON.stringify(lists));
  };

  const signIn = (email) => {
    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        setError('');
      })
      .catch((error) => {
        console.log(error);
        setError('something went wrong');
      });
  };

  const storeCurrentBoardName = async (boardName) => {
    await AsyncStorage.setItem(STORAGE_KEY, boardName);
  };

  const getCurrentBoardName = async () => {
    const auth = getAuth();
    console.log(auth)
    if (auth.currentUser) {
      console.log(currentUser)
    }
    // const currentBoard = await AsyncStorage.getItem(STORAGE_KEY);
    // if (currentBoard) loadBoard(currentBoard);
  };

  useEffect(() => {
    // signIn();
    getCurrentBoardName();
  }, []);

  useEffect(() => {
    if (board) storeCurrentBoardName(board);
  }, [board]);

  useEffect(() => {
    if (board && lists) {
      storeLists();
      keyboardScrollView.current.update();
    }
  }, [lists]);

  const addList = (listName) => {
    if (listName == '') return;
    const newLists = [...lists];
    newLists.push(List(listName));
    setLists(newLists);
  };

  const addItem = (listIndex, itemName) => {
    if (itemName == '') return;
    const newLists = [...lists];
    newLists[listIndex].items = [...newLists[listIndex].items, Item(itemName)];
    setLists(newLists);
  };

  const deleteItem = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items = newLists[listIndex].items.filter((_, index) => index != itemIndex);
    setLists(newLists);
  };

  const switchItemStatus = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items[itemIndex].isLow = !newLists[listIndex].items[itemIndex].isLow;
    setLists(newLists);
  };

  const deleteList = (listIndex) => {
    const newLists = lists.filter((_, index) => index != listIndex);
    setLists(newLists);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{board || 'shopping list app'}</Text>
      {loading && <ActivityIndicator animating={loading} />}
      <HideKeyboard>
        <KeyboardAwareScrollView ref={keyboardScrollView} extraHeight={150}>
          {error !== '' && (
            <View style={styles.error}>
              <Text style={AppStyles.subHeading}>{error}</Text>
            </View>
          )}
          {board && lists && !loading && (
            <ScrollView>
              <View style={styles.topBar}>
                <Text style={AppStyles.subHeading}>show only low stock items</Text>
                <TouchableOpacity onPress={reset}>
                  <Text style={AppStyles.subHeading}>switch board</Text>
                </TouchableOpacity>
              </View>
              <Switch
                style={styles.switch}
                onValueChange={() => setShowLowOnly(!showLowOnly)}
                value={showLowOnly}
              />
              {lists.map(({ name, items }, index) => {
                const filteredItems = items.filter(
                  (item) => !showLowOnly || (showLowOnly && item.isLow)
                );
                if (filteredItems.length == 0 && showLowOnly) return;
                return (
                  <View key={index}>
                    <ListComponent
                      index={index}
                      name={name}
                      items={filteredItems}
                      showLowOnly={showLowOnly}
                      onDeleteList={() => deleteList(index)}
                      onAddItem={(itemName) => addItem(index, itemName)}
                      onDeleteItem={(itemIndex) => deleteItem(index, itemIndex)}
                      onSwitchItemStatus={(itemIndex) => switchItemStatus(index, itemIndex)}
                    />
                  </View>
                );
              })}
              {!showLowOnly && (
                <InputField onAddItem={(listName) => addList(listName)} placeholder={'new list'} />
              )}
            </ScrollView>
          )}
          {false && !board && !loading && <BoardForm onLoadBoard={loadBoard} onCreateBoard={loadBoard} />}
          {!loading && <SignInForm onSignIn={signIn} />}
        </KeyboardAwareScrollView>
      </HideKeyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1A3C',
    paddingBottom: 100
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 400
  },
  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 20,
    paddingTop: 40
  },
  switch: {
    margin: 10
  },
  error: {
    margin: 10
  }
});

// https://javascript.plainenglish.io/build-a-todo-list-app-using-react-native-526f8fe11ff1
