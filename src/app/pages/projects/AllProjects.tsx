import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  DesignFilter,
  SectionHeader,
  ProjectCard,
  DesignButton,
  MotionReveal,
  DesignSection,
} from '../../components/ds';
import imgEtf from 'figma:asset/2fa6b41fc03580debb00a957f36a224c8a150867.png';
import imgAudio from 'figma:asset/444b5564c84e17f1679709b64f0b7425e204bda1.png';
import imgPlanificacion from 'figma:asset/1e693f471685629c8f28297b2a4132f27bb3383f.png';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  image: string;
  tags: string[];
  hasCaseStudy: boolean;
  slug?: string;
}

const allProjects: Project[] = [
  {
    id: 1,
    title: 'Flujo de inversión apalancada',
    category: 'Proyecto conceptual',
    description:
      'Proyecto conceptual en el que introduzco fricciones intencionales en el flujo de una inversión apalancada, con el objetivo de que la persona tome una decisión de inversión informada.',
    year: '2025',
    image: imgEtf,
    tags: ['Proyecto conceptual', 'UX / UI', 'Prototipado'],
    hasCaseStudy: true,
    slug: 'inversion-etf-apalancamiento',
  },
  {
    id: 2,
    title: 'Ajustes de Audio y Reproducción',
    category: 'Proyecto conceptual',
    description:
      'Exploración conceptual sobre cómo presentar controles complejos — toggles, sliders, selectores — de forma clara y escalable dentro de una pantalla de configuración móvil.',
    year: '2025',
    image: imgAudio,
    tags: ['UX / UI', 'Interaction Design', 'Design Systems'],
    hasCaseStudy: true,
    slug: 'ajustes-audio-reproduccion',
  },
  {
    id: 3,
    title: 'Rediseño de Planificación de envios',
    category: 'Mercado Libre',
    description:
      'Simplificamos la experiencia del front de Planificación de envíos de Full, desde el cual los vendedores definen el stock que van a enviar a las bodegas, según sus necesidades de reposición de stock.',
    year: '2025',
    image: imgPlanificacion,
    tags: ['UX / UI'],
    hasCaseStudy: true,
    slug: 'rediseno-planificacion-envios',
  },
  {
    id: 4,
    title: 'Digital Product Suite',
    category: 'Interface Design',
    description:
      'Created a cohesive design system and interface for a SaaS productivity platform used by thousands.',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1770048792381-55d47c183faa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MDMxOTEzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Design System', 'UI Design', 'Components'],
    hasCaseStudy: false,
  },
  {
    id: 5,
    title: 'Brand Evolution',
    category: 'Brand Identity',
    description:
      'Complete brand refresh for a tech startup, including logo design, visual identity, and brand guidelines.',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1728467459756-211f3c738697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwY29sb3JmdWx8ZW58MXx8fHwxNzcwMjg2MzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Branding', 'Visual Identity', 'Strategy'],
    hasCaseStudy: false,
  },
  {
    id: 6,
    title: 'HealthSync Dashboard',
    category: 'Product Design',
    description:
      'Designed a patient-facing health dashboard that simplifies complex medical data into actionable insights.',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwYXBwJTIwZGFzaGJvYXJkJTIwZGVzaWdufGVufDF8fHx8MTc3MDY2NTc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Healthcare', 'Dashboard', 'Data Viz'],
    hasCaseStudy: false,
  },
  {
    id: 7,
    title: 'Maison Commerce',
    category: 'E-Commerce',
    description:
      'A luxury fashion e-commerce experience blending editorial design with seamless shopping functionality.',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1564518160120-94178fcdf5d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBmYXNoaW9uJTIwd2Vic2l0ZSUyMG1pbmltYWx8ZW58MXx8fHwxNzcwNjY1NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['E-Commerce', 'UI Design', 'Motion'],
    hasCaseStudy: false,
  },
  {
    id: 8,
    title: 'NeoBank App',
    category: 'Fintech',
    description:
      'Reimagined the mobile banking experience for a digital-first bank targeting Gen Z and millennial users.',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1651130540293-20400280cb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwYmFua2luZyUyMGFwcCUyMG1vZGVybnxlbnwxfHx8fDE3NzA2NjU3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Fintech', 'Mobile', 'UX/UI'],
    hasCaseStudy: false,
  },
  {
    id: 9,
    title: 'Wanderlust Travel',
    category: 'Product Design',
    description:
      'End-to-end design of a travel booking platform that makes trip planning feel like an adventure, not a chore.',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1701686794404-3670ea43687e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBib29raW5nJTIwcGxhdGZvcm0lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcwNjY1NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Travel', 'Research', 'Prototyping'],
    hasCaseStudy: false,
  },
  {
    id: 10,
    title: 'Wavelength Audio',
    category: 'Interface Design',
    description:
      'Crafted a dark-themed music streaming interface with a focus on immersive listening and discovery.',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZyUyMGFwcCUyMGRhcmslMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcwNjY1NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Music', 'Dark UI', 'Motion'],
    hasCaseStudy: false,
  },
  {
    id: 11,
    title: 'HomeOS Smart Living',
    category: 'IoT Design',
    description:
      'Designed an intuitive smart home control dashboard that unifies devices from multiple ecosystems.',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1623113879540-476117b4be1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9uJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MDY0Njk2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['IoT', 'Dashboard', 'Smart Home'],
    hasCaseStudy: false,
  },
];

const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.category)))];

export function AllProjects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-background text-ds-text-primary">
      {/* ── Main content — projectGrid layout from Figma ──────────── */}
      <div className="pt-32 md:pt-40 pb-ds-48 px-ds-24 lg:px-ds-48">
        <div className="max-w-7xl mx-auto flex flex-col gap-ds-32">
          {/* SectionHeader — Subtitle + Title + Description */}
          <MotionReveal trigger="mount">
            <SectionHeader
              subtitle="Archive"
              title="Todos los proyectos"
              description="A comprehensive collection of my design work spanning product design, branding, interfaces, and beyond."
            />
          </MotionReveal>

          {/* Filter row — flex gap-ds-24 matching Figma Frame */}
          <MotionReveal trigger="mount" delay={0.2} className="flex flex-wrap gap-ds-12 items-start w-full">
            {categories.map((cat) => (
              <DesignFilter
                key={cat}
                selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </DesignFilter>
            ))}
          </MotionReveal>

          {/* ProjectsStack — 2-col grid matching Figma gap-x-32 gap-y-ds-48 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-ds-32 gap-y-ds-48 w-full">
            {filtered.map((project, index) => (
              <MotionReveal
                key={project.id}
                trigger="mount"
                delay={index * 0.06}
                duration={0.5}
                className={project.hasCaseStudy ? 'cursor-pointer' : undefined}
              >
                <div
                  onClick={
                    project.hasCaseStudy && project.slug
                      ? () => navigate(`/projects/${project.slug}?from=allProjects`)
                      : undefined
                  }
                >
                  <ProjectCard
                    layout="top"
                    sheetSize="small"
                    subtitle={project.category}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    alt={project.title}
                    tags={project.tags}
                    {...(project.id === 1 && { zoom: 1.15 })}
                    {...(project.id === 3 && { zoom: 1, imageClassName: 'h-[76.04%] left-[1.76%] max-w-none top-[12.03%] w-[96.42%]' })}
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <MotionReveal trigger="mount" type="fade" className="text-center py-ds-96 px-ds-24 lg:px-ds-48">
          <p className="ds-text-body-default text-ds-text-secondary">
            No projects found in this category.
          </p>
        </MotionReveal>
      )}

      {/* Footer */}
      <section className="px-ds-24 lg:px-ds-48 pb-ds-48">
        <div className="max-w-7xl mx-auto">
          <DesignSection variant="pageFooter">
            <p className="ds-text-label-sm text-ds-text-tertiary">
              {allProjects.length} projects &middot; Updated 2025
            </p>
            <DesignButton variant="secondary" icon iconDirection="left" onClick={() => navigate('/')}>
              Volver a Home
            </DesignButton>
          </DesignSection>
        </div>
      </section>
    </div>
  );
}