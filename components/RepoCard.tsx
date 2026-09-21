import { VscLinkExternal, VscRepoForked, VscStarEmpty } from 'react-icons/vsc';

import { Repo } from '@/types';

import styles from '@/styles/RepoCard.module.css';

interface RepoCardProps {
  repo: Repo;
}

// Defined once, outside the component, so it isn't rebuilt on every render
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
};

const getLanguageColor = (lang: string) => languageColors[lang] || '#8b949e';

const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{repo.name}</h3>
        <VscLinkExternal
          className={styles.externalIcon}
          size={14}
          aria-hidden="true"
        />
      </div>

      {repo.description ? (
        <p className={styles.description}>{repo.description}</p>
      ) : (
        <p className={`${styles.description} ${styles.noDescription}`}>
          No description yet
        </p>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.meta}>
          {repo.language && (
            <span className={styles.language}>
              <span
                className={styles.languageDot}
                style={{ backgroundColor: getLanguageColor(repo.language) }}
                aria-hidden="true"
              />
              {repo.language}
            </span>
          )}

          <div className={styles.stat}>
            <VscStarEmpty size={12} aria-hidden="true" />
            <span aria-label={`${repo.stargazers_count} stars`}>
              {repo.stargazers_count}
            </span>
          </div>

          <div className={styles.stat}>
            <VscRepoForked size={12} aria-hidden="true" />
            <span aria-label={`${repo.forks} forks`}>{repo.forks}</span>
          </div>
        </div>
      </div>

      <span className={styles.srOnly}>(opens in a new tab)</span>
    </a>
  );
};

export default RepoCard;