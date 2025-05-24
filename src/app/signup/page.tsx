'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </label>
        </div>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: '0.75rem' }}>Create Account</button>
      </form>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back to Login</a>
      </div>
    </div>
  );
}
