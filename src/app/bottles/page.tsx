export default function Bottles() {
  return (
    <div>
      <p>Bottles page</p>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', position: 'fixed', bottom: 0, margin: '1rem' }}>
        <a href="/">
          <button>Go Home</button>
        </a>
      </div>
    </div>
  );
}