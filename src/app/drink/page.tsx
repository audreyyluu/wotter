'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Drink() {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();


  const [isProfileHovered, setProfileIsHovered] = useState(false);
  const [isBottlesHovered, setBottlesIsHovered] = useState(false);

  useEffect(() => {
    document.documentElement.style.margin = '0'; // correct
    document.documentElement.style.padding = '0'; // correct
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  const profileIcon = isProfileHovered
    ? '/assets/buttons/profile_hover.png'
    : '/assets/buttons/profile.png';


  const bottlesIcon = isBottlesHovered
    ? '/assets/buttons/bottles_hover.png'
    : '/assets/buttons/bottles.png';

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
    <div
      style={{
        backgroundImage: 'url("assets/drink_background.png")',
        backgroundSize: 'cover', // Optional: Adjust how the image is sized
        backgroundRepeat: 'no-repeat', // Optional: Prevent the image from repeating
        height: '100vh', // Optional: Set a height for the element
        width: 'auto', // Optional: Set a width for the element
        margin: 0,
        overflow: 'auto',
      }}>
      {/* Top left profile button */}
      <div

        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '1rem', width: '7vw', height: 'auto' }}>
        <button onClick={() => setShowProfile(true)}>
          <img
            src={profileIcon}
            alt="profile"
            onMouseEnter={() => setProfileIsHovered(true)}
            onMouseLeave={() => setProfileIsHovered(false)}
            style={{ transform: `scale(${isProfileHovered ? 1.5 : 1})`, transition: 'transform 0.3s ease' }}
          />
        </button>

      </div>
      {/* Top right bottles button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', margin: '1rem', width: '7vw', height: 'auto', position: 'absolute', top: 0, right: 0 }}>
        <a href="/bottles">
          <img
            src={bottlesIcon}
            alt="bottles"
            onMouseEnter={() => setBottlesIsHovered(true)}
            onMouseLeave={() => setBottlesIsHovered(false)}
            style={{ transform: `scale(${isBottlesHovered ? 1.5 : 1})`, transition: 'transform 0.3s ease' }}

          />
        </a>
      </div>
      <p>Main page</p>
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