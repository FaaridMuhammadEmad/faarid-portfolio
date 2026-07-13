import Blueprint from '../templates/Blueprint'

export const TEMPLATES = [
  {
    id: 'blueprint',
    name: 'Blueprint',
    description:
      "An engineer's drawing set — blueprint field, drafting lines, a proper title block, a bill of materials and detail sheets. Dark navy, chalk white, safety red.",
    component: Blueprint,
  },
]

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id)
}
