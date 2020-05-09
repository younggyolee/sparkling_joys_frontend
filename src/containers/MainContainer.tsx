import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from '../components/Main/Main';
import { RootState } from '../store';
import { setUserIdAction } from '../store/userId/actions';
import {
  setAllItemsAction,
  setOwnedItemsAction,
  setWishedItemsAction
} from '../store/items/actions';
import { Items } from '../store/items/types';
import { loadingItems } from '../store/loadingItems/types';
import { ITEM_LIST_VIEW_TYPES } from '../store/itemListView/types';
import { setItemListViewAction } from '../store/itemListView/actions';
import {
  getItems,
  getTotalValue,
  getTotalCost,
  updateItemIsOwned
} from '../utils/api';

interface MainContainerProps {
  userId: string,
  items: Items,
  loadingItems: loadingItems,
  setItemListView: (itemListView: string) => void,
  setAllItems: (items: Items) => void,
  setOwnedItems: (items: Items) => void,
  setWishedItems: (items: Items) => void,
  itemListView: string
};

const MainContainer: React.FC<MainContainerProps> = ({
  userId,
  items,
  loadingItems,
  setItemListView,
  setAllItems,
  setOwnedItems,
  setWishedItems,
  itemListView
}) => {
  const [totalValue, setTotalValue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  async function updateItems() {
    const items = await getItems(userId);
    if (itemListView === ITEM_LIST_VIEW_TYPES.ALL) {
      setAllItems(items);
    } else if (itemListView === ITEM_LIST_VIEW_TYPES.OWNED) {
      setOwnedItems(items);
    } else if (itemListView === ITEM_LIST_VIEW_TYPES.WISHED) {
      setWishedItems(items);
    }
  }

  async function updateTotalValueAndCost() {
    const fetchedTotalValue = await getTotalValue(userId);
    const fetchedTotalCost = await getTotalCost(userId);
    setTotalValue(fetchedTotalValue);
    setTotalCost(fetchedTotalCost);
  }

  useEffect(() => {
    (async() => {
      await updateItems();
      await updateTotalValueAndCost();
    })();
  }, [userId]);

  useEffect(() => {
    (async() => {
      await updateItems();
    })();
  }, [itemListView]);

  // useEffect(() => {
  //   (async() => {
  //     await updateTotalValueAndCost();
  //   })();
  // }, [items]);

  async function handleCoinIconClick(
    itemId: string,
    isOwned: boolean
  ) {
    await updateItemIsOwned(userId, itemId, isOwned);
    await updateItems();
    await updateTotalValueAndCost();
  }

  return (
    <Main
      items={items}
      loadingItems={loadingItems}
      totalValue={totalValue}
      totalCost={totalCost}
      onCoinIconClick={handleCoinIconClick}
      onItemListViewClick={setItemListView}
      itemListView={itemListView}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserId(userId: string) {
      dispatch(setUserIdAction(userId));
    },
    setItemListView(itemListView: string) {
      dispatch(setItemListViewAction(itemListView));
    },
    setAllItems(items: Items) {
      dispatch(setAllItemsAction(items));
    },
    setOwnedItems(items: Items) {
      dispatch(setOwnedItemsAction(items));
    },
    setWishedItems(items: Items) {
      dispatch(setWishedItemsAction(items));
    },
  };
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId,
  items: state.items,
  loadingItems: state.loadingItems,
  itemListView: state.itemListView
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainContainer)
);
