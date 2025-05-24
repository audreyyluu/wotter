export default function Home() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', margin: '1rem' }}>
        <a href="/bottles">
          <button>Wotter Bottles</button>
        </a>
      </div>
      <p>Main page</p>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', position: 'fixed', bottom: 0, margin: '1rem' }}>
        <a href="/stamp">
          <button>Stamp Card</button>
        </a>
      </div>
    </div>
  );
}
