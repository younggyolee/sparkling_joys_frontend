import React, { useState, useEffect } from 'react';
import { Listing } from '../../containers/ItemDetailsContainer';
import {
  Redirect
} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { deleteItem, updateItem } from '../../utils/api';
import styles from './ItemDetails.module.css'
import Modal from '../Modal/Modal';
axios.defaults.withCredentials = true;

interface ItemDetailsProps {
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
  onItemUpdate: (itemId: string) => void
};

const ItemDetails: React.FC<ItemDetailsProps> = ({
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
  onItemUpdate
 }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);
  const [newImageURL, setNewImageURL] = useState(imageURL);
  const [newDescription , setNewDescription] = useState(description);

  useEffect(() => {
    setNewTitle(title);
    setNewPrice(price);
    setNewImageURL(imageURL);
    setNewDescription(description);
  }, [title, price, imageURL, description]);

  return (
    <div>
      {isRedirecting && <Redirect to='/main' />}
      <div>
        <img src={imageURL} />
      </div>
      <h1>{title}</h1>
      <div>
        {showModal &&
          <Modal 
            show={showModal}
            onClose={() => setShowModal(false)}
          >
            <div>
              <table>
                <tr>
                  <td>Title</td>
                  <td><input
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <input
                      value={newPrice}
                      onChange={e => setNewPrice(Number(e.target.value))}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Image URL</td>
                  <td>
                    <input
                      value={newImageURL}
                      onChange={e => setNewImageURL(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Description
                  </td>
                  <td>
                    <input
                      value={newDescription}
                      onChange={e => setNewDescription(e.target.value)}
                    />
                  </td>
                </tr>
              </table>
              <button
                onClick={() => {
                  // submit to API
                  updateItem(
                    userId,
                    itemId,
                    newTitle,
                    newPrice,
                    newImageURL,
                    newDescription
                  );
                  onItemUpdate(itemId);
                  // close modal
                  setShowModal(false);
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </Modal>
        }
      </div>
      <div>
          <span>{priceCurrency}{price}</span>
          <button  onClick={() => setShowModal(true)}>Edit</button>
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

export default ItemDetails;
