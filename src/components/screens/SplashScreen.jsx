import { useEffect } from 'react'
import { playMusic, stopMusic } from '../../hooks/useAudio'
import bgImage from '../../assets/images/demon slay 1.png'
import './screens.css'

// Screen 1 — Splash / Welcome
// Entry point. Writes gameScreen → 'levelSelect' when PLAY is pressed.

function SplashScreen({ updateState }) {
  useEffect(() => {
    playMusic('splash')
    return () => stopMusic()
  }, [])

  return (
    <div className="screen splash-screen">
      <div className="splash-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      <div className="splash-content">
        <div
          className="play-btn-wrap"
          onClick={() => updateState({ gameScreen: 'levelSelect' })}
        >
          <div className="play-btn-border">
            <div className="play-btn-fill">PLAY</div>
          </div>
          <span className="play-pip play-pip--top">◆</span>
          <span className="play-pip play-pip--bottom">◆</span>
          <span className="play-pip play-pip--left">◆</span>
          <span className="play-pip play-pip--right">◆</span>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
