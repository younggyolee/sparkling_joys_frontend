import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter,
  useHistory
} from 'react-router-dom';
import Header from '../components/Header/Header';
import { RootState } from '../store';
import { setUserIdAction } from '../store/userId/actions';
import { setItemsAction } from '../store/items/actions';
import { addLoadingItemAction, removeLoadingItemAction } from '../store/loadingItems/actions';
import { Items } from '../store/items/types';
import { loadingItem } from '../store/loadingItems/types';
import { addItem, getItems, logout } from '../utils/api';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface HeaderContainerProps {
  userId: string,
  setUserId: (userId: string) => void,
};

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  userId,
  setUserId,
}) => {
  const history = useHistory();

  async function handleLogout() {
    await logout();
    setUserId('');
    history.push('/main');
  }

  return (
    <Header userId={userId} onLogout={handleLogout} />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserId(userId: string) {
      dispatch(setUserIdAction(userId));
    }
  };
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
);
