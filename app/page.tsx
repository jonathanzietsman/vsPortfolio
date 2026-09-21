'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { VscArrowRight, VscGithub, VscMail, VscCode } from 'react-icons/vsc';

import HomeTips from '@/components/HomeTips';

import styles from '@/styles/HomePage.module.css';

/**
 * How the name appears on load. Change this one word to switch:
 *   'decode' - letters scramble like code, then lock in left to right
 *   'mask'   - each word slides up from behind an invisible line
 */
const NAME_REVEAL = 'decode' as 'decode' | 'mask';

const nameWords = ['Jonathan', 'Zietsman'];

// Sets a CSS custom property (like the animation delay) from a style prop
const vars = (v: Record<string, string | number>) => v as CSSProperties;

// Feeds the cursor position to the background spotlight
const trackPointer = (e: PointerEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

/* ============================
   Name reveal option 1: decode
   ============================ */

const GLYPHS = '01{}[]<>/\\=+*#$%&@?!;:~';
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Every letter starts as a random code character, then resolves into the real
 * letter from left to right. The real letters are always in the layout (just
 * invisible until resolved) so the name never jumps around while it decodes.
 */
function DecodeText({
  words,
  startDelay = 550,
  settle = 350,
  stagger = 55,
}: {
  words: string[];
  startDelay?: number;
  settle?: number;
  stagger?: number;
}) {
  const total = words.reduce((sum, w) => sum + w.length, 0);
  const [state, setState] = useState<{
    started: boolean;
    resolved: number;
    glyphs: string[];
  }>({ started: false, resolved: 0, glyphs: [] });

  useEffect(() => {
    // Reduced motion: show the finished name straight away
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState({ started: true, resolved: total, glyphs: [] });
      return;
    }

    const t0 = performance.now() + startDelay;
    const id = setInterval(() => {
      const now = performance.now();
      if (now < t0) return;

      const resolved =
        now < t0 + settle
          ? 0
          : Math.min(total, Math.floor((now - t0 - settle) / stagger) + 1);

      setState({
        started: true,
        resolved,
        glyphs: Array.from({ length: total }, randomGlyph),
      });

      if (resolved >= total) clearInterval(id);
    }, 45);

    return () => clearInterval(id);
  }, [total, startDelay, settle, stagger]);

  let index = 0;

  return (
    <>
      {words.map((word) => (
        <span key={word} className={styles.word} aria-hidden="true">
          {word.split('').map((ch) => {
            const i = index++;
            const done = i < state.resolved;
            return (
              <span key={i} className={styles.dLetter}>
                <span className={`${styles.dFinal} ${done ? styles.dShow : ''}`}>
                  {ch}
                </span>
                {state.started && !done && (
                  <span className={styles.dGlitch}>{state.glyphs[i]}</span>
                )}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

/* ============================
   Name reveal option 2: mask
   ============================ */

function MaskText({ words }: { words: string[] }) {
  return (
    <>
      {words.map((word, w) => (
        <span key={word} className={styles.maskWord} aria-hidden="true">
          <span className={styles.maskInner} style={vars({ '--w': w })}>
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

/* ============================
   Page
   ============================ */

export default function HomePage() {
  return (
    <div className={styles.page} onPointerMove={trackPointer}>
      <div className={styles.spotlight} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.icon} aria-hidden="true">
              <VscCode size={32} />
            </div>
          </div>

          <div className={styles.intro}>
            <p className={styles.greeting}>Hello, I&apos;m</p>

            <h1 className={styles.name} aria-label="Jonathan Zietsman">
              {NAME_REVEAL === 'decode' ? (
                <DecodeText words={nameWords} />
              ) : (
                <MaskText words={nameWords} />
              )}
            </h1>

            <p className={styles.role}>Full Stack Software Engineer</p>

            <div className={styles.divider} />

            <p className={styles.description}>
              Passionate about solving problems through code, I am currently fast-tracking my full-stack software engineering skills at CodeCollege. I focus on mastering foundational and modern web technologies to create clean, high-performance applications that focus on the user.
            </p>
          </div>

          <div className={styles.actions}>
            <Link
              href="/projects"
              className={styles.primaryAction}
              style={vars({ '--d': '2.05s' })}
            >
              <span>View Projects</span>
              <VscArrowRight className={styles.arrow} size={18} />
            </Link>

            <Link
              href="/about"
              className={styles.secondaryAction}
              style={vars({ '--d': '2.18s' })}
            >
              <span>Learn More</span>
            </Link>
          </div>

          <div className={styles.links}>
            <a
              href="https://github.com/jonathanzietsman"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <VscGithub size={16} />
              <span>GitHub</span>
            </a>

            <span className={styles.linkSeparator}>/</span>

            <Link href="/contact" className={styles.link}>
              <VscMail size={16} />
              <span>Contact</span>
            </Link>
          </div>

          <HomeTips />
        </div>
      </div>
    </div>
  );
}