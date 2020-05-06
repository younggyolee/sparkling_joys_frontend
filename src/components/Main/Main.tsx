import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import ItemList from '../ItemList/ItemList';
import { Items } from '../../store/items/types';
import axios from 'axios';
import HeaderContainer from '../../containers/HeaderContainer';
axios.defaults.withCredentials = true;

interface MainProps {
  items: Items
};

const Main: React.FC<MainProps> = ({ items }) => {
  return (
    <div className={styles.rootContainer}>
      <ItemList items={items} />
    </div>
  );
}

export default Main;
