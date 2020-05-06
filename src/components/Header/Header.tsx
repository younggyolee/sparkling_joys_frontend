import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Search from '../Search/Search';
import { logout } from '../../utils/api';

interface HeaderProps {
  onSearch: (keyword: string) => void,
  userId: string,
  onLogout: () => void
};

function Header({ onSearch, userId, onLogout }: HeaderProps) {
  console.log('userId', userId);
  return (
    <div className={styles.rootContainer}>
      <span>
        <Link to='/main'>Sparkling Joys[ICON]</Link>
      </span>
      <Search onSearch={onSearch} />
      {userId &&
        <button
        onClick={onLogout}
        >
          <span>LOG OUT</span>
        </button>
      }
      {!userId &&
        <>
          <Link to='/signup'>
            <button>SIGN UP</button>
          </Link>
          <Link to='/login'>
            <button>LOG IN</button>
          </Link>
        </>
      }
    </div>
  );
}

export default Header;
