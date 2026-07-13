import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase, newCode } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { getTemplate, TEMPLATES } from '../lib/templates'
import { emptyData } from '../lib/sampleData'

// The form keeps jobs' points/tech as editable text (pointsText/techText);
// toEditable/toStorable convert between that and the stored JSON shape.
function toEditable(data) {
  return {
    ...data,
    jobs: (data.jobs || []).map((j) => ({
      ...j,
      pointsText: (j.points || []).join('\n'),
      techText: (j.tech || []).join(', '),
    })),
  }
}

// Coerce AI-extracted resume data into the exact shape the form expects.
function normalizeExtracted(raw) {
  const str = (v) => (typeof v === 'string' ? v : '')
  const arr = (v) => (Array.isArray(v) ? v : [])
  const p = raw?.profile || {}
  return {
    profile: {
      name: str(p.name), title: str(p.title), tagline: str(p.tagline),
      location: str(p.location), phone: str(p.phone), email: str(p.email),
      linkedin: str(p.linkedin), years: str(p.years), summary: str(p.summary),
    },
    skills: arr(raw?.skills).map((s) => ({ cat: str(s?.cat), spec: str(s?.spec) })),
    jobs: arr(raw?.jobs).map((j) => ({
      period: str(j?.period), role: str(j?.role), company: str(j?.company),
      place: str(j?.place), project: str(j?.project), current: Boolean(j?.current),
      points: arr(j?.points).map(str).filter(Boolean),
      tech: arr(j?.tech).map(str).filter(Boolean),
    })),
    awards: arr(raw?.awards).map((a) => ({ year: str(a?.year), title: str(a?.title), from: str(a?.from) })),
    education: arr(raw?.education).map((e) => ({ period: str(e?.period), degree: str(e?.degree), from: str(e?.from) })),
    languages: str(raw?.languages),
    resumeUrl: '',
  }
}

function toStorable(data) {
  return {
    ...data,
    jobs: (data.jobs || []).map(({ pointsText, techText, ...j }) => ({
      ...j,
      points: (pointsText || '').split('\n').map((s) => s.trim()).filter(Boolean),
      tech: (techText || '').split(',').map((s) => s.trim()).filter(Boolean),
    })),
    skills: (data.skills || []).filter((s) => s.cat || s.spec),
    awards: (data.awards || []).filter((a) => a.year || a.title || a.from),
    education: (data.education || []).filter((e) => e.period || e.degree || e.from),
  }
}

export default function Editor() {
  const { templateId, id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { session, profile } = useAuth()
  const userId = session.user.id

  const [title, setTitle] = useState('My portfolio')
  const [tplId, setTplId] = useState(templateId || TEMPLATES[0].id)
  const [data, setData] = useState(() => {
    const d = toEditable(emptyData())
    d.profile.email = session.user.email || ''
    return d
  })
  const [loading, setLoading] = useState(isEdit)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [uploadedResume, setUploadedResume] = useState(null)
  const [filling, setFilling] = useState(false)

  useEffect(() => {
    supabase.storage
      .from('resumes')
      .list(userId)
      .then(({ data: files }) => {
        const file = files?.[0]
        if (file && file.name.toLowerCase().endsWith('.pdf')) {
          setUploadedResume(
            supabase.storage.from('resumes').getPublicUrl(`${userId}/${file.name}`).data
              .publicUrl
          )
        }
      })
  }, [userId])

  async function fillFromResume() {
    setError('')
    setFilling(true)
    try {
      const { data: res, error: fnError } = await supabase.functions.invoke('tailor-resume', {
        body: { mode: 'extract', resumeUrl: uploadedResume },
      })
      if (fnError) {
        let message = 'Could not read the resume — fill the form manually.'
        try {
          const body = await fnError.context?.json()
          if (body?.error) message = body.error
        } catch { /* keep generic message */ }
        setError(message)
        return
      }
      const normalized = normalizeExtracted(res.data)
      normalized.resumeUrl = uploadedResume
      setData(toEditable(normalized))
      if (normalized.profile.name) setTitle(`${normalized.profile.name} — main`)
    } finally {
      setFilling(false)
    }
  }

  useEffect(() => {
    if (!isEdit) return
    supabase
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data: row, error: loadError }) => {
        if (loadError || !row) {
          setError('Portfolio not found.')
        } else {
          setTitle(row.title)
          setTplId(row.template_id)
          setData(toEditable(row.data))
        }
        setLoading(false)
      })
  }, [isEdit, id, userId])

  const template = getTemplate(tplId)
  const storable = useMemo(() => toStorable(data), [data])

  const setProfileField = (k) => (e) =>
    setData({ ...data, profile: { ...data.profile, [k]: e.target.value } })

  function updateList(key, index, field, value) {
    const list = data[key].map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setData({ ...data, [key]: list })
  }
  function addTo(key, blank) {
    setData({ ...data, [key]: [...data[key], blank] })
  }
  function removeFrom(key, index) {
    setData({ ...data, [key]: data[key].filter((_, i) => i !== index) })
  }

  async function attachResume() {
    setError('')
    const { data: files, error: listError } = await supabase.storage
      .from('resumes')
      .list(userId)
    if (listError) {
      setError(listError.message)
      return
    }
    if (!files?.length) {
      setError('No resume uploaded yet — add one on the Resume page first.')
      return
    }
    const url = supabase.storage
      .from('resumes')
      .getPublicUrl(`${userId}/${files[0].name}`).data.publicUrl
    setData({ ...data, resumeUrl: url })
  }

  async function onSave() {
    setError('')
    if (!data.profile.name.trim()) {
      setError('At least fill in your name before publishing.')
      return
    }
    setBusy(true)
    try {
      if (isEdit) {
        const { error: updateError } = await supabase
          .from('portfolios')
          .update({ title, template_id: tplId, data: storable })
          .eq('id', id)
          .eq('user_id', userId)
        if (updateError) {
          setError(updateError.message)
          return
        }
        navigate('/dashboard')
        return
      }

      // Create: try random 4-digit codes until the slug is free.
      const username = profile?.username
      if (!username) {
        setError('Your profile has no username — try signing out and back in.')
        return
      }
      for (let attempt = 0; attempt < 8; attempt++) {
        const code = newCode()
        const { error: insertError } = await supabase.from('portfolios').insert({
          user_id: userId,
          username,
          code,
          slug: `${username}-${code}`,
          title,
          template_id: tplId,
          data: storable,
        })
        if (!insertError) {
          navigate('/dashboard')
          return
        }
        if (insertError.code === '23505') continue // slug collision — new code
        setError(insertError.message)
        return
      }
      setError('Could not find a free URL code — try again.')
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <div className="card narrow muted">Loading…</div>
  if (error && isEdit && !data.profile.name && !busy) {
    return <div className="card narrow form-error">{error}</div>
  }

  if (showPreview && template) {
    const Component = template.component
    return (
      <div>
        <div className="preview-bar">
          <span>PREVIEW — {title.toUpperCase()}</span>
          <button className="btn-primary-sm" onClick={() => setShowPreview(false)}>
            Back to editor
          </button>
        </div>
        <Component data={storable} />
      </div>
    )
  }

  return (
    <div className="card wide">
      <div className="editor-head">
        <h1>{isEdit ? 'Edit portfolio' : 'Create portfolio'}</h1>
        <div className="editor-head-actions">
          <button className="btn-ghost-sm" onClick={() => setShowPreview(true)}>
            Preview
          </button>
          <button className="btn-primary-sm" onClick={onSave} disabled={busy}>
            {busy ? 'Saving…' : isEdit ? 'Save changes' : 'Create'}
          </button>
        </div>
      </div>
      {error && <div className="form-error">{error}</div>}

      {uploadedResume && (
        <div className="autofill-banner">
          <span>
            <strong>Resume found.</strong> Let the AI fill this whole form from your uploaded
            resume — then review and adjust anything before {isEdit ? 'saving' : 'creating'}.
          </span>
          <button className="btn-primary-sm" onClick={fillFromResume} disabled={filling}>
            {filling ? 'Reading resume…' : 'Auto-fill from resume'}
          </button>
        </div>
      )}

      <div className="form">
        <label className="field">
          <span>Internal title (only you see this)</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label className="field">
          <span>Template</span>
          <select value={tplId} onChange={(e) => setTplId(e.target.value)}>
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <h2>Profile</h2>
        <div className="field-grid">
          {[
            ['name', 'Full name'],
            ['title', 'Professional title'],
            ['tagline', 'Tagline'],
            ['location', 'Location'],
            ['phone', 'Phone'],
            ['email', 'Contact email'],
            ['linkedin', 'LinkedIn (e.g. linkedin.com/in/you)'],
            ['years', 'Years of experience (e.g. 05)'],
          ].map(([k, label]) => (
            <label className="field" key={k}>
              <span>{label}</span>
              <input value={data.profile[k]} onChange={setProfileField(k)} />
            </label>
          ))}
        </div>
        <label className="field">
          <span>Summary</span>
          <textarea rows={4} value={data.profile.summary} onChange={setProfileField('summary')} />
        </label>
        <label className="field">
          <span>Languages (e.g. Urdu (native) · English (fluent))</span>
          <input
            value={data.languages}
            onChange={(e) => setData({ ...data, languages: e.target.value })}
          />
        </label>

        <h2>Resume button</h2>
        <div className="inline-actions">
          {data.resumeUrl ? (
            <>
              <a href={data.resumeUrl} target="_blank" rel="noreferrer">
                Attached resume ↗
              </a>
              <button
                className="btn-link danger"
                onClick={() => setData({ ...data, resumeUrl: '' })}
              >
                Remove
              </button>
            </>
          ) : (
            <button className="btn-ghost-sm" onClick={attachResume}>
              Attach uploaded resume
            </button>
          )}
        </div>

        <h2>Skills</h2>
        {data.skills.map((s, i) => (
          <div className="row-fields" key={i}>
            <input
              placeholder="Category (e.g. Languages)"
              value={s.cat}
              onChange={(e) => updateList('skills', i, 'cat', e.target.value)}
            />
            <input
              placeholder="Specification (e.g. Java · SQL · …)"
              value={s.spec}
              onChange={(e) => updateList('skills', i, 'spec', e.target.value)}
            />
            <button className="btn-link danger" onClick={() => removeFrom('skills', i)}>
              ✕
            </button>
          </div>
        ))}
        <button className="btn-ghost-sm" onClick={() => addTo('skills', { cat: '', spec: '' })}>
          + Add skill row
        </button>

        <h2>Experience</h2>
        {data.jobs.map((j, i) => (
          <div className="job-block" key={i}>
            <div className="row-fields">
              <input
                placeholder="Period (e.g. 05 / 2026 — PRESENT)"
                value={j.period}
                onChange={(e) => updateList('jobs', i, 'period', e.target.value)}
              />
              <input
                placeholder="Location (e.g. Dubai, UAE)"
                value={j.place}
                onChange={(e) => updateList('jobs', i, 'place', e.target.value)}
              />
              <label className="check">
                <input
                  type="checkbox"
                  checked={j.current || false}
                  onChange={(e) => updateList('jobs', i, 'current', e.target.checked)}
                />
                Current
              </label>
            </div>
            <div className="row-fields">
              <input
                placeholder="Role"
                value={j.role}
                onChange={(e) => updateList('jobs', i, 'role', e.target.value)}
              />
              <input
                placeholder="Company"
                value={j.company}
                onChange={(e) => updateList('jobs', i, 'company', e.target.value)}
              />
            </div>
            <input
              placeholder="Project (one line)"
              value={j.project}
              onChange={(e) => updateList('jobs', i, 'project', e.target.value)}
            />
            <textarea
              rows={4}
              placeholder="Achievements — one per line"
              value={j.pointsText}
              onChange={(e) => updateList('jobs', i, 'pointsText', e.target.value)}
            />
            <input
              placeholder="Tech, comma separated (e.g. Java 8, Spring Boot, Redis)"
              value={j.techText}
              onChange={(e) => updateList('jobs', i, 'techText', e.target.value)}
            />
            <button className="btn-link danger" onClick={() => removeFrom('jobs', i)}>
              Remove this position
            </button>
          </div>
        ))}
        <button
          className="btn-ghost-sm"
          onClick={() =>
            addTo('jobs', {
              period: '', role: '', company: '', place: '', project: '',
              current: false, pointsText: '', techText: '',
            })
          }
        >
          + Add position
        </button>

        <h2>Awards</h2>
        {data.awards.map((a, i) => (
          <div className="row-fields" key={i}>
            <input
              placeholder="Year"
              value={a.year}
              onChange={(e) => updateList('awards', i, 'year', e.target.value)}
            />
            <input
              placeholder="Title"
              value={a.title}
              onChange={(e) => updateList('awards', i, 'title', e.target.value)}
            />
            <input
              placeholder="From"
              value={a.from}
              onChange={(e) => updateList('awards', i, 'from', e.target.value)}
            />
            <button className="btn-link danger" onClick={() => removeFrom('awards', i)}>
              ✕
            </button>
          </div>
        ))}
        <button
          className="btn-ghost-sm"
          onClick={() => addTo('awards', { year: '', title: '', from: '' })}
        >
          + Add award
        </button>

        <h2>Education</h2>
        {data.education.map((ed, i) => (
          <div className="row-fields" key={i}>
            <input
              placeholder="Period (e.g. 2017 — 2020)"
              value={ed.period}
              onChange={(e) => updateList('education', i, 'period', e.target.value)}
            />
            <input
              placeholder="Degree"
              value={ed.degree}
              onChange={(e) => updateList('education', i, 'degree', e.target.value)}
            />
            <input
              placeholder="Institution"
              value={ed.from}
              onChange={(e) => updateList('education', i, 'from', e.target.value)}
            />
            <button className="btn-link danger" onClick={() => removeFrom('education', i)}>
              ✕
            </button>
          </div>
        ))}
        <button
          className="btn-ghost-sm"
          onClick={() => addTo('education', { period: '', degree: '', from: '' })}
        >
          + Add education
        </button>

        <div className="editor-foot">
          <button className="btn-primary" onClick={onSave} disabled={busy}>
            {busy ? 'Saving…' : isEdit ? 'Save changes' : 'Create portfolio'}
          </button>
        </div>
      </div>
    </div>
  )
}
