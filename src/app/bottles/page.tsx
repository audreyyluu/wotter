'use client';
import { useState, useEffect } from "react";
// localStorage.clear()

function Bottle(props: { color: string, price: number, image: string, locked: string, alt: string, shells: number, setShells: (n: number) => void }) {
  const bottleID = `bought-${props.color}`;
  // Check if the bottle is already bought
  // let bought = false;
  const [bought, setBought] = useState(false);
  // if (typeof window !== "undefined") {
  //   bought = localStorage.getItem(bottleID) === "true";
  // }

  useEffect(() => {
    setBought(localStorage.getItem(bottleID) === "true")
    console.log("hello from Bottle useEffect");
  }, []);

  function handleBuy() {
    if (bought) {
      // alert("You already bought this bottle!");
      return;
    }
    const bottleID = `bought-${props.color}`;
    const username = localStorage.getItem('wotter_current_user') || '';
    const userData = JSON.parse(localStorage.getItem(`wotter_data_${username}`) || '{}');
    const water = userData.water || 0;
    const goal = userData.goal || 64;
    const shells = props.shells;
    const newShells = shells - props.price;
    if (newShells < 0) {
      alert("You don't have enough shells to buy this bottle!");
      return;
    } else {
      const newUserData = { ...userData, goal, water, shells: newShells };
      localStorage.setItem(`wotter_data_${username}`, JSON.stringify(newUserData));
      props.setShells(newShells); // update state, triggers Shell re-render
    }
    document.getElementById(`bottle-${props.color}`)?.setAttribute('src', props.locked);
    localStorage.setItem(bottleID, "true");
    const btn = document.getElementById(`btn-${props.color}`) as HTMLButtonElement | null;
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
  }

  return (
    <div>
      <img id={`bottle-${props.color}`}
        // src={props.image} 
        src={bought ? props.locked : props.image}
        alt={props.alt}
        style={{ width: 250 }} />
      <button
        id={`btn-${props.color}`}
        style={{
          backgroundColor: props.color,
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '20px'
        }}
        onClick={handleBuy}
        disabled={bought}>
        {/* Buy for {props.price} Shells */}
        {bought ? "Bought!" : `Buy for ${props.price} Shells`}
      </button>
    </div>
  );
}

function Shell({ shells }: { shells: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', position: 'fixed', bottom: 0, margin: '1rem' }}>
      <img src="/assets/buttons/shell.png" alt="shell" style={{ width: 50, height: 50 }} />
      <span style={{ fontSize: 24, color: '#fff', fontWeight: 700, marginLeft: 8 }}>{shells}</span>
    </div>
  );
}

export default function Bottles() {
  const [shells, setShells] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('wotter_current_user') || '';
      const userData = JSON.parse(localStorage.getItem(`wotter_data_${username}`) || '{}');
      setShells(userData.shells || 0);
    }
  }, []);

  return (
    <div style={{
      backgroundImage: 'url("assets/bottles_background.png")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: 'auto',
      margin: 0,
      overflow: 'auto',

    }}>
      <p>Bottles page</p>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', position: 'fixed', bottom: 0, margin: '1rem' }}>
        <a href="/drink">
          <button>Go Drink</button>
        </a>
      </div>
      <Bottle
        color={"Blue"}
        price={5}
        image={"./bottles/bottles.png"}
        locked={"./bottles/bottle_locked.png"}
        alt={"Blue Bottle"}
        shells={shells}
        setShells={setShells}
      />
      <Shell shells={shells} />
    </div>
  );
}