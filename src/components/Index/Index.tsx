import React, { useState, useEffect } from 'react';
import styles from './Index.module.css';
const axios = require('axios');
axios.defaults.withCredentials = true;

function Index() {
  interface Item {
    id: string,
    title: string,
    price: number,
    priceCurrency: string,
    imageURL: string
  };

  interface Items extends Array<Item>{}

  const [title, setTitle] = useState('');
  const [items, setItems] = useState<Items>([]);
  const [totalValue, setTotalValue] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${title}`
    );
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/guest/items`
    );
    setItems(response.data);
  }

  return (
    <div className={styles.container}>
      <div className={styles.totalValueContainer}>
        Your Assets value at ${totalValue}
      </div>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={e => setTitle(e.target.value)}/>
          <input type='submit' value='Add' />
        </form>
      </div>
      <div>
        <button
          onClick={() => localStorage.clear()}
        >
          Clear storage
        </button>
        <button
          onClick={async() => {
            const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/guest/items`
            );
            // console.log(response);
          }}
        >
          Get Items
        </button>
      </div>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.imageURL}
                className={styles.itemImages}
              />
              <p>{item.priceCurrency} {item.price}</p>
              <p>{item.title}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Index;
