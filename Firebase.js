import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDhW83x6Ly2G1pAeUbZXMb4wCSWXSCJGiQ',
  authDomain: 'shoppinglist-e84b8.firebaseapp.com',
  projectId: 'shoppinglist-e84b8',
  storageBucket: 'shoppinglist-e84b8.appspot.com',
  messagingSenderId: '971048186595',
  appId: '1:971048186595:web:c86bc2d850eccea42e8bd6',
  measurementId: 'G-YK5RGELESW',
  databaseUrl: 'https://shoppinglist-e84b8-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const actionCodeSettings = {
  url:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:19006/'
      : 'https://shopping-list-tracker.herokuapp.com/',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.mickey.shoppinglisttracker'
  },
  dynamicLinkDomain: 'shoppinglisttrackerapp.page.link'
};

const updateListsRef = async (boardId, newLists) => {
  const listsRef = ref(db, `boards/${boardId}/lists`);
  set(listsRef, JSON.stringify(newLists));
};

const getBoardsRef = (email) => ref(db, `users/${email.replace('.', '%2e')}/boards`);

const getBoardRef = (boardId) => ref(db, `boards/${boardId}`);

const getBoardNameRef = (boardId) => ref(db, `boards/${boardId}/name`);

const saveNewBoard = async (name, email) => {
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

export {
  actionCodeSettings,
  updateListsRef,
  getBoardsRef,
  getBoardRef,
  saveNewBoard,
  addBoardToUser,
  deleteBoardById,
  renameBoardById,
  getBoardNameRef
};
