import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ProjectOverview,
  TechnicalSheet,
  MotionReveal,
  CaseStudySection,
  CaseStudyFooter,
  QuoteBlock,
  IPhoneMockup,
  DesignLabel,
  DesignCard,
} from '../../components/ds';
import {
  ControlTaxonomyGrid,
  RowAnatomyExhibit,
  ExpandInteractionExhibit,
  DecisionMatrixExhibit,
} from './audio-exhibits';

/* ── Project accent color (Yellow) ───────────────────────────── */
/* Set via --cs-accent on the page root. Exhibits inherit it. */
const CS_ACCENT = '#F0C70E';
const CS_ACCENT_TEXT = '#212226';

/* ── Project metadata ────────────────────────────────────────── */

const projectMeta = [
  { label: 'Tipo', value: 'Proyecto conceptual' },
  { label: 'Rol', value: 'UX/UI Designer' },
  { label: 'Enfoque', value: 'Design Systems, Interaction Design, Prototipado' },
  { label: 'Herramientas', value: 'Figma' },
];

/* ── Page ─────────────────────────────────────────────────────── */

export function CaseStudyAudio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-background text-ds-text-primary"
      style={{
        '--cs-accent': CS_ACCENT,
        '--cs-accent-text': CS_ACCENT_TEXT,
      } as React.CSSProperties}
    >
      {/* ============================================
          HERO — Typographic, project-branded
          ============================================ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--cs-accent)' }}
      >
        <div className="max-w-(--ds-max-w-content) mx-auto px-ds-24 lg:px-ds-48 pt-[140px] md:pt-[180px] pb-ds-72 md:pb-ds-96 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex flex-wrap items-center gap-ds-12 mb-ds-24">
              <DesignLabel>Proyecto conceptual</DesignLabel>
              <DesignLabel>Design Systems</DesignLabel>
            </div>
            <h1
              className="ds-text-heading-hero max-w-4xl"
              style={{ color: 'var(--cs-accent-text)' }}
            >
              Ajustes de Reproducción
              <br />
              y Audio
            </h1>
            {/* Hero description removed for consistency with other case studies */}
          </motion.div>
        </div>

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #212226 1px, transparent 1px), linear-gradient(to bottom, #212226 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </section>

      {/* ============================================
          OVERVIEW
          ============================================ */}
      <CaseStudySection>
        <ProjectOverview
          title="Exploración de la arquitectura y el sistema visual para una pantalla de configuración"
          description={
            <>
              <p>El proyecto tiene como objetivo definir un sistema escalable aplicado a una aplicación de música. Para lograrlo, construí una serie de variantes de control que comparten una estructura anatómica y patrones de interacción predecible.</p>
              <p className="mt-ds-16">El enfoque y alcance del proyecto es exclusivamente técnico — arquitectura de componentes, taxonomía de controles e interacciones expandibles — sin investigación de usuarios ni métricas de negocio.</p>
            </>
          }
          meta={projectMeta}
          tags={{ label: 'Herramientas', values: ['Figma'] }}
        />
      </CaseStudySection>

      {/* ============================================
          DESIGN CONSTRAINTS
          ============================================ */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="mb-ds-48">
          <TechnicalSheet
            subtitle="Restricciones de diseño"
            title={
              <>
                Principios del sistema
              </>
            }
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-ds-24">
          {[
            {
              num: '01',
              title: 'Densidad sin sobrecarga',
              desc: '7 ajustes en una pantalla. Mostrar todo sin abrumar — las filas deben priorizar legibilidad sobre eficiencia espacial.',
            },
            {
              num: '02',
              title: 'Estructura estable',
              desc: 'Cada fila debe seguir la misma anatomía visual aunque su control sea radicalmente diferente: toggle, slider, selector.',
            },
            {
              num: '03',
              title: 'Expansión inline',
              desc: 'Cuando una fila necesita más espacio (slider, sub-opciones), debe expandirse sin romper la posición de los elementos adyacentes.',
            },
            {
              num: '04',
              title: 'Patrones familiares',
              desc: 'Los controles deben ser reconocibles: convenciones iOS/Material son la base. El usuario no debería necesitar aprender un lenguaje nuevo.',
            },
          ].map((c, i) => (
            <MotionReveal key={c.num} delay={i * 0.08} duration={0.6}>
              <DesignCard
                variant="numbered"
                number={c.num}
                title={c.title}
                description={c.desc}
              />
            </MotionReveal>
          ))}
        </div>
      </CaseStudySection>

      {/* ============================================
          CONTROL TAXONOMY — Star section
          ============================================ */}
      <CaseStudySection>
        <MotionReveal margin="-80px" className="mb-ds-48">
          <TechnicalSheet
            subtitle="Variantes de control"
            title={
              <>
                Cuatro tipos de control, un framework de decisión
              </>
            }
            description="Cada ajuste tiene una naturaleza de decisión diferente. El sistema mapea 4 tipos de control a 4 tipos de decisión. Esto no es decorativo — es la lógica que hace que la pantalla se escale sin perder consistencia."
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <MotionReveal margin="-80px">
          <ControlTaxonomyGrid />
        </MotionReveal>
      </CaseStudySection>

      {/* ============================================
          DECISION MATRIX
          ============================================ */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="mb-ds-48">
          <TechnicalSheet
            subtitle="Matriz de decisión"
            title={
              <>
                Por qué cada ajuste tiene ese control
              </>
            }
            description="No es arbitrario. Cada fila de la pantalla pasó por la misma pregunta: ¿cuál es la naturaleza de esta decisión? La respuesta determina el control."
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <MotionReveal margin="-80px">
          <DecisionMatrixExhibit />
        </MotionReveal>
      </CaseStudySection>

      {/* ============================================
          ROW ANATOMY
          ============================================ */}
      <CaseStudySection>
        <MotionReveal margin="-80px" className="mb-ds-48">
          <TechnicalSheet
            subtitle="Componente de fila"
            title={
              <>
                Una estructura, cuatro variantes
              </>
            }
            description="Todas las filas de la pantalla comparten la misma anatomía: label a la izquierda, control a la derecha, altura mínima de 44px para zonas de toque accesibles. Lo que cambia entre filas es solo el tipo de control — la estructura visual permanece estable."
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <MotionReveal margin="-80px">
          <RowAnatomyExhibit />
        </MotionReveal>
      </CaseStudySection>

      {/* ============================================
          EXPAND INTERACTION
          ============================================ */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="mb-ds-48">
          <TechnicalSheet
            subtitle="Interacción expandible"
            title={
              <>
                Revelar sin romper el ritmo
              </>
            }
            description="La velocidad de reproducción ofrece seis opciones discretas — pero mostrarlas siempre desperdiciaría espacio. En estado colapsado la fila muestra solo el valor actual con un chevron. Al interactuar, las opciones se despliegan inline y las filas adyacentes se desplazan suavemente, preservando el ritmo de la lista sin navegar a otra pantalla."
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <MotionReveal margin="-80px">
          <ExpandInteractionExhibit />
        </MotionReveal>
      </CaseStudySection>

      {/* ============================================
          FULL PROTOTYPE — Interactive IPhoneMockup
          ============================================ */}
      <CaseStudySection>
        <MotionReveal margin="-80px" className="mb-ds-64">
          <TechnicalSheet
            align="centered"
            subtitle="Prototipo"
            title={
              <>
                El sistema completo en acción
              </>
            }
            description="Navega entre las tres pantallas del prototipo: la vista principal con todos los ajustes, la expansión del selector de velocidad y la sub-pantalla de calidad de audio."
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <MotionReveal margin="-80px">
          <div className="flex justify-center">
            <div style={{ width: '100%', maxWidth: '320px' }}>
              <IPhoneMockup
                frames={[
                  <div
                    key="figma-proto"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FqYes6bsAhU1Cbs0js5SO9F%2F%25F0%259F%259A%2580--Concept--Playback---Audio-Settings%3Fpage-id%3D363%253A4922%26node-id%3D363-4924%26p%3Df%26viewport%3D45%252C383%252C0.19%26t%3Dadwkwr8OP8W8qKcx-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D363%253A4924%26hide-ui%3D1"
                      title="Playback & Audio Settings prototype"
                      style={{
                        width: '133%',
                        height: '133%',
                        border: 'none',
                        flexShrink: 0,
                        marginLeft: '3px',
                      }}
                      allowFullScreen
                    />
                  </div>,
                ]}
                className="w-full"
              />
            </div>
          </div>
        </MotionReveal>
      </CaseStudySection>

      {/* ============================================
          REFLECTION
          ============================================ */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="max-w-4xl mx-auto mb-ds-64">
          <QuoteBlock
            quote="Los ajustes son la parte de la app que nadie diseña con cariño — y por eso son donde más se nota el craft."
            author="Pablo Perea Bohorquez"
            subtitle="Reflexión del proyecto"
          />
        </MotionReveal>

        <div className="relative grid md:grid-cols-3 gap-ds-48 max-w-5xl mx-auto">
          {[
            {
              title: 'El control correcto reduce la carga cognitiva',
              desc: 'Mapear toggle → binario y slider → rango no es solo consistencia — reduce las decisiones que el usuario toma para entender cómo interactuar.',
            },
            {
              title: 'La anatomía fija permite variación segura',
              desc: 'Cuando la estructura de la fila es estable (label izquierda, control derecha, 44px min), se pueden agregar nuevos tipos de control sin romper la interfaz.',
            },
            {
              title: 'Expandir inline > navegar a otra pantalla',
              desc: 'Para controles que necesitan espacio (slider con rango), expandir inline mantiene el contexto. Navegar a otra pantalla para algo simple añade fricción innecesaria.',
            },
          ].map((l, i) => (
            <MotionReveal key={l.title} delay={i * 0.12} duration={0.6}>
              <div className="flex flex-col gap-ds-8">
                <h3 className="ds-text-heading-compact">{l.title}</h3>
                <p className="ds-text-body-default text-ds-text-secondary">{l.desc}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </CaseStudySection>

      {/* ============================================
          FOOTER
          ============================================ */}
      <CaseStudyFooter variant="inverse" />
    </div>
  );
}