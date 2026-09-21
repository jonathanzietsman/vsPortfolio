import { Metadata } from 'next';

import ContactActions from '@/components/ContactActions';
import ContactCode, { EMAIL } from '@/components/ContactCode';
import LocalTime from '@/components/LocalTime';

import styles from '@/styles/ContactPage.module.css';

export const metadata: Metadata = {
  title: 'Contact',
};

const ContactPage = () => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>
        <span className={styles.titleMask}>
          <span className={styles.titleInner}>Contact Me</span>
        </span>
      </h1>
      <p className={styles.pageSubtitle}>
        Let&apos;s build.<br/> Reach out via the channels below to discuss high-impact ventures, technical infrastructure scaling, or custom automation development. I am selectively open to high-stakes opportunities and connecting with serious operators who execute at speed.
      </p>

      <LocalTime />

      <div className={styles.container}>
        <div className={styles.contactContainer}>
          <ContactCode />
        </div>
        <ContactActions email={EMAIL} />
      </div>
    </div>
  );
};

export default ContactPage;