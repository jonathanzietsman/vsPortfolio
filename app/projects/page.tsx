import { Metadata } from 'next';
import {
  VscBeaker,
  VscFolderOpened,
  VscGithub,
  VscLinkExternal,
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

  const marqueeDuration = Math.max(40, totalSandbox * 3.5);

  // Second row starts halfway through the list so both rows don't show
  // the same chips lined up under each other.
  const half = Math.ceil(totalSandbox / 2);
  const secondRow = [
    ...sandboxProjects.slice(half),
    ...sandboxProjects.slice(0, half),
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>
              <VscFolderOpened className={styles.icon} size={26} />
              Featured Work
            </h1>
            <span className={styles.count}>
              {totalProjects} {totalProjects === 1 ? 'project' : 'projects'}
            </span>
          </div>

          <p className={styles.subtitle}>
            A curated collection of projects I&apos;ve built. Each represents a
            unique challenge and learning experience.
          </p>
        </header>

        {/* First card is the featured one and spans the full width */}
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Sandbox - smaller experiments, full-width marquee */}
      <section className={styles.sandboxSection} aria-labelledby="sandbox-title">
        <div className={styles.sandboxHeader}>
          <div className={styles.sandboxHeaderTop}>
            <h2 id="sandbox-title" className={styles.sandboxTitle}>
              <VscBeaker className={styles.icon} size={22} />
              Sandbox
            </h2>
            <span className={styles.count}>
              {totalSandbox} {totalSandbox === 1 ? 'experiment' : 'experiments'}
            </span>
          </div>
          <p className={styles.sandboxSubtitle}>
            Smaller experiments and tools. Hover to pause, click to open.
          </p>
        </div>

        <div className={styles.marquee}>
          {/* Row 1 - scrolls left (the real, focusable links) */}
          <div
            className={styles.marqueeTrack}
            style={{ animationDuration: `${marqueeDuration}s` }}
          >
            <div className={styles.marqueeGroup}>
              {sandboxProjects.map((project) => (
                <SandboxCard key={project.slug} project={project} />
              ))}
            </div>
            <div className={styles.marqueeGroup} aria-hidden="true">
              {sandboxProjects.map((project) => (
                <SandboxCard
                  key={`dup-${project.slug}`}
                  project={project}
                  decorative
                />
              ))}
            </div>
          </div>

          {/* Row 2 - scrolls right (decorative copy, offset order) */}
          <div
            className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}
            style={{ animationDuration: `${marqueeDuration}s` }}
            aria-hidden="true"
          >
            <div className={styles.marqueeGroup}>
              {secondRow.map((project) => (
                <SandboxCard
                  key={`rev-${project.slug}`}
                  project={project}
                  decorative
                />
              ))}
            </div>
            <div className={styles.marqueeGroup}>
              {secondRow.map((project) => (
                <SandboxCard
                  key={`rev-dup-${project.slug}`}
                  project={project}
                  decorative
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.footerWrap}>
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            More of my work, including work in progress, is on GitHub.
          </p>
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