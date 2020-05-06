import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Route
} from 'react-router-dom';
import Main from '../components/Main/Main';
import { RootState } from '../store';
import { setUserIdAction } from '../store/userId/actions';
import { setItemsAction } from '../store/items/actions';
import { Items } from '../store/items/types';
import { getItems } from '../utils/api';

interface MainContainerProps {
  userId: string,
  items: Items,
  setItems: (items: Items) => void
};

const MainContainer: React.FC<MainContainerProps> = ({ userId, items, setItems }) => {
  useEffect(() => {
    (async() => {
      const items = await getItems(userId);
      setItems(items);
    })();
  }, [userId]);

  return (
    <div>
      <Main items={items} />
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
  userId: state.userId,
  items: state.items
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainContainer)
);
