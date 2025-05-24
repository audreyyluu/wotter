'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Drink() {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  let username = '';
  let password = '';
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('wotter_current_user') || '';
    const users = JSON.parse(localStorage.getItem('wotter_users') || '{}');
    password = users[username] || '';
  }

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div>
      {/* Top left profile button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '1rem' }}>
        <button onClick={() => setShowProfile(true)}>Profile</button>
      </div>
      {/* Top right bottles button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', margin: '1rem', position: 'absolute', top: 0, right: 0 }}>
        <a href="/bottles">
          <button>Wotter Bottles</button>
        </a>
      </div>
      <p>Main page</p>
      {/* Bottom left stamp card button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', position: 'fixed', bottom: 0, margin: '1rem' }}>
        <a href="/stamp">
          <button>Stamp Card</button>
        </a>
      </div>
      {/* Profile popup */}
      {showProfile && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowProfile(false)}
        >
          <div
            style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: 8,
              minWidth: 300,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3>Profile Information</h3>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Username:</strong> {username}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Password:</strong> {password}
            </div>
            <button
              style={{ padding: '0.5rem 1rem', borderRadius: 4, border: 'none' }}
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              style={{ marginLeft: '1rem', padding: '0.5rem 1rem', borderRadius: 4 }}
              onClick={() => setShowProfile(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}