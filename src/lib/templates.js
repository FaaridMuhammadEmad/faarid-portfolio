import Blueprint from '../templates/Blueprint'
import Editorial from '../templates/Editorial'
import Terminal from '../templates/Terminal'
import Aurora from '../templates/Aurora'
import Brutalist from '../templates/Brutalist'

export const TEMPLATES = [
  {
    id: 'blueprint',
    name: 'Blueprint',
    description:
      "An engineer's drawing set — blueprint field, drafting lines, a proper title block, a bill of materials and detail sheets. Dark navy, chalk white, safety red.",
    component: Blueprint,
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description:
      'A literary magazine profile — cream paper, elegant serif type, drop caps and thin rules. Warm, calm and distinctly analog.',
    component: Editorial,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description:
      'Your career as a shell session — green phosphor on black, monospace everything, sections typed out as commands. Unapologetically technical.',
    component: Terminal,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description:
      'A modern product-launch look — deep slate with teal and violet glow, frosted glass cards, gradient headline, pill chips. Startup energy.',
    component: Aurora,
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description:
      'A loud street poster — taxi yellow, heavy black borders, hard offset shadows and giant capitals. Impossible to ignore.',
    component: Brutalist,
  },
]

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id)
}
