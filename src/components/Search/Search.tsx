import React, { useState, useEffect, ReactHTML } from 'react';
import styles from './Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface SearchProps {
  onSearchEnter: (keyword: string) => void
};

function Search({onSearchEnter}: SearchProps) {
  const [text, setText] = useState('');
  
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.charCode === 13) {
      onSearchEnter(text);
    }
  }

  return (
    <div className={styles.rootContainer}>
      <span className={styles.searchLabel}>SEARCH</span>
      <input
        className={styles.searchInput}
        type='text'
        value={text}
        onChange={event => setText(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      
    </div>
  );
}

export default Search;
