import React, { useState, useEffect } from 'react';
import styles from './Reception.module.css';
import Header from '../Header/Header';
import Search from '../Search/Search';

const axios = require('axios');
axios.defaults.withCredentials = true;

function Reception() {
  // interface Item {
  //   id: string,
  //   title: string,
  //   price: number,
  //   priceCurrency: string,
  //   imageURL: string
  // };

  // interface Items extends Array<Item>{}

  // const [title, setTitle] = useState('');
  // const [items, setItems] = useState<Items>([]);
  // const [totalValue, setTotalValue] = useState(0);

  // const [tempPrice, setTempPrice] = useState('');

  // useEffect(() => {
  //   updateItems();
  // }, []);

  // async function updateItems() {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_BACKEND_URL}/api/guest/items`
  //   );
  //   setItems(response.data.items);
  //   setTotalValue(response.data.totalValue);
  // }

  // async function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
  //   event.preventDefault();
  //   await axios.post(
  //     `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${title}`
  //   );
  //   updateItems();
  // }

  return (
    <div className={styles.rootContainer}>
      {/* <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.searchAreaContainer}>
        <h1>All your stuffs in one place.</h1>
        <h2>
          Organise your assets at one place,<br/>
          and track their current value.
        </h2>
        <div className={styles.searchComponentContainer}>
          <Search onSearchEnter={handleSubmit} />
        </div>
      </div> */}
    </div>
  );
}

export default Reception;
