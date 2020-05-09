import React, { useState } from 'react';
import { 
  Link
} from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface StateProps {
  onLoginSubmit: (username: string, password: string) => void,
};

function Login({ onLoginSubmit }: StateProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.rootContainer}>
      <div>
        <Link to='/main'>
          Sparkling Joys
        </Link>
      </div>
      <div>
        <h3> Login </h3>
      </div>
      <div>
        Username: 
        <input
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          className={styles.primaryButton}
          onClick={() => onLoginSubmit(username, password)}
        >
          Continue
        </button>
      </div>
      <div>
        <Link to='/signup'>
          <button
            className={styles.secondaryButton}
          >
            Create your new account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
