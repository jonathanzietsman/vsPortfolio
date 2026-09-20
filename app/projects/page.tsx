import { Metadata } from 'next';
import {
  VscFolderOpened,
  VscGithub,
  VscLinkExternal,
  VscBeaker,
} from 'react-icons/vsc';

import ProjectCard from '@/components/ProjectCard';
import SandboxCard from '@/components/SandboxCard';
import { projects } from '@/data/projects';
import { sandboxProjects } from '@/data/sandboxProjects';

import styles from '@/styles/ProjectsPage.module.css';

export const metadata: Metadata = {
  title: 'Projects',
};

const ProjectsPage = () => {
  const totalProjects = projects.length;
  const totalSandbox = sandboxProjects.length;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.iconWrapper}>
              <VscFolderOpened className={styles.icon} size={24} />
            </div>
            <div className={styles.meta}>
              <span className={styles.count}>{totalProjects} Projects</span>
            </div>
          </div>

          <div className={styles.headerContent}>
            <h1 className={styles.title}>Featured Work</h1>
            <p className={styles.subtitle}>
              A curated collection of projects I&apos;ve built. Each represents
              a unique challenge and learning experience.
            </p>
          </div>
        </header>

        <div className={styles.timeline}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index + 1}
            />
          ))}
        </div>

        {/* Sandbox */}
        <section className={styles.sandboxSection}>
          <div className={styles.sandboxHeader}>
            <div className={styles.sandboxIconWrapper}>
              <VscBeaker className={styles.sandboxIcon} size={20} />
            </div>
            <div className={styles.sandboxHeaderText}>
              <h2 className={styles.sandboxTitle}>Sandbox</h2>
              <p className={styles.sandboxSubtitle}>
                Small experiments, early builds, and one-file toys. {totalSandbox}{' '}
                projects — click any icon to open it.
              </p>
            </div>
          </div>

          <div className={styles.sandboxGrid}>
            {sandboxProjects.map((project) => (
              <SandboxCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerLine} />
          <a
            href="https://github.com/jonathanzietsman"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <VscGithub size={18} />
            <span>Explore more on GitHub</span>
            <VscLinkExternal size={14} />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default ProjectsPage;