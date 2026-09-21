"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  VscAccount,
  VscArrowRight,
  VscBriefcase,
  VscCloud,
  VscBeaker,
  VscCode,
  VscCompass,
  VscDatabase,
  VscGithub,
  VscKey,
  VscLayout,
  VscMail,
  VscServer,
  VscTools,
} from "react-icons/vsc";

import styles from "@/styles/AboutPage.module.css";

/* ============================
   Content (edit copy here)
   ============================ */

const taglines = [
  "Types that flow from database to UI",
  "Next.js · tRPC · Prisma · Supabase",
  "Latest build: ApexPOS",
];

type Token = [cls: string, text: string];

// The typed-out "about.ts" window. Token classes map to syntax colours.
const codeLines: Token[][] = [
  [["kw", "const "], ["id", "jonathan "], ["op", "= {"]],
  [["pad", "  "], ["prop", "name"], ["op", ": "], ["str", "'Jonathan Zietsman'"], ["op", ","]],
  [["pad", "  "], ["prop", "role"], ["op", ": "], ["str", "'Full Stack Software Engineer'"], ["op", ","]],
  [["pad", "  "], ["prop", "location"], ["op", ": "], ["str", "'Durban, South Africa'"], ["op", ","]],
  [["pad", "  "], ["prop", "stack"], ["op", ": ["], ["str", "'TypeScript'"], ["op", ", "], ["str", "'Next.js'"], ["op", ", "], ["str", "'tRPC'"], ["op", ", "], ["str", "'Prisma'"], ["op", "],"]],
  [["pad", "  "], ["prop", "deploys"], ["op", ": ["], ["str", "'Vercel'"], ["op", ", "], ["str", "'AWS'"], ["op", ", "], ["str", "'Heroku'"], ["op", "],"]],
  [["pad", "  "], ["prop", "studying"], ["op", ": "], ["str", "'Software Engineering'"], ["op", ","]],
  [["pad", "  "], ["prop", "latest"], ["op", ": "], ["str", "'ApexPOS'"], ["op", ","]],
  [["op", "};"]],
];

const codeLength = codeLines.reduce(
  (sum, line) => sum + line.reduce((s, [, text]) => s + text.length, 0),
  0
);

const codeAriaLabel =
  "about.ts: Jonathan Zietsman, Full Stack Software Engineer in Durban, South Africa. Stack: TypeScript, Next.js, tRPC, Prisma. Deploys to Vercel, AWS and Heroku. Studying Software Engineering. Latest project: ApexPOS.";

const experienceBullets = [
  "Two years of hands-on full-stack software development experience, building modern web applications across frontend, backend, databases, APIs, and deployment.",
  "Experienced across JavaScript, TypeScript, Python, React, Next.js, Node.js, Express, HTMX, and the MERN and T3 stacks.",
  "Engineered ApexPOS, a full-stack retail point-of-sale platform with role-based access control for staff, managers, and owners, using Next.js, tRPC, Prisma, PostgreSQL, Tailwind CSS, and Supabase.",
  "Worked extensively with RESTful APIs, GraphQL, React Query, Redux, Docker, Git/GitHub, unit testing, Postman, Swagger, JWT, Auth.js/NextAuth.js, Firebase, and modern cloud deployment platforms.",
  "Designed and developed this portfolio website as a complete full-stack project, from interface and responsive UI through application architecture and deployment.",
];

const skillGroups: { title: string; icon: IconType; tags: string[] }[] = [
  { title: "Languages", icon: VscCode, tags: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"] },
  { title: "Frontend", icon: VscLayout, tags: ["React", "Next.js", "HTMX", "Tailwind CSS", "Bootstrap", "Redux", "React Query", "shadcn/ui"] },
  { title: "Backend", icon: VscServer, tags: ["Node.js", "Express", "tRPC", "REST APIs", "GraphQL", "MERN Stack", "T3 Stack"] },
  { title: "Databases", icon: VscDatabase, tags: ["PostgreSQL", "MongoDB", "Prisma", "Supabase"] },
  { title: "Authentication", icon: VscKey, tags: ["Auth.js", "NextAuth.js", "JWT", "Firebase"] },
  { title: "DevOps & Deployment", icon: VscCloud, tags: ["Git", "GitHub", "Docker", "Vercel", "AWS", "Heroku", "PythonAnywhere"] },
  { title: "Testing & API Tools", icon: VscBeaker, tags: ["Unit Testing", "Postman", "Swagger"] },
];

const totalTech = skillGroups.reduce((sum, g) => sum + g.tags.length, 0);

/* ============================
   Small helpers and hooks
   ============================ */

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Writes the pointer position (relative to the element) into two CSS variables. */
const trackPointer = (
  e: PointerEvent<HTMLElement>,
  xVar = "--x",
  yVar = "--y"
) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty(xVar, `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty(yVar, `${e.clientY - rect.top}px`);
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** True once the element has scrolled into view (fires once). */
function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/** Types each phrase, holds, deletes, then moves to the next. */
function useTypewriter(phrases: string[], reduced: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    let phrase = 0;
    let chars = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = phrases[phrase];
      if (!deleting) {
        chars += 1;
        setText(full.slice(0, chars));
        if (chars === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        chars -= 1;
        setText(full.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 26);
      }
    };

    timer = setTimeout(tick, 1100);
    return () => clearTimeout(timer);
  }, [phrases, reduced]);

  return text;
}

/* ============================
   Building blocks
   ============================ */

type RevealVariant = "up" | "left" | "blur" | "scale";

const Reveal = ({
  children,
  delay = 0,
  variant = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
}) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cx(styles.reveal, styles[variant], inView && styles.in, className)}
      style={vars({ "--delay": `${delay}ms` })}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
  id,
}: {
  icon: IconType;
  title: string;
  id: string;
}) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref} className={cx(styles.sectionHeader, inView && styles.in)}>
      <span className={styles.sectionIcon}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      <span className={styles.sectionRule} aria-hidden="true" />
    </div>
  );
};

const Counter = ({ to }: { to: number }) => {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{value}</span>
      <span className={styles.srOnly}>{to}</span>
    </span>
  );
};

const CodeWindow = () => {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(codeLength);
      return;
    }
    let raf = 0;
    const start = performance.now() + 700; // brief pause before typing starts
    const tick = (now: number) => {
      const n = Math.min(codeLength, Math.max(0, Math.floor((now - start) / 14)));
      setCount(n);
      if (n < codeLength) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  // Work out which tokens are visible and where the caret sits
  let remaining = count;
  let caretLine = 0;
  const lines = codeLines.map((tokens, li) => {
    const parts: ReactNode[] = [];
    tokens.forEach(([cls, text], ti) => {
      if (remaining <= 0) return;
      const shown = text.slice(0, remaining);
      remaining -= shown.length;
      caretLine = li;
      parts.push(
        <span key={ti} className={styles[cls]}>
          {shown}
        </span>
      );
    });
    return parts;
  });

  return (
    <div ref={ref} className={styles.codeFloat}>
      <div className={styles.codeWindow} role="img" aria-label={codeAriaLabel}>
        <div className={styles.codeBar} aria-hidden="true">
          <span className={styles.winDots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.codeTab}>about.ts</span>
        </div>
        <div className={styles.codeBody} aria-hidden="true">
          {lines.map((parts, li) => (
            <div key={li} className={styles.line}>
              <span className={styles.ln}>{li + 1}</span>
              <span className={styles.lineText}>
                {parts}
                {li === caretLine && <span className={styles.caret} />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================
   Page
   ============================ */

const nameWords = ["Jonathan", "Zietsman"];

const AboutPage = () => {
  const reduced = useReducedMotion();
  const tagline = useTypewriter(taglines, reduced);
  const [timelineRef, timelineIn] = useInView<HTMLDivElement>(0.15);

  // Started Sep 2024, so this stays correct as time passes
  const started = new Date(2024, 8, 9).getTime();
  const years = Math.max(
    1,
    Math.floor((Date.now() - started) / (365.25 * 24 * 60 * 60 * 1000))
  );

  const stats = [
    { value: years, label: "years of hands-on building" },
    { value: totalTech, label: "tools and technologies" },
    { value: skillGroups.length, label: "skill areas" },
  ];

  let letterIndex = 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* ============ Hero ============ */}
        <header
          className={styles.hero}
          onPointerMove={(e) => trackPointer(e, "--mx", "--my")}
        >
          <div className={styles.aurora} aria-hidden="true">
            <span className={cx(styles.blob, styles.blobA)} />
            <span className={cx(styles.blob, styles.blobB)} />
            <span className={cx(styles.blob, styles.blobC)} />
          </div>
          <div className={styles.gridBase} aria-hidden="true" />
          <div className={styles.grid} aria-hidden="true" />
          <div className={styles.spot} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.identity}>
              <div className={styles.avatarRing} aria-hidden="true">
                <div className={styles.avatar}>JZ</div>
              </div>

              <h1 className={styles.name} aria-label="Jonathan Zietsman">
                {nameWords.map((word) => (
                  <span key={word} className={styles.word} aria-hidden="true">
                    {word.split("").map((ch, i) => (
                      <span
                        key={i}
                        className={styles.letter}
                        style={vars({ "--i": letterIndex++ })}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              <p className={styles.role}>Full Stack Software Engineer</p>

              <p className={styles.tagline} aria-hidden="true">
                <span>{tagline}</span>
                <span className={styles.caret} />
              </p>

              <div className={styles.location}>
                <span className={styles.dot} />
                Durban, South Africa
              </div>

              <div className={styles.headerActions}>
                <a
                  href="https://github.com/jonathanzietsman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconButton}
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  <VscGithub size={20} />
                </a>
                <Link
                  href="/contact"
                  className={styles.iconButton}
                  aria-label="Contact me"
                >
                  <VscMail size={20} />
                </Link>
              </div>
            </div>

            <CodeWindow />
          </div>
        </header>

        {/* ============ Stats ============ */}
        <div className={styles.stats}>
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 120} variant="scale">
              <div className={cx(styles.statTile, styles.glow)} onPointerMove={trackPointer}>
                <span className={styles.statValue}>
                  <Counter to={stat.value} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.content}>
          {/* ============ About ============ */}
          <section className={styles.section} aria-labelledby="about-title">
            <SectionHeader icon={VscAccount} title="About" id="about-title" />

            <div className={styles.sectionBody}>
              <Reveal variant="blur">
                <p className={styles.paragraph}>
                  I&apos;m a full stack engineer specializing in TypeScript and
                  the T3 stack. I build with Next.js, React, tRPC, Prisma, and
                  Zod so types flow from the database all the way to the UI, and
                  I&apos;ve also shipped MERN stack apps with Node, Express, and
                  MongoDB. I write backends in Node and Python, work with
                  PostgreSQL, MongoDB, and Supabase, and test and document APIs
                  with Postman, Swagger, and GraphQL.
                </p>
              </Reveal>

              <Reveal variant="blur" delay={120}>
                <p className={styles.paragraph}>
                  On the front end I build responsive interfaces with Tailwind
                  CSS, Bootstrap, and modern component libraries, and I manage
                  complex state with Redux and React Query. I secure apps with
                  NextAuth/Auth.js, JWT, and Firebase, write unit tests as I go,
                  containerize with Docker, and deploy to Vercel, AWS, and
                  Heroku.
                </p>
              </Reveal>

              <Reveal variant="left" delay={160}>
                <div className={cx(styles.callout, styles.glow)} onPointerMove={trackPointer}>
                  <p className={styles.paragraph}>
                    Most recently I built ApexPOS, a retail point-of-sale app
                    with role-based access for staff, managers, and owners,
                    built on Next.js, tRPC, and Supabase with permissions
                    enforced on the server.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ============ Experience ============ */}
          <section className={styles.section} aria-labelledby="experience-title">
            <SectionHeader
              icon={VscBriefcase}
              title="Experience & Education"
              id="experience-title"
            />

            <div
              ref={timelineRef}
              className={cx(styles.timeline, timelineIn && styles.in)}
            >
              <span className={styles.rail} aria-hidden="true" />
              <span className={styles.node} aria-hidden="true" />

              <article
                className={cx(styles.experienceCard, styles.glow)}
                onPointerMove={trackPointer}
              >
                <span className={styles.expPeriod}>Sep 2024 – Present</span>
                <h3 className={styles.expRole}>Student, Software Engineering</h3>
                <p className={styles.expCompany}>Code Collage</p>
                <ul className={styles.expList}>
                  {experienceBullets.map((text, i) => (
                    <li key={i} style={vars({ "--i": i })}>
                      {text}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          {/* ============ Skills ============ */}
          <section className={styles.section} aria-labelledby="skills-title">
            <SectionHeader icon={VscTools} title="Skills" id="skills-title" />

            <div className={styles.skillsGrid}>
              {skillGroups.map((group, gi) => (
                <SkillCard key={group.title} group={group} index={gi} />
              ))}
            </div>
          </section>

          {/* ============ Beyond Code ============ */}
          <section className={styles.section} aria-labelledby="beyond-title">
            <SectionHeader icon={VscCompass} title="Beyond Code" id="beyond-title" />

            <Reveal variant="scale">
              <div className={styles.beyondWrap}>
                <div className={styles.beyond}>
                  <span className={styles.quoteMark} aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className={styles.paragraph}>
                    Outside of software engineering, my time is actively
                    directed toward managing commercial ventures and driving
                    operational strategy. Balancing high-stakes management with
                    deep technical execution leaves no room for idle downtime;
                    instead, it sharpens my business acumen and ensures that
                    every application I architect is optimized for efficiency,
                    scalability, and bottom-line impact.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>
        </div>

        {/* ============ Closing CTA ============ */}
        <Reveal variant="up">
          <footer className={styles.cta}>
            <h2 className={styles.ctaTitle}>Want to see what I&apos;ve built?</h2>
            <p className={styles.ctaText}>
              Browse the projects, or say hello if you&apos;d like to work together.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/projects" className={styles.primaryBtn}>
                <span>View my projects</span>
                <VscArrowRight className={styles.arrow} aria-hidden="true" />
              </Link>
              <Link href="/contact" className={styles.secondaryBtn}>
                <VscMail aria-hidden="true" />
                <span>Get in touch</span>
              </Link>
            </div>
          </footer>
        </Reveal>
      </div>
    </div>
  );
};

const SkillCard = ({
  group,
  index,
}: {
  group: { title: string; icon: IconType; tags: string[] };
  index: number;
}) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const Icon = group.icon;
  return (
    <div
      ref={ref}
      className={cx(styles.skillCategory, styles.glow, inView && styles.in)}
      style={vars({ "--card": index })}
      onPointerMove={trackPointer}
    >
      <div className={styles.skillHead}>
        <span className={styles.skillIcon}>
          <Icon size={16} aria-hidden="true" />
        </span>
        <h3 className={styles.skillTitle}>{group.title}</h3>
      </div>
      <ul className={styles.skillTags}>
        {group.tags.map((tag, i) => (
          <li key={tag} className={styles.skillTag} style={vars({ "--i": i })}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;