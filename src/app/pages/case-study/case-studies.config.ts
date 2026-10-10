import type { ComponentType } from 'react';
import { CaseStudyInvest } from './CaseStudyInvest';
import { CaseStudyAudio } from './CaseStudyAudio';
import { CaseStudyShipping } from './CaseStudyShipping';

export interface CaseStudyEntry {
  slug: string;
  title: string;
  component: ComponentType;
}

export const caseStudies: CaseStudyEntry[] = [
  {
    slug: 'inversion-etf-apalancamiento',
    title: 'Flujo de inversión apalancada',
    component: CaseStudyInvest,
  },
  {
    slug: 'ajustes-audio-reproduccion',
    title: 'Ajustes de Audio y Reproducción',
    component: CaseStudyAudio,
  },
  {
    slug: 'rediseno-planificacion-envios',
    title: 'Rediseño de Planificación de envíos',
    component: CaseStudyShipping,
  },
];

export const CASE_STUDY_TITLES: Record<string, string> = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c.title]),
);

export function getCaseStudyBySlug(
  slug: string | undefined,
): { title: string; component: ComponentType } | null {
  if (!slug) return null;
  const entry = caseStudies.find((c) => c.slug === slug);
  return entry ? { title: entry.title, component: entry.component } : null;
}
