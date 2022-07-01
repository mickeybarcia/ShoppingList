import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, Switch, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ref, onValue, set } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

import ListComponent from './List';
import InputField from './InputField';
import BoardForm from './BoardForm';
import HideKeyboard from './HideKeyboard';
import db from '../FirebaseDb';

const Item = (name, isLow = false) => {
  return { name, isLow };
};

const List = (name, items = []) => {
  return { name, items };
};

export default function Home() {
  const keyboardScrollView = useRef();
  const [board, setBoard] = useState();
  const [lists, setLists] = useState();
  const [error, setError] = useState('');
  const [showLowOnly, setShowLowOnly] = useState(false);

  const reset = () => {
    setBoard(null);
    setLists(null);
    setError('');
    setShowLowOnly(false);
  };

  const getRef = (boardName) => ref(db, `boards/${boardName}`);

  const loadBoard = (boardName) => {
    const boardRef = getRef(boardName);
    onValue(
      boardRef,
      (snapshot) => {
        setError('');
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

  const signIn = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setError('');
      })
      .catch((error) => {
        console.log(error);
        setError('something went wrong');
      });
  };

  useEffect(() => {
    signIn();
  }, []);

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
      <HideKeyboard>
        <KeyboardAwareScrollView ref={keyboardScrollView} extraHeight={150}>
          {error !== '' && (
            <View style={styles.error}>
              <Text style={styles.subHeading}>{error}</Text>
            </View>
          )}
          {board && lists && (
            <ScrollView>
              <View style={styles.topBar}>
                <Text style={styles.subHeading}>show only low stock items</Text>
                <TouchableOpacity onPress={reset}>
                  <Text style={styles.subHeading}>switch board</Text>
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
          {!board && <BoardForm onLoadBoard={loadBoard} onCreateBoard={loadBoard} />}
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
  subHeading: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400'
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
