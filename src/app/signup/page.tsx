'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/login.module.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter a username and password.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('wotter_users') || '{}');
    if (users[username]) {
      setError('Username already exists.');
      return;
    }
    users[username] = password;
    localStorage.setItem('wotter_users', JSON.stringify(users));
    setError('');
    router.push('/');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("assets/signin_background.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: 'auto',
        margin: 0,
        overflow: 'auto',

      }}
      className={styles['background-fadeIn']}>
      <img
        src="assets/logo.png"
        alt="bottles"
        className={styles['animation-fadeIn']}
      />
      <div className={styles.loginBox}>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder=" 🦦  Username"
                className={styles.inputField}
              />
          </div>
          <div style={{ marginBottom: '1rem' }}>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder=" 🐚  Password"
                className={styles.inputField}
              />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className={styles.loginButton}>Create Account</button>
          </div>
        
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back to Login</a>
        </div>
      </div>

    </div>

  );
}
