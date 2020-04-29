import React, { useState, useEffect } from 'react';
const axios = require('axios');
import { saveItem, getItems } from '../../utils/localStorage';

function Index() {
  const [title, setTitle] = useState('');
  const [displayItems, setDisplayItems] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isUpdated) {
      const { items, itemIds } = (getItems());
      itemIds.map(itemId => items[itemId]);
    }
    setIsUpdated(false);
  }, [isUpdated]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // for guests
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
        Your Assets value at {}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={e => setTitle(e.target.value)}/>
          <input type='submit' value='Search' />
        </form>
      </div>
      
      <button
        onClick={() => {
          localStorage.setItem('testData', 'Hello data');
          console.log('data saved');
        }}
      >Save something into local storage</button>
      <button
        onClick={() => {
          console.log('data loaded', localStorage.getItem('testData'));
        }}
      >Get something from local storage</button>
    </div>
  );
}

export default Index;
