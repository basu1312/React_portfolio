import { useState } from 'react'
import profile from '../data/profile'

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', subject: '', message: '', preferred: 'Email', timezone: '' })
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill name, email and message')
      return
    }

    const body = `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nPreferred: ${form.preferred}\nTimezone: ${form.timezone}\n\n${form.message}`
    const subject = form.subject || `Contact from ${form.name}`
    // open mail client with prefilled message
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('Opening mail client...')
  }

  return (
    <section id="contact" className="container contact py-20">
      <div className="max-w-3xl mx-auto bg-white/5 p-10 rounded-lg shadow-sm ring-1 ring-black/5">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-sm text-muted mb-6">Prefer email? <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a> — or use the form below.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 contact-form">
          <div className="grid sm:grid-cols-2 gap-6 form-row">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="form-input" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Your email" className="form-input" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 form-row">
            <input name="company" value={form.company} onChange={handleChange} placeholder="Company (optional)" className="form-input" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="form-input" />
          </div>

          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="form-input" />

          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" rows={6} className="form-input" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <div className="sm:flex sm:gap-6 sm:flex-1 form-row">
              <select name="preferred" value={form.preferred} onChange={handleChange} className="form-input">
                <option>Email</option>
                <option>Phone</option>
              </select>
              <input name="timezone" value={form.timezone} onChange={handleChange} placeholder="Timezone (e.g. IST)" className="form-input" />
            </div>

            <div className="ml-auto flex gap-4 contact-buttons">
              <a href="/Basu_Sharma_Resume.pdf" className="cta" download>Download Resume</a>
              <button type="submit" className="cta">Send Message</button>
            </div>
          </div>
        </form>

        {status && <p className="mt-4 text-sm text-muted">{status}</p>}
      </div>
    </section>
  )
}

export default Contact
