import { Link, useParams } from 'react-router-dom'
import { getTemplate } from '../lib/templates'
import { SAMPLE_DATA } from '../lib/sampleData'
import NotFound from './NotFound'

export default function Preview() {
  const { templateId } = useParams()
  const template = getTemplate(templateId)
  if (!template) return <NotFound />

  const Component = template.component
  return (
    <div>
      <div className="preview-bar">
        <span>
          TEMPLATE PREVIEW — {template.name.toUpperCase()} (sample content)
        </span>
        <Link className="btn-primary-sm" to={`/create/${template.id}`}>
          Use this template
        </Link>
      </div>
      <Component data={SAMPLE_DATA} />
    </div>
  )
}
