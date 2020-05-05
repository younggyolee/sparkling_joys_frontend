import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store';
import ItemDetails from '../components/ItemDetails/ItemDetails';
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

const ItemDetailsContainer: React.FC<any> = (props) => {
  console.log(props);
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
  });
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    (async() => {
      const data = await getItemDetails(props.match.params.itemId);
      setItem(data.item);
      setListings(data.listings);
    })();
  }, []);

  async function getItemDetails(itemId: string) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${itemId}/details`
    );
    return data;
  }

  return (
    <div>
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
        listings={listings}
      />
    </div>
  );
};

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     // setUserId(userId: string) {
//     //   dispatch(setUserIdAction(userId));
//     // },
//     // setItems(items: Items) {
//     //   dispatch(setItemsAction(items));
//     // }
//   };
// };

const mapStateToProps = (state: RootState) => ({
  userId: state.userId
});

export default withRouter(
  connect(mapStateToProps, null)(ItemDetailsContainer)
);

// export default ItemDetailsContainer;
