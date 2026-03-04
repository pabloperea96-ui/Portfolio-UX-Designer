import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/home/HomePage';
import { AllProjectsPage } from './pages/projects/AllProjectsPage';
import { CaseStudyPage } from './pages/case-study/CaseStudyPage';
import { NotFoundPage } from './pages/NotFoundPage';

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