import bgImage from '../../assets/images/demon slayer 3 background 1.png'
import './screens.css'

// Screen 3 — Camera Permission (First-Time Gate)
// Shown only if cameraAllowed === null.
// Writes cameraAllowed → true | false, advances to countdown on grant.

const CamIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
      stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/>
  </svg>
)

function CameraPermission({ gameState, updateState }) {
  const handleAllow = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      updateState({ cameraAllowed: true, gameScreen: 'countdown' })
    } catch {
      updateState({ cameraAllowed: false })
    }
  }


  return (
    <div className="screen cp-screen">
      <div className="cp-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      {/* BACK button — reuses level select styles */}
      <div className="ls-back-wrap" onClick={() => updateState({ gameScreen: 'levelSelect' })}>
        <div className="ls-back-border">
          <div className="ls-back-fill">← BACK</div>
        </div>
      </div>

      {/* Caption overlaid on ninja image — bottom of image area */}
      <div className="cp-image-caption">
        <CamIcon className="cp-caption-icon" />
        <span>Your camera powers the hunt.</span>
      </div>

      {/* Floating content — right side, over background art */}
      <div className="cp-content">

        <h3 className="cp-why-title">WHY DO WE NEED IT?</h3>

        <ul className="cp-bullets">
          <li className="cp-bullet">
            <span className="cp-bullet-icon">◎</span>
            Detect your movements to slash demons
          </li>
          <li className="cp-bullet">
            <span className="cp-bullet-icon">⚡</span>
            Track your hand in real time for epic combos
          </li>
          <li className="cp-bullet">
            <span className="cp-bullet-icon">⛨</span>
            <span style={{ display: 'flex', flexDirection: 'column' }}><span>Everything stays on your device.</span><span>We never record or store your video.</span></span>
          </li>
        </ul>

        {/* Allow button */}
        <div className="cp-allow-wrap" onClick={handleAllow}>
          <div className="cp-allow-border">
            <div className="cp-allow-fill">
              <CamIcon className="cp-allow-icon" />
              ALLOW CAMERA
            </div>
          </div>
        </div>
        <p className="cp-privacy-note">🔒 Your privacy is protected.</p>

      </div>

      {/* Bottom privacy bar */}
      <div className="cp-bar">
        <div className="cp-bar-inner">
          <svg className="ls-tip-icon" viewBox="0 0 36 36" fill="none">
            <path d="M18 3L4 9v9c0 7.9 5.9 15.3 14 17 8.1-1.7 14-9.1 14-17V9L18 3z"
              fill="rgba(153,68,204,0.12)" stroke="#9944cc" strokeWidth="1.8"/>
          </svg>
          <p className="ls-tip-text">We respect your privacy. No data leaves your device.</p>
        </div>
      </div>

    </div>
  )
}

export default CameraPermission
