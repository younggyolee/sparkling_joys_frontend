import React from 'react';
import styles from './Reception.module.css';
import Search from '../Search/Search';

const axios = require('axios');
axios.defaults.withCredentials = true;

interface ReceptionProps {
  onSearch: (keyword: string) => void
};

const Reception: React.FC<ReceptionProps> = ({ onSearch }) => {
  return (
    <div className={styles.rootContainer}>
      <div>
        <h1 className={styles.mainMessageText}>See how much your stuffs value.</h1>
        <Search onSearch={onSearch} />
      </div>
    </div>
  );
}

export default Reception;
