export type Project = {
  title: string;
  description: string;
  link?: string;
  image?: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: 'Danica — Banking Platform Migration',
    description:
      'Led migration from legacy Gemini platforms to a modern React-based micro-frontend architecture; standardized component generation and implemented RAG/MCP patterns for AI-assisted workflows.',
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&auto=format&fit=crop',
    tags: [
      'React',
      'TypeScript',
      'Micro-Frontend',
      'Module Federation',
      'DevOps',
    ],
  },
  {
    title: 'Wells Fargo — Fraud Detection Platform',
    description:
      'Contributed to a real-time fraud detection and risk analysis platform; built dynamic rule-driven forms and integrated secure REST APIs with centralized error handling.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop',
    tags: ['React', 'Forms', 'Single Page Application', 'APIs', 'Optimization'],
  },
  {
    title: 'Staples  — Component Design System',
    description:
      'Designed and maintained a large design system (58+ components), including Storybook documentation, accessibility testing, and reusable generation workflows.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80&auto=format&fit=crop',
    tags: [
      'JavaScript',
      'Design System',
      'Storybook',
      'Styled Components',
      'Accessibility',
    ],
  },
  {
    title: 'Housing Allotment Platform',
    description:
      'Built a housing allotment platform using React and Next.js with server-side rendering, focusing on performance and maintainability.',
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80&auto=format&fit=crop',
    tags: ['Next.js', 'SSR', 'Redux', 'Performance', 'Material-UI'],
  },
];

export default projects;
