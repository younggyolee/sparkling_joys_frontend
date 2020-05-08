import React from 'react';
import {
  Link
} from 'react-router-dom'
import styles from './ItemList.module.css';
import ItemCard from '../ItemCard/ItemCard';
import { Items } from '../../store/items/types';
import axios from 'axios';
import { loadingItems } from '../../store/loadingItems/types';
axios.defaults.withCredentials = true;

interface ItemListProps {
  items: Items,
  loadingItems: loadingItems,
  onCoinIconClick: (
    // userId: string,
    itemId: string,
    isOwned: boolean
  ) => void
};

const ItemList: React.FC<ItemListProps> = ({ items, loadingItems, onCoinIconClick }) => {
  return (
    <div className={styles.rootContainer}>
      {loadingItems.map((loadingItem, index) =>
        (
          <div key={index} className={styles.itemCardContainer}>
            <ItemCard
              item={{
                id: '',
                title: loadingItem.title,
                price: 0,
                priceCurrency: '',
                imageURL: loadingItem.imageURL,
                isOwned: false
              }}
              key={index}
              onCoinIconClick={onCoinIconClick}
            />
          </div>
        )
      )}
      {items.map((item, index) => 
        (
          <div key={index} className={styles.itemCardContainer}>
            <ItemCard
              item={item}
              key={index}
              onCoinIconClick={onCoinIconClick} 
            />
          </div>
        )
      )}
    </div>
  );
}

export default ItemList;
