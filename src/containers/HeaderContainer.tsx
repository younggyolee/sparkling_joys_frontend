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
import { Items } from '../store/items/types';
import { addItem, getItems, logout } from '../utils/api';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface HeaderContainerProps {
  userId: string,
  setItems: (items: Items) => void
  setUserId: (userId: string) => void
};

const HeaderContainer: React.FC<HeaderContainerProps> = ({ userId, setItems, setUserId }) => {
  const history = useHistory();

  async function handleSearch(keyword: string) {
    await addItem(userId, keyword);
    const items = await getItems(userId);
    setItems(items);
  }

  async function handleLogout() {
    await logout();
    setUserId('');
    history.push('/main');
  }

  return (
    <div>
      <Header onSearch={handleSearch} userId={userId} onLogout={handleLogout} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserId(userId: string) {
      dispatch(setUserIdAction(userId));
    },
    setItems(items: Items) {
      dispatch(setItemsAction(items));
    }
  };
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
);
