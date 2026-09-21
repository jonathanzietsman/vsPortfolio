import { Metadata } from 'next';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import {
  VscGithub,
  VscLinkExternal,
  VscPerson,
  VscRepo,
  VscRepoForked,
  VscStarEmpty,
} from 'react-icons/vsc';

import RepoCard from '@/components/RepoCard';
import { Repo, User } from '@/types';

import styles from '@/styles/GithubPage.module.css';

export const metadata: Metadata = {
  title: 'GitHub',
};

export const revalidate = 600;

// The GitHub API returns these, but they may not be on your shared types yet.
type GithubUser = User & { name?: string | null; bio?: string | null };
type GithubRepo = Repo & { fork?: boolean };

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;

async function getGithubData() {
  // Optional: add GITHUB_TOKEN to .env.local to avoid the 60 requests/hour limit
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };

  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate },
      }),
      // Fetch up to 100 so the totals cover every repo, not just the six shown
      fetch(
        `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
        { headers, next: { revalidate } }
      ),
    ]);

    if (!userRes.ok || !repoRes.ok) return null;

    const user: GithubUser = await userRes.json();
    const allRepos: GithubRepo[] = await repoRes.json();

    // Your own work only: forks would inflate the lists and counts
    const ownRepos = allRepos.filter((repo) => !repo.fork);

    return {
      user,
      recentRepos: ownRepos.slice(0, 6),
      totalStars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: ownRepos.reduce((sum, repo) => sum + repo.forks, 0),
    };
  } catch {
    return null;
  }
}

export default async function GithubPage() {
  const data = await getGithubData();

  // GitHub can rate-limit or be unreachable: show something useful, not a crash
  if (!data) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notice} role="status">
            <VscGithub size={22} className={styles.icon} />
            <div>
              <h1 className={styles.noticeTitle}>GitHub data isn&apos;t loading</h1>
              <p className={styles.noticeText}>
                GitHub didn&apos;t respond just now. You can still view the
                profile directly.
              </p>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileLink}
              >
                <VscGithub size={18} />
                <span>Open on GitHub</span>
                <VscLinkExternal size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { user, recentRepos, totalStars, totalForks } = data;

  const stats = [
    { label: 'Repositories', value: user.public_repos, icon: VscRepo },
    { label: 'Followers', value: user.followers, icon: VscPerson },
    { label: 'Stars earned', value: totalStars, icon: VscStarEmpty },
    { label: 'Forks', value: totalForks, icon: VscRepoForked },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.profile}>
            <Image
              src={user.avatar_url}
              className={styles.avatar}
              alt={`${user.login} avatar`}
              width={88}
              height={88}
              priority
            />
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>{user.name || user.login}</h1>
              <span className={styles.handle}>@{user.login}</span>
              {user.bio && <p className={styles.bio}>{user.bio}</p>}
            </div>
          </div>

          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLink}
          >
            <VscGithub size={18} />
            <span>View Profile</span>
            <VscLinkExternal size={14} />
          </a>
        </header>

        {/* Stats: one strip instead of four separate cards */}
        <dl className={styles.stats}>
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className={styles.stat}>
              <dd className={styles.statValue}>{value}</dd>
              <dt className={styles.statLabel}>
                <Icon size={14} aria-hidden="true" />
                {label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Contribution Graph */}
        <section className={styles.section} aria-labelledby="activity-title">
          <div className={styles.sectionHeader}>
            <h2 id="activity-title" className={styles.sectionTitle}>
              Contribution activity
            </h2>
          </div>
          <div className={styles.contributions}>
            <GitHubCalendar
              username={username}
              hideColorLegend
              colorScheme="dark"
              blockSize={10}
              blockMargin={3}
              fontSize={12}
              theme={{
                dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                light: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              style={{
                width: '100%',
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            />
          </div>
        </section>

        {/* Repositories */}
        <section className={styles.section} aria-labelledby="repos-title">
          <div className={styles.sectionHeader}>
            <h2 id="repos-title" className={styles.sectionTitle}>
              Recent repositories
            </h2>
            <a
              href={`https://github.com/${user.login}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewAll}
            >
              View all
              <VscLinkExternal size={14} />
            </a>
          </div>

          {recentRepos.length > 0 ? (
            <div className={styles.reposGrid}>
              {recentRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No public repositories yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}