import cardEasy    from '../../assets/images/cards/card-easy.png'
import cardMedium  from '../../assets/images/cards/card-medium.png'
import cardHard    from '../../assets/images/cards/card-hard.png'
import diamondEasy   from '../../assets/images/cards/diamond-easy.svg'
import diamondMedium from '../../assets/images/cards/diamond-medium.svg'
import diamondHard   from '../../assets/images/cards/diamond-hard.svg'
import spriteEasyMedium from '../../assets/images/cards/sprite-easy-medium.png'
import spriteHard       from '../../assets/images/cards/sprite-hard.png'
import './LevelCard.css'

// Figma source: 114:594 (Easy), 114:618 (Medium), 114:642 (Hard)
// Original card size: 355 × 559px. Scale factor to 195px wide: ≈ 0.549

const CONFIGS = {
  easy: {
    bg: cardEasy,
    diamond: diamondEasy,
    sprite: spriteEasyMedium,
    color: '#47ff68',
    fill: '#43e74d',
    name: 'EASY',
    subtitle: 'WARM UP',
    desc: 'Cut demons at your own pace.',
    activeDemons: 2,
    // Figma badge demon crop (container 51×60px in orig → ~28×33px scaled)
    badgeCrop: { left: '-16.59%', top: '-48.33%', width: '353.92%', height: '201.18%' },
    // Figma spawn icon crop (container 32×45px in orig → ~18×25px scaled)
    spawnCrop: { left: '-30.92%', top: '-51.06%', width: '429.05%', height: '201.18%' },
  },
  medium: {
    bg: cardMedium,
    diamond: diamondMedium,
    sprite: spriteEasyMedium,
    color: '#ffbd20',
    fill: '#ffbd20',
    name: 'MEDIUM',
    subtitle: 'HUNTER MODE',
    desc: 'The demons get faster.',
    activeDemons: 4,
    badgeCrop: { left: '-165.08%', top: '-47.74%', width: '429.05%', height: '201.18%' },
    spawnCrop: { left: '-165.08%', top: '-47.74%', width: '429.05%', height: '201.18%' },
  },
  hard: {
    bg: cardHard,
    diamond: diamondHard,
    sprite: spriteHard,
    color: '#ff174f',
    fill: '#ff174f',
    name: 'HARD',
    subtitle: 'DEMON FRENZY',
    desc: 'Survive the onslaught.',
    activeDemons: 5,
    badgeCrop: { left: '-293.39%', top: '-44.79%', width: '423.14%', height: '201.18%' },
    spawnCrop: { left: '-293.39%', top: '-44.79%', width: '423.14%', height: '201.18%' },
  },
}

function SpawnIcon({ sprite, crop, active }) {
  return (
    <div className="lc-spawn-icon" style={{ opacity: active ? 1 : 0.3 }}>
      <img
        src={sprite}
        alt=""
        style={{
          position: 'absolute',
          left: crop.left,
          top: crop.top,
          width: crop.width,
          height: crop.height,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

function LevelCard({ levelKey, onClick, onMouseEnter }) {
  const c = CONFIGS[levelKey]

  return (
    <div className="level-card" onClick={onClick} onMouseEnter={onMouseEnter}>

      {/* Card background art */}
      <img src={c.bg} alt={c.name} className="lc-bg" />

      {/* Diamond badge — hangs above card top */}
      <div className="lc-badge">
        <img src={c.diamond} alt="" className="lc-badge-diamond" />
        {/* Demon sprite cropped inside diamond */}
        <div className="lc-badge-demon">
          <img
            src={c.sprite}
            alt=""
            style={{
              position: 'absolute',
              left: c.badgeCrop.left,
              top: c.badgeCrop.top,
              width: c.badgeCrop.width,
              height: c.badgeCrop.height,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Text content overlay — lower half of card */}
      <div className="lc-content">

        {/* Level name */}
        <span className="lc-name" style={{ color: c.color }}>{c.name}</span>

        {/* Divider 1: line ◆ line (inline SVG, colored per card) */}
        <svg className="lc-div1" viewBox="0 0 218 14" fill="none">
          <line x1="2" y1="7" x2="90" y2="7" stroke={c.color} strokeWidth="1.5" strokeOpacity="0.9"/>
          <rect x="97" y="7" width="9" height="9" transform="rotate(-45 97 7)" fill={c.fill}/>
          <line x1="116" y1="7" x2="216" y2="7" stroke={c.color} strokeWidth="1.5" strokeOpacity="0.9"/>
        </svg>

        <span className="lc-subtitle" style={{ color: c.color }}>{c.subtitle}</span>
        <p className="lc-desc">{c.desc}</p>

        {/* Divider 2: simple glowing line */}
        <svg className="lc-div2" viewBox="0 0 200 4" fill="none">
          <line x1="0" y1="2" x2="200" y2="2" stroke={c.color} strokeWidth="1" strokeOpacity="0.6"/>
        </svg>

        {/* Spawn rate */}
        <div className="lc-spawn">
          <span className="lc-spawn-label" style={{ color: c.color }}>DEMON SPAWN RATE</span>
          <div className="lc-spawn-row">
            {[0, 1, 2, 3, 4].map(i => (
              <SpawnIcon
                key={i}
                sprite={c.sprite}
                crop={c.spawnCrop}
                active={i < c.activeDemons}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default LevelCard
