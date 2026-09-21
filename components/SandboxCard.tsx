import { VscLinkExternal } from 'react-icons/vsc';

import { SandboxProject } from '@/data/sandboxProjects';

import styles from '@/styles/SandboxCard.module.css';

interface SandboxCardProps {
  project: SandboxProject;
  /**
   * Set on duplicated marquee copies so keyboard and screen-reader users
   * only meet each link once.
   */
  decorative?: boolean;
}

const SandboxCard = ({ project, decorative = false }: SandboxCardProps) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.chip}
      aria-label={`Open ${project.title}`}
      title={project.description}
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative ? true : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.icon}
        alt=""
        width={24}
        height={24}
        loading="lazy"
        className={styles.icon}
      />
      <span className={styles.title}>{project.title}</span>
      <VscLinkExternal size={11} className={styles.action} aria-hidden="true" />
    </a>
  );
};

export default SandboxCard;