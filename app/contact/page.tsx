import { Metadata } from 'next';

import ContactCode from '@/components/ContactCode';

import styles from '@/styles/ContactPage.module.css';

export const metadata: Metadata = {
  title: 'Contact',
};

const ContactPage = () => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>Contact Me</h1>
      <p className={styles.pageSubtitle}>
        Let&apos;s build.<br/> Reach out via the channels below to discuss high-impact ventures, technical infrastructure scaling, or custom automation development. I am selectively open to high-stakes opportunities and connecting with serious operators who execute at speed.
      </p>
      <div className={styles.container}>
        <div className={styles.contactContainer}>
          <ContactCode />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
