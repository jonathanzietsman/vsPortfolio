import Image from 'next/image';
import { VscLinkExternal } from 'react-icons/vsc';

import { Project } from '@/types';

import styles from '@/styles/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  /** Renders the card full-width with more presence. */
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${featured ? styles.featured : ''}`}
    >
      <div className={styles.logoWrapper}>
        <Image
          src={project.logo}
          alt={`${project.title} logo`}
          width={32}
          height={32}
          className={styles.logo}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          <VscLinkExternal size={14} className={styles.arrow} aria-hidden="true" />
        </div>

        <p className={styles.description}>{project.description}</p>

        <span className={styles.srOnly}>(opens in a new tab)</span>
      </div>
    </a>
  );
};

export default ProjectCard;