import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface StateProps {
  onLogin: (userId: string) => void
};

function Login({ onLogin }: StateProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    const response: any = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      {
        username,
        password
      }
    );
    console.log(response.data);

    if (response.data.result === 'ok' && response.data.userId) {
      const userId: string = response.data.userId;
      onLogin(userId);
    }
  }

  return (
    <div>
      <div>
        <h1> Login </h1>
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
      <div>
        <Link to='/main'> Main </Link>
      </div>
    </div>
  );
}

export default Login;
