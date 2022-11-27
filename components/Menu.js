import PropTypes from 'prop-types';
import { View } from 'react-native';

import Button from './shared/Button';

const Menu = ({
  showMenu,
  showLogout,
  showBoardButtons,
  logout,
  switchBoard,
  showRenameBoard,
  toggleRenameBoard,
  deleteBoard,
  toggleShareBoard,
  showShareBoard
}) => {
  return (
    showMenu && (
      <View>
        {showLogout && <Button onPress={logout} text={'log out'} />}
        {showBoardButtons && (
          <View>
            <Button onPress={switchBoard} text={'switch board'} />
            <Button onPress={deleteBoard} text={'delete board'} />
            <Button
              onPress={toggleRenameBoard}
              text={showRenameBoard ? 'done renaming' : 'rename board'}
            />
            <Button
              onPress={toggleShareBoard}
              text={showShareBoard ? 'done sharing' : 'share board'}
            />
          </View>
        )}
      </View>
    )
  );
};

Menu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  showLogout: PropTypes.bool.isRequired,
  showBoardButtons: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  switchBoard: PropTypes.func.isRequired,
  showRenameBoard: PropTypes.bool.isRequired,
  toggleRenameBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  toggleShareBoard: PropTypes.func.isRequired,
  showShareBoard: PropTypes.bool.isRequired
};

export default Menu;
