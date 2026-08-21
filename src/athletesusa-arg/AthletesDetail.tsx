import { Link, useParams } from "react-router-dom";
import { domAnimation, LazyMotion, m, MotionConfig } from "motion/react";
import { detailContent, isDetailSlug } from "./athletes-content";
import styles from "./AthletesUsa.module.css";

function Brand() {
  return (
    <span className={styles.brand} aria-label="Athletes USA">
      <span>ATHLETES</span>
      <strong>USA</strong>
      <svg viewBox="0 0 58 18" aria-hidden="true">
        <path d="M2 13c17-2 27-12 45-10-8 1-14 5-20 8-7 3-15 5-25 2Z" />
        <path d="M9 17c15-1 25-7 40-12-8 8-20 13-40 12Z" />
      </svg>
    </span>
  );
}

export default function AthletesDetail() {
  const { detail } = useParams();

  if (!isDetailSlug(detail)) {
    return (
      <main className={styles.detailPage}>
        <nav className={styles.detailNav}>
          <Brand />
          <Link to="/">Volver</Link>
        </nav>
        <section className={styles.detailHero}>
          <div>
            <p className={styles.eyebrow}>PÁGINA NO ENCONTRADA</p>
            <h1>Este camino todavía no existe.</h1>
            <p>Volvé a la experiencia principal para conocer el recorrido completo.</p>
          </div>
        </section>
      </main>
    );
  }

  const content = detailContent[detail];

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <div className={styles.detailPage}>
          <nav className={styles.detailNav}>
            <Link to="/"><Brand /></Link>
            <Link to="/">← Volver</Link>
          </nav>

          <m.header
            className={styles.detailHero}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h1>{content.headline}</h1>
              <p>{content.intro}</p>
            </div>
          </m.header>

          <main className={styles.detailContent}>
            {content.sections.map((section) => (
              <section className={styles.detailBlock} key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.items ? (
                  <ul>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </main>

          <section className={styles.detailCta}>
            <p className={styles.eyebrow}>TU PRIMER PASO</p>
            <h2>Ahora descubramos tu camino.</h2>
            <Link className={styles.arrowLink} to="/#evaluation">
              <span>Evaluá tu perfil</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
