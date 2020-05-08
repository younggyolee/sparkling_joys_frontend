import React, { useState, useEffect } from 'react';
import {
  useHistory
} from 'react-router-dom';
import { Listing, avgPrice } from '../../containers/ItemDetailsContainer';
import moment from 'moment';
import { deleteItem, updateItem } from '../../utils/api';
import styles from './ItemDetails.module.css'
import Modal from '../Modal/Modal';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
  isOwned: boolean,
  listings: Listing[]
  onItemUpdate: (itemId: string) => void
  avgPrices: avgPrice[]
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
  isOwned,
  listings,
  onItemUpdate,
  avgPrices
 }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);
  const [newImageURL, setNewImageURL] = useState(imageURL);
  const [newDescription , setNewDescription] = useState(description);
  const [newIsOwned, setNewIsOwned] = useState(isOwned);
  const [showListings, setShowListings] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setNewTitle(title);
    setNewPrice(price);
    setNewImageURL(imageURL);
    setNewDescription(description);
  }, [title, price, imageURL, description]);

  async function handleDelete() {
    try {
      const result = await deleteItem(userId, itemId);
      if (result.status === 200) {
        history.push('/main');
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error('Error while deleting item', err);
    }
  }

  const data = avgPrices.map(avgPrice => ({
    date: new Date(avgPrice.endDate).valueOf(),
    price: Number(avgPrice.avgPrice)
  }));

  function formatXAxis(tickItem: number) {
    return moment(tickItem).format('MMM Do YY')
  }

  const renderLineChart = (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" tickFormatter={formatXAxis} />
      <YAxis type="number" />
    </LineChart>
  );

  return (
    <div className={styles.rootContainer}>
      <div>
        {showModal &&
          <Modal 
            show={showModal}
            onClose={() => setShowModal(false)}
          >
            <div>
              <table>
                <tbody>
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
                  <tr>
                    <td>
                      I own this
                    </td>
                    <td>
                      <label className={styles.switch}>
                        <input
                          checked={newIsOwned}
                          onChange={() => setNewIsOwned(!newIsOwned)}
                          type='checkbox'
                        />
                        <span className={styles.slider} />
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => {
                  updateItem(
                    userId,
                    itemId,
                    newTitle,
                    newPrice,
                    newImageURL,
                    newDescription,
                    newIsOwned
                  );
                  onItemUpdate(itemId);
                  setShowModal(false);
                }}
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <div
                onClick={handleDelete}
                className={styles.buttonIcons}
              >
                <FontAwesomeIcon icon={ faTrashAlt } size={ '2x' }/>
              </div>
            </div>
          </Modal>
        }
      </div>
      <div className={styles.buttonsContainer}>
        <div 
          className={styles.buttonIcons}
          onClick={() => history.push('/main')}
        >
          <FontAwesomeIcon icon={ faTimes } size={ '2x' } color='lightgrey' />
        </div>
        <div
          onClick={() => setShowModal(true)}
          className={styles.buttonIcons}
        >
          <FontAwesomeIcon icon={ faPen } size={ '2x' } color='lightgrey' />
        </div>
      </div>
      <div>
        <img src={imageURL} id={styles.itemMainImage}/>
      </div>
      <div className={styles.headerTitleContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.titleText}>{title}</h1>
        </div>
        <div className={styles.priceContainer}>
          <span>{priceCurrency} {price}</span>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chartHeaderContainer}>
          <div>
            <h2>Secondhand Market Price</h2>
          </div>
          <div>
            <label className={styles.switch}>
              <input
                checked={newIsOwned}
                onChange={() => setNewIsOwned(!newIsOwned)}
                type='checkbox'
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>
        <div>
          {renderLineChart}
        </div>
      </div>
      <div className={styles.showListingButtonContainer}>
        <span
          className={styles.showListingButtonText}
          onClick={() => setShowListings(!showListings)}
        >
          Show eBay Listings
        </span>
      </div>
      { showListings &&
        <div>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>date</th>
                <th>price</th>
                <th>currency</th>
                <th>image</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing, index) => (
                <tr key={index}>
                  <td><a href={listing.url}>{listing.title}</a></td>
                  <td>{moment(listing.endDate).format('YYYY-MM-DD')}</td>
                  <td>{listing.price}</td>
                  <td>{listing.priceCurrency}</td>
                  <td><img src={listing.imageURL} width="100px" /></td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default ItemDetails;
