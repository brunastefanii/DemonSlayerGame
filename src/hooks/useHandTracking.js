import { useEffect, useRef } from 'react'
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'

// Initializes MediaPipe Hands and Camera when gameActive is true.
// Calls onFingerMove({ x, y }) on every frame a fingertip is detected.
// x is mirrored to match the selfie (scaleX(-1)) video display.

export function useHandTracking({ gameActive, onFingerMove }) {
  const handsRef = useRef(null)
  const cameraRef = useRef(null)
  const callbackRef = useRef(onFingerMove)

  // Keep callback ref fresh without restarting MediaPipe
  useEffect(() => {
    callbackRef.current = onFingerMove
  }, [onFingerMove])

  useEffect(() => {
    if (!gameActive) return

    const videoEl = document.getElementById('gameplay-camera')
    if (!videoEl) return

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    })

    hands.onResults((results) => {
      if (!results.multiHandLandmarks?.length) return

      const tip = results.multiHandLandmarks[0][8] // INDEX_FINGER_TIP

      // Mirror x to match the scaleX(-1) selfie video
      const x = (1 - tip.x) * window.innerWidth
      const y = tip.y * window.innerHeight

      callbackRef.current({ x, y })
    })

    handsRef.current = hands

    const camera = new Camera(videoEl, {
      onFrame: async () => {
        if (handsRef.current) {
          await handsRef.current.send({ image: videoEl })
        }
      },
      width: 1280,
      height: 720,
    })

    camera.start()
    cameraRef.current = camera

    return () => {
      cameraRef.current?.stop()
      handsRef.current?.close()
      cameraRef.current = null
      handsRef.current = null
    }
  }, [gameActive])
}
