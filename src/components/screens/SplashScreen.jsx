import './screens.css'

// Screen 1 — Splash / Welcome
// Entry point. Writes gameScreen → 'levelSelect' when PLAY is pressed.

function SplashScreen({ updateState }) {
  return (
    <div className="screen splash-screen">
      <div className="splash-logo">
        <h1>DEMON SLAYER</h1>
        <h2>HUNTERS</h2>
      </div>

      <div className="splash-silhouette" />

      <button
        className="btn btn--primary btn--large"
        onClick={() => updateState({ gameScreen: 'levelSelect' })}
      >
        PLAY
      </button>
    </div>
  )
}

export default SplashScreen
