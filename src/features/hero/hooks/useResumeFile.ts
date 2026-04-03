import { useEffect, useState } from 'react'

interface ResumeFile {
  url: string
  downloadName: string
}

const FALLBACK: ResumeFile = {
  url: '/Basu_Sharma_Resume.txt',
  downloadName: 'Basu_Sharma_Resume.txt',
}

/**
 * Probes for the best available resume file (PDF preferred, TXT fallback).
 * Returns the url and download filename to use in the CV link.
 */
export function useResumeFile(): ResumeFile {
  const [resumeFile, setResumeFile] = useState<ResumeFile>(FALLBACK)

  useEffect(() => {
    let cancelled = false

    const detect = async () => {
      try {
        const r = await fetch('/Basu_Sharma_Resume.pdf', { method: 'HEAD' })
        if (!cancelled && r.ok) {
          setResumeFile({ url: '/Basu_Sharma_Resume.pdf', downloadName: 'Basu_Sharma_Resume.pdf' })
          return
        }
      } catch {
        // PDF probe failed — fall through to TXT check
      }
      try {
        const r2 = await fetch('/Basu_Sharma_Resume.txt', { method: 'HEAD' })
        if (!cancelled && r2.ok) {
          setResumeFile(FALLBACK)
        }
      } catch {
        // TXT probe failed — keep the default FALLBACK already set in state
      }
    }

    detect()
    return () => { cancelled = true }
  }, [])

  return resumeFile
}
