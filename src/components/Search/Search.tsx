import React, { useState } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (keyword: string) => void
};

function Search({ onSearch }: SearchProps) {
  const [text, setText] = useState('');
  
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.charCode === 13) {
      onSearch(text);
      setText('');
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
