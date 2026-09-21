import type { CSSProperties } from 'react';

import styles from '@/styles/ContactCode.module.css';

export const EMAIL = 'jonathanzietsman@gmail.com';

// Add or remove rows here. Each one becomes a line in the code card.
const contactItems = [
  {
    social: 'website',
    link: 'vs-portfolio-snowy.vercel.app',
    href: 'https://vs-portfolio-snowy.vercel.app',
  },
  {
    social: 'email',
    link: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    social: 'github',
    link: 'jonathanzietsman',
    href: 'https://github.com/jonathanzietsman',
  },
  {
    social: 'telegram',
    link: 'jonathanzietsman',
    href: 'https://t.me/jonathanzietsman',
  },
  // Example of another row:
  // { social: 'linkedin', link: 'your-handle', href: 'https://www.linkedin.com/in/your-handle/' },
];

// Sets the CSS custom property that staggers each line's entrance
const lineIndex = (i: number) => ({ '--i': i }) as CSSProperties;

const ContactCode = () => {
  const lastIndex = contactItems.length + 1;

  return (
    <div className={styles.code}>
      <div className={styles.tabBar} aria-hidden="true">
        <span className={styles.fileName}>contact.css</span>
      </div>

      <p className={styles.line} style={lineIndex(0)}>
        <span className={styles.className}>.socials</span>{' '}
        <span className={styles.punct}>&#123;</span>
      </p>

      {contactItems.map((item, index) => {
        const isWeb = item.href.startsWith('http');
        return (
          <p className={styles.line} key={item.social} style={lineIndex(index + 1)}>
            <span className={styles.indent} aria-hidden="true" />
            <span className={styles.prop}>{item.social}</span>
            <span className={styles.punct}>: </span>
            <a
              href={item.href}
              {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.link}
            </a>
            <span className={styles.punct}>;</span>
          </p>
        );
      })}

      <p className={styles.line} style={lineIndex(lastIndex)}>
        <span className={styles.punct}>&#125;</span>
        <span className={styles.caret} aria-hidden="true" />
      </p>
    </div>
  );
};

export default ContactCode;