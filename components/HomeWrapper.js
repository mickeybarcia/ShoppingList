import Home from './Home';
import useAppContext from '../context/useAppContext';

const HomeWrapper = () => {
  const {
    user,
    boardId,
    boardName,
    lists,
    loadBoard,
    loadHome,
    loadBoards,
    emailSignInLink,
    renameBoard,
    createBoard,
    resetBoard,
    shareBoard,
    updateLists,
    deleteBoard,
    logout
  } = useAppContext();
  return (
    <Home
      user={user}
      boardId={boardId}
      boardName={boardName}
      lists={lists}
      loadBoard={loadBoard}
      loadHome={loadHome}
      loadBoards={loadBoards}
      emailSignInLink={emailSignInLink}
      renameBoard={renameBoard}
      createBoard={createBoard}
      resetBoard={resetBoard}
      shareBoard={shareBoard}
      updateLists={updateLists}
      deleteBoard={deleteBoard}
      logout={logout}
    />
  );
};

export default HomeWrapper;
