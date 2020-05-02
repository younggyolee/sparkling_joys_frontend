import React, { useState, useEffect, ReactHTML } from 'react';
import styles from './ItemList.module.css';
import { Items } from '../Main/Main';
import axios from 'axios';
import ItemCard from '../ItemCard/ItemCard';
axios.defaults.withCredentials = true;

interface ItemListProps {
  items: Items,
  updateItems: () => void
}

const ItemList: React.FC<ItemListProps> = ({items, updateItems}) => {
  const [tempPrice, setTempPrice] = useState('');

  return (
    <div className={styles.rootContainer}>
      {items.map((item, index) => {
        return (
          <div className={styles.itemCardContainer}>
            <ItemCard item={item} key={index} />
          </div>
        )
      })}
    </div>
  );
}

export default ItemList;
