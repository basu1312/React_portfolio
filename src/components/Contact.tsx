import React from 'react'
import profile from '../data/profile'

const Contact: React.FC = () => (
  <section id="contact" className="container contact">
    <h2>Contact</h2>
    <p>
      Interested in working together? Email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>
      <br />
      Phone: <a href={`tel:${profile.phone}`}>{profile.phone}</a>
    </p>
    <p style={{ marginTop: 12 }}>
      <a className="cta" href="/Basu_Sharma_Resume.txt" download>
        Download Resume
      </a>
    </p>
  </section>
)

export default Contact
