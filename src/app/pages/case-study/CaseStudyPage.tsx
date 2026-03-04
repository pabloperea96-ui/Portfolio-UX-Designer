import { useParams } from 'react-router';
import { CaseStudyInvest } from './CaseStudyInvest';
import { CaseStudyAudio } from './CaseStudyAudio';
import { CaseStudyShipping } from './CaseStudyShipping';
import { NotFoundPage } from '../NotFoundPage';

/**
 * Dynamic page wrapper that reads the :slug param
 * and renders the matching case study component.
 *
 * Breadcrumb navigation is handled by the global Navigation bar
 * (which reads the slug and ?from=allProjects search param directly),
 * so case study components no longer need navigation-related props.
 */
export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();

  switch (slug) {
    case 'inversion-etf-apalancamiento':
      return <CaseStudyInvest />;
    case 'ajustes-audio-reproduccion':
      return <CaseStudyAudio />;
    case 'rediseno-planificacion-envios':
      return <CaseStudyShipping />;
    default:
      return <NotFoundPage />;
  }
}