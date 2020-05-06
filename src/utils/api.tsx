import axios from 'axios';

export async function addItem(userId: string, keyword: string) {
  userId ?
  (await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}/items/${keyword}`)) :
  (await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${keyword}`));
}

export async function getItems(userId: string) {
  let { data }: any = userId ?
    (await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}/items`)) :
    (await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/guest/items`));
  return data.items;
};

export async function deleteItem(userId: string, itemId: string) {
  let result;
  userId ?
  (result = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}/items/${itemId}`
  )) :
  (result = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${itemId}`
  ));
  return result;
};

export async function updateItem(
  userId: string,
  itemId: string,
  title: string,
  price: number,
  imageURL: string,
  description: string
) {
  let result;
  userId ?
  (result = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}/items/${itemId}`, {
      title,
      price,
      imageURL,
      description
    }
  )) :
  (result = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/guest/items/${itemId}`, {
      title,
      price,
      imageURL,
      description
    }
  ));
  return result;
};

export async function getItemDetails(itemId: string) {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/items/${itemId}/details`
  );
  return data;
};

export async function getAvgPriceDaily(itemId: string) {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/items/${itemId}/avg-price-daily`
  );
  return data;
}

export async function logout() {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/logout`
  );
  return data;
};

export async function getUser() {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/user`
  );
  return data;
}
