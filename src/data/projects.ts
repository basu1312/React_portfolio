export type Project = {
  title: string
  description: string
  link?: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: 'Danica — Banking Platform Migration',
    description: 'Led migration from legacy Gemini platforms to a modern React-based micro-frontend architecture; standardized component generation and implemented RAG/MCP patterns for AI-assisted workflows.',
    link: '#',
    tags: ['React', 'TypeScript', 'Micro-Frontends', 'Module Federation']
  },
  {
    title: 'Wells Fargo — Fraud Detection Platform',
    description: 'Contributed to a real-time fraud detection and risk analysis platform; built dynamic rule-driven forms and integrated secure REST APIs with centralized error handling.',
    link: '#',
    tags: ['React', 'Forms', 'Accessibility', 'APIs']
  },
  {
    title: 'Sapphire Design System',
    description: 'Designed and maintained a large design system (58+ components), including Storybook documentation, accessibility testing, and reusable generation workflows.',
    link: '#',
    tags: ['Design System', 'Storybook', 'Material UI']
  },
  {
    title: 'Housing Allotment Platform',
    description: 'Built a housing allotment platform using React and Next.js with server-side rendering, focusing on performance and maintainability.',
    link: '#',
    tags: ['Next.js', 'SSR', 'Performance']
  }
]

export default projects

export default projects;
