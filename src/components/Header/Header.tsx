import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Search from '../Search/Search';

interface HeaderProps {
  onSearch: (keyword: string) => void,
  userId: string
};

function Header({ onSearch, userId }: HeaderProps) {
  return (
    <div className={styles.rootContainer}>
      <span>
        <Link to='/main'>Sparkling Joys[ICON]</Link>
      </span>
      <Search onSearch={onSearch} />
      <Link to='/signup'>
        <span>SIGN UP</span>
      </Link>
      <Link to='/login'>
        <span>LOG IN</span>
      </Link>
    </div>
  );
}

export default Header;
