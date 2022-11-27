import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set, onValue } from 'firebase/database';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  signOut
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyDhW83x6Ly2G1pAeUbZXMb4wCSWXSCJGiQ',
  authDomain: 'shoppinglist-e84b8.firebaseapp.com',
  projectId: 'shoppinglist-e84b8',
  storageBucket: 'shoppinglist-e84b8.appspot.com',
  messagingSenderId: '971048186595',
  appId: '1:971048186595:web:c86bc2d850eccea42e8bd6',
  databaseUrl: 'https://shoppinglist-e84b8-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const actionCodeSettings = {
  url:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:19006/'
      : 'https://mickeybarcia.github.io/ShoppingList/',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.mickey.shoppinglisttracker'
  },
  dynamicLinkDomain: 'shoppinglisttrackerapp.page.link'
};

const updateLists = async (boardId, newLists) => {
  const listsRef = ref(db, `boards/${boardId}/lists`);
  await set(listsRef, JSON.stringify(newLists));
};

const createBoard = async (name, email) => {
  const newBoardsRef = push(ref(db, 'boards'));
  const id = newBoardsRef.key;
  await set(newBoardsRef, { name, lists: JSON.stringify([]) });
  await addBoardToUser(email, id, name);
  return id;
};

const addBoardToUser = async (email, boardId) => {
  await set(ref(db, `boards/${boardId}/users/${email.replace('.', '%2e')}`), true);
  await set(ref(db, `users/${email.replace('.', '%2e')}/boards/${boardId}`), true);
};

const deleteBoardById = async (boardId, email) => {
  await set(ref(db, `users/${email.replace('.', '%2e')}/boards/${boardId}`), false);
};

const renameBoardById = async (boardId, newName) => {
  await set(ref(db, `boards/${boardId}/name`), newName);
};

const emailSignInLink = async (email) => {
  const auth = getAuth();
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

const checkIfSignInLink = (url) => {
  const auth = getAuth();
  return isSignInWithEmailLink(auth, url);
};

const signInWithLink = async (email, url) => {
  const auth = getAuth();
  await signInWithEmailLink(auth, email, url);
};

const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
};

const detectAuth = (callback) => {
  const auth = getAuth();
  auth.onAuthStateChanged((user) => callback(user));
};

const onLoadBoard = (boardId, successCallback, errorCallback) => {
  const boardRef = ref(db, `boards/${boardId}`);
  onValue(
    boardRef,
    (snapshot) => successCallback(snapshot.exists() ? snapshot.val() : null),
    errorCallback
  );
};

const onLoadBoards = async (email, successCallback, errorCallback) => {
  const boardsRef = ref(db, `users/${email.replace('.', '%2e')}/boards`);
  onValue(
    boardsRef,
    async (snapshot) => snapshot.exists() && successCallback(snapshot.val()),
    errorCallback
  );
};

const onLoadBoardName = (boardId, successCallback, errorCallback) => {
  const boardRef = ref(db, `boards/${boardId}/name`);
  onValue(
    boardRef,
    (snapshot) => snapshot.exists() && successCallback(snapshot.val()),
    errorCallback
  );
};

export {
  updateLists,
  createBoard,
  addBoardToUser,
  deleteBoardById,
  renameBoardById,
  emailSignInLink,
  checkIfSignInLink,
  signInWithLink,
  logout,
  detectAuth,
  onLoadBoard,
  onLoadBoards,
  onLoadBoardName
};
