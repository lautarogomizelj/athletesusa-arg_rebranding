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

function SupportProof() {
  return (
    <div className={styles.proofStrip}>
      <figure data-proof-card>
        <img src={emilJaaskelainenCase} alt="Emil Jaaskelainen con la camiseta de St. Louis City" loading="lazy" />
        <span className={styles.proofLogo} data-proof-logo aria-hidden="true">
          <img src={stLouisCityLogo} alt="" loading="lazy" />
        </span>
        <figcaption>Emil Jaaskelainen</figcaption>
      </figure>
      <figure data-proof-card>
        <img src={delfinaSchmidtCase} alt="Delfina Schmidt con la camiseta de Boca Juniors" loading="lazy" />
        <span className={styles.proofLogo} data-proof-logo aria-hidden="true">
          <img src={rioGrandeLogo} alt="" loading="lazy" />
        </span>
        <figcaption>Delfina Schmidt</figcaption>
      </figure>
      <figure data-proof-card>
        <img src={delfiGonzalezCase} alt="Delfi González con su palo de hockey" loading="lazy" />
        <span className={styles.proofLogo} data-proof-logo aria-hidden="true">
          <img src={liuSharksLogo} alt="" loading="lazy" />
        </span>
        <figcaption>Delfi González</figcaption>
      </figure>
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
      const proofCards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-proof-card]"),
      );
      const proofLogos = Array.from(
        root.querySelectorAll<HTMLElement>("[data-proof-logo]"),
      );
      const caseCards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-case-card]"),
      );
      const teamCards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-team-card]"),
      );

      const setActiveScene = (progress: number) => {
        const activeIndex = [0.084, 0.307, 0.589, 0.7, 0.811, 0.922, 0.982]
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
        utils.set(proofCards, { opacity: 0.42, scale: 0.96, y: "2rem" });
        utils.set(proofLogos, { opacity: 0, scale: 0.78, x: "0.8rem" });
        utils.set(caseCards, { opacity: 0.42, scale: 0.96, y: "2rem" });
        utils.set(teamCards, { opacity: 0.42, scale: 0.96, y: "2rem" });
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
      addTransition(3, 4, 1220, 80);
      addTransition(4, 5, 1420, 80);
      addTransition(5, 6, 1620, 80);

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

        const verticalLayout = window.matchMedia("(max-width: 1099px)");
        if (campusScene && verticalLayout.matches) {
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
          .add(proofCards, {
            delay: stagger(24),
            duration: 72,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            y: "0rem",
          }, 1120)
          .add(proofLogos, {
            delay: stagger(24),
            duration: 42,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            x: "0rem",
          }, 1160)
          .add(caseCards, {
            delay: stagger(24),
            duration: 72,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            y: "0rem",
          }, 1480)
          .add(teamCards, {
            delay: stagger(24),
            duration: 72,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            y: "0rem",
          }, 1680);
      }

      if (handoff) {
        const lastDirection = sceneDirections[6];

        timeline
          .add(scenes[6], { duration: 60, ease: "linear", opacity: 0 }, 1740)
          .add(handoff, {
            duration: 60,
            ease: "inOut(3)",
            opacity: 1,
            y: "0%",
          }, 1740);

        if (!reduceMotion) {
          timeline
            .add(headingLines[6], {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              x: `${lastDirection * 105}vw`,
            }, 1740)
            .add(copyBlocks[6], {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              x: `${lastDirection * 105}vw`,
            }, 1740)
            .add(artLayers[6]!, {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              scale: 0.96,
              x: `${lastDirection * -4}vw`,
            }, 1740);
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

            <Scene id="support" side="left" theme="light" art={<SupportProof />}>
              <p className={styles.eyebrow} data-copy-block>ACOMPAÑAMIENTO 360°</p>
              <h2 data-heading>Antes, durante y después.</h2>
              <p className={styles.lede} data-copy-block>Una red que sigue con vos durante tu carrera universitaria y profesional.</p>
              <div className={styles.metrics} data-copy-block aria-label="Datos de Athletes USA">
                <span><strong>2008</strong>Desde</span>
                <span><strong>3.000+</strong>Estudiantes-atletas</span>
                <span><strong>20.000+</strong>Entrenadores</span>
              </div>
              <ArrowLink to="support">Ver el acompañamiento</ArrowLink>
            </Scene>

            <Scene id="about" side="right" theme="navy" art={null}>
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
