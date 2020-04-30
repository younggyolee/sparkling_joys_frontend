import { v4 as uuidv4 } from 'uuid';

export function saveItem(
    title: string,
    translatedTitle: string,
    avgPrice: number,
    imageURL: string,
    currency: string
  ) {
  const item = {
    title,
    translatedTitle,
    avgPrice,
    imageURL,
    currency
  };
  console.log('item', item);
  const items = JSON.parse(localStorage.getItem('items') || '{}');
  const itemIds = JSON.parse(localStorage.getItem('itemIds') || '[]');
  const itemId = uuidv4();

  items[itemId] = item;
  itemIds.push(itemId);

  localStorage.setItem('items', JSON.stringify(items));
  localStorage.setItem('itemIds', JSON.stringify(itemIds));
};

export function getVisibleItems() {
  const items = JSON.parse(localStorage.getItem('items') || '{}');
  const itemIds = JSON.parse(localStorage.getItem('itemIds') || '[]');
  return itemIds.map((itemId: string) => {
    return {
      id: itemId,
      ...items[itemId]
    };
  });
};
