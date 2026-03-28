import profile from '../data/profile'
import projects from '../data/projects'

const Resume: React.FC = () => {
  return (
    <section id="resume" className="container about">
      <h2>Resume</h2>

      <div style={{ marginTop: 12 }}>
        <strong>{profile.name}</strong>
        <div style={{ color: 'var(--muted)' }}>{profile.title} — {profile.location}</div>
        <div style={{ marginTop: 8 }}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={`tel:${profile.phone}`}>{profile.phone}</a> · <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <h3 style={{ marginTop: 18 }}>Professional Summary</h3>
      <p>{profile.summary}</p>

      <h3 style={{ marginTop: 18 }}>Experience</h3>
      {profile.experiences.map((exp) => (
        <div key={exp.role} style={{ marginBottom: 12 }}>
          <strong>{exp.role}</strong> — {exp.company} <span style={{ color: 'var(--muted)' }}>({exp.period})</span>
          <ul>
            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}

      <h3 style={{ marginTop: 18 }}>Selected Projects</h3>
      <div className="grid">
        {projects.map((p) => (
          <div className="card" key={p.title} style={{ marginBottom: 12 }}>
            <h4>{p.title}</h4>
            <p style={{ color: 'var(--muted)' }}>{p.description}</p>
            <div className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 18 }}>Education</h3>
      <div>
        <strong>{profile.education.school}</strong>
        <div style={{ color: 'var(--muted)' }}>{profile.education.degree}</div>
      </div>

      <p style={{ marginTop: 18 }}>
        <a className="cta" href="/Basu_Sharma_Resume.txt" download>Download full resume (txt)</a>
      </p>
    </section>
  )
}

export default Resume
