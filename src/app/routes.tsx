import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';

const HomePage = lazy(() => import('./pages/home/HomePage').then((m) => ({ default: m.HomePage })));
const AllProjectsPage = lazy(() =>
  import('./pages/projects/AllProjectsPage').then((m) => ({ default: m.AllProjectsPage })),
);
const CaseStudyPage = lazy(() =>
  import('./pages/case-study/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })),
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'projects', Component: AllProjectsPage },
      { path: 'projects/:slug', Component: CaseStudyPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);