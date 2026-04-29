import './DemonHead.css'
import demon1 from '../../assets/images/demons 1.png'
import demon2 from '../../assets/images/demons 2.png'
import demon3 from '../../assets/images/demons 3.png'
import demon4 from '../../assets/images/demons 4.png'
import demon5 from '../../assets/images/demons 5.png'
import demon6 from '../../assets/images/demons 6.png'

// UI Component — DemonHead
// Renders a living demon OR the split slay animation depending on demon.slayed.
// Position driven by demon.x / demon.y from shared state (written by ControllerPanel).

const DEMON_IMAGES = [demon1, demon2, demon3, demon4, demon5, demon6]

function DemonHead({ demon }) {
  const img = DEMON_IMAGES[demon.imageIndex ?? 0]

  const style = {
    position: 'absolute',
    left: demon.x,
    top: demon.y,
  }

  if (demon.slayed) {
    return (
      <div className="demon-slay" style={style}>
        <div className="demon-half demon-half--left">
          <img src={img} alt="demon" className="demon-img" />
        </div>
        <div className="demon-half demon-half--right">
          <img src={img} alt="demon" className="demon-img" />
        </div>
        <div className="demon-splatter" />
      </div>
    )
  }

  return (
    <div className="demon-head" style={style}>
      <img src={img} alt="demon" className="demon-img" />
    </div>
  )
}

export default DemonHead
