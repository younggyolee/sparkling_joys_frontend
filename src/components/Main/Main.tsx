import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import ItemList from '../ItemList/ItemList';
import { Items } from '../../store/items/types';
import axios from 'axios';
import HeaderContainer from '../../containers/HeaderContainer';
import { loadingItems } from '../../store/loadingItems/types';
axios.defaults.withCredentials = true;

interface MainProps {
  items: Items,
  loadingItems: loadingItems,
  totalValue: number
};

const Main: React.FC<MainProps> = ({
  items,
  loadingItems,
  totalValue
}) => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.assetDisplayContainer}>
        <span className={styles.assetDisplayText}>
          {'Your assets worth '}
          {Number(totalValue).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,        
          })}
        </span>
      </div>
      <ItemList items={items} loadingItems={loadingItems} />
    </div>
  );
}

export default Main;
