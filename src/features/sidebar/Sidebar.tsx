import { useRef, useState } from 'react'
import profile from '../../data/profile'

type Props = {
  activeSection: string
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
}

const NAV_ITEMS = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

const TECH_STACK = ['React', 'TypeScript', 'Next.js', 'Redux', 'MFE', 'AI / RAG']

const SidebarAvatar: React.FC = () => {
  const [errored, setErrored] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const initials = profile.name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = avatarRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform =
      `perspective(700px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.05) translateZ(16px)`
  }

  const handleMouseLeave = () => {
    const el = avatarRef.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      className="sidebar-avatar"
      ref={avatarRef}
      role="img"
      aria-label={`${profile.name} profile photo`}
    >
      <div
        className="sidebar-avatar-overlay"
        aria-hidden="true"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {errored ? (
        <div className="sidebar-avatar-fallback">{initials}</div>
      ) : (
        <img
          src="/Picture.jpg"
          alt={profile.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}

const Sidebar: React.FC<Props> = ({ activeSection, menuOpen, setMenuOpen }) => {
  return (
    <>
      <button
        className="sidebar-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        )}
      </button>

      {menuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}

      <aside className={`sidebar${menuOpen ? ' open' : ''}`}>
        <SidebarAvatar />

        <div className="sidebar-name">{profile.name}</div>
        <div className="sidebar-role-badge">{profile.title}</div>

        <div className="sidebar-divider" />

        <div className="sidebar-info">
          <div className="sidebar-info-item">
            <span className="sidebar-info-icon" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <div className="sidebar-info-content">
              <div className="sidebar-info-label">Email</div>
              <div className="sidebar-info-value">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
          </div>

          <div className="sidebar-info-item">
            <span className="sidebar-info-icon" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7 9.91a16 16 0 006.6 6.6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <div className="sidebar-info-content">
              <div className="sidebar-info-label">Phone</div>
              <div className="sidebar-info-value">
                <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              </div>
            </div>
          </div>

          <div className="sidebar-info-item">
            <span className="sidebar-info-icon" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div className="sidebar-info-content">
              <div className="sidebar-info-label">Location</div>
              <div className="sidebar-info-value">{profile.location}</div>
            </div>
          </div>
        </div>

        <div className="sidebar-socials">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="sidebar-social-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.36-1.28-1.72-1.28-1.72-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.11-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.08 11.08 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.41-5.29 5.69.41.35.77 1.05.77 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.68.8.56A11.52 11.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
            </svg>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="sidebar-social-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48s.88 1.98 1.98 1.98c1.1 0 1.98-.88 1.98-1.98S6.08 3.5 4.98 3.5zM3.5 8.99h3v11.01h-3V8.99zM9.5 8.99h2.88v1.51h.04c.4-.76 1.37-1.56 2.82-1.56 3.02 0 3.58 1.99 3.58 4.58v6.49h-3V15.5c0-1.39-.03-3.18-1.94-3.18-1.94 0-2.24 1.52-2.24 3.07v4.11h-3V8.99z" />
            </svg>
          </a>
        </div>

        <div className="sidebar-divider" />

        {/* Availability status */}
        <div className="sidebar-availability">
          <span className="sidebar-availability-dot" aria-hidden="true" />
          <span>Open to Opportunities</span>
        </div>

        <div className="sidebar-divider" />

        {/* <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`sidebar-nav-link${activeSection === item.id ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav> */}


      </aside>
    </>
  )
}

export default Sidebar
