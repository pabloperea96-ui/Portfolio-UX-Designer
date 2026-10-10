import { useParams } from 'react-router';
import { getCaseStudyBySlug } from './case-studies.config';
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
  const entry = getCaseStudyBySlug(slug);

  if (!entry) {
    return <NotFoundPage />;
  }

  const Component = entry.component;
  return <Component />;
}
