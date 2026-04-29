import { useEffect, useRef } from 'react'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

// Module-level singleton — model starts initializing as soon as this module is
// first imported (during Countdown), not when gameplay begins. This hides the
// CDN load time behind the countdown.
let segSingleton = null

function getSegModel() {
  if (segSingleton) return segSingleton
  const seg = new SelfieSegmentation({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${file}`,
  })
  seg.setOptions({ modelSelection: 0 }) // general model — faster than landscape
  segSingleton = seg
  return seg
}

// Kick off wasm download immediately on module import
getSegModel()

// Runs MediaPipe SelfieSegmentation at ~15fps alongside hand tracking.
// Composites the player (from camera, mirrored) over bgImageSrc on the given canvas.
// Throttled to every 4th frame so the Hands model gets enough CPU.

export function useBodySegmentation({ gameActive, canvasRef, bgImageSrc }) {
  const bgRef = useRef(null)
  const rafRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const bgImg = new Image()
    bgImg.src = bgImageSrc
    bgRef.current = bgImg
  }, [bgImageSrc])

  useEffect(() => {
    if (!gameActive) return

    const videoEl = document.getElementById('gameplay-camera')
    if (!videoEl || !canvasRef.current) return

    const seg = getSegModel()

    seg.onResults((results) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // 1. Draw segmentation mask (white = person)
      ctx.drawImage(results.segmentationMask, 0, 0, w, h)

      // 2. Keep only person pixels from camera (normal orientation)
      ctx.globalCompositeOperation = 'source-in'
      ctx.drawImage(videoEl, 0, 0, w, h)

      // 3. Draw game background behind the person
      ctx.globalCompositeOperation = 'destination-over'
      if (bgRef.current?.complete) {
        ctx.drawImage(bgRef.current, 0, 0, w, h)
      }

      ctx.globalCompositeOperation = 'source-over'
    })

    // Process every 4th frame (~15fps at 60fps rAF) to avoid starving hand tracking
    const processFrame = async () => {
      frameRef.current++
      if (frameRef.current % 4 === 0 && videoEl.readyState >= 2) {
        await seg.send({ image: videoEl })
      }
      rafRef.current = requestAnimationFrame(processFrame)
    }

    rafRef.current = requestAnimationFrame(processFrame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [gameActive])
}
