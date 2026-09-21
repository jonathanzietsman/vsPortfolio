'use client';

import { useEffect, useState } from 'react';

import styles from '@/styles/ContactPage.module.css';

const LocalTime = () => {
  // Empty until mounted so server and client render the same HTML
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Africa/Johannesburg',
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.status}>
      <p className={styles.statusPill}>
        <span className={styles.dot} aria-hidden="true" />
        <span>Durban, South Africa</span>
        <span className={styles.statusSep} aria-hidden="true">
          /
        </span>
        <span className={styles.time}>{time || '--:--'}</span>
        <span className={styles.timeZone}>SAST</span>
      </p>
    </div>
  );
};

export default LocalTime;