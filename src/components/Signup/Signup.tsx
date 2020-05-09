import React, { useState } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import styles from './Signup.module.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleSubmit() {
    // form verification here
  
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/signup`,
      {
        username,
        password
      }
    );
    if (data.result === 'ok') {
      history.push('/login');
    } else {
      // show error message, do not redirect
    }
  }

  return (
    <div className={styles.rootContainer}>
      <div>
        <Link to='/main'>
          Sparkling Joys
        </Link>
      </div>
      <div>
        <h1> Sign up </h1>
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
          onClick={handleSubmit}
        >
          Create your Sparkling Joys account.
        </button>
      </div>
    </div>
  );
}

export default Signup;
