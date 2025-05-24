'use client';
import { useState } from "react"

function Bottle(props: { color: string, price: number, image: string, locked: string, alt: string }){

  function handleBuy() {

    let value
    const bottleID = `bought-${props.color}`;
    try{
      value = localStorage.getItem(bottleID) || false
    } catch (error) {}
    
    document.getElementById(`bottle-${props.color}`)?.setAttribute('src', props.locked);

    localStorage.setItem(bottleID, "true")

    const btn = document.getElementById(`btn-${props.color}`) as HTMLButtonElement | null;
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
 
    // alert(`You bought a ${props.color} bottle for $${props.price}!`);
  }

  return (
    <div>
      {/* <h2>I am a {props.color} Bottle!</h2> */}
      <img id={`bottle-${props.color}`} src={props.image} alt={props.alt} style={{ width: 250 }} />
      {/* <h2>Price: {props.price}</h2> */}
      <button id={`btn-${props.color}`} style={{ backgroundColor: props.color, color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '20px' }} onClick={handleBuy}>
        {/* Buy {props.color} Bottle */}
        Buy for {props.price} Shells
        </button>
    </div>
  );
}

export default function Bottles() {
  return (
    <div>
      <p>Bottles page</p>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', position: 'fixed', bottom: 0, margin: '1rem' }}>
        <a href="/drink">
          <button>Go Drink</button>
        </a>
      </div>
      <Bottle 
        color={"Blue"} price={5} image={"./bottles/bottles.png"} locked={"./bottles/bottle_locked.png"} alt={"Blue Bottle"}
      />
    </div>
  );
}