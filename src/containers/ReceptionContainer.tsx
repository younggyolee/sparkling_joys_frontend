import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { 
  withRouter,
  useHistory
} from 'react-router-dom';
import Reception from '../components/Reception/Reception';
import { RootState } from '../store';
import { setAllItemsAction } from '../store/items/actions';
import { Items } from '../store/items/types';
import { loadingItem } from '../store/loadingItems/types';
import { addItem, getItems } from '../utils/api';
import { addLoadingItemAction, removeLoadingItemAction } from '../store/loadingItems/actions';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface ReceptionContainerProps {
  userId: string
  setAllItems: (items: Items) => void,
  addLoadingItem: (loadingItem: loadingItem) => void,
  removeLoadingItem: () => void
};

const ReceptionContainer: React.FC<ReceptionContainerProps> = ({
  userId,
  setAllItems,
  addLoadingItem,
  removeLoadingItem
}) => {
  const history = useHistory();

  async function handleSearch(keyword: string) {
    addLoadingItem({
      title: keyword,
      imageURL: `${process.env.REACT_APP_PUBLIC_URL}/images/loading.gif`
    });
    history.push('/main');
    await addItem(userId, keyword);
    const items = await getItems(userId);
    removeLoadingItem();
    setAllItems(items);
  }

  return (
    <>
      <Reception onSearch={handleSearch} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setAllItems(items: Items) {
      dispatch(setAllItemsAction(items));
    },
    addLoadingItem(loadingItem: loadingItem) {
      dispatch(addLoadingItemAction(loadingItem));
    },
    removeLoadingItem(){
      dispatch(removeLoadingItemAction());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReceptionContainer)
);
