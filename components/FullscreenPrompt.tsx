'use client';

import { useEffect, useState } from 'react';
import { VscScreenFull } from 'react-icons/vsc';

import styles from '@/styles/FullscreenPrompt.module.css';

const SESSION_KEY = 'fullscreen-prompt-dismissed';
const NEVER_KEY = 'fullscreen-prompt-never';

/*
 * Browsers only allow full screen after a user gesture (a click or key press),
 * so it can't be triggered on page load. This shows a one-time notification on
 * arrival and enters full screen when the visitor clicks the button.
 */
const FullscreenPrompt = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Unsupported (e.g. iPhone Safari) or already full screen
    if (!document.fullscreenEnabled || document.fullscreenElement) {
      return;
    }

    try {
      if (
        localStorage.getItem(NEVER_KEY) ||
        sessionStorage.getItem(SESSION_KEY)
      ) {
        return;
      }
    } catch {
      // Storage unavailable; show the prompt anyway.
    }

    const timer = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleChange = () => {
      if (document.fullscreenElement) {
        setVisible(false);
      }
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const enterFullscreen = async () => {
    setVisible(false);
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // The browser refused; nothing else to do.
    }
  };

  const dismiss = (forever: boolean) => {
    setVisible(false);
    try {
      if (forever) {
        localStorage.setItem(NEVER_KEY, '1');
      } else {
        sessionStorage.setItem(SESSION_KEY, '1');
      }
    } catch {
      // Storage unavailable; the choice just won't persist.
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={styles.prompt}
      role="region"
      aria-label="Full screen suggestion"
    >
      <div className={styles.body}>
        <VscScreenFull className={styles.icon} size={18} />
        <div className={styles.text}>
          <p className={styles.title}>Enter full screen?</p>
          <p className={styles.message}>
            Hide the browser bars so this feels like the real editor. Press Esc
            to exit at any time.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primary}
          onClick={enterFullscreen}
        >
          Enter full screen
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => dismiss(false)}
        >
          Not now
        </button>
        <button
          type="button"
          className={styles.link}
          onClick={() => dismiss(true)}
        >
          Don&apos;t ask again
        </button>
      </div>
    </div>
  );
};

export default FullscreenPrompt;