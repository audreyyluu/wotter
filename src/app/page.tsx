'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/login.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('wotter_users') || '{}');
    if (users[username] && users[username] === password) {
      setError('');
      localStorage.setItem('wotter_current_user', username);
      router.push('/drink');
    } else {
      setError('Invalid credentials. Please sign up if you do not have an account.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("assets/login_background.png")',
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
        <form onSubmit={handleLogin}>
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
            <button
              type="submit"
              className={styles.loginButton}
            >
              Login
            </button>
          </div>

        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>
          <span>Don&apos;t have an account? </span>
          <a href="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>Sign up!</a>
        </div>
      </div>
    </div>

  );
}