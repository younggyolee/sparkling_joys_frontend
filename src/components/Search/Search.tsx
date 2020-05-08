import React, { useState } from 'react';
import styles from './Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

interface SearchProps {
  onSearch: (keyword: string) => void
};

function Search({ onSearch }: SearchProps) {
  const [text, setText] = useState('');

  const history = useHistory();

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.charCode === 13) {
      onSearch(text);
      setText('');
    }
  }

  return (
    <div className={styles.rootContainer}>
      <div
        className={styles.headerContainer}
      >
        <div
          className={styles.closeButtonContainer}
          onClick={() => history.push('/main')}
        >
          <FontAwesomeIcon
            icon={ faTimes }
            size={ '2x' }
            color={ 'lightgrey' } 
          />
        </div>
      </div>
      <input
        autoFocus
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
