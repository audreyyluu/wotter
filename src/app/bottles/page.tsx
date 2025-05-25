'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
// localStorage.clear()

type BottleProps = {
  color: string;
  price: number;
  image: string;
  locked: string;
  alt: string;
  shells: number;
  setShells: (n: number) => void;
  isSelected: boolean;
  isBought: boolean;
  onBuy: (color: string, price: number) => void;
  onSelect: (color: string) => void;
};

function Bottle({
  color,
  price,
  image,
  locked,
  alt,
  shells,
  setShells,
  isSelected,
  isBought,
  onBuy,
  onSelect,
}: BottleProps) {
  return (
    <div>
      <img
        id={`bottle-${color}`}
        className ={'main'}
        // src={isBought && !isSelected ? locked : image}
        src={isSelected ? image : isBought ? image : locked}
        alt={alt}
        style={{
          // width: 250,
          height: 450,
          borderRadius: 20,
          boxShadow: isSelected
            ? '0 0 20px 10px #fff, 0 0 40px 20px #f0f, 0 0 60px 25px #0ff'
            : 'none',
          cursor: isBought ? 'default' : 'pointer',
          zIndex: 2
      }}
      />
    
      {!isBought ? (
        <button
          id={`btn-${color}`}
          style={{
            backgroundColor: color,
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '20px',
            marginTop: 10,
            fontWeight: 600,
          }}
          onClick={() => onBuy(color, price)}
          disabled={shells < price}
        >
          Buy for {price} Shells
        </button>
      ) : isSelected ? (
        <button
          style={{
            backgroundColor: color,
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '20px',
            marginTop: 10,
            fontWeight: 700,
            opacity: 0.7,
          }}
          disabled
        >
          Selected
        </button>
      ) : (
        <button
          style={{
            backgroundColor: color,
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '20px',
            marginTop: 10,
            fontWeight: 600,
          }}
          onClick={() => onSelect(color)}
        >
          Set as Water Bottle
        </button>
      )}
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
  const [selectedBottle, setSelectedBottle] = useState("blue");
  const [boughtBottles, setBoughtBottles] = useState<{ [color: string]: boolean }>({
    blue: false,
    brown: false,
    purple: false,
    pink: false,
  });
  const [username, setUsername] = useState('');

  // Load state from localStorage on mount
  useEffect(() => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('wotter_current_user') || '';
    setUsername(user);
    const userData = JSON.parse(localStorage.getItem(`wotter_data_${user}`) || '{}');
    setShells(userData.shells || 0);

    // Ensure blue bottle is always bought for this user
    if (localStorage.getItem(`bought-blue-${user}`) !== "true") {
      localStorage.setItem(`bought-blue-${user}`, "true");
    }

    // If no bottle is selected, select blue by default
    const selected = localStorage.getItem(`selected_bottle_${user}`);
    if (!selected) {
      localStorage.setItem(`selected_bottle_${user}`, "blue");
      setSelectedBottle("blue");
    } else {
      setSelectedBottle(selected);
    }

    setBoughtBottles({
      blue: true,
      brown: localStorage.getItem(`bought-brown-${user}`) === "true",
      purple: localStorage.getItem(`bought-purple-${user}`) === "true",
      pink: localStorage.getItem(`bought-pink-${user}`) === "true",
    });
  }
}, []);

  // Handle buying a bottle
  function handleBuy(color: string, price: number) {
  if (boughtBottles[color]) return;
  if (shells < price) {
    alert("You don't have enough shells to buy this bottle!");
    return;
  }
  const userData = JSON.parse(localStorage.getItem(`wotter_data_${username}`) || '{}');
  const newShells = shells - price;
  const newUserData = { ...userData, shells: newShells };
  localStorage.setItem(`wotter_data_${username}`, JSON.stringify(newUserData));
  setShells(newShells);
  localStorage.setItem(`bought-${color}-${username}`, "true");
  setBoughtBottles(prev => ({ ...prev, [color]: true }));
  // Do NOT auto-select after buying!
}

  // Handle selecting a bottle
  function handleSelect(color: string) {
    if (!boughtBottles[color]) return;
    localStorage.setItem(`selected_bottle_${username}`, color);
    setSelectedBottle(color);
  }

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
      <Link href="/drink" style={{ display: 'inline-block', width: 'fit-content', padding: '1rem' }}>
        <img
          src="/assets/buttons/back.png"
          alt="back button"
          style={{
            display: 'block',
            width: 50,
            height: 'auto',
            filter: 'invert(1)',
          }}
        />
      </Link>
      <div style={{ display: 'flex', gap: 32, marginTop: 40, justifyContent: 'center' }}>
        <Bottle
          color="blue"
          price={0}
          image="./bottles/plasticbottle.png"
          locked="./bottles/plasticbottle_bought.png"
          alt="Plastic Bottle"
          shells={shells}
          setShells={setShells}
          isSelected={selectedBottle === "blue"}
          isBought={boughtBottles.blue}
          onBuy={handleBuy}
          onSelect={handleSelect}
        />
        <Bottle
          color="brown"
          price={5}
          image="./bottles/stanley.png"
          locked="./bottles/stanley_bought.png"
          alt="Stanley Bottle"
          shells={shells}
          setShells={setShells}
          isSelected={selectedBottle === "brown"}
          isBought={boughtBottles.brown}
          onBuy={handleBuy}
          onSelect={handleSelect}
        />
        <Bottle
          color="purple"
          price={10}
          image="./bottles/hydroflask.png"
          locked="./bottles/hydroflask_bought.png"
          alt="Hydroflask"
          shells={shells}
          setShells={setShells}
          isSelected={selectedBottle === "purple"}
          isBought={boughtBottles.purple}
          onBuy={handleBuy}
          onSelect={handleSelect}
        />
        <Bottle
          color="pink"
          price={15}
          image="./bottles/owala.png"
          locked="./bottles/owala_bought.png"
          alt="Owala"
          shells={shells}
          setShells={setShells}
          isSelected={selectedBottle === "pink"}
          isBought={boughtBottles.pink}
          onBuy={handleBuy}
          onSelect={handleSelect}
        />
      </div>
      <Shell shells={shells} />
    </div>
  );
}