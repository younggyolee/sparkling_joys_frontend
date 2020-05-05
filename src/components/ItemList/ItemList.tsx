import React, { useState, useEffect, ReactHTML } from 'react';
import styles from './ItemList.module.css';
// import { Items } from '../Main/Main';
import ItemCard from '../ItemCard/ItemCard';
import { Items } from '../../store/items/types';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface ItemListProps {
  items: Items
};

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  console.log('items', items);
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
