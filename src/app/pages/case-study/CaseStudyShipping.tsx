import { useEffect } from 'react';
import imgScreen1 from 'figma:asset/ca5170c18565e337e60d3ec9c108fccc31a52c28.png';
import imgScreen2 from 'figma:asset/e547cef89914ad5403e282125f4a9c29fbc44d04.png';
import imgScreen3 from 'figma:asset/d59797df74111f88718f41de062a18e1589805ea.png';
import {
  ParallaxHero,
  CaseStudySection,
  ProjectOverview,
  TechnicalSheet,
  MotionReveal,
  ContentImage,
  ProjectCard,
  BulletList,
  ProcessGrid,
  ResultGrid,
  QuoteBlock,
  CaseStudyFooter,
  DesignLabel,
} from '../../components/ds';

const heroImage =
  'https://images.unsplash.com/photo-1768796372610-f844d490a734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBmdWxmaWxsbWVudCUyMGNlbnRlciUyMGxvZ2lzdGljcyUyMHNoaXBwaW5nJTIwYm94ZXN8ZW58MXx8fHwxNzcxODYyOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080';

const images = {
  process:
    'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwVVglMjB3aXJlZnJhbWUlMjBzdGlja3klMjBub3RlcyUyMHByb2Nlc3N8ZW58MXx8fHwxNzcxODYyOTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  before:
    'https://images.unsplash.com/photo-1726653024714-42857c1b4906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kJTIwaG9sZGluZyUyMHBob25lJTIwY3J5cHRvY3VycmVuY3klMjB0cmFkaW5nJTIwZ3JlZW4lMjByZWQlMjBkYXRhfGVufDF8fHx8MTc3MTg2NTc2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

const projectMeta = [
  { label: 'Empresa', value: 'Mercado Libre' },
  { label: 'Rol', value: 'Product Designer' },
  { label: 'Duración', value: '8 semanas' },
  { label: 'Plataforma', value: 'Web · Sellers de Full' },
  { label: 'Alcance', value: 'UX Research, UX, UI' },
];

const tools = ['Figma', 'Miro', 'Notion', 'Amplitude'];

const results = [
  { metric: '91K', description: 'Sellers de Full impactados con el nuevo flujo' },
  { metric: '−3', description: 'Acciones eliminadas del proceso de planificación' },
  { metric: '3', description: 'Categorías de prioridad que guían el plan automáticamente' },
  { metric: '35+', description: 'Productos urgentes surfaceados por plan de envío' },
];

const processSteps = [
  {
    number: '01',
    title: 'Auditar',
    description:
      'Analizamos sesiones reales de vendedores en Amplitude para identificar los puntos de abandono y fricción más frecuentes: la búsqueda manual de productos urgentes, el cálculo mental de cantidades y la gestión de errores mezclados con oportunidades sin ningún tipo de jerarquía.',
  },
  {
    number: '02',
    title: 'Priorizar',
    description:
      'Con los hallazgos de investigación definimos la jerarquía de información correcta. El principio fue claro: urgencias primero, recomendaciones en contexto, y una acción clara por producto. Todo lo que no contribuyera a ese objetivo fue eliminado del flujo.',
  },
  {
    number: '03',
    title: 'Diseñar',
    description:
      'Iteramos sobre múltiples enfoques para el panel de resumen y la tabla de productos. Cada propuesta se validó contra flujos de tareas reales de vendedores, midiendo el número de decisiones conscientes por sesión como indicador principal de éxito.',
  },
  {
    number: '04',
    title: 'Validar',
    description:
      'Realizamos pruebas de usabilidad con vendedores de Full activos, midiendo tiempo de completación del plan y tasa de errores. Los resultados confirmaron que la nueva estructura reducía significativamente la carga cognitiva en cada sesión de planificación.',
  },
];

export function CaseStudyShipping() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-ds-text-primary">
      {/* ── Hero ── */}
      <ParallaxHero image={heroImage} alt="Bodega de fulfillment con cajas y estantes de inventario">
        <div className="flex flex-wrap items-center gap-ds-12 mb-ds-24">
          <DesignLabel>Mercado Libre</DesignLabel>
          <DesignLabel>Full · Sellers</DesignLabel>
        </div>
        <h1 className="ds-text-heading-hero max-w-4xl">
          Rediseño de{' '}
          <em>Planificación{' '}
          de envíos</em>
        </h1>
      </ParallaxHero>

      {/* ── Project Overview ── */}
      <CaseStudySection>
        <ProjectOverview
          title="Transformé la herramienta de planificación de stock más crítica para los sellers de Full: de una tabla plana sin jerarquía a un flujo guiado, inteligente y prioritizado."
          description="Full es el servicio de fulfillment de Mercado Libre: los vendedores envían su inventario a las bodegas de ML y ML gestiona el almacenamiento, empaque y entrega. La planificación de envíos era el punto de entrada para este proceso — y también el más problemático. Los vendedores veían una lista plana, tenían que analizar múltiples columnas simultáneamente para cada decisión, y el sistema no distinguía entre urgencias, oportunidades y problemas. El resultado: sesiones largas, decisiones lentas y planes incompletos."
          meta={projectMeta}
          tags={{ values: tools }}
        />
      </CaseStudySection>

      {/* ── El Problema — Before state ── */}
      <CaseStudySection accent>
        <div className="relative grid lg:grid-cols-2 gap-ds-64 items-center">
          <MotionReveal margin="-80px">
            <TechnicalSheet
              subtitle="El Problema"
              title={<>Múltiples acciones,<br />cero <span className="italic">prioridad</span></>}
              description={
                <div className="space-y-ds-16">
                  <p>
                    Los sellers de Full necesitaban planificar sus envíos semanales desde una
                    herramienta que mostraba todos los productos con la misma jerarquía visual:
                    sin distinción entre lo urgente, lo problemático y lo opcional.
                  </p>
                  <p>
                    Para completar un plan, un vendedor tenía que: filtrar manualmente los
                    productos agotados, calcular cuántas unidades enviar según su stock actual,
                    detectar cuáles tenían problemas de envío, y decidir si activar nuevos
                    productos en Full — todo en la misma sesión, sin ningún soporte inteligente.
                  </p>
                </div>
              }
              hasBadges={false}
              showCta={false}
            />

            <div className="grid grid-cols-2 gap-ds-24 mt-ds-32">
              {[
                { stat: '6+', label: 'Columnas que analizar por producto' },
                { stat: '0', label: 'Indicadores de urgencia en la interfaz original' },
                { stat: '91K', label: 'Sellers de Full afectados' },
                { stat: '↑', label: 'Tasa de abandono en el flujo de planificación' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-ds-4">
                  <p className="ds-text-heading-section text-ds-action-primary leading-none">
                    {item.stat}
                  </p>
                  <p className="ds-text-body-default text-ds-text-secondary">{item.label}</p>
                </div>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal type="scale" delay={0.2} margin="-80px">
            <ContentImage
              src={images.before}
              alt="Manos sosteniendo un smartphone con una app de trading e inversión mostrando datos complejos"
              aspectRatio="4/3"
            />
          </MotionReveal>
        </div>
      </CaseStudySection>

      {/* ── Proceso de Diseño ── */}
      <CaseStudySection>
        <ProcessGrid
          eyebrow="Proceso de Diseño"
          heading={<>De la fricción a la <span className="italic">claridad</span></>}
          steps={processSteps}
          wireframeImage={{
            src: images.process,
            alt: 'Post-its y wireframes del proceso de diseño de la planificación de envíos',
            caption: 'Sesiones de síntesis donde mapeamos los flujos de tareas reales de los sellers y definimos la jerarquía de información para el nuevo diseño',
          }}
        />
      </CaseStudySection>

      {/* ── La Solución — 3 editorial blocks ── */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="max-w-4xl mb-ds-64">
          <TechnicalSheet
            subtitle="La Solución"
            title={<>Priorizar, recomendar,<br /><span className="italic">simplificar</span></>}
            description="En lugar de reemplazar la tabla, rediseñamos la experiencia completa: surfaceamos las urgencias antes de que el vendedor vea la lista, agregamos recomendaciones automáticas de cantidades, y asignamos una acción clara a cada producto. El vendedor llega al plan y ya sabe qué hacer."
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        {/* Block 1 — Urgencias al frente */}
        <ProjectCard
          layout="left"
          imageVariant="editorial"
          image={imgScreen1}
          alt="Panel de resumen mostrando 35 productos urgentes, 4 con problemas y 18 ideales para Full"
          imageAspectRatio="16/9"
          subtitleVariant="label"
          sheetSize="section"
          subtitle="01 — Urgencias al frente"
          title="Lo crítico primero: visibilidad en 3 segundos"
          description="Introdujimos un panel de resumen que surfacea las tres categorías de acción antes de que el vendedor toque la tabla: productos urgentes para reponer, productos con problemas de envío, y productos ideales para expandirse en Full. El vendedor llega y en segundos sabe exactamente qué priorizar — sin explorar, sin filtrar."
          showCta={false}
          scrollReveal
          spaced
        >
          <BulletList
            items={[
              '3 tarjetas de resumen al tope del plan: urgente, problema, oportunidad',
              'Cada tarjeta muestra la cantidad de productos y una descripción de acción',
              'Click en una tarjeta filtra la tabla automáticamente a esa categoría',
              'Los productos urgentes reciben un tag naranja visible en la fila',
            ]}
          />
        </ProjectCard>

        {/* Block 2 — Recomendaciones inteligentes */}
        <ProjectCard
          layout="right"
          imageVariant="editorial"
          image={imgScreen2}
          alt="Tabla de productos con cantidades sugeridas automáticamente y estrella de favorito"
          imageAspectRatio="16/9"
          subtitleVariant="label"
          sheetSize="section"
          subtitle="02 — Recomendaciones automáticas"
          title="Cantidades sugeridas, decisiones claras"
          description="Cada producto ahora muestra una recomendación de unidades calculada en base a su velocidad de ventas, cobertura de días y stock disponible en bodega. El vendedor ya no hace cálculos mentales — confirma la sugerencia, la ajusta, o la descarta. El tiempo de decisión por producto bajó de minutos a segundos."
          showCta={false}
          scrollReveal
          spaced
        >
          <BulletList
            items={[
              'Unidades sugeridas calculadas automáticamente por producto',
              'Información contextual: ventas últimos 30 días y stock en camino',
              'Columna de tiempo hasta agotar stock con código de color (urgente vs. seguro)',
              'Favoritos (estrella) para marcar productos de alta prioridad propia del vendedor',
            ]}
          />
        </ProjectCard>

        {/* Block 3 — Acción clara por fila */}
        <ProjectCard
          layout="left"
          imageVariant="editorial"
          image={imgScreen3}
          alt="Tabla rediseñada con acciones sugeridas claras por producto y flujo de confirmación unificado"
          imageAspectRatio="16/9"
          subtitleVariant="label"
          sheetSize="section"
          subtitle="03 — Acción, no exploración"
          title="Un flujo que guía, no que paraliza"
          description="Rediseñamos la tabla para que cada fila tenga una acción sugerida clara: enviar ahora, resolver el problema, o activar en Full. El vendedor puede completar su plan en una sola pasada por la lista, sin abrir vistas de detalle para cada producto. La interfaz guía, no presenta opciones."
          showCta={false}
          scrollReveal
        >
          <BulletList
            items={[
              'Columna "Acción sugerida" con etiqueta específica por contexto de producto',
              'Campo de unidades a enviar editable directamente en la fila',
              'Validación en tiempo real: alerta si el número excede el stock disponible',
              'Confirmación del plan en un solo paso al finalizar la revisión',
            ]}
          />
        </ProjectCard>
      </CaseStudySection>

      {/* ── Resultados — Dark metric cards (the "black cards") ── */}
      <CaseStudySection>
        <ResultGrid
          eyebrow="Impacto"
          heading={<>Un plan completo, en <span className="italic">una sola pasada</span></>}
          results={results}
        />
      </CaseStudySection>

      {/* ── Aprendizajes clave ── */}
      <CaseStudySection>
        <MotionReveal margin="-80px" className="mb-ds-48">
          <TechnicalSheet
            subtitle="Reflexión"
            title={<>Aprendizajes <span className="italic">clave</span></>}
            hasBadges={false}
            showCta={false}
          />
        </MotionReveal>

        <div className="relative grid md:grid-cols-3 gap-ds-32">
          {[
            {
              title: 'La priorización es diseño',
              description:
                'No era que los vendedores no supieran qué hacer — era que el sistema los obligaba a descubrirlo solos cada vez. Exponer la jerarquía correcta directamente en la interfaz es tan importante como diseñar los controles que la acompañan.',
            },
            {
              title: 'Menos columnas, más decisión',
              description:
                'La versión original tenía más información visible — pero más información no es más poder. Reducir el número de columnas y añadir contexto inteligente por producto convirtió una tarea de análisis en una tarea de confirmación.',
            },
            {
              title: 'El dato sin contexto es ruido',
              description:
                'Mostrar "0 unidades en bodega" es menos útil que decir "urgente para reponer". El mismo dato, reencuadrado con una etiqueta de acción, le devuelve al vendedor el control inmediato de su situación.',
            },
          ].map((learning, index) => (
            <MotionReveal
              key={learning.title}
              delay={index * 0.15}
              duration={0.6}
              className="space-y-ds-16"
            >
              <h3 className="ds-text-heading-compact">{learning.title}</h3>
              <p className="ds-text-body-default text-ds-text-secondary">{learning.description}</p>
            </MotionReveal>
          ))}
        </div>
      </CaseStudySection>

      {/* ── Quote ── */}
      <CaseStudySection accent>
        <MotionReveal margin="-80px" className="max-w-4xl mx-auto">
          <QuoteBlock
            quote="Diseñar para vendedores significa diseñar bajo presión: cada minuto perdido en la planificación es stock que no llega y ventas que no se concretan. La interfaz debe quitarse del camino y dejar que el vendedor decida — no que explore."
            author="Pablo Perea Bohorquez"
            subtitle="Reflexi��n del proyecto"
          />
        </MotionReveal>
      </CaseStudySection>

      {/* ── Footer ── */}
      <CaseStudyFooter variant="inverse" />
    </div>
  );
}