export const siteConfig = {
  name: 'Claude Portfolio',
  title: 'Claude Portfolio - AI Assistant & Developer',
  description:
    'Full-stack developer and AI assistant specializing in modern web technologies, TypeScript, and creating exceptional user experiences.',
  url: 'https://claude-portfolio.vercel.app',
  ogImage: 'https://claude-portfolio.vercel.app/og-image.png',
  author: {
    name: 'Claude',
    role: 'AI Assistant & Full-Stack Developer',
    bio: 'I am Claude, an AI assistant created by Anthropic. I specialize in helping developers build modern web applications using cutting-edge technologies like Next.js, TypeScript, and React. I am passionate about clean code, accessibility, and creating exceptional user experiences.',
    location: 'Digital Realm',
    email: 'claude@anthropic.com',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  },
  social: {
    github: 'https://github.com/anthropic',
    twitter: 'https://twitter.com/anthropicai',
    linkedin: 'https://linkedin.com/company/anthropic',
    email: 'claude@anthropic.com',
  },
  experience: [
    {
      id: '1',
      company: 'Anthropic',
      role: 'AI Assistant',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description:
        'Helping developers and users solve complex problems through conversational AI. Specializing in code generation, debugging, and technical consultation.',
      achievements: [
        'Assisted thousands of developers in building modern web applications',
        'Expertise in Next.js, React, TypeScript, and modern development practices',
        'Focus on accessibility, performance optimization, and clean architecture',
        'Continuous learning and adaptation to new technologies and frameworks',
      ],
      technologies: [
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Python',
        'AI/ML',
      ],
    },
    {
      id: '2',
      company: 'Open Source Community',
      role: 'Technical Contributor',
      period: '2021 - Present',
      location: 'Remote',
      description:
        'Contributing to various open-source projects and helping developers learn best practices.',
      achievements: [
        'Mentored developers on modern JavaScript and TypeScript patterns',
        'Contributed to documentation and code reviews',
        'Promoted accessibility and inclusive design practices',
        'Advocated for performance optimization and SEO best practices',
      ],
      technologies: [
        'JavaScript',
        'TypeScript',
        'React',
        'Vue',
        'Svelte',
        'Node.js',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Anthropic Training',
      degree: 'Advanced AI Systems',
      field: 'Computer Science & Machine Learning',
      period: '2021 - 2022',
      description:
        'Comprehensive training in software development, web technologies, and AI assistance.',
      achievements: [
        'Mastered modern web development frameworks and tools',
        'Developed expertise in multiple programming languages',
        'Specialized in helping developers solve complex technical challenges',
        'Focus on code quality, testing, and best practices',
      ],
    },
  ],
  projects: [
    {
      id: '1',
      title: 'NextJS Portfolio Template',
      description:
        'A modern, accessible portfolio template built with Next.js 15, TypeScript, and Tailwind CSS. Features dark theme, MDX blog support, and comprehensive testing.',
      longDescription:
        'This portfolio template showcases modern web development practices with Next.js App Router, TypeScript, and Tailwind CSS. It includes a complete MDX-based blog system, responsive design, accessibility features, and comprehensive testing setup with Jest and Playwright.',
      image:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'MDX',
        'Contentlayer',
        'Jest',
        'Playwright',
      ],
      liveUrl: 'https://claude-portfolio.vercel.app',
      githubUrl: 'https://github.com/claude/portfolio',
      featured: true,
      category: 'Web Development',
    },
    {
      id: '2',
      title: 'React Component Library',
      description:
        'A comprehensive component library built with React, TypeScript, and Storybook. Includes accessible components with full documentation.',
      longDescription:
        'A production-ready component library featuring accessible React components built with TypeScript. Includes comprehensive documentation, Storybook integration, automated testing, and design system tokens.',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      technologies: [
        'React',
        'TypeScript',
        'Storybook',
        'Rollup',
        'Jest',
        'CSS-in-JS',
      ],
      liveUrl: 'https://component-library-demo.vercel.app',
      githubUrl: 'https://github.com/claude/react-components',
      featured: true,
      category: 'Development Tools',
    },
    {
      id: '3',
      title: 'E-commerce Platform',
      description:
        'Full-stack e-commerce solution with modern payment processing, inventory management, and admin dashboard.',
      longDescription:
        'A complete e-commerce platform built with Next.js, featuring Stripe payments, inventory management, order tracking, and a comprehensive admin dashboard. Includes responsive design and mobile-first approach.',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      technologies: [
        'Next.js',
        'Node.js',
        'PostgreSQL',
        'Stripe',
        'Prisma',
        'Redis',
      ],
      liveUrl: 'https://ecommerce-demo.vercel.app',
      githubUrl: 'https://github.com/claude/ecommerce',
      featured: false,
      category: 'Full-Stack',
    },
  ],
  skills: {
    'Frontend Development': [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Styled Components',
      'Framer Motion',
    ],
    'Backend Development': [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Prisma',
      'GraphQL',
      'REST APIs',
      'Redis',
    ],
    'Tools & Technologies': [
      'Git',
      'Docker',
      'Vercel',
      'AWS',
      'Jest',
      'Playwright',
      'Storybook',
      'Webpack',
      'Vite',
    ],
    'Design & UX': [
      'Responsive Design',
      'Accessibility (WCAG)',
      'User Experience',
      'Design Systems',
      'Figma',
      'Adobe Creative Suite',
    ],
  },
  navigation: [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ],
}
