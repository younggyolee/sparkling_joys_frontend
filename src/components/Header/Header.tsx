import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  // onSearch: (keyword: string) => void,
  userId: string,
  onLogout: () => void
};

function Header({
  // onSearch,
  userId,
  onLogout
}: HeaderProps) {
  return (
    <div className={styles.rootContainer}>
      <div id={styles.addIconContainer}>
        <Link to='/search'>
          <img
            id={styles.addIcon}
            src={`${process.env.REACT_APP_PUBLIC_URL}/images/icons8-add-512.png`}
          />
        </Link>
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
