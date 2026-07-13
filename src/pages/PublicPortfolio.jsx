import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase, isConfigured, SLUG_RE } from '../lib/supabase'
import { getTemplate } from '../lib/templates'
import NotFound from './NotFound'

export default function PublicPortfolio() {
  const { slug } = useParams()
  const valid = SLUG_RE.test(slug || '')
  const [state, setState] = useState({ loading: true, row: null })

  useEffect(() => {
    if (!valid || !isConfigured) {
      setState({ loading: false, row: null })
      return
    }
    let alive = true
    supabase
      .from('portfolios')
      .select('template_id, data')
      .eq('slug', slug)
      .eq('status', 'active')
      .maybeSingle()
      .then(({ data }) => {
        if (alive) setState({ loading: false, row: data })
      })
    return () => {
      alive = false
    }
  }, [slug, valid])

  useEffect(() => {
    const name = state.row?.data?.profile?.name
    if (name) document.title = `${name} — portfolio`
    return () => {
      document.title = 'craftedBy — portfolios, crafted by you'
    }
  }, [state.row])

  if (!valid) return <NotFound />
  if (state.loading) return <div className="page-center muted">Loading…</div>
  if (!state.row) return <NotFound />

  const template = getTemplate(state.row.template_id)
  if (!template) return <NotFound />
  const Component = template.component
  return <Component data={state.row.data} />
}
