import React, { useState, useEffect, ReactHTML } from 'react';
import styles from './Header.module.css';
import Search from '../Search/Search';

interface SearchProps {
  onSearchEnter: (keyword: string) => void
};

function Header({onSearchEnter}: SearchProps) {
  return (
    <div className={styles.rootContainer}>
      <span>Sparkling Joys[ICON]</span>
      <Search onSearchEnter={onSearchEnter} />
      <span>LOG IN</span>
    </div>
  );
}

export default Header;
