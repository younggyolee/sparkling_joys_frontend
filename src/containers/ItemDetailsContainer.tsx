import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RootState } from '../store';
import ItemDetails from '../components/ItemDetails/ItemDetails';
import { getItemDetails, getAvgPriceDaily } from '../utils/api';
import axios from 'axios';
axios.defaults.withCredentials = true;

export interface Item {
  id: string,
  title: string,
  userId: string,
  price: number,
  priceCurrency: string,
  priceLastUpdateTime: string,
  imageURL: string,
  description: string,
  creationTime: string,
  isOwned: boolean
};

export interface Listing {
  title: string,
  endDate: string,
  price: string,
  priceCurrency: string,
  source: string,
  url: string,
  imageURL: string
};

export interface avgPrice {
  endDate: string,
  avgPrice: string
}

const ItemDetailsContainer: React.FC<any> = (props) => {
  const [item, setItem] = useState<Item>({
    id: '',
    title: '',
    userId: '',
    price: 0,
    priceCurrency: '',
    priceLastUpdateTime: '',
    imageURL: '',
    description: '',
    creationTime: '',
    isOwned: true
  });
  const [listings, setListings] = useState<Listing[]>([]);
  const [avgPrices, setAvgPrices] = useState<avgPrice[]>([]);

  useEffect(() => {
    (async() => {
      await updateItemDetails(props.match.params.itemId);
      await updateAvgPriceDaily(props.match.params.itemId);
    })();
  }, [props.match.params.itemId]);

  async function updateItemDetails(itemId: string) {
    const data = await getItemDetails(itemId);
    setItem(data.item);
    setListings(data.listings);
  }

  async function updateAvgPriceDaily(itemId: string) {
    const data = await getAvgPriceDaily(itemId);
    setAvgPrices(data.avgPriceDaily);
  }

  return (
    <ItemDetails
      userId={props.userId}
      itemId={props.match.params.itemId}
      title={item.title}
      price={item.price}
      priceCurrency={item.priceCurrency}
      priceLastUpdateTime={item.priceLastUpdateTime}
      imageURL={item.imageURL}
      description={item.description}
      creationTime={item.creationTime}
      isOwned={item.isOwned}
      listings={listings}
      onItemUpdate={updateItemDetails}
      avgPrices={avgPrices}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId
});

export default withRouter(
  connect(mapStateToProps, null)(ItemDetailsContainer)
);
