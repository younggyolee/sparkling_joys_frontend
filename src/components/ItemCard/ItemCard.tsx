import React, { useState } from 'react';
import styles from './ItemCard.module.css';
import { Item } from '../Main/Main';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface ItemCardProps {
  item: Item
};

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [tempPrice, setTempPrice] = useState('');

  return (
    <div className={styles.rootContainer}> 
      <img
        src={item.imageURL}
        className={styles.itemImages}
      />
      <div className={styles.textContainer}>
        <div className={styles.titleTextContainer}>
          <span className={styles.titleText}>
            {item.title}<br/>
          </span>
        </div>
        <div className={styles.priceTextContainer}>
          <span className={styles.prriceText}>
            {item.priceCurrency} {item.price}
          </span>
        </div>
      </div>
      
      {/* <div>
          <input type='text' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempPrice(event.target.value)} />
          <button
            onClick={async() => {
              await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${item.id}`,
                {
                  type: 'price',
                  price: tempPrice,
                  priceCurrency: 'USD'
                }
              );
              // updateItems();
            }}
          >Edit price</button>
      </div> */}
    </div>
  );
}

export default ItemCard;
