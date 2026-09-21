export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
}

export const projects: Project[] = [
  {
    title: 'vsPortfolio',
    description:
      'A developer portfolio disguised as a VS Code window, built with Next.js and TypeScript, featuring a command palette, keyboard navigation, and a dark theme among other features.',
    logo: '/logos/vscode3-svgrepo-com.svg',
    link: 'https://vs-portfolio-snowy.vercel.app/',
    slug: 'vscodeportfolio',
  },
  {
    title: 'ApexPOS',
    description:
      'A point-of-sale system for running a shop: ring up sales, track stock, apply promotions, and manage the cash drawer, with live analytics.',
    logo: '/logos/thunder-sign-octagon-svgrepo-com.svg',
    link: 'https://web-developer-bootcamp-project.vercel.app/',
    slug: 'apexpos',
  },
  {
    title: 'itHelpdesk',
    description:
      'A Django helpdesk where employees report IT problems and technicians prioritize, assign, and resolve them, with a full audit trail from ticket to fix.',
    logo: '/logos/computer-svgrepo-com.svg',
    link: 'https://jonathanzietsman.pythonanywhere.com/login/',
    slug: 'it-helpdesk',
  },
  {
    title: 'DevPulse',
    description:
      'A developer wellness and project tracker. Log coding sessions, track hours per project, and monitor mood and burnout over time.',
    logo: '/logos/dev-to-svgrepo-com.svg',
    link: 'https://dev-pulse-code-collage-react-projec.vercel.app/',
    slug: 'devpulse',
  },
  {
    title: 'My 1st Portfolio',
    description:
      'An early personal portfolio built with HTML, CSS, and Bootstrap, featuring responsive layouts and sections for showcasing my projects, skills, and development experience while establishing my foundation in front-end development.',
    logo: '/logos/portfolio-svgrepo-com (1).svg',
    link: 'https://jonathanzietsman.github.io/portfolio.io/',
    slug: 'portfolio-1',
  },
];
