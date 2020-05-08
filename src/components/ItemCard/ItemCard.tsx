import React, { useState } from 'react';
import { 
  Link
} from 'react-router-dom';
import styles from './ItemCard.module.css';
import { Item } from '../../store/items/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface ItemCardProps {
  item: Item,
  onCoinIconClick: (
    // userId: string,
    itemId: string,
    isOwned: boolean
  ) => void
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onCoinIconClick }) => {
  return (
    <div className={styles.rootContainer}>
      {item.id && 
        <Link to={`/items/${item.id}`}>
          <div className={styles.imageContainer}>
            <img
              src={item.imageURL}
              className={styles.itemImages}
            />
          </div>
        </Link>
      }
      {!item.id &&
        <div className={styles.imageContainer}>
          <img
            src={
              (item.id && !item.imageURL) ?
              (`${process.env.REACT_APP_PUBLIC_URL}/images/icons8-box-512.png`) :
              item.imageURL
            }
            className={styles.itemImages}
          />
        </div>
      }
      <div className={styles.infoContainer}>
        <div id={styles.titleAndPriceContainer}>
          <span id={styles.titleText}>
            {item.title}
          </span>
          <br/>
          {
            item.id &&
            <span className={styles.priceText}>
              {Number(item.price || 0).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,        
              })}
            </span>
          }
        </div>
        <div
          onClick={() => onCoinIconClick(item.id, !item.isOwned)}
          className={styles.coinIconContainer}
        >
          <FontAwesomeIcon
            icon={ faCoins }
            size={ '2x' }
            color={item.isOwned ? 'black' : 'lightgrey'}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
