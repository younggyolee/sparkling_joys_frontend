import React, { useState, useEffect } from 'react';
import { Listing } from '../../containers/ItemDetailsContainer';
import {
  Redirect
} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { deleteItem } from '../../utils/api';
axios.defaults.withCredentials = true;

interface ItemDetailProps {
  userId: string,
  itemId: string,
  title: string,
  price: number,
  priceCurrency: string,
  priceLastUpdateTime: string,
  imageURL: string,
  description: string,
  creationTime: string,
  listings: Listing[]
};

const ItemDetail: React.FC<ItemDetailProps> = ({
  userId,
  itemId,
  title,
  price,
  priceCurrency,
  priceLastUpdateTime,
  imageURL,
  description,
  creationTime,
  listings,
 }) => {
   const [isRedirecting, setIsRedirecting] = useState(false);
   useEffect(() => {
    console.log('title', title);
    console.log('listings', listings);
   }, [title, listings])

  return (
    
    <div>
      {isRedirecting && <Redirect to='/main' />}
      <div>
        <img src={imageURL} />
      </div>
      <h1>{title}</h1>
      <div>
        <span>{priceCurrency}</span>
        <span>{price}</span>
      </div>
      <div>
        <button
          onClick={async() => {
            try {
              const result = await deleteItem(userId, itemId);
              if (result.status === 200) {
                setIsRedirecting(true);
              } else {
                throw new Error();
              }
            } catch (err) {
              console.error('Error while deleting item', err);
            }
          }}
        >
          REMOVE
        </button>
      </div>
      <table>
        <tr>
          <th>title</th>
          <th>date</th>
          <th>price</th>
          <th>currency</th>
          <th>image</th>
        </tr>
        {listings.map(listing => (
          <tr>
            <td><a href={listing.url}>{listing.title}</a></td>
            <td>{moment(listing.endDate).format('YYYY-MM-DD')}</td>
            <td>{listing.price}</td>
            <td>{listing.priceCurrency}</td>
            <td><img src={listing.imageURL} width="100px" /></td>
          </tr>
          ))
        }
      </table>
      
    </div>
  );
}

export default ItemDetail;
