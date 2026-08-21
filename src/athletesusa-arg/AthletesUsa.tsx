import {
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
  const steps = ["Evaluación", "Perfil", "Becas", "Admisión", "Soporte"];

  return (
    <div className={styles.journeyArt} aria-hidden="true">
      <svg viewBox="0 0 220 660" preserveAspectRatio="none">
        <path className={styles.journeyTrack} d="M110 20V640" />
        <path
          className={styles.journeyProgress}
          data-journey-progress
          d="M110 20V640"
        />
      </svg>
      <ol>
        {steps.map((step, index) => (
          <li data-journey-item key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

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
      const journeyProgress = root.querySelector<SVGPathElement>(
        "[data-journey-progress]",
      );
      const journeyItems = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-item]"),
      );
      const orbit = root.querySelector<HTMLElement>("[data-orbit]");
      const orbitCore = root.querySelector<HTMLElement>("[data-orbit-core]")!;
      const orbitLabels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-orbit-label]"),
      );
      const profileBars = Array.from(
        root.querySelectorAll<HTMLElement>("[data-profile-bar]"),
      );
      const network = root.querySelector<HTMLElement>("[data-network]")!;
      const networkNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-network-node]"),
      );
      const offerCard = root.querySelector<HTMLElement>("[data-offer-card]")!;
      const offerTags = Array.from(
        root.querySelectorAll<HTMLElement>("[data-offer-tag]"),
      );
      const proofCards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-proof-card]"),
      );
      const proofLogos = Array.from(
        root.querySelectorAll<HTMLElement>("[data-proof-logo]"),
      );

      const setActiveScene = (progress: number) => {
        const activeIndex = [0.16, 0.36, 0.56, 0.76, 0.94]
          .findIndex((limit) => progress < limit);

        scenes.forEach((scene, index) => {
          const isActive = index === activeIndex;
          scene.dataset.active = String(isActive);
          scene.inert = !isActive;
          scene.setAttribute("aria-hidden", String(!isActive));
        });
      };

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
      if (journeyProgress && !reduceMotion) {
        utils.set(journeyProgress, {
          strokeDasharray: 620,
          strokeDashoffset: 620,
        });
      }
      if (!reduceMotion) {
        utils.set(journeyItems, { opacity: 0.42, scale: 0.92, x: "1rem" });
        utils.set(profileBars, { scaleX: 0.18, transformOrigin: "0% 50%" });
        utils.set(network, { opacity: 0.3 });
        utils.set(networkNodes, { opacity: 0, scale: 0.78 });
        utils.set(offerCard, { rotate: -4, y: "2rem" });
        utils.set(offerTags, { opacity: 0, y: "0.8rem" });
        utils.set(proofCards, { opacity: 0.42, scale: 0.96, y: "2rem" });
        utils.set(proofLogos, { opacity: 0, scale: 0.78, x: "0.8rem" });
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
      addTransition(1, 2, 320, 80);
      addTransition(2, 3, 520, 80);
      addTransition(3, 4, 720, 80);

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

        if (journeyProgress) {
          timeline.add(journeyProgress, {
            duration: 108,
            ease: "linear",
            strokeDashoffset: 0,
          }, 202);
        }
        timeline
          .add(journeyItems, {
            delay: stagger(14),
            duration: 52,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            x: "0rem",
          }, 202)
          .add(profileBars, {
            delay: stagger(12),
            duration: 70,
            ease: "inOut(3)",
            scaleX: 1,
          }, 405)
          .add(network, {
            duration: 96,
            ease: "linear",
            opacity: 1,
          }, 410)
          .add(networkNodes, {
            delay: stagger(14),
            duration: 46,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
          }, 410)
          .add(offerCard, {
            duration: 104,
            ease: "inOut(3)",
            rotate: 0,
            y: "0rem",
          }, 604)
          .add(offerTags, {
            delay: stagger(18),
            duration: 50,
            ease: "inOut(3)",
            opacity: 1,
            y: "0rem",
          }, 614)
          .add(mediaImages[3]!, {
            duration: 108,
            ease: "linear",
            scale: 1.03,
            x: "0vw",
            y: "-2vh",
          }, 604)
          .add(proofCards, {
            delay: stagger(24),
            duration: 72,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            y: "0rem",
          }, 804)
          .add(proofLogos, {
            delay: stagger(24),
            duration: 42,
            ease: "inOut(3)",
            opacity: 1,
            scale: 1,
            x: "0rem",
          }, 840);
      }

      if (handoff) {
        timeline
          .add(scenes[4], { duration: 60, ease: "linear", opacity: 0 }, 940)
          .add(handoff, {
            duration: 60,
            ease: "inOut(3)",
            opacity: 1,
            y: "0%",
          }, 940);

        if (!reduceMotion) {
          timeline
            .add(headingLines[4], {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              x: "-105vw",
            }, 940)
            .add(copyBlocks[4], {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              x: "-105vw",
            }, 940)
            .add(artLayers[4]!, {
              duration: 60,
              ease: "inOut(3)",
              opacity: 0,
              scale: 0.96,
              x: "-4vw",
            }, 940);
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

            <Scene
              id="campus"
              side="right"
              theme="dark"
              image={campusImage}
              imageAlt="Campus universitario y estadio deportivo en Estados Unidos"
              art={<CampusDocuments />}
            >
              <p className={styles.eyebrow} data-copy-block>DE TALENTO A CAMPUS</p>
              <h2 data-heading>Conectamos tu talento con la oportunidad correcta.</h2>
              <p className={styles.lede} data-copy-block>Beca, admisión y visa coordinadas hasta tu primer día en la universidad.</p>
              <ArrowLink to="campus">Conocé el camino</ArrowLink>
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
