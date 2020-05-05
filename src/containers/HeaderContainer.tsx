import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header/Header';
import { RootState } from '../store';
import { setUserIdAction } from '../store/userId/actions';
import { setItemsAction } from '../store/items/actions';
import { Items } from '../store/items/types';
import { addItem, getItems } from '../utils/api';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface HeaderContainerProps {
  userId: string,
  setItems: (items: Items) => void
};

const HeaderContainer: React.FC<HeaderContainerProps> = ({ userId, setItems }) => {
  async function handleSearch(keyword: string) {
    await addItem(userId, keyword);

    const items = await getItems(userId);
    setItems(items);
  }

  return (
    <div>
      <Header onSearch={handleSearch} userId={userId} />
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
