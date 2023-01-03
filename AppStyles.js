import { StyleSheet } from 'react-native';

const WHITE_COLOR = '#fff';
const LIGHT_BACKGROUND_COLOR = '#5CB3EA';
const BACKGROUND_COLOR = '#1298ED';

const LIST_ITEM_HEIGHT = 35;
const ICON_SIZE = 20;

const AppStyles = StyleSheet.create({
  inputField: {
    color: WHITE_COLOR,
    height: 40,
    flex: 1,
    fontSize: 16
  },
  inputContainer: {
    borderColor: WHITE_COLOR,
    backgroundColor: LIGHT_BACKGROUND_COLOR,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    height: 40,
    maxWidth: 400,
    marginBottom: 20,
    marginTop: 5
  },
  subHeading: {
    color: WHITE_COLOR,
    fontSize: 15,
    fontWeight: '400'
  },
  title: {
    color: WHITE_COLOR,
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10
  },
  delete: {
    marginLeft: 10
  },
  itemContainer: {
    backgroundColor: LIGHT_BACKGROUND_COLOR,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 35
  },
  item: {
    color: WHITE_COLOR,
    width: '90%',
    fontSize: 16
  },
  listContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    marginTop: 10,
    maxWidth: 350
  }
});

export {
  WHITE_COLOR,
  BACKGROUND_COLOR,
  LIGHT_BACKGROUND_COLOR,
  LIST_ITEM_HEIGHT,
  ICON_SIZE,
  AppStyles
};
