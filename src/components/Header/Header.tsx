import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  userId: string,
  onLogout: () => void
};

function Header({
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
        <div className={styles.loginButtonsContainer}>
          <Link to='/main'>
            <span 
              id={styles.titleText}
              className={styles.loginButtons}
            >
              Sparkling Joys
            </span>
          </Link>
        </div>
        <div className={styles.loginButtonsContainer}>
          {userId &&
            <span
              id={styles.logoutText}
              className={styles.loginButtons}
              onClick={onLogout}
            >
              LOG OUT
            </span>
          }
          {!userId &&
            <>
              <Link to='/login'>
                <span
                  id={styles.signupLink}
                  className={styles.loginButtons}
                >
                  Sign in
                </span>
              </Link>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
