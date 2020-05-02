import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import ItemList from '../ItemList/ItemList';
import axios from 'axios';

// const axios = require('axios');
axios.defaults.withCredentials = true;

export interface Items extends Array<Item>{};

export interface Item {
  id: string,
  title: string,
  price: number,
  priceCurrency: string,
  imageURL: string
};

function Index() {

  const [title, setTitle] = useState('');
  const [items, setItems] = useState<Items>([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    updateItems();
  }, []);

  async function updateItems() {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/guest/items`
    );
    setItems(response.data.items);
    setTotalValue(response.data.totalValue);
  }

  async function handleSubmit(title: string) {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${title}`
    );
    updateItems();
  }

  async function handleDelete(itemId: string) {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${itemId}`
    );
    updateItems();
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.headerContainer}>
        <Header onSearchEnter={handleSubmit}/>
      </div>
      <div>
        <ItemList items={items} updateItems={updateItems} />
      </div>
    </div>
  );
}

export default Index;
