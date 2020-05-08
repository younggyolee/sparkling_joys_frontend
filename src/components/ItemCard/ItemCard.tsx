import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemCard.module.css';
import { Item } from '../../store/items/types';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface ItemCardProps {
  item: Item
};

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.imageContainer}>
        <img
          src={item.imageURL}
          className={styles.itemImages}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.titleTextContainer}>
          <span className={styles.titleText}>
            {item.title}<br/>
          </span>
        </div>
        <div className={styles.priceTextContainer}>
          <span className={styles.prriceText}>
            {Number(item.price || 0).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,        
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
