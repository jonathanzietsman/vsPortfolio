'use client';

import { useEffect, useRef, useState } from 'react';
import { VscCheck, VscCopy, VscMail } from 'react-icons/vsc';

import styles from '@/styles/ContactPage.module.css';

interface ContactActionsProps {
  email: string;
}

// Older browsers and non-secure contexts have no navigator.clipboard
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
};

const ContactActions = ({ email }: ContactActionsProps) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const ok = await copyText(email);
    setStatus(ok ? 'copied' : 'failed');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2200);
  };

  const copied = status === 'copied';

  return (
    <div className={styles.actions}>
      <a href={`mailto:${email}`} className={styles.primaryBtn}>
        <VscMail size={16} aria-hidden="true" />
        <span>Send an email</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={`${styles.secondaryBtn} ${copied ? styles.copied : ''}`}
      >
        {copied ? (
          <VscCheck size={16} aria-hidden="true" />
        ) : (
          <VscCopy size={16} aria-hidden="true" />
        )}
        <span>
          {status === 'copied'
            ? 'Copied'
            : status === 'failed'
              ? 'Copy failed'
              : 'Copy email'}
        </span>
      </button>

      {/* Announces the result to screen readers */}
      <span className={styles.srOnly} role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  );
};

export default ContactActions;