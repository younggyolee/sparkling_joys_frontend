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
  loadingItems: loadingItems
};

const Main: React.FC<MainProps> = ({ items, loadingItems }) => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.assetDisplayContainer}>
        <span className={styles.assetDisplayText}>
          Your assets worth USD 100
        </span>
      </div>
      <ItemList items={items} loadingItems={loadingItems} />
    </div>
  );
}

export default Main;
