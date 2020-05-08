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
  loadingItems: loadingItems
};

const ItemList: React.FC<ItemListProps> = ({ items, loadingItems }) => {
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
                imageURL: loadingItem.imageURL
              }}
              key={index} 
            />
          </div>
        )
      )}
      {items.map((item, index) => 
        (
          <div key={index} className={styles.itemCardContainer}>
            <Link to={`/items/${item.id}`}>
              <ItemCard item={item} key={index} />
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default ItemList;
