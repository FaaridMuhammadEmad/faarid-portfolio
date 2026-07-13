import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const ALLOWED = { pdf: 'application/pdf', doc: 'application/msword', docx: '' }
const MAX_BYTES = 5 * 1024 * 1024

export default function Resume() {
  const { session } = useAuth()
  const userId = session.user.id
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const refresh = useCallback(async () => {
    const { data, error: listError } = await supabase.storage.from('resumes').list(userId)
    if (listError) setError(listError.message)
    else setFiles(data || [])
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  function publicUrl(name) {
    return supabase.storage.from('resumes').getPublicUrl(`${userId}/${name}`).data.publicUrl
  }

  async function onUpload(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setInfo('')

    const ext = file.name.split('.').pop().toLowerCase()
    if (!(ext in ALLOWED)) {
      setError('Only PDF, DOC or DOCX files are allowed.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('File is larger than 5 MB.')
      return
    }

    setBusy(true)
    try {
      // One resume per account: clear out any previous file first.
      if (files.length > 0) {
        await supabase.storage
          .from('resumes')
          .remove(files.map((f) => `${userId}/${f.name}`))
      }
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(`${userId}/resume.${ext}`, file, { upsert: true })
      if (uploadError) {
        setError(uploadError.message)
        return
      }
      setInfo('Resume uploaded.')
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  async function onDelete(name) {
    if (!window.confirm('Delete your uploaded resume?')) return
    setError('')
    setInfo('')
    const { error: removeError } = await supabase.storage
      .from('resumes')
      .remove([`${userId}/${name}`])
    if (removeError) setError(removeError.message)
    else {
      setInfo('Resume deleted. Portfolios that linked it will stop showing the button next time you edit them.')
      await refresh()
    }
  }

  async function copyLink(name) {
    await navigator.clipboard.writeText(publicUrl(name))
    setInfo('Link copied.')
  }

  return (
    <div className="card">
      <h1>Resume</h1>
      <p className="muted">
        Upload one resume (PDF/DOC/DOCX, max 5 MB). Its public link can be attached to any of
        your portfolios from the editor, shown as a "Resume" button.
      </p>

      <label className="btn-primary file-btn">
        {busy ? 'Uploading…' : files.length ? 'Replace resume' : 'Upload resume'}
        <input type="file" accept=".pdf,.doc,.docx" onChange={onUpload} disabled={busy} hidden />
      </label>

      {error && <div className="form-error">{error}</div>}
      {info && <div className="form-info">{info}</div>}

      {files.length > 0 && (
        <ul className="file-list">
          {files.map((f) => (
            <li key={f.name} className="file-row">
              <span className="file-name">{f.name}</span>
              <span className="file-actions">
                <a href={publicUrl(f.name)} target="_blank" rel="noreferrer">
                  Open
                </a>
                <button className="btn-link" onClick={() => copyLink(f.name)}>
                  Copy link
                </button>
                <button className="btn-link danger" onClick={() => onDelete(f.name)}>
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
