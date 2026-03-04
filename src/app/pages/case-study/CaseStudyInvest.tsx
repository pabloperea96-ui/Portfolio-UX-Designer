import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointerClick } from 'lucide-react';
import {
  ParallaxHero,
  CaseStudySection,
  ProjectOverview,
  TechnicalSheet,
  MotionReveal,
  ContentImage,
  ProjectCard,
  BulletList,
  StatItem,
  QuoteBlock,
  CaseStudyFooter,
  DesignLabel,
  DesignCard,
  DesignButton,
  IPhoneMockup,
} from '../../components/ds';
import { UserFlowDiagram } from '../../components/user-flow-diagram';
import { InvestmentSetupScreen, RiskClarificationScreen } from '../../components/prototypes/invest';

const heroImage =
  'https://images.unsplash.com/photo-1616156027751-fc9a850fdc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwaW52ZXN0bWVudCUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MXx8fHwxNzcxMDAxNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const images = {
  tradingChart:
    'https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydCUyMHNjcmVlbnxlbnwxfHx8fDE3NzEwMDE3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  mobileFinance:
    'https://images.unsplash.com/photo-1629449710716-a81a59aa0af2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBmaW5hbmNlJTIwaW52ZXN0bWVudCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzEwMDE3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  research:
    'https://images.unsplash.com/photo-1612696877544-9796e268bfcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwaW52ZXN0bWVudCUyMHBvcnRmb2xpbyUyMGRhc2hib2FyZCUyMGNsb3NlJTIwdXAlMjBkYXJrfGVufDF8fHx8MTc3MTg2NjA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  wireframe:
    'https://images.unsplash.com/photo-1680016661694-1cd3faf31c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBwcm90b3R5cGUlMjBza2V0Y2glMjBub3RlYm9va3xlbnwxfHx8fDE3NzEwMDE3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  dataViz:
    'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwYW5hbHl0aWNzJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzEwMDE3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  designSystem:
    'https://images.unsplash.com/photo-1562601555-513820e5d0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb21wb25lbnRzJTIwVUklMjBsaWJyYXJ5fGVufDF8fHx8MTc3MTAwMTc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

const projectMeta = [
  { label: 'Cliente', value: 'Proyecto personal' },
  { label: 'Rol', value: 'Product Designer' },
  { label: 'Duración', value: '4 semanas' },
  { label: 'Alcance', value: 'Investigación, UX, UI, Prototipo' },
];

const tools = ['Figma', 'Protopie', 'Notion', 'Miro', 'Excel'];

const results = [
  { metric: '3', description: 'Flujos de inversión diseñados end-to-end' },
  { metric: '12', description: 'Pantallas de alta fidelidad entregadas' },
  { metric: '5', description: 'Puntos de decisión con divulgación progresiva' },
  { metric: '100%', description: 'Cobertura de estados de error y edge cases' },
];

export function CaseStudyInvest() {
  const [iframeKey, setIframeKey] = useState(0);
  const [protoHintVisible, setProtoHintVisible] = useState(true);
  const protoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* One-time entrance: start auto-dismiss timer when mockup scrolls into view */
  useEffect(() => {
    if (!protoHintVisible) return;
    const el = protoRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setProtoHintVisible(false), 5000);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [protoHintVisible]);

  const dismissProtoHint = useCallback(() => setProtoHintVisible(false), []);

  return (
    <div className="relative min-h-screen bg-background text-ds-text-primary">
      {/* Hero Section */}
      <ParallaxHero image={heroImage} alt="Flujo de inversión apalancada hero">
        <div className="flex flex-wrap items-center gap-ds-12 mb-ds-24">
          <DesignLabel>Proyecto conceptual</DesignLabel>
        </div>
        <h1 className="ds-text-heading-hero max-w-5xl">
          Flujo de inversión apalancada
        </h1>
      </ParallaxHero>

      {/* Project Overview */}
      <CaseStudySection>
        <ProjectOverview
          title="Un flujo de inversión apalancada construido desde cero, enfocado en comunicar riesgos de forma clara y empoderar al usuario en cada punto de decisión."
          description="Los productos apalancados le permiten a los inversores amplificar la exposición de los movimientos de mercado. Aunque son poderosos, no son muy conocidos por los usuarios: en particular el efecto del apalancamiento en la exposición, la volatilidad y los resultados a largo plazo."
          meta={projectMeta}
          tags={{ values: tools }}
        />
      </CaseStudySection>

      {/* ── removed standalone trading chart thumbnail — no storytelling value ── */}

      {/* The Challenge */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="max-w-4xl">
          <TechnicalSheet
            subtitle="El Desafío"
            title="Diseñar un flujo de inversión que"
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <div className="relative flex gap-ds-24 mt-ds-48 overflow-x-auto md:overflow-visible md:grid md:grid-cols-3 md:gap-ds-32 pb-ds-8 md:pb-0 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            {
              number: '01',
              title: 'Informe sin dirigir la decisión',
              description:
                'El usuario necesita entender las implicaciones del apalancamiento antes de invertir, pero la interfaz no debe empujarlo hacia la conversión.',
            },
            {
              number: '02',
              title: 'Prevenga el churn post-inversión',
              description:
                'Sin visibilidad previa del riesgo real, los usuarios invierten montos que no pueden sostener y terminan abandonando la plataforma.',
            },
            {
              number: '03',
              title: 'Comunique el riesgo sin alarmar al usuario',
              description:
                'La información sobre riesgo apalancado debe generar comprensión y confianza, no ansiedad que frene la toma de decisiones.',
            },
          ].map((challenge, index) => (
            <MotionReveal
              key={challenge.number}
              delay={index * 0.15}
              duration={0.6}
              className="shrink-0 w-[80vw] md:w-auto md:shrink snap-start"
            >
              <DesignCard
                variant="metric"
                size="compact"
                value={challenge.title}
                label={challenge.description}
              />
            </MotionReveal>
          ))}
        </div>
      </CaseStudySection>

      {/* Research & Discovery */}
      <CaseStudySection>
        <div className="relative grid lg:grid-cols-2 gap-ds-64 items-center">
          <MotionReveal margin="-80px" className="space-y-ds-32">
            <TechnicalSheet
              subtitle="Investigación"
              title={<>El riesgo no está<br />del todo claro</>}
              description={
                <div className="space-y-ds-16">
                  <p>
                    Utilicé Perplexity y Claude.ai para analizar 200+ experiencias
                    de inversionistas retail con ETFs apalancados en Reddit y foros
                    especializados. La investigación indicó que 70% de usuarios
                    malinterpreta el decay por rebalanceo diario.
                  </p>
                  <p>
                    El análisis reveló que las soluciones actuales fallan:
                    disclaimers legales suelen ser ignorados, pop-ups son cerrados
                    sin leer, y artículos educativos extensos (5% de comprensión
                    efectiva).
                  </p>
                </div>
              }
              hasBadges={false}
              showCta={false}
            />

            <div className="grid grid-cols-2 gap-ds-24">
              {[
                { stat: '200+', label: 'Threads de foros procesados con IA' },
                { stat: '70%', label: 'Usuarios que no entienden el riesgo real' },
                { stat: '95%', label: 'Ignoran disclaimers' },
                { stat: '40%', label: 'Churn en el primer mes' },
              ].map((item) => (
                <StatItem key={item.label} stat={item.stat} label={item.label} />
              ))}
            </div>
          </MotionReveal>

          <MotionReveal type="scale" delay={0.2} margin="-80px" className="relative">
            <ContentImage
              src={images.research}
              alt="Smartphone mostrando un dashboard de inversión con datos de portfolio y gráficos financieros"
              aspectRatio="4/3"
            />
          </MotionReveal>
        </div>
      </CaseStudySection>

      {/* Design Process — User Flow Diagram */}
      <CaseStudySection accent className="z-10">
        <MotionReveal margin="-80px" className="mb-ds-32 max-w-3xl">
          <TechnicalSheet
            subtitle="Proceso de Diseño"
            title="User flow"
            description="Si el 70% de los usuarios no entienden el riesgo, debe haber una explicación en los momentos del flujo que anteceden la decisión final de inversión."
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <UserFlowDiagram
          phases={[
            {
              name: 'Exploración',
              steps: [
                { line1: 'Identificación', line2: 'del producto' },
                {
                  line1: 'Monto',
                  line2: 'a invertir',
                  tooltip: {
                    title: 'Intención de inversión',
                    description: 'Oportunidad de mostrar\nproyección de pérdida y ganancia.',
                    position: 'bottom-right',
                  },
                },
              ],
            },
            {
              name: 'Compromiso',
              steps: [
                {
                  line1: 'Clarificación',
                  line2: 'del riesgo',
                  tooltip: {
                    title: 'Explicación clara',
                    description: 'Asegurar el consentimiento\ninformado del usuario.',
                    position: 'bottom-left',
                  },
                },
                { line1: 'Checkpoint', line2: 'de decisión' },
              ],
            },
            {
              name: 'Confirmación',
              steps: [
                { line1: 'Procesamiento' },
                { line1: 'Confirmación' },
              ],
            },
          ]}
        />
      </CaseStudySection>

      {/* The Solution */}
      <CaseStudySection>
        <MotionReveal margin="-80px" className="max-w-4xl mb-ds-64">
          <TechnicalSheet
            subtitle="La Solución"
            title="Hacer tangible el riesgo antes de invertir"
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        {/* 2-column grid: mockups row + text row, so TechnicalSheets align */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-ds-48 gap-y-ds-24">
          {/* Mockup 1 — Risk Simulation */}
          <MotionReveal margin="-80px" delay={0} className="flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto">
              <div className="flex items-center justify-center">
                <div style={{ maxWidth: '280px', width: '100%' }}>
                  <IPhoneMockup
                    frames={[<InvestmentSetupScreen key="investment-setup" />]}
                    scrollHint
                    interactiveHint
                  />
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Mockup 2 — Informed Consent */}
          <MotionReveal margin="-80px" delay={0.15} className="flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto">
              <div className="flex items-center justify-center">
                <div style={{ maxWidth: '280px', width: '100%' }}>
                  <IPhoneMockup
                    frames={[<RiskClarificationScreen key="risk-clarification" />]}
                  />
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Text 1 — Risk Simulation */}
          <MotionReveal margin="-80px" delay={0.1}>
            <div className="max-w-lg mx-auto">
              <TechnicalSheet
                size="section"
                subtitleVariant="label"
                subtitle="Intención de compra"
                title="Simulación de riesgo"
                description="El apalancamiento es visible desde la exploración del producto, pero es al momento de ingresar un monto donde la persona realmente dimensiona el riesgo. Aprovecho esa intención para desplegar un simulador que evalúa diferentes escenarios."
                hasBadges={false}
                showCta={false}
              />
            </div>
          </MotionReveal>

          {/* Text 2 — Informed Consent */}
          <MotionReveal margin="-80px" delay={0.2}>
            <div className="max-w-lg mx-auto">
              <TechnicalSheet
                size="section"
                subtitleVariant="label"
                subtitle="Consentimiento informado"
                title="Fricción intencionada para comunicar riesgos"
                description='Introduje un "speed bump" en la experiencia: si la persona quiere avanzar con su compra, siempre tendrá que pasar por esta pantalla, asegurando transparencia y comunicación clara del riesgo.'
                hasBadges={false}
                showCta={false}
              />
            </div>
          </MotionReveal>
        </div>
      </CaseStudySection>

      {/* Results & Impact */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="mb-ds-64">
          <TechnicalSheet
            align="centered"
            subtitle="Resultado"
            title="Prueba el prototipo completo"
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <MotionReveal margin="-80px">
          <div className="flex justify-center">
            <div ref={protoRef} style={{ width: '100%', maxWidth: '320px', position: 'relative' }}>
              <IPhoneMockup
                frames={[
                  <iframe
                    key={`invest-prototype-${iframeKey}`}
                    src="https://jasper-book-64276883.figma.site"
                    style={{
                      width: '390px',
                      height: '844px',
                      border: 'none',
                      transformOrigin: 'top left',
                      transform: 'scale(0.76)',
                      display: 'block',
                      flexShrink: 0,
                    }}
                    title="Flujo de inversión apalancada — prototipo completo"
                  />,
                ]}
                className="w-full"
              />

              {/* One-time "tap to interact" overlay */}
              <AnimatePresence>
                {protoHintVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={dismissProtoHint}
                    style={{
                      position: 'absolute',
                      top: '1.866%',
                      left: '3.590%',
                      width: '92.821%',
                      height: '96.269%',
                      borderRadius: '12.155% / 5.685%',
                      background: 'rgba(0, 0, 0, 0.45)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--ds-space-12)',
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <MousePointerClick
                        size={32}
                        strokeWidth={1.4}
                        style={{ color: 'var(--ds-text-inverse)', opacity: 0.9 }}
                      />
                    </motion.div>
                    <span
                      style={{
                        fontFamily: 'var(--ds-font-family, Inter, sans-serif)',
                        fontSize: '13px',
                        lineHeight: 1,
                        color: 'var(--ds-text-inverse)',
                        opacity: 0.9,
                        letterSpacing: '0.02em',
                        textAlign: 'center',
                      }}
                    >
                      Haz click para navegar
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </MotionReveal>

        <div className="flex justify-center mt-ds-32">
          <DesignButton
            variant="secondary"
            size="small"
            onClick={() => setIframeKey(k => k + 1)}
          >
            Reiniciar prototipo
          </DesignButton>
        </div>
      </CaseStudySection>

      {/* CTA Footer */}
      <CaseStudyFooter variant="inverse" />
    </div>
  );
}