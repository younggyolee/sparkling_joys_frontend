export function saveItem(
    title: string,
    translatedTitle: string,
    avgPrice: number
  ) {
  const item = {
    title,
    translatedTitle,
    avgPrice
  };
  const items = JSON.parse(localStorage.getItem('items') || '{}');
  const itemIds = JSON.parse(localStorage.getItem('itemIds') || '[]');
  const itemId = Number(localStorage.getItem('nextItemId')) || 0;

  items[itemId] = item;
  itemIds.push(itemId);

  localStorage.setItem('items', JSON.stringify({
    title,
    translatedTitle,
    avgPrice
  }));
  localStorage.setItem('itemIds', itemIds);
  localStorage.setItem('nextItemId', JSON.stringify(itemId + 1));
};

export function getItems() {
  return {
    items: JSON.parse(localStorage.getItem('items') || '{}'),
    itemIds: JSON.parse(localStorage.getItem('itemIds') || '[]')
  };
};
