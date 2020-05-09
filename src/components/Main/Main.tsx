import React from 'react';
import styles from './Main.module.css';
import ItemList from '../ItemList/ItemList';
import { Items } from '../../store/items/types';
import axios from 'axios';
import { loadingItems } from '../../store/loadingItems/types';
import { ITEM_LIST_VIEW_TYPES } from '../../store/itemListView/types';
axios.defaults.withCredentials = true;

interface MainProps {
  items: Items,
  loadingItems: loadingItems,
  totalValue: number,
  totalCost: number
  onCoinIconClick: (
    itemId: string,
    isOwned: boolean
  ) => void,
  onItemListViewClick: (
    itemListView: string
  ) => void,
  itemListView: string
};

const Main: React.FC<MainProps> = ({
  items,
  loadingItems,
  totalValue,
  totalCost,
  onCoinIconClick,
  onItemListViewClick,
  itemListView
}) => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.assetDisplayContainer}>
        <div>
          <span
            className={
              `${styles.assetDisplayText}
               ${styles[
                (itemListView === ITEM_LIST_VIEW_TYPES.ALL) ||
                (itemListView === ITEM_LIST_VIEW_TYPES.OWNED) ? 
                'boldAssetText' :
                'lightAssetText'
              ]}`
            }
          >
            {'Your assets worth '}
            {Number(totalValue).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
        <div>
          <span
            className={
              `${styles.assetDisplayText}
               ${styles[
                (itemListView === ITEM_LIST_VIEW_TYPES.ALL) ||
                (itemListView === ITEM_LIST_VIEW_TYPES.WISHED) ? 
                'boldAssetText' :
                'lightAssetText'
              ]}`
            }
          >
            {'Your wishlist costs '}
            {Number(totalCost).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,        
            })}
          </span>
        </div>
      </div>
      <div className={styles.itemListViewButtonsContainer}>
        <span
          className={
            `${styles.itemListViewButtons}
             ${styles[
                (itemListView === ITEM_LIST_VIEW_TYPES.ALL) ? 
                'boldItemListViewText' :
                'greyText'
             ]}`
          }
          onClick={() => onItemListViewClick(ITEM_LIST_VIEW_TYPES.ALL)}
        >
          ALL
        </span>
        <span
          className={
            `${styles.itemListViewButtons}
             ${styles[
                (itemListView === ITEM_LIST_VIEW_TYPES.OWNED) ? 
                'boldItemListViewText' :
                'normalItemListViewText'
             ]}`
          }
          onClick={() => onItemListViewClick(ITEM_LIST_VIEW_TYPES.OWNED)}
        >
          OWNED
        </span>
        <span
          className={
            `${styles.itemListViewButtons}
             ${styles[
                (itemListView === ITEM_LIST_VIEW_TYPES.WISHED) ? 
                'boldItemListViewText' :
                'normalItemListViewText'
             ]}`
          }
          onClick={() => onItemListViewClick(ITEM_LIST_VIEW_TYPES.WISHED)}
        >
          WISHED
        </span>
      </div>
      <ItemList
        items={items}
        loadingItems={loadingItems}
        onCoinIconClick={onCoinIconClick}
      />
    </div>
  );
}

export default Main;
