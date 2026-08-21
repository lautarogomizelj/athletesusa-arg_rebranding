export type DetailSlug =
  | "dream"
  | "path"
  | "opportunity"
  | "campus"
  | "support";

export type DetailContent = {
  eyebrow: string;
  headline: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
    items?: string[];
  }>;
};

export const detailContent: Record<DetailSlug, DetailContent> = {
  dream: {
    eyebrow: "El resultado",
    headline: "Estudiar, competir y crecer en Estados Unidos.",
    intro:
      "Una beca deportiva combina educación universitaria, competencia de alto nivel y una experiencia internacional que puede transformar tu futuro.",
    sections: [
      {
        title: "Mucho más que una beca",
        body:
          "La experiencia une un título universitario internacional, desarrollo deportivo, una red global de contactos y nuevas oportunidades profesionales.",
      },
      {
        title: "Una inversión en tu potencial",
        body:
          "Las universidades evalúan tu rendimiento deportivo, tu perfil académico y tu proyección como estudiante-atleta.",
        items: [
          "Educación universitaria",
          "Deporte de alto nivel",
          "Experiencia internacional",
          "Desarrollo profesional",
        ],
      },
    ],
  },
  path: {
    eyebrow: "El proceso",
    headline: "Todo tu camino, coordinado por un solo equipo.",
    intro:
      "Athletes USA organiza cada etapa para que tu perfil avance con claridad desde la primera evaluación hasta tu vida universitaria.",
    sections: [
      {
        title: "Cinco etapas conectadas",
        body:
          "Cada paso prepara el siguiente y mantiene tu perfil deportivo, académico y administrativo alineado.",
        items: [
          "Evaluación deportiva y académica",
          "Creación y promoción del perfil",
          "Búsqueda y negociación de becas",
          "Admisión universitaria y visa",
          "Acompañamiento durante la carrera",
        ],
      },
    ],
  },
  opportunity: {
    eyebrow: "Tu oportunidad",
    headline: "Un perfil preparado para abrir conversaciones.",
    intro:
      "Convertimos tu recorrido en una presentación clara para que entrenadores y universidades puedan entender rápidamente tu potencial.",
    sections: [
      {
        title: "Tu perfil en su mejor versión",
        body:
          "La evaluación, el material deportivo y la información académica se combinan en una presentación coherente y profesional.",
        items: [
          "Evaluación de potencial",
          "Highlight video",
          "Perfil deportivo",
          "Información académica",
          "Promoción con entrenadores",
        ],
      },
      {
        title: "Una red internacional",
        body:
          "El perfil se conecta con oportunidades universitarias que encajan con tus objetivos deportivos y académicos.",
      },
    ],
  },
  campus: {
    eyebrow: "De talento a campus",
    headline: "De una oportunidad real a tu primer día en la universidad.",
    intro:
      "La búsqueda de becas, las conversaciones con universidades y la preparación administrativa funcionan como un solo recorrido.",
    sections: [
      {
        title: "Una propuesta completa",
        body:
          "Las becas pueden ser parciales o completas según el perfil deportivo y académico de cada atleta.",
        items: [
          "Búsqueda de oportunidades",
          "Comunicación con entrenadores",
          "Negociación de becas",
          "Admisión universitaria",
          "Acompañamiento de visa",
        ],
      },
      {
        title: "Lo que una beca puede cubrir",
        body:
          "Según la propuesta, puede incluir vivienda, alimentación, matrícula académica, indumentaria, viajes con el equipo e instalaciones deportivas.",
      },
    ],
  },
  support: {
    eyebrow: "Acompañamiento 360°",
    headline: "Antes, durante y después de la universidad.",
    intro:
      "El trabajo no termina con la firma. El acompañamiento continúa durante la experiencia universitaria y la transición profesional.",
    sections: [
      {
        title: "Un sistema que permanece",
        body:
          "Cada momento de la experiencia tiene un tipo de apoyo concreto.",
        items: [
          "Preparación y promoción antes de viajar",
          "Seguimiento académico y deportivo",
          "Asistencia en transferencias",
          "Networking internacional",
          "Oportunidades deportivas y profesionales",
        ],
      },
      {
        title: "Una red con experiencia",
        body:
          "Desde 2008, más de 3.000 estudiantes-atletas iniciaron su camino universitario a través de Athletes USA, conectados con una red de más de 20.000 entrenadores.",
      },
    ],
  },
};

export function isDetailSlug(value: string | undefined): value is DetailSlug {
  return value !== undefined && value in detailContent;
}
