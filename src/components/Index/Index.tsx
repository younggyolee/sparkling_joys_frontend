import React, { useState, useEffect } from 'react';
import { saveItem, getVisibleItems } from '../../utils/localStorage';
const axios = require('axios');

function Index() {
  interface Item {
    avgPrice: number,
    id: string,
    title: string,
    translatedTitle: string
  };

  interface Items extends Array<Item>{}

  const [title, setTitle] = useState('');
  const [items, setItems] = useState<Items>([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // calculate the sum
    const sum = items.reduce((accumulator, currentItem) =>
      accumulator + currentItem.avgPrice, 0
    );
    setTotalValue(sum);
  }, [items]);

  useEffect(() => {
    if (isUpdated) {
      setItems(getVisibleItems());
      setIsUpdated(false);
    }
  }, [isUpdated]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${title}`
    );

    saveItem(
      title,
      response.data.translatedKeyword,
      response.data.avgPrice
    );

    setIsUpdated(true);
  }
  return (
    <div>
      <div>
        Your Assets value at ${totalValue}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={e => setTitle(e.target.value)}/>
          <input type='submit' value='Search' />
        </form>
      </div>
      <div>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <p>${item.avgPrice}</p>
              <p>{item.title}</p>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => localStorage.clear()}
      >
        Clear storage
      </button>
    </div>
  );
}

export default Index;
