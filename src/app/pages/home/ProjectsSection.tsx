import { useNavigate } from 'react-router';
import { DesignSection, SectionHeader } from '../../components/ds/design-section';
import { ProjectCard } from '../../components/ds/project-card';
import { DesignButton } from '../../components/ds/design-button';
import { MotionReveal } from '../../components/ds/motion-reveal';
import { caseStudies } from '../case-study/case-studies.config';

const imgImage = '/images/cover-etf.png';
const imgImage1 = '/images/cover-audio.png';
const imgImage2 = '/images/cover-planificacion.png';

interface ProjectData {
  id: number;
  layout: 'left' | 'right';
  subtitle: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  slug?: string;
  /** Whether to show the CTA link. Defaults to true; set false when no route exists yet. */
  showCta?: boolean;
  /** Base zoom level forwarded to ProjectThumbnail. Omit to use the component default (1). */
  zoom?: number;
}

const projects: ProjectData[] = [
  {
    id: 1,
    layout: 'left',
    subtitle: 'Proyecto conceptual',
    title: caseStudies[0].title,
    description:
      'Proyecto conceptual en el que introduzco fricciones intencionales en el flujo de una inversión apalancada, con el objetivo de que la persona tome una decisión de inversión informada.',
    image: imgImage,
    alt: 'Pantallas del flujo de inversión apalancada mostrando las fricciones intencionales de la interfaz',
    tags: ['Proyecto conceptual', 'UX / UI', 'Prototipado'],
    slug: caseStudies[0].slug,
    zoom: 1.15,
  },
  {
    id: 2,
    layout: 'right',
    subtitle: 'Proyecto conceptual',
    title: caseStudies[1].title,
    description:
      'Exploración conceptual sobre cómo presentar controles complejos — toggles, sliders, selectores — de forma clara y escalable dentro de una pantalla de configuración móvil.',
    image: imgImage1,
    alt: 'Pantalla de configuración de reproducción y audio con controles de toggle y slider',
    tags: ['UX / UI', 'Interaction Design', 'Design Systems'],
    slug: caseStudies[1].slug,
  },
  {
    id: 3,
    layout: 'left',
    subtitle: 'Mercado Libre',
    title: caseStudies[2].title,
    description:
      'Simplificamos la experiencia del front de Planificación de envíos de Full, desde el cual los vendedores definen el stock que van a enviar a las bodegas, según sus necesidades de reposición de stock.',
    image: imgImage2,
    alt: 'Interfaz de planificación de envíos de Mercado Libre Full con el flujo rediseñado',
    tags: ['UX / UI'],
    slug: caseStudies[2].slug,
    showCta: true,
    zoom: 0.9,
  },
];

export function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="relative bg-ds-surface-background">
      <div className="relative max-w-(--ds-max-w-content) mx-auto px-ds-24 lg:px-ds-48">
        <DesignSection variant="projects" className="relative">
          {/* Section Header */}
          <MotionReveal className="relative w-full">
            <SectionHeader
              subtitle="Selección de proyectos"
              title="Proyectos Recientes"
            />
          </MotionReveal>

          {/* Projects Stack */}
          <div className="relative flex flex-col gap-ds-102 items-start w-full">
            {projects.map((project, index) => (
              <MotionReveal
                key={project.id}
                as="article"
                delay={index * 0.1}
                duration={0.8}
                className="relative group w-full"
              >
                <ProjectCard
                  layout={project.layout}
                  imageVariant="thumbnail"
                  image={project.image}
                  zoom={project.zoom}
                  subtitle={project.subtitle}
                  title={project.title}
                  description={project.description}
                  alt={project.alt}
                  tags={project.tags}
                  showCta={project.showCta ?? true}
                  ctaLabel="Ver Proyecto"
                  onCtaClick={project.slug ? () => navigate(`/projects/${project.slug}`, { state: { from: 'home' } }) : undefined}
                />
              </MotionReveal>
            ))}
          </div>

          {/* View All Button */}
          <MotionReveal className="relative">
            <DesignButton
              variant="secondary"
              size="default"
              onClick={() => navigate('/projects')}
            >
              Ver Todos
            </DesignButton>
          </MotionReveal>
        </DesignSection>
      </div>
    </section>
  );
}