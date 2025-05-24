'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Drink() {
  const [showProfile, setShowProfile] = useState(false);
  const [showGoalPopup, setShowGoalPopup] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [goal, setGoal] = useState(64); // default goal
  const [water, setWater] = useState(0);
  const router = useRouter();

  const [isProfileHovered, setProfileIsHovered] = useState(false);
  const [isBottlesHovered, setBottlesIsHovered] = useState(false);

  useEffect(() => {
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Load user data
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('wotter_current_user') || '';
      const users = JSON.parse(localStorage.getItem('wotter_users') || '{}');
      const userData = JSON.parse(localStorage.getItem(`wotter_data_${username}`) || '{}');
      setGoal(userData.goal || 64);
      setWater(userData.water || 0);
    }
  }, []);

  // Save water and goal to localStorage for the current user
  const saveUserData = (newGoal: number, newWater: number) => {
    const username = localStorage.getItem('wotter_current_user') || '';
    const userData = { goal: newGoal, water: newWater };
    localStorage.setItem(`wotter_data_${username}`, JSON.stringify(userData));
  };

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
    localStorage.removeItem('wotter_current_user');
    router.push('/');
  };

  // Progress bar calculation
  const remaining = Math.max(goal - water, 0);
  const progressPercent = goal > 0 ? (remaining / goal) * 100 : 0;

  // Handlers for water tracking
  const handleAddWater = () => {
    const newWater = Math.min(water + 1, goal); // 1 oz per click, max is goal
    setWater(newWater);
    saveUserData(goal, newWater);
  };

  const handleRemoveWater = () => {
    const newWater = Math.max(water - 1, 0); // 1 oz per click, min is 0
    setWater(newWater);
    saveUserData(goal, newWater);
  };

  // Handlers for goal popup
  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = Math.max(Number(goalInput), 1);
    setGoal(newGoal);
    if (water > newGoal) {
      setWater(newGoal);
      saveUserData(newGoal, newGoal);
    } else {
      saveUserData(newGoal, water);
    }
    setShowGoalPopup(false);
    setGoalInput('');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("assets/drink_background.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: 'auto',
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
      {/* Center content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}>
        {/* Set Goal Button */}
        <button
          style={{ marginRight: 24, padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #0074D9', background: '#fff', color: '#0074D9', fontWeight: 600 }}
          onClick={() => setShowGoalPopup(true)}
        >
          Set Goal
        </button>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          {/* Vertical Progress Bar */}
          <div style={{
            height: '40vh', // about half the page
            width: 40,
            background: '#eee',
            borderRadius: 20,
            overflow: 'hidden',
            marginRight: 24,
            border: '2px solid #0074D9',
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              height: `${progressPercent}%`,
              background: '#0074D9',
              transition: 'height 0.3s',
            }} />
            <span style={{
              position: 'absolute',
              top: 8,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#0074D9',
              fontWeight: 700,
              fontSize: 16,
              textShadow: '0 1px 2px #fff'
            }}>
              {remaining} oz
            </span>
          </div>
          {/* Water Bottle Image */}
          <img src="/assets/buttons/bottles.png" alt="Water Bottle" style={{ height: '40vh' }} />
        </div>
        {/* Add/Remove Water */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
          <button
            onClick={handleRemoveWater}
            style={{
              fontSize: 24,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid #0074D9',
              background: '#fff',
              color: '#0074D9',
              fontWeight: 700,
              marginRight: 16,
              cursor: 'pointer'
            }}
            aria-label="Remove water"
          >-</button>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', minWidth: 80, textAlign: 'center' }}>{water} oz</span>
          <button
            onClick={handleAddWater}
            style={{
              fontSize: 24,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid #0074D9',
              background: '#fff',
              color: '#0074D9',
              fontWeight: 700,
              marginLeft: 16,
              cursor: 'pointer'
            }}
            aria-label="Add water"
          >+</button>
        </div>
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
      {/* Goal popup */}
      {showGoalPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1001
          }}
          onClick={() => setShowGoalPopup(false)}
        >
          <form
            style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: 8,
              minWidth: 300,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={e => e.stopPropagation()}
            onSubmit={handleGoalSubmit}
          >
            <h3>Set Daily Goal</h3>
            <input
              type="number"
              min={1}
              value={goalInput}
              onChange={e => setGoalInput(e.target.value)}
              placeholder="Enter goal in oz"
              style={{ padding: '0.5rem', fontSize: 18, marginBottom: '1rem', width: '80%' }}
              required
            />
            <div>
              <button
                type="submit"
                style={{ padding: '0.5rem 1rem', borderRadius: 4, border: 'none', background: '#0074D9', color: '#fff', fontWeight: 600 }}
              >
                Save
              </button>
              <button
                type="button"
                style={{ marginLeft: '1rem', padding: '0.5rem 1rem', borderRadius: 4 }}
                onClick={() => setShowGoalPopup(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}