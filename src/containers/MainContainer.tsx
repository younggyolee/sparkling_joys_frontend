import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from '../components/Main/Main';
import { RootState } from '../store';
import { setUserIdAction } from '../store/userId/actions';
import { setItemsAction } from '../store/items/actions';
import { Items } from '../store/items/types';
import { loadingItems } from '../store/loadingItems/types';
import { getItems, getTotalValue, getTotalCost, updateItemIsOwned } from '../utils/api';

interface MainContainerProps {
  userId: string,
  items: Items,
  loadingItems: loadingItems
  setItems: (items: Items) => void
};

const MainContainer: React.FC<MainContainerProps> = ({
  userId,
  items,
  loadingItems,
  setItems
}) => {
  const [totalValue, setTotalValue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  async function updateItems() {
    const items = await getItems(userId);
    setItems(items);
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
      await updateTotalValueAndCost();
    })();
  }, [items]);

  async function handleCoinIconClick(
    // userId: string,
    itemId: string,
    isOwned: boolean
  ) {
    await updateItemIsOwned(userId, itemId, isOwned);
    await updateItems();
    // await updateTotalValueAndCost();
  }

  return (
    <Main
      items={items}
      loadingItems={loadingItems}
      totalValue={totalValue}
      totalCost={totalCost}
      onCoinIconClick={handleCoinIconClick}
    />
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
  items: state.items,
  loadingItems: state.loadingItems
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainContainer)
);
