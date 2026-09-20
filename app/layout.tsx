import type { Metadata } from 'next';

import Layout from '@/components/Layout';

import '@/styles/globals.css';
import '@/styles/themes.css';

export const metadata: Metadata = {
  title: {
    default: 'Jonathan Zietsman | Portfolio',
    template: 'Jonathan Zietsman | %s',
  },
  description:
    "Jonathan Zietsman is an avid full stack web developer building websites and applications you'd love to use",
  keywords: [
    'jonathan zietsman',
    'jonathan',
    'zietsman',
    'web developer portfolio',
    'jonathan web developer',
    'jonathan developer',
    'mern stack',
    'jonathan zietsman portfolio',
    'vscode-portfolio',
  ],
  openGraph: {
    title: "Jonathan Zietsman's Portfolio",
    description:
      "A full-stack software engineer ....",
    images: ['https://imgur.com/4zi5KkQ.png'],
    url: 'https://vscode-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
