import React, { useState } from 'react';
import styles from './Signup.module.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/signup`,
      {
        username,
        password
      }
    );
  }

  return (
    <div>
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
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signup;
