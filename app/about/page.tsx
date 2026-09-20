"use client";

import { VscGithub, VscMail, VscLinkExternal } from "react-icons/vsc";
import Link from "next/link";

import styles from "@/styles/AboutPage.module.css";

const AboutPage = () => {
	return (
		<div className={styles.page}>
			<div className={styles.container}>
				{/* Header */}
				<header className={styles.header}>
					<div className={styles.headerContent}>
						<div className={styles.headerText}>
							<h1 className={styles.name}>Jonathan Zietsman</h1>
							<p className={styles.role}>Full Stack Software Engineer</p>
							<div className={styles.location}>
								<span className={styles.dot} />
								Durban, South Africa
							</div>
						</div>
					</div>

					<div className={styles.headerActions}>
						<a
							href="https://github.com/jonathanzietsman"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.iconButton}
						>
							<VscGithub size={20} />
						</a>
						<Link href="/contact" className={styles.iconButton}>
							<VscMail size={20} />
						</Link>
					</div>
				</header>

				<div className={styles.content}>
					{/* Bio Section */}
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<span className={styles.sectionNumber}>01</span>
							<h2 className={styles.sectionTitle}>About</h2>
						</div>

						<div className={styles.sectionBody}>
							<p className={styles.paragraph}>
								I&apos;m a full stack engineer specializing in TypeScript and
								the T3 stack. I build with Next.js, React, tRPC, Prisma, and Zod
								so types flow from the database all the way to the UI, and I've
								also shipped MERN stack apps with Node, Express, and MongoDB. I
								write backends in Node and Python, work with PostgreSQL,
								MongoDB, and Supabase, and test and document APIs with Postman,
								Swagger, and GraphQL.
							</p>

							<p className={styles.paragraph}>
								On the front end I build responsive interfaces with Tailwind
								CSS, Bootstrap, and modern component libraries, and I manage
								complex state with Redux and React Query. I secure apps with
								NextAuth/Auth.js, JWT, and Firebase, write unit tests as I go,
								containerize with Docker, and deploy to Vercel, AWS, and Heroku.
							</p>

							<p className={styles.paragraph}>
								Most recently I built ApexPOS, a retail point-of-sale app with
								role-based access for staff, managers, and owners, built on
								Next.js, tRPC, and Supabase with permissions enforced on the
								server.
							</p>
						</div>
					</section>

					{/* Experience Section */}
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<span className={styles.sectionNumber}>02</span>
							<h2 className={styles.sectionTitle}>Experience & Education</h2>
						</div>

						<div className={styles.sectionBody}>
							<div className={styles.experienceCard}>
								<div className={styles.expMeta}>
									<span className={styles.expPeriod}>Sep 2024 – Present</span>
								</div>
								<h3 className={styles.expRole}>
									Student, Software Engineering
								</h3>
								<p className={styles.expCompany}>Code Collage</p>
								<ul className={styles.expList}>
									<li>
										Two years of hands-on full-stack software development
										experience, building modern web applications across
										frontend, backend, databases, APIs, and deployment.
									</li>
									<li>
										Experienced across JavaScript, TypeScript, Python, React,
										Next.js, Node.js, Express, HTMX, and the MERN and T3 stacks.
									</li>
									<li>
										Engineered ApexPOS, a full-stack retail point-of-sale
										platform with role-based access control for staff, managers,
										and owners, using Next.js, tRPC, Prisma, PostgreSQL,
										Tailwind CSS, and Supabase.
									</li>
									<li>
										Worked extensively with RESTful APIs, GraphQL, React Query,
										Redux, Docker, Git/GitHub, unit testing, Postman, Swagger,
										JWT, Auth.js/NextAuth.js, Firebase, and modern cloud
										deployment platforms.
									</li>
									<li>
										Designed and developed this portfolio website as a complete
										full-stack project, from interface and responsive UI through
										application architecture and deployment.
									</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Skills Section */}
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<span className={styles.sectionNumber}>03</span>
							<h2 className={styles.sectionTitle}>Skills</h2>
						</div>

						<div className={styles.sectionBody}>
							<div className={styles.skillsGrid}>
								<div className={styles.skillCategory}>
									<h4 className={styles.skillTitle}>Languages</h4>
									<div className={styles.skillTags}>
										<span className={styles.skillTag}>JavaScript</span>
										<span className={styles.skillTag}>TypeScript</span>
										<span className={styles.skillTag}>Python</span>
										<span className={styles.skillTag}>HTML5</span>
										<span className={styles.skillTag}>CSS3</span>
									</div>
								</div>

								<div className={styles.skillCategory}>
									<h4 className={styles.skillTitle}>Frontend</h4>
									<div className={styles.skillTags}>
										<span className={styles.skillTag}>React</span>
										<span className={styles.skillTag}>Next.js</span>
										<span className={styles.skillTag}>HTMX</span>
										<span className={styles.skillTag}>Tailwind CSS</span>
										<span className={styles.skillTag}>Bootstrap</span>
										<span className={styles.skillTag}>Redux</span>
										<span className={styles.skillTag}>React Query</span>
										<span className={styles.skillTag}>shadcn/ui</span>
									</div>
								</div>

								<div className={styles.skillCategory}>
									<h4 className={styles.skillTitle}>Backend</h4>
									<div className={styles.skillTags}>
										<span className={styles.skillTag}>Node.js</span>
										<span className={styles.skillTag}>Express</span>
										<span className={styles.skillTag}>tRPC</span>
										<span className={styles.skillTag}>REST APIs</span>
										<span className={styles.skillTag}>GraphQL</span>
										<span className={styles.skillTag}>MERN Stack</span>
										<span className={styles.skillTag}>T3 Stack</span>
									</div>
								</div>

								<div className={styles.skillCategory}>
									<h4 className={styles.skillTitle}>Databases</h4>
									<div className={styles.skillTags}>
										<span className={styles.skillTag}>PostgreSQL</span>
										<span className={styles.skillTag}>MongoDB</span>
										<span className={styles.skillTag}>Prisma</span>
										<span className={styles.skillTag}>Supabase</span>
									</div>
								</div>

								<div className={styles.skillCategory}>
									<h4 className={styles.skillTitle}>Authentication</h4>
									<div className={styles.skillTags}>
										<span className={styles.skillTag}>Auth.js</span>
										<span className={styles.skillTag}>NextAuth.js</span>
										<span className={styles.skillTag}>JWT</span>
										<span className={styles.skillTag}>Firebase</span>
									</div>
								</div>

								<div className={styles.skillCategory}>
									<h4 className={styles.skillTitle}>DevOps & Deployment</h4>
									<div className={styles.skillTags}>
										<span className={styles.skillTag}>Git</span>
										<span className={styles.skillTag}>GitHub</span>
										<span className={styles.skillTag}>Docker</span>
										<span className={styles.skillTag}>Vercel</span>
										<span className={styles.skillTag}>AWS</span>
										<span className={styles.skillTag}>Heroku</span>
										<span className={styles.skillTag}>PythonAnywhere</span>
									</div>
								</div>

								<div className={styles.skillCategory}>
									<h4 className={styles.skillTitle}>Testing & API Tools</h4>
									<div className={styles.skillTags}>
										<span className={styles.skillTag}>Unit Testing</span>
										<span className={styles.skillTag}>Postman</span>
										<span className={styles.skillTag}>Swagger</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Beyond Code Section */}
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<span className={styles.sectionNumber}>05</span>
							<h2 className={styles.sectionTitle}>Beyond Code</h2>
						</div>

						<div className={styles.sectionBody}>
							<p className={styles.paragraph}>
								Outside of software engineering, my time is actively directed toward managing commercial ventures and driving operational strategy. Balancing high-stakes management with deep technical execution leaves no room for idle downtime; instead, it sharpens my business acumen and ensures that every application I architect is optimized for efficiency, scalability, and bottom-line impact.
							</p>
						</div>
					</section>
				</div>

				<footer className={styles.footer}>
					<Link href="/projects" className={styles.footerLink}>
						View my projects →
					</Link>
				</footer>
			</div>
		</div>
	);
};

export default AboutPage;
