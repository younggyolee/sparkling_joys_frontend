import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
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

  const [tempPrice, setTempPrice] = useState('');

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    <div className={styles.container}>
      <div className={styles.totalValueContainer}>
        Your Assets value at ${totalValue}
      </div>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={event => setTitle(event.target.value)}/>
          <input type='submit' value='Add' />
        </form>
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
              <div>
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
                      updateItems();
                    }}
                  >Edit price</button>
              </div>
              <button onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Index;
