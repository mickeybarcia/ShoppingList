import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';

import Board from './Board';
import BoardForm from './BoardForm';
import Menu from './Menu';
import Form from './Form';
import { AppStyles } from '../AppStyles';
import PropTypes from 'prop-types';

const Home = ({
  user,
  boardId,
  boardName,
  lists,
  loadBoard,
  loadHome,
  loadBoards,
  emailSignInLink,
  renameBoard: renameBoardCtx,
  createBoard: createBoardCtx,
  resetBoard: resetBoardCtx,
  shareBoard: shareBoardCtx,
  updateLists: updateListsCtx,
  deleteBoard: deleteBoardCtx,
  logout: logoutCtx
}) => {
  const APP_NAME = "mickey's shopping list";
  const keyboardScrollView = useRef();
  const [message, setMessage] = useState('');
  const [showLowOnly, setShowLowOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareBoard, setShowShareBoard] = useState(false);
  const [showRenameBoard, setShowRenameBoard] = useState(false);

  useEffect(() => {
    loadHome(handleError, handleSuccess);
  }, []);

  useEffect(() => {
    user && loadBoards();
  }, [user]);

  useEffect(() => {
    if (boardId) {
      handleSuccess();
      setShowMenu(false);
      loadBoard(handleError);
    }
  }, [boardId]);

  const updateLists = async (newLists) => {
    await updateListsCtx(newLists);
    keyboardScrollView.current.update();
  };

  const deleteBoard = async () => deleteBoardCtx(resetBoard, handleError);

  const createBoard = (name) => createBoardCtx(name, handleError);

  const signIn = (email) => {
    emailSignInLink(email, () => setMessage('email sent'), handleError);
  };

  const logout = async () => {
    setLoading(true);
    logoutCtx(resetBoard, handleError);
  };

  const shareBoard = async (email) => {
    shareBoardCtx(email, () => setMessage('user added'), handleError);
  };

  const renameBoard = async (name, handleError) => renameBoardCtx(name, handleError);

  const toggleShareBoard = () => {
    setShowShareBoard(!showShareBoard);
    setShowRenameBoard(false);
    setMessage('');
  };

  const toggleRenameBoard = async () => {
    setShowRenameBoard(!showRenameBoard);
    setShowShareBoard(false);
    setMessage('');
  };

  const resetBoard = async () => {
    resetBoardCtx();
    setMessage('');
    setShowLowOnly(false);
    setLoading(false);
    setShowShareBoard(false);
    setShowMenu(false);
    setShowRenameBoard(false);
  };

  const handleError = (error, message = 'something went wrong') => {
    console.log(error);
    setLoading(false);
    setMessage(message);
  };

  const handleSuccess = () => {
    setMessage('');
    setLoading(false);
  };

  const MenuButton = () => {
    return (
      <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
        <MaterialIcons
          name="menu"
          size={40}
          color="white"
          style={{ marginBottom: showMenu ? 20 : 0 }}
        />
      </TouchableOpacity>
    );
  };

  const Message = () => {
    return (
      message !== '' && (
        <View style={styles.error}>
          <Text style={AppStyles.subHeading}>{message}</Text>
        </View>
      )
    );
  };
  return (
    <View style={styles.container} keyboardDismissMode="interactive">
      <View style={styles.topBar}>
        <View>
          {user && <MenuButton />}
          <Menu
            showMenu={showMenu}
            showLogout={user !== null}
            showBoardButtons={boardId !== null}
            logout={logout}
            switchBoard={resetBoard}
            toggleRenameBoard={toggleRenameBoard}
            showRenameBoard={showRenameBoard}
            deleteBoard={deleteBoard}
            toggleShareBoard={toggleShareBoard}
            showShareBoard={showShareBoard}
          />
        </View>
        <Text style={AppStyles.title}>{boardName || APP_NAME}</Text>
      </View>
      <Message />
      {loading && <ActivityIndicator animating={loading} />}
      <KeyboardAwareScrollView
        ref={keyboardScrollView}
        showsVerticalScrollIndicator={false}
        extraHeight={150}
        keyboardShouldPersistTaps="handled"
      >
        {lists && !showShareBoard && !showRenameBoard && (
          <Board
            lists={lists}
            showLowOnly={showLowOnly}
            onSwitchLowOnly={() => setShowLowOnly(!showLowOnly)}
            onUpdateLists={updateLists}
          />
        )}
        {!loading && user && !boardId && <BoardForm createBoard={createBoard} />}
      </KeyboardAwareScrollView>
      {!loading && !user && (
        <Form
          onComplete={signIn}
          buttonText={'sign in with email'}
          initialValue={'mickey@mickey.com'}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    paddingTop: 50,
    maxWidth: 400
  },
  error: {
    marginBottom: 10
  }
});

// https://javascript.plainenglish.io/build-a-todo-list-app-using-react-native-526f8fe11ff1

Home.propTypes = {
  user: PropTypes.object,
  boardId: PropTypes.string,
  boardName: PropTypes.string,
  lists: PropTypes.array,
  loadBoard: PropTypes.func.isRequired,
  loadHome: PropTypes.func.isRequired,
  loadBoards: PropTypes.func.isRequired,
  emailSignInLink: PropTypes.func.isRequired,
  renameBoard: PropTypes.func.isRequired,
  createBoard: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
  shareBoard: PropTypes.func.isRequired,
  updateLists: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Home;
