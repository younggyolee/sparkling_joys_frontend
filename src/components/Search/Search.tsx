import React, { useState } from 'react';
import styles from './Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
      <input
        className={styles.searchInput}
        type='text'
        placeholder='Search'
        value={text}
        onChange={event => setText(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Search;
