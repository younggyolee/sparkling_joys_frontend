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
