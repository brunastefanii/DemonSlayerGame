import './screens.css'

// Screen 3 — Camera Permission (First-Time Gate)
// Shown only if cameraAllowed === null.
// Writes cameraAllowed → true | false, advances to countdown on grant.

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
    <div className="screen camera-permission-screen">
      <h2 className="screen-title">CAMERA NEEDED</h2>
      <p className="screen-body">
        Your camera tracks your hand so you can slash the demons.<br />
        No video is recorded or stored.
      </p>

      {gameState.cameraAllowed === false ? (
        <p className="permission-denied">
          Camera access is required to play. Please allow camera access and refresh the page.
        </p>
      ) : (
        <button className="btn btn--primary" onClick={handleAllow}>
          ALLOW CAMERA
        </button>
      )}
    </div>
  )
}

export default CameraPermission
