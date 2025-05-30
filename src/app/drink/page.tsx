'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/drink.module.css';

export default function Drink() {
  const [showProfile, setShowProfile] = useState(false);
  const [showGoalPopup, setShowGoalPopup] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [goal, setGoal] = useState(64); // default goal
  const [water, setWater] = useState(0);
  const [shells, setShells] = useState(0);
  const router = useRouter();

  const [isProfileHovered, setProfileIsHovered] = useState(false);
  const [isBottlesHovered, setBottlesIsHovered] = useState(false);
  const [isSetGoalHovered, setSetGoalIsHovered] = useState(false);
  const [isMinusHovered, setMinusIsHovered] = useState(false);
  const [isPlusHovered, setPlusIsHovered] = useState(false);
  const [otterBlink, setOtterBlink] = useState(false);
  const [selectedBottle, setSelectedBottle] = useState("blue");

  useEffect(() => {
    const interval = setInterval(() => {
      setOtterBlink(true);
      setTimeout(() => setOtterBlink(false), 100);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
    setShells(userData.shells || 0);

    // Load selected bottle
    const selected = localStorage.getItem(`selected_bottle_${username}`) || "blue";
    setSelectedBottle(selected);
  }
}, []);


  const bottleImages: { [color: string]: string } = {
    blue: "/assets/bottles/plasticbottle.png",
    brown: "/assets/bottles/stanley.png",
    purple: "/assets/bottles/hydroflask.png",
    pink: "/assets/bottles/owala.png",
  };

  // Save water and goal to localStorage for the current user
  const saveUserData = (newGoal: number, newWater: number, newShells: number) => {
    const username = localStorage.getItem('wotter_current_user') || '';
    const userData = { goal: newGoal, water: newWater, shells: newShells };
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
  const progressPercent = goal > 0 ? (water / goal) * 100 : 0;

  // Handlers for water tracking
  const handleAddWater = () => {
    const newWater = Math.min(water + 1, goal); // 1 oz per click, max is goal
    const diff = newWater - water;
    const newShells = shells + diff;
    setWater(newWater);
    setShells(newShells);
    saveUserData(goal, newWater, newShells);
  };

  const handleRemoveWater = () => {
    const newWater = Math.max(water - 1, 0); // 1 oz per click, min is 0
    const diff = newWater - water;
    const newShells = shells + diff;
    setWater(newWater);
    setShells(newShells);
    saveUserData(goal, newWater, newShells);
  };

  // Set goal
  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = Math.max(Number(goalInput), 1);
    setGoal(newGoal);
    if (water > newGoal) {
      setWater(newGoal);
      saveUserData(newGoal, newGoal, shells);
    } else {
      saveUserData(newGoal, water, shells);
    }
    setShowGoalPopup(false);
    setGoalInput('');
  };

  return (
    <div className={styles['drink-container']}>
      {/* Top left profile button */}
      <div
        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '1rem', width: '7vw', height: 'auto', position: 'absolute', top: 0, left: 0 }}
      >
        <button onClick={() => setShowProfile(true)}>
          <img
            src={profileIcon}
            alt="profile"
            onMouseEnter={() => setProfileIsHovered(true)}
            onMouseLeave={() => setProfileIsHovered(false)}
            style={{ transform: `scale(${isProfileHovered ? 1.25 : 1})`, transition: 'transform 0.3s ease' }}
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
            style={{ transform: `scale(${isBottlesHovered ? 1.25 : 1})`, transition: 'transform 0.3s ease' }}

          />
        </a>
      </div>
      {/* Bottom left shell count */}
      <div className={styles['shell-count-container']}>
        <img src="/assets/buttons/shell.png" alt="shell" className={styles['shell-icon']} />
        <span className={styles['shell-count']}>{shells}</span>
      </div>
      {/* Bottom right floating otter */}
      <img
        src={otterBlink ? "/assets/otter_blink.png" : "/assets/otter.png"}
        alt="otter"
        className={styles['floating-otter']}
      />
      {/* Centered content with vertical progress bar to the left */}
      <div className={styles['center-content-container']}>
        {/* Vertical Progress Bar */}
        <div className={styles['progress-bar']}>
          <div
            style={{
              width: '100%',
              height: `${progressPercent}%`,
              background: 'linear-gradient(to top, #4295e2 0%, #aee7ff 100%)',
              transition: 'height 0.3s',
            }}
          />
          <span className={styles['progress-amount']}>
            {water} oz
          </span>
        </div>
        {/* Center content */}
        <div className={styles['center-water-container']}>
          {/* Set Goal Button */}
          <button
            className={styles['set-goal']}
            onClick={() => setShowGoalPopup(true)}
            onMouseEnter={() => setSetGoalIsHovered(true)}
            onMouseLeave={() => setSetGoalIsHovered(false)}
            style={{ transform: `scale(${isSetGoalHovered ? 1.15 : 1})`, transition: 'transform 0.3s ease' }}
          >
            <img src="/assets/buttons/set_goal_button.png" alt="Set Goal" />
          </button>
          {/* Water Bottle Image with floating animation */}
          <img
            src={bottleImages[selectedBottle] || bottleImages["blue"]}
            alt="Water Bottle"
            className={styles['floating-bottle']}
          />
          {/* Add/Remove Water */}
          <div className={styles['edit-water-container']}>
            <button
              onClick={handleRemoveWater}
              className={styles['change-water-button']}
              aria-label="Remove water"
              onMouseEnter={() => setMinusIsHovered(true)}
              onMouseLeave={() => setMinusIsHovered(false)}
              style={{ transform: `scale(${isMinusHovered ? 1.25 : 1})`, transition: 'transform 0.3s ease' }}
            >
              <img src="/assets/buttons/decrease_button.png" alt="minus" />
            </button>
            <span className={styles['water-amount']}>
              {water} oz
            </span>
            <button
              onClick={handleAddWater}
              className={styles['change-water-button']}
              aria-label="Add water"
              onMouseEnter={() => setPlusIsHovered(true)}
              onMouseLeave={() => setPlusIsHovered(false)}
              style={{ transform: `scale(${isPlusHovered ? 1.25 : 1})`, transition: 'transform 0.3s ease' }}
            >
              <img src="/assets/buttons/increase_button.png" alt="plus" />
            </button>
          </div>
        </div>
      </div>
      {/* Profile popup */}
      {showProfile && (
        <div
          className={styles['profile-button']}
          onClick={() => setShowProfile(false)}
        >
          <div
            className={styles['profile-container']}
            onClick={e => e.stopPropagation()}
          >
            <h3 className={styles['profile-title']}>Profile</h3>
            <div className={styles['profile-info']}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Username:</strong> {username}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Password:</strong> {password}
              </div>
            </div>
            <button
              className={styles['profile-logout']}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {/* Goal popup */}
      {showGoalPopup && (
        <div
          className={styles['set-goal-button']}
          onClick={() => setShowGoalPopup(false)}
        >
          <form
            className={styles['profile-container']}
            onClick={e => e.stopPropagation()}
            onSubmit={handleGoalSubmit}
          >
            <h3 style={{ textAlign: 'center', width: '100%', marginTop: '1.5rem', marginBottom: '1rem', fontSize: '20px', fontWeight: 700 }}>Set Daily Goal</h3>
            <input
              type="number"
              min={1}
              value={goalInput}
              onChange={e => setGoalInput(e.target.value)}
              placeholder=" Enter goal in oz"
              style={{ padding: '0.5rem', fontSize: 18, borderRadius:36, marginBottom: '1rem', width: '80%' }}
              required
            />
            <div>
              <button
                type="submit"
                style={{ padding: '0.5rem 1rem', borderRadius: 36, border: 'none', background: '#0074D9', color: '#fff', fontWeight: 600 }}
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