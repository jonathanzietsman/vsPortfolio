import { VscLinkExternal } from 'react-icons/vsc';

import { SandboxProject } from '@/data/sandboxProjects';

import styles from '@/styles/SandboxCard.module.css';

interface SandboxCardProps {
  project: SandboxProject;
}

const SandboxCard = ({ project }: SandboxCardProps) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`Open ${project.title}`}
    >
      <div className={styles.stage}>
        <div className={styles.glow} aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.icon}
          alt=""
          width={88}
          height={88}
          loading="lazy"
          className={styles.icon}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
      </div>

      <span className={styles.action} aria-hidden="true">
        <VscLinkExternal size={12} />
      </span>
    </a>
  );
};

export default SandboxCard;