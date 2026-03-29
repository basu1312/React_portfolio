import { useState } from 'react'
import profile from '../data/profile'

const Avatar: React.FC<{ size?: number }> = ({ size = 120 }) => {
  const candidates = ['/profile.jpg', '/profile.png', '/profile.svg']
  const [index, setIndex] = useState(0)
  const [errored, setErrored] = useState(false)
  const initials = profile.name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()

  const handleError = () => {
    if (index < candidates.length - 1) {
      setIndex((i) => i + 1)
    } else {
      setErrored(true)
    }
  }

  return (
    <div className="avatar" style={{ width: size, height: size }}>
      {!errored ? (
        <img
          src={candidates[index]}
          alt={profile.name}
          width={size}
          height={size}
          onError={handleError}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '999px' }}
        />
      ) : (
        <div className="avatar-fallback" aria-hidden style={{ width: '100%', height: '100%', borderRadius: '999px' }}>
          {initials}
        </div>
      )}
    </div>
  )
}

export default Avatar
