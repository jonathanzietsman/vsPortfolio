'use client';

import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  VscClose,
  VscCompass,
  VscFiles,
  VscGoToFile,
  VscLightbulb,
  VscScreenFull,
  VscSymbolColor,
  VscTerminal,
} from 'react-icons/vsc';

import styles from '@/styles/HomeTips.module.css';

const STORAGE_KEY = 'home-tips-hidden';

interface Tip {
  icon: IconType;
  title: string;
  description: string;
  keys?: string[];
  joiner?: 'then' | '+';
}

const tips: Tip[] = [
  {
    icon: VscGoToFile,
    title: 'Command palette',
    keys: ['Ctrl', 'Shift', 'P'],
    description:
      'Jump to any page, open the terminal, or change the theme without touching the mouse.',
  },
  {
    icon: VscTerminal,
    title: 'Terminal',
    keys: ['Ctrl', '`'],
    description:
      'Opens a working terminal. Type help, then try about, skills, or projects.',
  },
  {
    icon: VscCompass,
    title: 'Jump between pages',
    keys: ['G', 'A'],
    joiner: 'then',
    description:
      'Press G, then a letter: H home, A about, P projects, C contact, G GitHub, S settings.',
  },
  {
    icon: VscSymbolColor,
    title: 'Change the theme',
    keys: ['K', 'T'],
    joiner: 'then',
    description:
      'Opens the command palette. Choose Change Color Theme to try Dracula, Nord, Night Owl, and more.',
  },
  {
    icon: VscFiles,
    title: 'Open files',
    description:
      'Every page is a file. Click one in the explorer or the tabs bar, like in a real editor.',
  },
  {
    icon: VscScreenFull,
    title: 'Full screen',
    keys: ['F11'],
    description:
      'Hide the browser bars for the full editor look. Press Esc to exit. On Mac, use Ctrl+⌘+F.',
  },
];

const HomeTips = () => {
  // null until localStorage has been read, so hidden tips never flash on load
  const [hidden, setHidden] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setHidden(localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      setHidden(false);
    }
  }, []);

  const updateHidden = (value: boolean) => {
    setHidden(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Storage unavailable (private mode); the choice just won't persist.
    }
  };

  if (hidden === null) {
    return null;
  }

  if (hidden) {
    return (
      <button
        type="button"
        className={styles.showButton}
        onClick={() => updateHidden(false)}
      >
        <VscLightbulb size={14} />
        Show tips
      </button>
    );
  }

  return (
    <section className={styles.tips} aria-labelledby="home-tips-heading">
      <div className={styles.header}>
        <h2 id="home-tips-heading" className={styles.heading}>
          <VscLightbulb className={styles.headingIcon} size={16} />
          Things you can try
        </h2>
        <button
          type="button"
          className={styles.hideButton}
          onClick={() => updateHidden(true)}
          aria-label="Hide tips"
          title="Hide tips"
        >
          <VscClose size={16} />
        </button>
      </div>

      <div className={styles.grid}>
        {tips.map(({ icon: Icon, title, description, keys, joiner }) => (
          <article key={title} className={styles.tip}>
            <div className={styles.tipHeader}>
              <Icon className={styles.tipIcon} size={16} />
              <h3 className={styles.tipTitle}>{title}</h3>
            </div>

            {keys && (
              <div className={styles.keys}>
                {keys.map((key, index) => (
                  <span key={`${key}-${index}`} className={styles.keyGroup}>
                    {index > 0 && (
                      <span className={styles.joiner}>
                        {joiner === 'then' ? 'then' : '+'}
                      </span>
                    )}
                    <kbd className={styles.key}>{key}</kbd>
                  </span>
                ))}
              </div>
            )}

            <p className={styles.tipDescription}>{description}</p>
          </article>
        ))}
      </div>

      <p className={styles.note}>On Mac, use ⌘ instead of Ctrl for the shortcuts above.</p>
    </section>
  );
};

export default HomeTips;