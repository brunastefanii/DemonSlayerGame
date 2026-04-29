import SplashScreen from '../screens/SplashScreen'
import LevelSelect from '../screens/LevelSelect'
import CameraPermission from '../screens/CameraPermission'
import Countdown from '../screens/Countdown'
import Gameplay from '../screens/Gameplay'
import TimesUp from '../screens/TimesUp'
import GameOver from '../screens/GameOver'
import './BrowserPanel.css'

// Panel A — The Browser (Game View Layer)
// Renders the active screen based on gameScreen state.
// Reads from shared state, never writes directly.

const screenMap = {
  splash: SplashScreen,
  levelSelect: LevelSelect,
  cameraPermission: CameraPermission,
  countdown: Countdown,
  gameplay: Gameplay,
  timesUp: TimesUp,
  gameOver: GameOver,
}

function BrowserPanel({ gameState, updateState }) {
  const Screen = screenMap[gameState.gameScreen] || SplashScreen

  return (
    <div className="browser-panel">
      <Screen gameState={gameState} updateState={updateState} />
    </div>
  )
}

export default BrowserPanel
