import {
  CSSProperties,
  FormEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  createScope,
  createTimeline,
  onScroll,
  splitText,
  stagger,
  utils,
} from "animejs";
import { Link, useLocation } from "react-router-dom";
import campusImage from "./assets/campus-source.jpg";
import delfiGonzalezCase from "./assets/case-delfi-gonzalez.jpg";
import delfinaSchmidtCase from "./assets/case-delfina-schmidt.jpg";
import emilJaaskelainenCase from "./assets/case-emil-jaaskelainen.jpg";
import liuSharksLogo from "./assets/logo-liu-sharks.png";
import rioGrandeLogo from "./assets/logo-rio-grande.png";
import stLouisCityLogo from "./assets/logo-st-louis-city.png";
import stadiumImage from "./assets/stadium-source.jpg";
import styles from "./AthletesUsa.module.css";

type SceneProps = {
  art: ReactNode;
  children: ReactNode;
  className?: string;
  id: string;
  image?: string;
  imageAlt?: string;
  side: "left" | "right";
  theme: "dark" | "light" | "navy";
};

type EvaluationData = {
  academicStage: string;
  age: string;
  athleticLevel: string;
  email: string;
  englishLevel: string;
  goal: string;
  graduationYear: string;
  location: string;
  name: string;
  sport: string;
  whatsapp: string;
};

const initialEvaluation: EvaluationData = {
  academicStage: "",
  age: "",
  athleticLevel: "",
  email: "",
  englishLevel: "",
  goal: "",
  graduationYear: "",
  location: "",
  name: "",
  sport: "",
  whatsapp: "",
};

type SuccessCase = {
  detail: string;
  image: string | null;
  logo?: string | null;
  name: string;
};

const successCases: SuccessCase[] = [
  {
    name: "Emil Jaaskelainen",
    detail: "Fútbol · St. Louis City SC",
    image: emilJaaskelainenCase,
    logo: stLouisCityLogo,
  },
  {
    name: "Delfina Schmidt",
    detail: "Vóley · Rio Grande",
    image: delfinaSchmidtCase,
    logo: rioGrandeLogo,
  },
  {
    name: "Delfi González",
    detail: "Hockey · LIU Sharks",
    image: delfiGonzalezCase,
    logo: liuSharksLogo,
  },
  { name: "Próximo caso", detail: "En preparación", image: null },
  { name: "Próximo caso", detail: "En preparación", image: null },
  { name: "Próximo caso", detail: "En preparación", image: null },
];

type TeamMember = {
  bio: string;
  image: string | null;
  name: string;
  role: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Nombre y apellido",
    role: "Rol · Área",
    bio: "Bio corta: recorrido y rol dentro del equipo.",
    image: null,
  },
  {
    name: "Nombre y apellido",
    role: "Rol · Área",
    bio: "Bio corta: recorrido y rol dentro del equipo.",
    image: null,
  },
  {
    name: "Nombre y apellido",
    role: "Rol · Área",
    bio: "Bio corta: recorrido y rol dentro del equipo.",
    image: null,
  },
  {
    name: "Nombre y apellido",
    role: "Rol · Área",
    bio: "Bio corta: recorrido y rol dentro del equipo.",
    image: null,
  },
];

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

function ArrowLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link className={styles.arrowLink} data-copy-block to={to}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function Scene({
  art,
  children,
  className = "",
  id,
  image,
  imageAlt = "",
  side,
  theme,
}: SceneProps) {
  const isFirstScene = id === "dream";
  return (
    <section
      aria-hidden={!isFirstScene}
      className={`${styles.section} ${styles.scene} ${styles[theme]} ${className}`}
      data-active={isFirstScene ? "true" : "false"}
      data-scene={id}
      data-side={side}
      id={id}
      inert={!isFirstScene}
    >
      {image ? (
        <div className={styles.media} data-media aria-hidden={imageAlt === ""}>
          <img src={image} alt={imageAlt} data-media-image />
          <div className={styles.mediaScrim} />
        </div>
      ) : null}
      <div className={styles.artLayer} data-art>{art}</div>
      <div className={styles.sectionContent} data-copy>
        {children}
      </div>
    </section>
  );
}

function OutcomeOrbit() {
  return (
    <div className={styles.outcomeOrbit} data-orbit aria-hidden="true">
      <span data-orbit-label>ESTUDIO</span>
      <span data-orbit-label>DEPORTE</span>
      <span data-orbit-label>FUTURO</span>
      <div className={styles.orbitCore} data-orbit-core>USA</div>
    </div>
  );
}

function JourneyPath() {
  const steps = [
    {
      label: "Evaluación",
      info: "Analizamos tu perfil deportivo y académico para medir tu nivel y definir qué universidades se ajustan a vos.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 2.5h6v3H9z" />
          <path d="m9 13.5 2 2 4-4.5" />
        </svg>
      ),
    },
    {
      label: "Perfil",
      info: "Producimos tu video deportivo y armamos el expediente académico que los coaches universitarios quieren ver.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
          <path d="m15.5 10.5 6-3v9l-6-3" />
        </svg>
      ),
    },
    {
      label: "Becas",
      info: "Promocionamos tu perfil ante una red de más de 20.000 coaches de universidades que dan ayuda económica.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3.5 10 5-10 5-10-5 10-5Z" />
          <path d="M6.5 10.8V16c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-5.2" />
          <path d="M22 8.5v5" />
        </svg>
      ),
    },
    {
      label: "Admisión",
      info: "Coordinamos postulaciones, papeleo y visa para que llegues a tu universidad sin vueltas ni demoras.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="10" r="3.2" />
          <path d="M9 17h6" />
        </svg>
      ),
    },
    {
      label: "Soporte",
      info: "Te acompañamos antes de viajar, durante toda tu carrera universitaria y también después de graduarte.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13a8 8 0 0 1 16 0" />
          <rect x="2.8" y="13" width="4.2" height="6.5" rx="1.8" />
          <rect x="17" y="13" width="4.2" height="6.5" rx="1.8" />
          <path d="M20.5 19.5v.7a2.3 2.3 0 0 1-2.3 2.3H14" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.journeyArt} aria-hidden="true">
      <div className={styles.journeyCards}>
        {steps.map((step) => (
          <article className={styles.journeyCard} data-journey-card key={step.label}>
            <span className={styles.journeyCardIcon}>{step.icon}</span>
            <strong>{step.label}</strong>
            <p>{step.info}</p>
          </article>
        ))}
      </div>
      <div className={styles.journeyRail}>
        <svg className={styles.journeyLineVertical} viewBox="0 0 220 660" preserveAspectRatio="none">
          <path className={styles.journeyTrack} d="M110 20V640" />
          <path
            className={styles.journeyProgress}
            data-journey-progress
            d="M110 20V640"
          />
        </svg>
        <svg className={styles.journeyLineHorizontal} viewBox="0 0 620 10" preserveAspectRatio="none">
          <path className={styles.journeyTrack} d="M0 5H620" />
          <path
            className={styles.journeyProgress}
            data-journey-progress
            d="M0 5H620"
          />
        </svg>
        <ol>
          {steps.map((step, index) => (
            <li data-journey-item key={step.label}>
              <span>{index + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* Escena "Convertimos tu potencial..." fuera de servicio por ahora.
function OpportunityNetwork() {
  return (
    <div className={styles.networkArt} aria-hidden="true">
      <div className={styles.profileCard} data-profile-card>
        <div className={styles.profileAvatar}>10</div>
        <div>
          <span>PERFIL DEPORTIVO</span>
          <strong>LISTO PARA COMPETIR</strong>
        </div>
        <i data-profile-bar />
        <i data-profile-bar />
        <i data-profile-bar />
      </div>
      <div className={styles.networkNodes} data-network>
        <span data-network-node>COACH</span>
        <span data-network-node>UNIVERSITY</span>
        <span data-network-node>TEAM</span>
        <span data-network-node>COACH</span>
      </div>
    </div>
  );
}
Fin de escena fuera de servicio */

function OpportunityMatching() {
  const attributes = [
    {
      label: "NIVEL DEPORTIVO",
      value: "Alto · Capitán",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
          <path d="M7 6H4c0 2.8 1.3 4.5 3 5" />
          <path d="M17 6h3c0 2.8-1.3 4.5-3 5" />
        </svg>
      ),
    },
    {
      label: "NIVEL ACADÉMICO",
      value: "GPA 3.7",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          <path d="M9 7h7" />
        </svg>
      ),
    },
    {
      label: "OBJETIVOS",
      value: "Business · NCAA",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.2" />
        </svg>
      ),
    },
    {
      label: "POTENCIAL",
      value: "High potential",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 17 6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </svg>
      ),
    },
  ];

  const universities = [
    { name: "STATE UNIVERSITY", match: "41%", scale: 0.41, winner: false },
    { name: "HARBOR INSTITUTE", match: "62%", scale: 0.62, winner: false },
    { name: "RIVERVIEW COLLEGE", match: "78%", scale: 0.78, winner: false },
    { name: "COAST COLLEGE", match: "94%", scale: 0.94, winner: true },
  ];

  return (
    <div className={styles.matchingArt} aria-hidden="true">
      <svg className={styles.mLines} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path data-m-line d="M36 43.5 C 40 43.5, 43.5 42.5, 46.5 42" pathLength={1} />
        <path data-m-line d="M67 43.5 C 70 36, 72 25, 74 14.5" pathLength={1} />
        <path data-m-line d="M67 43.5 C 70 40, 72 34.5, 74 29.5" pathLength={1} />
        <path data-m-line d="M67 43.5 C 70 44, 72 44.2, 74 44.3" pathLength={1} />
        <path data-m-line d="M67 43.5 C 70 50, 72 55.5, 74 59.5" pathLength={1} />
      </svg>

      <div className={styles.mColPerfil}>
        <span className={styles.mLabel} data-m-label-p>TU PERFIL</span>
        <div className={styles.mCard} data-m-card>
          <div className={styles.mHead}>
            <span className={styles.mAvatar}>M</span>
            <span className={styles.mWho}>
              <strong>MATEO</strong>
              <em>Student Athlete · Argentina</em>
            </span>
          </div>
          <ul className={styles.mAttrs}>
            {attributes.map((attr) => (
              <li data-m-attr key={attr.label}>
                <i>{attr.icon}</i>
                <span>
                  <strong>{attr.label}</strong>
                  <em>{attr.value}</em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.mColCore}>
        <div className={styles.mCore} data-m-core>
          <svg className={styles.mRing} viewBox="0 0 64 64">
            <circle className={styles.mRingTrack} cx="32" cy="32" r="27" />
            <circle className={styles.mRingFill} cx="32" cy="32" r="27" pathLength={100} transform="rotate(-90 32 32)" data-m-ring />
          </svg>
          <span className={styles.mValue} data-m-value>94%</span>
        </div>
        <span className={styles.mCaption} data-m-caption>MATCH</span>
        <div className={styles.mStatus}>
          <span data-m-st1>Analizando perfil...</span>
          <ul data-m-st2>
            <li data-m-check>Deportivo</li>
            <li data-m-check>Académico</li>
            <li data-m-check>Objetivos</li>
            <li data-m-check>Potencial</li>
          </ul>
          <strong data-m-st3>COMPATIBILIDAD ALTA</strong>
        </div>
      </div>

      <div className={styles.mColUnis}>
        <span className={styles.mLabel} data-m-label-o>TU OPORTUNIDAD</span>
        {universities.map((uni) => (
          <div
            className={`${styles.mUni} ${uni.winner ? styles.mWinner : ""}`}
            data-m-uni
            key={uni.name}
          >
            {uni.winner ? (
              <span className={styles.mBadge} data-m-badge>OPORTUNIDAD ENCONTRADA</span>
            ) : null}
            <span className={styles.mUniHead}>
              <strong>{uni.name}</strong>
              <em>{uni.match}</em>
            </span>
            <span className={styles.mMeter}>
              <i data-m-fill style={{ "--w": uni.match } as CSSProperties} />
            </span>
          </div>
        ))}
      </div>

      <div className={styles.mWhy} data-m-why>
        <span>¿POR QUÉ ESTA UNIVERSIDAD?</span>
        <ul>
          <li data-m-why-item>Nivel deportivo competitivo</li>
          <li data-m-why-item>Programa académico ideal</li>
          <li data-m-why-item>Objetivos personales alineados</li>
        </ul>
      </div>
    </div>
  );
}

/* Tarjeta de oferta original del campus, fuera de servicio por ahora.
function CampusDocuments() {
  return (
    <div className={styles.campusArt} aria-hidden="true">
      <div className={styles.offerCard} data-offer-card>
        <span>UNIVERSITY OFFER</span>
        <strong>ADMITTED</strong>
        <div>
          <i data-offer-tag>BECA</i>
          <i data-offer-tag>VISA</i>
          <i data-offer-tag>CAMPUS</i>
        </div>
      </div>
    </div>
  );
}
Fin de tarjeta fuera de servicio */

const sjStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const sjBolt = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
);

const sjCap = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <path d="m12 4 10 5-10 5L2 9l10-5Z" />
    <path d="M6 11.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5" />
    <path d="M22 9v5" />
  </svg>
);

const sjRocket = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <path d="M15 3c3 .6 5.4 3 6 6l-4 4-6-6 4-4Z" />
    <circle cx="14" cy="10" r="1.6" />
    <path d="m11 7-3 1-1.5 3L9 13.5" />
    <path d="m17 13-1 3-3 1.5L10.5 15" />
    <path d="m7 17-2.5 2.5" />
  </svg>
);

const sjTrophy = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 6H5.5A2.5 2.5 0 0 0 8 9.5M16 6h2.5A2.5 2.5 0 0 1 16 9.5" />
    <path d="M12 13v3" />
    <path d="M8.5 20h7l-.8-4h-5.4l-.8 4Z" />
  </svg>
);

const sjChart = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <path d="M4 4v16h16" />
    <path d="m7 15 4-5 3 2.5L19 7" />
    <path d="M19 11V7h-4" />
  </svg>
);

const sjBook = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <path d="M12 6c-2-1.5-4.5-2-8-2v14c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2V4c-3.5 0-6 .5-8 2Z" />
    <path d="M12 6v14" />
  </svg>
);

const sjRefresh = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <path d="M20 12a8 8 0 1 1-2.3-5.6" />
    <path d="M20 3v4h-4" />
  </svg>
);

const sjBriefcase = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <rect x="3" y="7.5" width="18" height="13" rx="2" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
    <path d="M3 13h18" />
  </svg>
);

const sjGlobe = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18Z" />
  </svg>
);

const sjMedal = (
  <svg viewBox="0 0 24 24" {...sjStroke}>
    <circle cx="12" cy="15.5" r="5" />
    <path d="m8.6 11.2-3.4-7h4L12 9l2.8-4.8h4l-3.4 7" />
  </svg>
);

function SupportJourney() {
  return (
    <div className={styles.sjWrap} aria-hidden="true">
      <div className={styles.sjRail} data-sj-rail>
        <svg className={styles.sjRailSvg} viewBox="0 0 4 100" preserveAspectRatio="none">
          <path className={styles.sjRailBase} d="M2 0v100" />
          <path className={styles.sjRailLine} data-sj-rail-line d="M2 0v100" pathLength={1} />
        </svg>
        <span className={styles.sjNode} data-sj-node>
          {sjBolt}
          <em>Antes</em>
        </span>
        <span className={styles.sjNode} data-sj-node>
          {sjCap}
          <em>Durante</em>
        </span>
        <span className={styles.sjNode} data-sj-node>
          {sjRocket}
          <em>Después</em>
        </span>
      </div>
      <div className={styles.sjPanel}>
        <article className={styles.sjCard} data-sj-stage="antes">
          <header className={styles.sjHead}>
            <i className={styles.sjHeadIcon}>{sjRocket}</i>
            <div>
              <strong>Antes de la admisión</strong>
              <p>Construimos las oportunidades antes de que lleguen.</p>
            </div>
          </header>
          <ul className={styles.sjChecks}>
            <li data-sj-check>Highlight Video</li>
            <li data-sj-check>Perfil Deportivo</li>
            <li data-sj-check>Promoción con Entrenadores</li>
            <li data-sj-check>Negociación de Becas</li>
          </ul>
          <div className={styles.sjStrip}>
            <i className={styles.sjEmitter}>{sjBolt}</i>
            <span className={styles.sjDots}>
              <i data-sj-dot />
              <i data-sj-dot />
              <i data-sj-dot />
            </span>
            <span className={styles.sjUnis}>
              <em data-sj-uni>Riverside U</em>
              <em data-sj-uni>Bay College</em>
              <em data-sj-uni>North Tech</em>
            </span>
          </div>
        </article>

        <aside className={`${styles.sjCard} ${styles.sjMilestone}`} data-sj-milestone>
          <i>{sjTrophy}</i>
          <div>
            <strong>Beca obtenida</strong>
            <span>Universidad confirmada</span>
          </div>
        </aside>

        <article className={styles.sjCard} data-sj-stage="durante">
          <header className={styles.sjHead}>
            <i className={styles.sjHeadIcon}>{sjCap}</i>
            <div>
              <strong>Durante la universidad</strong>
              <p>Seguimos acompañándote para que puedas rendir dentro y fuera del campo.</p>
            </div>
          </header>
          <div className={styles.sjOrbit}>
            <svg className={styles.sjOrbitSvg} viewBox="0 0 100 100">
              <circle data-sj-ring cx="50" cy="50" r="44" pathLength={100} />
            </svg>
            <strong className={styles.sjCore} data-sj-core>Tu universidad</strong>
            <span className={styles.sjSatTop} data-sj-sat>{sjChart}Actualización de perfil</span>
            <span className={styles.sjSatRight} data-sj-sat>{sjBook}Seguimiento académico</span>
            <span className={styles.sjSatBottom} data-sj-sat>{sjTrophy}Soporte deportivo</span>
            <span className={styles.sjSatLeft} data-sj-sat>{sjRefresh}Asistencia en transferencias</span>
            <span className={styles.sjGrad} data-sj-grad>
              {sjCap}
              <b>GRADUACIÓN</b>
            </span>
          </div>
        </article>

        <article className={styles.sjCard} data-sj-stage="despues">
          <header className={styles.sjHead}>
            <i className={styles.sjHeadIcon}>{sjGlobe}</i>
            <div>
              <strong>Después de la universidad</strong>
              <p>La red construida durante la experiencia sigue generando oportunidades.</p>
            </div>
          </header>
          <div className={styles.sjNet}>
            <svg className={styles.sjNetSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
              <path data-sj-net-line d="M12 84C4 64 4 36 14 16" pathLength={1} />
              <path data-sj-net-line d="M12 84C28 62 40 34 58 12" pathLength={1} />
              <path data-sj-net-line d="M12 84C40 76 64 62 86 48" pathLength={1} />
              <path data-sj-net-line d="M12 84C34 92 56 94 78 88" pathLength={1} />
            </svg>
            <i className={styles.sjNetCore} data-sj-net-core>{sjBolt}</i>
            <em className={styles.sjNetTopLeft} data-sj-net-node>{sjChart}Desarrollo profesional</em>
            <em className={styles.sjNetTopRight} data-sj-net-node>{sjBriefcase}Oportunidades laborales</em>
            <em className={styles.sjNetMidRight} data-sj-net-node>{sjGlobe}Networking internacional</em>
            <em className={styles.sjNetBottomRight} data-sj-net-node>{sjMedal}Oportunidades deportivas</em>
          </div>
        </article>

        <aside className={`${styles.sjCard} ${styles.sjFinal}`} data-sj-final>
          <strong>Acompañamiento 360°</strong>
          <p>Nuestro trabajo no termina con la firma: acompañamos a nuestros atletas durante toda su carrera universitaria y profesional.</p>
          <div className={styles.sjFinalPath}>
            <em data-sj-final-node>Antes</em>
            <i data-sj-final-seg />
            <em data-sj-final-node>Durante</em>
            <i data-sj-final-seg />
            <em data-sj-final-node>Después</em>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AboutOrigin() {
  const ball = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="20" />
      <path d="M24 4l-5.5 7.5h11L24 4z" />
      <path d="M6.2 17l7.8 2.5-3.3 6.5L6.2 17z" />
      <path d="M41.8 17l-7.8 2.5 3.3 6.5 4.5-9z" />
      <path d="M18.5 41l3.3-8.5h8.4l3.3 8.5" />
      <path d="M8.5 35l7-3.5 3 5-10-1.5z" />
      <path d="M39.5 35l-7-3.5-3 5 10-1.5z" />
    </svg>
  );
  const racket = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="20" cy="17" rx="13" ry="15" />
      <path d="M30 30l8 8M34 38l-4 2 2-4" />
      <line x1="9" y1="7" x2="9" y2="27" />
      <line x1="20" y1="2" x2="20" y2="32" />
      <line x1="14.5" y1="4" x2="14.5" y2="29.5" />
      <circle cx="38" cy="12" r="4" />
    </svg>
  );
  const oval = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="24" cy="24" rx="18" ry="12" />
      <path d="M16 14c4 2 8 2 16 0" />
      <path d="M10 24c0 6 6 10 14 10s14-4 14-10" />
    </svg>
  );
  const stick = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 42L34 10" />
      <path d="M30 14c5-1.5 9.5 1 11.5 5.5S42 25 38 28" />
      <circle cx="14" cy="36" r="3.5" />
    </svg>
  );
  const volley = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="20" />
      <path d="M12 12c8 4 16 4 24 0" />
      <path d="M4 28c8 4 16 4 24 0" />
      <path d="M18 44c0-12 0-20 6-28" />
      <path d="M30 44c0-12 0-20-6-28" />
    </svg>
  );
  const flag = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8v32" />
      <path d="M12 8h20l-5 7 5 7H12" />
    </svg>
  );
  const basketball = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="20" />
      <path d="M24 4v40" />
      <path d="M4 24h40" />
      <path d="M7 10c7 4 12 6 17 6s10-2 17-6" />
      <path d="M7 38c7-4 12-6 17-6s10 2 17 6" />
    </svg>
  );
  const swim = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="12" r="4" />
      <path d="M8 24l8-6 8 4 8-6 8 4" />
      <path d="M4 34c4-3 8-4 12-1s8 2 12-1 8-3 12 0" />
    </svg>
  );
  const run = (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="30" cy="6" r="4" />
      <path d="M20 18l12-2" />
      <path d="M16 44l6-16 8 4V18l-10-8-8 10" />
      <path d="M10 44l10-16" />
      <path d="M32 16l4 8" />
    </svg>
  );

  const sports = [
    { icon: ball, label: "FÚTBOL" },
    { icon: racket, label: "TENIS" },
    { icon: oval, label: "RUGBY" },
    { icon: basketball, label: "BASKETBALL" },
    { icon: stick, label: "HOCKEY" },
    { icon: volley, label: "VOLLEYBALL" },
    { icon: flag, label: "GOLF" },
    { icon: swim, label: "NATACIÓN" },
    { icon: run, label: "ATLETISMO" },
  ];

  return (
    <div className={styles.aoWrap} aria-hidden="true">
      {/* Cycling: one sport at a time in the center */}
      <div className={styles.aoCycling} data-ao-cycling>
        {sports.map((s) => (
          <div className={styles.aoCycleItem} data-ao-cycle key={s.label}>
            <span className={styles.aoCycleIcon}>{s.icon}</span>
            <span className={styles.aoCycleName}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Final slider: all sports visible */}
      <div className={styles.aoSlider} data-ao-slider>
        {sports.map((s) => (
          <div className={styles.aoSlide} data-ao-slide key={s.label}>
            <span className={styles.aoSlideIcon}>{s.icon}</span>
            <span className={styles.aoSlideName}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CasesGrid() {
  return (
    <div className={styles.casesGrid} aria-label="Casos de éxito">
      {successCases.map((item, index) => (
        <figure className={styles.caseCard} data-case-card key={`${item.name}-${index}`}>
          {item.image ? (
            <img src={item.image} alt={`${item.name}, ${item.detail}`} loading="lazy" />
          ) : (
            <span className={styles.caseCardPlaceholder} aria-hidden="true">
              {item.name.charAt(0)}
            </span>
          )}
          {item.logo ? (
            <span className={styles.caseLogo} aria-hidden="true">
              <img src={item.logo} alt="" loading="lazy" />
            </span>
          ) : null}
          <figcaption>
            <strong>{item.name}</strong>
            <span>{item.detail}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function TeamGrid() {
  return (
    <div className={styles.teamGrid} aria-label="Nuestro equipo">
      {teamMembers.map((member, index) => (
        <article className={styles.teamCard} data-team-card key={`${member.name}-${index}`}>
          {member.image ? (
            <img src={member.image} alt={`Foto de ${member.name}`} loading="lazy" />
          ) : (
            <span className={styles.teamAvatar} aria-hidden="true">
              {member.name.charAt(0)}
            </span>
          )}
          <strong>{member.name}</strong>
          <span>{member.role}</span>
          <p>{member.bio}</p>
        </article>
      ))}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <span className={styles.fieldError}>{message}</span> : null;
}

function EvaluationForm() {
  const [data, setData] = useState(initialEvaluation);
  const [errors, setErrors] = useState<Partial<Record<keyof EvaluationData, string>>>({});
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof EvaluationData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateStepOne = () => {
    const nextErrors: typeof errors = {};
    if (!data.name.trim()) nextErrors.name = "Ingresá tu nombre.";
    if (!data.age.trim() || Number(data.age) <= 0) nextErrors.age = "Ingresá una edad válida.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.email = "Ingresá un email válido.";
    if (!data.sport.trim()) nextErrors.sport = "Contanos qué deporte practicás.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = () => {
    const required: Array<keyof EvaluationData> = [
      "academicStage",
      "graduationYear",
      "athleticLevel",
      "englishLevel",
      "location",
    ];
    const nextErrors: typeof errors = {};
    required.forEach((field) => {
      if (!data[field].trim()) nextErrors[field] = "Completá este campo.";
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 1 && validateStepOne()) {
      setStep(2);
      return;
    }
    if (step === 2 && validateStepTwo()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success} role="status">
        <span aria-hidden="true">✓</span>
        <p>Demo completada</p>
        <h2>Tu camino ya tiene un primer paso.</h2>
        <p>
          En una versión conectada, el equipo recibiría estos datos para evaluar tu perfil.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(initialEvaluation);
            setErrors({});
            setStep(1);
            setSubmitted(false);
          }}
        >
          Completar otra evaluación
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formProgress} aria-label={`Paso ${step} de 2`}>
        <span>PASO {step} DE 2</span>
        <div><i className={step >= 1 ? styles.activeStep : ""} /><i className={step === 2 ? styles.activeStep : ""} /></div>
      </div>

      {step === 1 ? (
        <div className={styles.formFields}>
          <label>
            Nombre y apellido
            <input value={data.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" />
            <FieldError message={errors.name} />
          </label>
          <div className={styles.fieldRow}>
            <label>
              Edad
              <input type="number" min="1" inputMode="numeric" value={data.age} onChange={(event) => update("age", event.target.value)} />
              <FieldError message={errors.age} />
            </label>
            <label>
              Deporte
              <input value={data.sport} onChange={(event) => update("sport", event.target.value)} />
              <FieldError message={errors.sport} />
            </label>
          </div>
          <label>
            Email
            <input type="email" value={data.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" />
            <FieldError message={errors.email} />
          </label>
          <label>
            WhatsApp <span>Opcional</span>
            <input type="tel" value={data.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} autoComplete="tel" />
          </label>
        </div>
      ) : (
        <div className={styles.formFields}>
          <label>
            Etapa académica
            <select value={data.academicStage} onChange={(event) => update("academicStage", event.target.value)}>
              <option value="">Seleccioná una opción</option>
              <option>Secundaria en curso</option>
              <option>Secundaria finalizada</option>
              <option>Universidad en curso</option>
            </select>
            <FieldError message={errors.academicStage} />
          </label>
          <div className={styles.fieldRow}>
            <label>
              Año de egreso
              <input inputMode="numeric" value={data.graduationYear} onChange={(event) => update("graduationYear", event.target.value)} />
              <FieldError message={errors.graduationYear} />
            </label>
            <label>
              Nivel deportivo
              <select value={data.athleticLevel} onChange={(event) => update("athleticLevel", event.target.value)}>
                <option value="">Seleccioná</option>
                <option>Club / escolar</option>
                <option>Regional</option>
                <option>Nacional</option>
                <option>Internacional</option>
              </select>
              <FieldError message={errors.athleticLevel} />
            </label>
          </div>
          <label>
            Nivel de inglés
            <select value={data.englishLevel} onChange={(event) => update("englishLevel", event.target.value)}>
              <option value="">Seleccioná una opción</option>
              <option>Inicial</option>
              <option>Intermedio</option>
              <option>Avanzado</option>
              <option>Bilingüe</option>
            </select>
            <FieldError message={errors.englishLevel} />
          </label>
          <label>
            Ciudad y país
            <input value={data.location} onChange={(event) => update("location", event.target.value)} autoComplete="country-name" />
            <FieldError message={errors.location} />
          </label>
          <label>
            ¿Qué te gustaría conseguir? <span>Opcional</span>
            <textarea rows={3} value={data.goal} onChange={(event) => update("goal", event.target.value)} />
          </label>
        </div>
      )}

      <div className={styles.formActions}>
        {step === 2 ? <button type="button" className={styles.secondaryButton} onClick={() => setStep(1)}>Atrás</button> : null}
        <button type="submit">{step === 1 ? "Continuar" : "Finalizar demo"}</button>
      </div>
      <p className={styles.demoNotice}>Demo interactiva: tus datos no se envían ni se guardan.</p>
    </form>
  );
}

export default function AthletesUsa() {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (location.hash !== "#evaluation") {
      window.scrollTo({ behavior: "auto", left: 0, top: 0 });
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const story = storyRef.current;
    if (!root || !story) return;

    const scope = createScope({
      root,
      mediaQueries: {
        isDesktop: "(min-width: 768px)",
        isLandscape: "(orientation: landscape)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
    }).add((self) => {
      const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
      const handoff = root.querySelector<HTMLElement>("[data-handoff]");
      const reduceMotion = self?.matches.reduceMotion ?? false;
      const headingLines = scenes.map((scene) => {
        const heading = scene.querySelector<HTMLElement>("[data-heading]");
        return heading
          ? splitText(heading, {
              accessible: true,
              lines: { wrap: "clip" },
            }).lines as HTMLElement[]
          : [];
      });
      const copyBlocks = scenes.map((scene) =>
        Array.from(scene.querySelectorAll<HTMLElement>("[data-copy-block]")),
      );
      const artLayers = scenes.map((scene) =>
        scene.querySelector<HTMLElement>("[data-art]"),
      );
      const mediaImages = scenes.map((scene) =>
        scene.querySelector<HTMLElement>("[data-media-image]"),
      );
      const sceneDirections = scenes.map((scene) =>
        scene.dataset.side === "right" ? 1 : -1,
      );
      const journeyProgressLines = Array.from(
        root.querySelectorAll<SVGPathElement>("[data-journey-progress]"),
      );
      const journeyItems = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-item]"),
      );
      const journeyBadges = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-item] span"),
      );
      const journeyCards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-card]"),
      );
      const orbit = root.querySelector<HTMLElement>("[data-orbit]");
      const orbitCore = root.querySelector<HTMLElement>("[data-orbit-core]")!;
      const orbitLabels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-orbit-label]"),
      );
      const mLabelP = root.querySelector<HTMLElement>("[data-m-label-p]");
      const mLabelO = root.querySelector<HTMLElement>("[data-m-label-o]");
      const mCard = root.querySelector<HTMLElement>("[data-m-card]");
      const mAttrs = Array.from(
        root.querySelectorAll<HTMLElement>("[data-m-attr]"),
      );
      const mLines = Array.from(
        root.querySelectorAll<SVGPathElement>("[data-m-line]"),
      );
      const mCore = root.querySelector<HTMLElement>("[data-m-core]");
      const mRing = root.querySelector<SVGCircleElement>("[data-m-ring]");
      const mValue = root.querySelector<HTMLElement>("[data-m-value]");
      const mCaption = root.querySelector<HTMLElement>("[data-m-caption]");
      const mSt1 = root.querySelector<HTMLElement>("[data-m-st1]");
      const mSt2 = root.querySelector<HTMLElement>("[data-m-st2]");
      const mChecks = Array.from(
        root.querySelectorAll<HTMLElement>("[data-m-check]"),
      );
      const mSt3 = root.querySelector<HTMLElement>("[data-m-st3]");
      const mUnis = Array.from(
        root.querySelectorAll<HTMLElement>("[data-m-uni]"),
      );
      const mFills = Array.from(
        root.querySelectorAll<HTMLElement>("[data-m-fill]"),
      );
      const mBadge = root.querySelector<HTMLElement>("[data-m-badge]");
      const matchWhy = root.querySelector<HTMLElement>("[data-m-why]");
      const whyItems = Array.from(
        root.querySelectorAll<HTMLElement>("[data-m-why-item]"),
      );
      const matchFinal = root.querySelector<HTMLElement>("[data-match-final]");
      const campusScene = root.querySelector<HTMLElement>('[data-scene="campus"]');
      const supportScene = root.querySelector<HTMLElement>('[data-scene="support"]');
      const metricEls = Array.from(
        root.querySelectorAll<HTMLElement>("[data-metric]"),
      );
      const metricStates = metricEls.map(() => ({
        v: 0,
      }));
      const sjRailLine = root.querySelector<SVGPathElement>("[data-sj-rail-line]");
      const sjRail = root.querySelector<HTMLElement>("[data-sj-rail]");
      const sjNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-sj-node]"),
      );
      const sjStages = (["antes", "durante", "despues"] as const)
        .map((key) => root.querySelector<HTMLElement>(`[data-sj-stage="${key}"]`))
        .filter((stage): stage is HTMLElement => stage !== null);
      const sjChecks = Array.from(
        root.querySelectorAll<HTMLElement>("[data-sj-check]"),
      );
      const sjDots = Array.from(root.querySelectorAll<HTMLElement>("[data-sj-dot]"));
      const sjUnis = Array.from(root.querySelectorAll<HTMLElement>("[data-sj-uni]"));
      const sjMilestone = root.querySelector<HTMLElement>("[data-sj-milestone]");
      const sjCore = root.querySelector<HTMLElement>("[data-sj-core]");
      const sjRing = root.querySelector<SVGCircleElement>("[data-sj-ring]");
      const sjSats = Array.from(root.querySelectorAll<HTMLElement>("[data-sj-sat]"));
      const sjGrad = root.querySelector<HTMLElement>("[data-sj-grad]");
      const sjNetCore = root.querySelector<HTMLElement>("[data-sj-net-core]");
      const sjNetLines = Array.from(
        root.querySelectorAll<SVGPathElement>("[data-sj-net-line]"),
      );
      const sjNetNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-sj-net-node]"),
      );
      const sjFinal = root.querySelector<HTMLElement>("[data-sj-final]");
      const sjFinalSegs = Array.from(
        root.querySelectorAll<HTMLElement>("[data-sj-final-seg]"),
      );
      const sjFinalNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-sj-final-node]"),
      );
      const caseCards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-case-card]"),
      );
      const teamCards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-team-card]"),
      );

      const aoCycles = Array.from(root.querySelectorAll<HTMLElement>("[data-ao-cycle]"));
      const aoSlides = Array.from(root.querySelectorAll<HTMLElement>("[data-ao-slide]"));
      const aoSlider = root.querySelector<HTMLElement>("[data-ao-slider]");

      const setActiveScene = (progress: number) => {
        const activeIndex = [0.054, 0.232, 0.455, 0.714, 0.839, 0.929, 0.982]
          .findIndex((limit) => progress < limit);

        scenes.forEach((scene, index) => {
          const isActive = index === activeIndex;
          scene.dataset.active = String(isActive);
          scene.inert = !isActive;
          scene.setAttribute("aria-hidden", String(!isActive));
        });
      };

      const journeyWideLayout =
        root.ownerDocument.defaultView?.matchMedia(
          "(min-width: 768px) and (min-height: 640px)",
        ).matches ?? false;
      const journeyCardDim = journeyWideLayout ? 0.34 : 0;
      const journeyCardDimScale = journeyWideLayout ? "0.97" : "0.96";

      scenes.forEach((scene, index) => {
        const direction = sceneDirections[index];
        utils.set(scene, {
          clipPath: reduceMotion || index === 0
            ? "inset(0% 0% 0% 0%)"
            : "inset(100% 0% 0% 0%)",
          opacity: index === 0 ? 1 : 0,
        });

        if (!reduceMotion && index > 0) {
          utils.set(headingLines[index], {
            opacity: 0,
            x: `${direction * 105}vw`,
          });
          utils.set(copyBlocks[index], {
            opacity: 0,
            x: `${direction * 105}vw`,
          });
          if (artLayers[index]) {
            utils.set(artLayers[index]!, {
              opacity: 0,
              scale: 0.94,
              x: `${direction * -7}vw`,
            });
          }
          if (mediaImages[index]) {
            utils.set(mediaImages[index]!, {
              scale: 1.08,
              x: "0vw",
              y: "8vh",
            });
          }
        }
      });

      if (handoff) {
        utils.set(handoff, {
          opacity: 0,
          y: reduceMotion ? "0%" : "100%",
        });
      }
      if (journeyProgressLines.length && !reduceMotion) {
        utils.set(journeyProgressLines, {
          strokeDasharray: 620,
          strokeDashoffset: 620,
        });
      }
      if (!reduceMotion) {
        utils.set(journeyItems, { opacity: 0.42, scale: 0.92, x: "1rem" });
        if (journeyCards.length) {
          utils.set(journeyCards, {
            opacity: journeyCardDim,
            scale: journeyCardDimScale,
          });
          utils.set(journeyCards[0], {
            opacity: 1,
            scale: 1,
            borderColor: "rgba(212, 7, 47, 0.5)",
          });
        }
        utils.set(mLines, { opacity: 0.9, strokeDasharray: 1, strokeDashoffset: 1 });
        if (mLabelP) {
          utils.set(mLabelP, { opacity: 0, y: "0.8rem" });
        }
        if (mLabelO) {
          utils.set(mLabelO, { opacity: 0, y: "0.8rem" });
        }
        if (mCard) {
          utils.set(mCard, { opacity: 0, y: "1.6rem" });
        }
        mAttrs.forEach((attr) => {
          utils.set(attr, { opacity: 0.3, x: "-0.5rem" });
        });
        if (mCore) {
          utils.set(mCore, { opacity: 0, scale: 0.6 });
        }
        if (mRing) {
          utils.set(mRing, { strokeDasharray: 100, strokeDashoffset: 100 });
        }
        if (mValue) {
          utils.set(mValue, { opacity: 0, scale: 0.6 });
        }
        if (mCaption) {
          utils.set(mCaption, { opacity: 0 });
        }
        if (mSt1) {
          utils.set(mSt1, { opacity: 0 });
        }
        if (mSt2) {
          utils.set(mSt2, { opacity: 0 });
        }
        utils.set(mChecks, { opacity: 0, scale: 0.5 });
        if (mSt3) {
          utils.set(mSt3, { opacity: 0, y: "0.5rem" });
        }
        utils.set(mUnis, { opacity: 0, x: "-1rem" });
        const winner = root.querySelector<HTMLElement>("." + styles.mWinner);
        if (winner) {
          utils.set(winner, {
            borderColor: "rgba(255, 255, 255, 0.34)",
            boxShadow: "none",
            scale: 1,
          });
        }
        utils.set(mFills, { scaleX: 0, transformOrigin: "0% 50%" });
        if (mBadge) {
          utils.set(mBadge, { opacity: 0, y: "-0.6rem" });
        }
        if (matchWhy) {
          utils.set(matchWhy, { opacity: 0, y: "0.8rem" });
        }
        utils.set(whyItems, { opacity: 0, x: "-0.5rem" });
        if (matchFinal) {
          utils.set(matchFinal, { opacity: 0, y: "0.8rem" });
        }
        metricEls.forEach((el) => {
          el.textContent = "0";
        });
        if (sjRailLine) {
          utils.set(sjRailLine, { strokeDasharray: 1, strokeDashoffset: 1 });
        }
        if (sjRail) {
          utils.set(sjRail, { opacity: 0, x: "-1.5rem" });
        }
        utils.set(sjNodes, {
          backgroundColor: "#ffffff",
          borderColor: "rgba(6, 27, 79, 0.22)",
          color: "#061b4f",
        });
        utils.set(sjStages.slice(1), { opacity: 0.42, scale: 0.97 });
        utils.set(sjChecks, { opacity: 0, x: "-0.5rem" });
        utils.set(sjDots, { opacity: 0, scale: 0.4 });
        utils.set(sjUnis, { opacity: 0.22 });
        if (sjMilestone) {
          utils.set(sjMilestone, { opacity: 0, scale: 0.85, y: "0.8rem" });
        }
        if (sjCore) {
          utils.set(sjCore, { opacity: 0, scale: 0.6 });
        }
        if (sjRing) {
          utils.set(sjRing, { strokeDasharray: 100, strokeDashoffset: 100 });
        }
        utils.set(sjSats, { opacity: 0, scale: 0.6 });
        if (sjGrad) {
          utils.set(sjGrad, { opacity: 0, y: "1.6rem" });
        }
        if (sjNetCore) {
          utils.set(sjNetCore, { opacity: 0, scale: 0.5 });
        }
        utils.set(sjNetLines, { strokeDasharray: 1, strokeDashoffset: 1 });
        utils.set(sjNetNodes, { opacity: 0, scale: 0.75 });
        if (sjFinal) {
          utils.set(sjFinal, { opacity: 0, y: "0.9rem" });
        }
        utils.set(sjFinalSegs, { scaleX: 0, transformOrigin: "0% 50%" });
        utils.set(sjFinalNodes, { opacity: 0.28 });
        utils.set(caseCards, { opacity: 0.42, scale: 0.96, y: "2rem" });
        utils.set(teamCards, { opacity: 0.42, scale: 0.96, y: "2rem" });

        utils.set(aoCycles, { opacity: 0, scale: 0.85 });
        utils.set(aoSlides, { opacity: 0, scale: 0.8, y: "0.8rem" });
        if (aoSlider) {
          utils.set(aoSlider, { opacity: 0 });
        }
      }

      setActiveScene(0);

      const observer = onScroll({
        enter: "top top",
        leave: "bottom bottom",
        onUpdate: (scrollObserver) => setActiveScene(scrollObserver.progress),
        sync: true,
        target: story,
      });
      const timeline = createTimeline({ autoplay: observer });

      const addTransition = (
        fromIndex: number,
        toIndex: number,
        start: number,
        duration: number,
      ) => {
        const fromScene = scenes[fromIndex];
        const toScene = scenes[toIndex];
        const fromDirection = sceneDirections[fromIndex];

        timeline
          .add(fromScene, { duration, ease: "linear", opacity: 0 }, start)
          .add(toScene, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration,
            ease: "linear",
            opacity: 1,
          }, start);

        if (reduceMotion) return;

        timeline
          .add(headingLines[fromIndex], {
            duration,
            ease: "inOut(3)",
            opacity: 0,
            x: `${fromDirection * 105}vw`,
          }, start)
          .add(copyBlocks[fromIndex], {
            duration,
            ease: "inOut(3)",
            opacity: 0,
            x: `${fromDirection * 105}vw`,
          }, start)
          .add(headingLines[toIndex], {
            duration,
            ease: "inOut(3)",
            opacity: 1,
            x: "0vw",
          }, start)
          .add(copyBlocks[toIndex], {
            duration,
            ease: "inOut(3)",
            opacity: 1,
            x: "0vw",
          }, start);

        if (artLayers[fromIndex]) {
          timeline.add(artLayers[fromIndex]!, {
            duration,
            ease: "inOut(3)",
            opacity: 0,
            scale: 0.94,
            x: `${fromDirection * -7}vw`,
          }, start);
        }
        if (artLayers[toIndex]) {
          timeline.add(artLayers[toIndex]!, {
            duration,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            x: "0vw",
          }, start);
        }
        if (mediaImages[fromIndex]) {
          timeline.add(mediaImages[fromIndex]!, {
            duration,
            ease: "inOut(3)",
            scale: 1.08,
            x: "0vw",
            y: "-4vh",
          }, start);
        }
        if (mediaImages[toIndex]) {
          timeline.add(mediaImages[toIndex]!, {
            duration,
            ease: "inOut(3)",
            scale: 1,
            x: "0vw",
            y: "0vh",
          }, start);
        }
      };

      addTransition(0, 1, 120, 80);
      addTransition(1, 2, 520, 80);
      addTransition(2, 3, 1020, 80);
      addTransition(3, 4, 1600, 80);
      addTransition(4, 5, 1880, 80);
      addTransition(5, 6, 2080, 80);

      if (!reduceMotion) {
        if (orbit) {
          timeline.add(orbit, {
            duration: 110,
            ease: "linear",
            rotate: 28,
            scale: 1.07,
          }, 0);
        }
        timeline
          .add(orbitLabels, {
            duration: 110,
            ease: "linear",
            rotate: -28,
          }, 0)
          .add(orbitCore, {
            duration: 110,
            ease: "linear",
            rotate: -28,
            scale: 1.16,
          }, 0)
          .add(mediaImages[0]!, {
            duration: 110,
            ease: "linear",
            scale: 1.04,
            x: "0vw",
            y: "-2vh",
          }, 0);

        if (journeyProgressLines.length) {
          timeline.add(journeyProgressLines, {
            duration: 108,
            ease: "linear",
            strokeDashoffset: 496,
          }, 202);
        }
        timeline
          .add(journeyItems, {
            delay: stagger(14),
            duration: 52,
            ease: "inOut(3)",
            opacity: 0.45,
            scale: 0.96,
            x: "0.4rem",
          }, 202);

        const activateStage = (index: number, start: number) => {
          const duration = index === 0 ? 36 : 40;
          if (journeyProgressLines.length) {
            timeline.add(journeyProgressLines, {
              duration,
              ease: "inOut(3)",
              strokeDashoffset: 620 - Math.round((620 * (index + 1)) / 5),
            }, start);
          }
          if (journeyItems[index]) {
            timeline.add(journeyItems[index], {
              duration,
              ease: "inOut(3)",
              opacity: 1,
              scale: 1.12,
              x: "0rem",
            }, start);
          }
          if (journeyBadges[index]) {
            timeline.add(journeyBadges[index], {
              duration,
              ease: "inOut(3)",
              backgroundColor: "#d4072f",
              borderColor: "#d4072f",
              color: "#f8f9fc",
            }, start);
          }
          if (journeyCards[index]) {
            timeline.add(journeyCards[index], {
              duration,
              ease: "inOut(3)",
              opacity: 1,
              scale: 1,
              borderColor: "rgba(212, 7, 47, 0.5)",
            }, start);
          }
          if (index === 0) return;

          const prev = index - 1;
          if (journeyItems[prev]) {
            timeline.add(journeyItems[prev], {
              duration,
              ease: "inOut(3)",
              opacity: 1,
              scale: 1,
              x: "0rem",
            }, start);
          }
          if (journeyCards[prev]) {
            timeline.add(journeyCards[prev], {
              duration,
              ease: "inOut(3)",
              opacity: journeyCardDim,
              scale: journeyCardDimScale,
              borderColor: "rgba(6, 27, 79, 0.14)",
            }, start);
          }
        };

        activateStage(0, 256);
        activateStage(1, 312);
        activateStage(2, 368);
        activateStage(3, 424);
        activateStage(4, 480);

        if (mLabelP) {
          timeline.add(mLabelP, {
            duration: 40,
            ease: "inOut(3)",
            opacity: 1,
            y: "0rem",
          }, 600);
        }
        if (mCard) {
          timeline.add(mCard, {
            duration: 70,
            ease: "out(3)",
            opacity: 1,
            y: "0rem",
          }, 618);
        }
        mAttrs.forEach((attr, index) => {
          timeline.add(attr, {
            duration: 45,
            ease: "out(3)",
            opacity: 1,
            x: "0rem",
          }, 655 + index * 13);
        });

        if (mLines[0]) {
          timeline.add(mLines[0], {
            duration: 45,
            ease: "inOut(2)",
            strokeDashoffset: 0,
          }, 706);
        }
        if (mCore) {
          timeline.add(mCore, {
            duration: 55,
            ease: "outBack(1.4)",
            opacity: 1,
            scale: 1,
          }, 716);
        }
        if (mSt1) {
          timeline
            .add(mSt1, { duration: 25, ease: "inOut(3)", opacity: 1 }, 724)
            .add(mSt1, { duration: 20, ease: "inOut(3)", opacity: 0 }, 748);
        }
        if (mRing) {
          timeline.add(mRing, {
            duration: 62,
            ease: "linear",
            strokeDashoffset: 0,
          }, 730);
        }
        if (mValue) {
          timeline.add(mValue, {
            duration: 40,
            ease: "outBack(2)",
            opacity: 1,
            scale: 1,
          }, 772);
        }
        if (mCaption) {
          timeline.add(mCaption, {
            duration: 30,
            ease: "inOut(3)",
            opacity: 1,
          }, 780);
        }
        if (mSt2) {
          timeline.add(mSt2, { duration: 20, ease: "inOut(3)", opacity: 1 }, 752);
        }
        mChecks.forEach((check, index) => {
          timeline.add(check, {
            duration: 30,
            ease: "outBack(2)",
            opacity: 1,
            scale: 1,
          }, 756 + index * 9);
        });
        if (mSt2) {
          timeline.add(mSt2, { duration: 20, ease: "inOut(3)", opacity: 0 }, 800);
        }
        if (mSt3) {
          timeline.add(mSt3, {
            duration: 35,
            ease: "out(3)",
            opacity: 1,
            y: "0rem",
          }, 806);
        }

        mLines.slice(1).forEach((path, index) => {
          timeline.add(path, {
            duration: 42,
            ease: "inOut(2)",
            strokeDashoffset: 0,
          }, 816 + index * 9);
        });
        const uniScales = [0.41, 0.62, 0.78, 0.94];
        mUnis.forEach((uni, index) => {
          timeline.add(uni, {
            duration: 45,
            ease: "out(3)",
            opacity: 1,
            x: "0rem",
          }, 820 + index * 9);
          if (mFills[index]) {
            timeline.add(mFills[index], {
              duration: 50,
              ease: "out(3)",
              scaleX: uniScales[index],
            }, 826 + index * 9);
          }
        });
        if (mLabelO) {
          timeline.add(mLabelO, {
            duration: 40,
            ease: "inOut(3)",
            opacity: 1,
            y: "0rem",
          }, 812);
        }

        if (mUnis[0]) {
          timeline.add(mUnis[0], {
            duration: 40,
            ease: "inOut(3)",
            opacity: 0.15,
          }, 884);
        }
        if (mUnis[1]) {
          timeline.add(mUnis[1], {
            duration: 40,
            ease: "inOut(3)",
            opacity: 0.15,
          }, 896);
        }
        if (mUnis[2]) {
          timeline.add(mUnis[2], {
            duration: 40,
            ease: "inOut(3)",
            opacity: 0.45,
          }, 908);
        }
        const winner = root.querySelector<HTMLElement>("." + styles.mWinner);
        if (winner) {
          timeline.add(winner, {
            duration: 50,
            ease: "out(3)",
            borderColor: "rgba(212, 7, 47, 0.9)",
            boxShadow: "0 0 2.2rem rgba(212, 7, 47, 0.35)",
            scale: 1.05,
          }, 916);
        }
        if (mBadge) {
          timeline.add(mBadge, {
            duration: 40,
            ease: "outBack(1.6)",
            opacity: 1,
            y: "0rem",
          }, 926);
        }
        if (matchWhy) {
          timeline.add(matchWhy, {
            duration: 45,
            ease: "out(3)",
            opacity: 1,
            y: "0rem",
          }, 934);
        }
        whyItems.forEach((item, index) => {
          timeline.add(item, {
            duration: 35,
            ease: "outBack(1.8)",
            opacity: 1,
            x: "0rem",
          }, 942 + index * 8);
        });
        if (matchFinal) {
          timeline.add(matchFinal, {
            duration: 44,
            ease: "inOut(3)",
            opacity: 1,
            y: "0rem",
          }, 958);
        }

        metricEls.forEach((el, index) => {
          const state = metricStates[index];
          timeline.add(state, {
            duration: 120,
            ease: "out(3)",
            v: Number(el.dataset.target ?? 0),
            onUpdate: () => {
              el.textContent = el.dataset.format === "plain"
                ? String(Math.round(state.v))
                : Math.round(state.v).toLocaleString("es-AR");
            },
          }, 1140);
        });

        const verticalLayout = window.matchMedia("(max-width: 1099px)").matches;

        if (verticalLayout) {
          utils.set(sjStages, { opacity: 0, scale: 1 });

          // 1. Barra vertical aparece (después de que el contenido se va en 1108)
          if (sjRail) {
            timeline.add(sjRail, {
              duration: 30,
              ease: "out(3)",
              opacity: 1,
              x: "0rem",
            }, 1110);
          }

          // 2. Línea SVG se dibuja de arriba a abajo
          if (sjRailLine) {
            timeline.add(sjRailLine, {
              duration: 380,
              ease: "linear",
              strokeDashoffset: 0,
            }, 1120);
          }

          // 3. Helper para encender un nodo
          const lightSjNode = (index: number, start: number) => {
            if (sjNodes[index]) {
              timeline.add(sjNodes[index], {
                duration: 30,
                ease: "out(3)",
                backgroundColor: "#d4072f",
                borderColor: "#d4072f",
                color: "#f8f9fc",
              }, start);
            }
          };

          // Card "Antes" + nodo 0
          lightSjNode(0, 1140);
          if (sjStages[0]) {
            timeline.add(sjStages[0], {
              duration: 25,
              ease: "out(3)",
              opacity: 1,
              scale: 1,
          }, 1040);
            timeline.add(sjStages[0], {
              duration: 20,
              ease: "inOut(2)",
              opacity: 0,
              scale: 0.95,
            }, 1290);
          }

          // Card "Durante" + nodo 1
          lightSjNode(1, 1310);
          if (sjStages[1]) {
            timeline.add(sjStages[1], {
              duration: 25,
              ease: "out(3)",
              opacity: 1,
              scale: 1,
            }, 1310);
            timeline.add(sjStages[1], {
              duration: 20,
              ease: "inOut(2)",
              opacity: 0,
              scale: 0.95,
            }, 1460);
          }

          // Card "Después" + nodo 2
          lightSjNode(2, 1480);
          if (sjStages[2]) {
            timeline.add(sjStages[2], {
              duration: 25,
              ease: "out(3)",
              opacity: 1,
              scale: 1,
            }, 1480);
          }
        } else {
          if (sjRailLine) {
            timeline.add(sjRailLine, {
              duration: 408,
              ease: "linear",
              strokeDashoffset: 0,
            }, 1112);
          }
          const lightSjNode = (index: number, start: number) => {
            if (sjNodes[index]) {
              timeline.add(sjNodes[index], {
                duration: 30,
                ease: "out(3)",
                backgroundColor: "#d4072f",
                borderColor: "#d4072f",
                color: "#f8f9fc",
              }, start);
            }
          };
          lightSjNode(0, 1125);
          lightSjNode(1, 1320);
          lightSjNode(2, 1445);

          timeline.add(sjChecks, {
            delay: stagger(22),
            duration: 26,
            ease: "outBack(1.7)",
            opacity: 1,
            x: "0rem",
          }, 1160);
          timeline.add(sjDots, {
            delay: stagger(16),
            duration: 22,
            ease: "outBack(2)",
            opacity: 1,
            scale: 1,
          }, 1190);
          timeline.add(sjUnis, {
            duration: 30,
            ease: "out(3)",
            opacity: 1,
          }, 1225);

          if (sjStages[0]) {
            timeline.add(sjStages[0], {
              duration: 28,
              ease: "inOut(3)",
              opacity: 0.42,
              scale: 0.97,
            }, 1248);
          }
          if (sjMilestone) {
            timeline.add(sjMilestone, {
              duration: 34,
              ease: "outBack(1.6)",
              opacity: 1,
              scale: 1,
              y: "0rem",
            }, 1256);
          }

          if (sjStages[1]) {
            timeline
              .add(sjStages[1], {
                duration: 32,
                ease: "inOut(3)",
                opacity: 1,
                scale: 1,
              }, 1318)
              .add(sjStages[1], {
                duration: 26,
                ease: "inOut(3)",
                opacity: 0.42,
                scale: 0.97,
              }, 1436);
          }
          if (sjCore) {
            timeline.add(sjCore, {
              duration: 34,
              ease: "outBack(1.5)",
              opacity: 1,
              scale: 1,
            }, 1330);
          }
          if (sjRing) {
            timeline.add(sjRing, {
              duration: 52,
              ease: "linear",
              strokeDashoffset: 0,
            }, 1338);
          }
          timeline.add(sjSats, {
            delay: stagger(12),
            duration: 28,
            ease: "outBack(1.7)",
            opacity: 1,
            scale: 1,
          }, 1352);
          if (sjGrad) {
            timeline.add(sjGrad, {
              duration: 30,
              ease: "out(3)",
              opacity: 1,
              y: "-0.2rem",
            }, 1400);
          }

          if (sjStages[2]) {
            timeline.add(sjStages[2], {
              duration: 32,
              ease: "inOut(3)",
              opacity: 1,
              scale: 1,
            }, 1442);
          }
          if (sjNetCore) {
            timeline.add(sjNetCore, {
              duration: 26,
              ease: "outBack(1.6)",
              opacity: 1,
              scale: 1,
            }, 1450);
          }
          sjNetLines.forEach((path, index) => {
            timeline.add(path, {
              duration: 32,
              ease: "inOut(2)",
              strokeDashoffset: 0,
            }, 1462 + index * 10);
          });
          timeline.add(sjNetNodes, {
            delay: stagger(10),
            duration: 28,
            ease: "outBack(1.7)",
            opacity: 1,
            scale: 1,
          }, 1470);

          if (sjFinal) {
            timeline.add(sjFinal, {
              duration: 38,
              ease: "out(3)",
              opacity: 1,
              y: "0rem",
            }, 1524);
          }
          timeline.add(sjFinalNodes, {
            delay: stagger(18),
            duration: 20,
            ease: "out(3)",
            opacity: 1,
          }, 1546);
          timeline.add(sjFinalSegs, {
            delay: stagger(18),
            duration: 22,
            ease: "inOut(2)",
            scaleX: 1,
          }, 1548);
        }

        if (supportScene && verticalLayout) {
          const supportExitParts = Array.from(
            supportScene.querySelectorAll<HTMLElement>(
              "[data-heading], [data-copy-block], ." + styles.arrowLink,
            ),
          );
          supportExitParts.forEach((part, index) => {
            timeline.add(part, {
              duration: 40,
              ease: "inOut(3)",
              opacity: 0,
              y: "2.5rem",
            }, 1108 + index * 7);
          });
        }
        if (campusScene && verticalLayout) {
          const exitParts = Array.from(
            campusScene.querySelectorAll<HTMLElement>(
              "[data-heading], [data-copy-block], ." + styles.arrowLink,
            ),
          );
          exitParts.forEach((part, index) => {
            timeline.add(part, {
              duration: 55,
              ease: "inOut(3)",
              opacity: 0,
              y: "3.5rem",
            }, 604 + index * 9);
          });
        }

        if (mediaImages[2]) {
          timeline.add(mediaImages[2], {
            duration: 108,
            ease: "linear",
            scale: 1.03,
            x: "0vw",
            y: "-2vh",
          }, 900);
        }
        timeline
          .add(caseCards, {
            delay: stagger(24),
            duration: 72,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            y: "0rem",
          }, 1660)
          .add(teamCards, {
            delay: stagger(24),
            duration: 72,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            y: "0rem",
          }, 1860);

        /* ── About Origin: Born From Sport ── */
        if (!reduceMotion) {
          const aoStart = 1685;
          const cycleDur = 14;
          const cycleOverlap = 5;

          aoCycles.forEach((el, i) => {
            const start = aoStart + i * (cycleDur - cycleOverlap);
            timeline.add(el, {
              duration: 10,
              ease: "out(3)",
              opacity: 1,
              scale: 1,
            }, start);
            timeline.add(el, {
              duration: 10,
              ease: "inOut(2)",
              opacity: 0,
              scale: 0.85,
            }, start + cycleDur - 10);
          });

          const sliderStart = aoStart + aoCycles.length * (cycleDur - cycleOverlap) + 5;
          if (aoSlider) {
            timeline.add(aoSlider, {
              duration: 12,
              ease: "linear",
              opacity: 1,
            }, sliderStart);
          }
          timeline.add(aoSlides, {
            delay: stagger(4),
            duration: 14,
            ease: "outBack(1.4)",
            opacity: 1,
            scale: 1,
            y: "0rem",
          }, sliderStart + 4);
        }
      }

      if (handoff) {
        const lastDirection = sceneDirections[6];

        timeline
          .add(scenes[6], { duration: 60, ease: "linear", opacity: 0 }, 2120)
          .add(handoff, {
            duration: 60,
            ease: "inOut(3)",
            opacity: 1,
            y: "0%",
          }, 2120);

        if (!reduceMotion) {
          timeline
            .add(headingLines[6], {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              x: `${lastDirection * 105}vw`,
            }, 2120)
            .add(copyBlocks[6], {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              x: `${lastDirection * 105}vw`,
            }, 2120)
            .add(artLayers[6]!, {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              scale: 0.96,
              x: `${lastDirection * -4}vw`,
            }, 2120);
        }
      }
    });

    return () => {
      scope.revert();
    };
  }, []);

  useEffect(() => {
    if (location.hash === "#evaluation") {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
    }
  }, [location.hash]);

  return (
    <div className={styles.page} id="athletes-usa" ref={rootRef}>
      <header className={styles.nav}>
        <Link to="/"><Brand /></Link>
        <Link className={styles.navCta} to="#evaluation">Evaluá tu perfil</Link>
      </header>

      <main>
        <div className={styles.storyTrack} ref={storyRef}>
          <div className={styles.storyStage}>
            <Scene
              id="dream"
              side="left"
              theme="dark"
              image={stadiumImage}
              imageAlt="Estadio de fútbol iluminado durante la noche"
              art={<OutcomeOrbit />}
            >
              <p className={styles.eyebrow} data-copy-block>TU FUTURO PUEDE EMPEZAR ACÁ</p>
              <h1 data-heading>Estudiá. Competí. Crecé en Estados Unidos.</h1>
              <p className={styles.lede} data-copy-block>Una carrera universitaria y tu deporte al máximo nivel.</p>
              <ArrowLink to="dream">Ver la experiencia</ArrowLink>
            </Scene>

            <Scene
              id="path"
              side="right"
              theme="light"
              className={styles.pathSection}
              art={<JourneyPath />}
            >
              <p className={styles.eyebrow} data-copy-block>ACOMPAÑAMIENTO COMPLETO</p>
              <h2 data-heading>Todo tu camino. Un solo equipo.</h2>
              <p className={styles.lede} data-copy-block>Cinco etapas conectadas para que siempre sepas cuál es el próximo paso.</p>
              <ArrowLink to="path">Conocé el proceso</ArrowLink>
            </Scene>

            {/* Escena "Convertimos tu potencial..." fuera de servicio por ahora.
            <Scene
              id="opportunity"
              side="left"
              theme="navy"
              className={styles.opportunitySection}
              art={<OpportunityNetwork />}
            >
              <p className={styles.eyebrow} data-copy-block>TU OPORTUNIDAD</p>
              <h2 data-heading>Convertimos tu potencial en un perfil que abre oportunidades.</h2>
              <p className={styles.lede} data-copy-block>Tu historia deportiva y académica, lista para llegar a las universidades correctas.</p>
              <ArrowLink to="opportunity">Ver cómo lo hacemos</ArrowLink>
            </Scene>
            Fin de escena fuera de servicio */}

            <Scene
              id="campus"
              side="right"
              theme="dark"
              image={campusImage}
              imageAlt="Campus universitario y estadio deportivo en Estados Unidos"
              art={<OpportunityMatching />}
            >
              <p className={styles.eyebrow} data-copy-block>DE TALENTO A CAMPUS</p>
              <h2 data-heading>Conectamos tu talento con la oportunidad correcta.</h2>
              <p className={styles.lede} data-copy-block>No buscamos cualquier universidad. Buscamos la que tenga sentido para tu nivel, tus objetivos y tu futuro.</p>
              <ArrowLink to="campus">Conocé el camino</ArrowLink>
              <p className={styles.finalNote} data-match-final>Tu talento abre puertas. Nosotros encontramos cuáles son las correctas.</p>
            </Scene>

            <Scene id="support" side="left" theme="light" art={<SupportJourney />}>
              <p className={styles.eyebrow} data-copy-block>ACOMPAÑAMIENTO 360°</p>
              <h2 data-heading>Antes, durante y después.</h2>
              <p className={styles.lede} data-copy-block>Una red que sigue con vos durante tu carrera universitaria y profesional.</p>
              <div className={styles.metrics} data-copy-block aria-label="Datos de Athletes USA">
                <span><strong><span data-metric data-target="2008" data-format="plain">0</span></strong>Desde</span>
                <span><strong>+<span data-metric data-target="3000" data-format="es-ar">0</span></strong>Estudiantes-atletas</span>
                <span><strong>+<span data-metric data-target="20000" data-format="es-ar">0</span></strong>Entrenadores</span>
              </div>
              <ArrowLink to="support">Ver el acompañamiento</ArrowLink>
            </Scene>

            <Scene id="about" side="right" theme="navy" art={<AboutOrigin />}>
              <p className={styles.eyebrow} data-copy-block>QUIÉNES SOMOS</p>
              <h2 data-heading>Una agencia que nació del deporte.</h2>
              <p className={styles.lede} data-copy-block>Desde 2008 acompañamos a atletas latinoamericanos hacia universidades de Estados Unidos: evaluación, reclutamiento y gestión completa del proceso.</p>
              <Link className={styles.arrowLink} data-copy-block to="#evaluation">Quiero mi evaluación</Link>
            </Scene>

            <Scene id="cases" side="left" theme="dark" art={<CasesGrid />}>
              <p className={styles.eyebrow} data-copy-block>CASOS DE ÉXITO</p>
              <h2 data-heading>Historias que ya están pasando.</h2>
              <p className={styles.lede} data-copy-block>Atletas que llegaron con una ilusión y hoy estudian y compiten en Estados Unidos.</p>
              <Link className={styles.arrowLink} data-copy-block to="#evaluation">Quiero ser el próximo</Link>
            </Scene>

            <Scene id="team" side="right" theme="light" art={<TeamGrid />}>
              <p className={styles.eyebrow} data-copy-block>NUESTRO EQUIPO</p>
              <h2 data-heading>Gente que vivió el camino y te guía en el tuyo.</h2>
              <p className={styles.lede} data-copy-block>Ex estudiantes-atletas y especialistas en el proceso deportivo, académico y de visa.</p>
              <Link className={styles.arrowLink} data-copy-block to="#evaluation">Empezá tu evaluación</Link>
            </Scene>
                <div className={styles.handoff} data-handoff aria-hidden="true" />
          </div>
        </div>

        <section className={`${styles.section} ${styles.evaluation}`} id="evaluation">
          <div className={styles.evaluationIntro}>
            <p className={styles.eyebrow}>TU PRIMER PASO</p>
            <h2>Ahora descubramos tu camino.</h2>
            <p className={styles.lede}>Contanos un poco sobre vos y armá una primera fotografía de tu perfil.</p>
          </div>
          <EvaluationForm />
        </section>
      </main>

      <footer className={styles.footer}>
        <Brand />
        <span>Showcase conceptual · Buenos Aires · 2026</span>
      </footer>
    </div>
  );
}
