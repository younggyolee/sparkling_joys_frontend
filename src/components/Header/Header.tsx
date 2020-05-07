import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  onSearch: (keyword: string) => void,
  userId: string,
  onLogout: () => void
};

function Header({ onSearch, userId, onLogout }: HeaderProps) {
  console.log('userId', userId);
  return (
    <div className={styles.rootContainer}>
      {/* <div className={styles.searchContainer}> */}
      <div>
        {/* <FontAwesomeIcon icon={ faPlusCircle } size={ '2x' } /> */}
        <img
          id={styles.addIcon}
          src={`${process.env.REACT_APP_PUBLIC_URL}/images/icons8-add-512.png`}
        />
      </div>
      <div id={styles.rightButtonArea}>
        <div className={styles.loginButtons}>
          <Link to='/main'>
            <span id={styles.titleText}>
              Sparkling Joys
            </span>
          </Link>
        </div>
        <div className={styles.loginButtons}>
          {userId &&
            <span
              id={styles.logoutText}
              onClick={onLogout}
            >
              LOG OUT
            </span>
          }
          {!userId &&
            <>
              <Link to='/login'>
                <span id={styles.signupLink}>Sign in</span>
              </Link>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
