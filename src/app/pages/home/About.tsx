import { type ReactNode } from 'react';
import { DesignIcon } from '../../components/ds/design-icon';
import { DesignCard } from '../../components/ds/design-card';
import { SectionHeader } from '../../components/ds/design-section';
import { MotionReveal } from '../../components/ds/motion-reveal';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '3+ Años', label: 'Trabajando en UX' },
  { value: '6+ Años', label: 'Experiencia en escritura' },
];

const skills: { icon: ReactNode; title: string; items: string[] }[] = [
  {
    icon: <DesignIcon name="palette" size={24} />,
    title: 'Diseño',
    items: ['UX | UI Design', 'UX Writing', 'Design Systems', 'Prototyping'],
  },
  {
    icon: <DesignIcon name="zap" size={24} />,
    title: 'Herramientas',
    items: ['Figma', 'Cursor', 'Generative AI', 'Adobe Suite'],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className="relative py-ds-96">
      <div className="relative max-w-(--ds-max-w-content) mx-auto px-ds-24 lg:px-ds-48">

        {/* Section Header */}
        <MotionReveal className="mb-ds-48">
          <SectionHeader
            subtitle="Conóceme"
            title="De escribir experiencias a diseñarlas"
          />
        </MotionReveal>

        {/* Subsection: Bio + Grid */}
        <div className="relative flex flex-col lg:flex-row gap-ds-48 items-start">

          {/* Left — Bio text + CTA */}
          <MotionReveal className="flex-1 flex flex-col gap-ds-32 items-start min-w-0">

            <div className="ds-text-body-default text-ds-text-secondary w-full flex flex-col gap-ds-8">
              <p>
                Diseño features y experiencias digitales end-to-end, enfocadas en resolver
                problemas reales con soluciones simples, consistentes y escalables.
              </p>
              <p>
                Mi camino empezó en la lectura y la escritura. Estudié psicología y literatura, fui
                investigador académico, profesor universitario y copywriter antes de trabajar
                como UX Writer en Mercado Libre. Esa base me dio una forma particular de
                pensar el lenguaje, la claridad y la toma de decisiones dentro de un producto.
              </p>
              <p>
                Hoy me dedico a construir experiencias con una mirada integral de UX y
                producto, combinando interacción, sistemas y contenido. Me interesa
                especialmente cómo una mentalidad AI-first puede mejorar la claridad, la
                eficiencia y la producción de experiencias digitales de calidad.
              </p>
            </div>

          </MotionReveal>

          {/* Right — 2×2 Grid */}
          <div className="flex-1 min-w-0 w-full">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-ds-24">

              {/* Row 1 — Metric cards */}
              {stats.map((stat, index) => (
                <MotionReveal
                  key={stat.label}
                  type="scale"
                  delay={index * 0.1}
                >
                  <DesignCard
                    variant="metric"
                    value={stat.value}
                    label={stat.label}
                  />
                </MotionReveal>
              ))}

              {/* Row 2 — Skill cards */}
              {skills.map((skill, index) => (
                <MotionReveal
                  key={skill.title}
                  type="scale"
                  delay={0.2 + index * 0.1}
                >
                  <DesignCard
                    variant="skill"
                    icon={skill.icon}
                    title={skill.title}
                    items={skill.items}
                  />
                </MotionReveal>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}