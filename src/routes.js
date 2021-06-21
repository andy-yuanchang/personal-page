import React, { Suspense, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import App from './App';

// import PersonalInfo from './PersonaInfo';

const Portfolio = React.lazy(() => import('./Portfolio'));
const PersonalInfo = React.lazy(() => import('./PersonaInfo'));

const routes = [
  {
    path: '/',
    component: App,
    breadcrumbName: 'home',
    routes: [
      {
        path: '/portfolio',
        component: Portfolio,
        breadcrumbName: 'portfolio',
      },
      {
        path: '/personalInfo',
        component: PersonalInfo,
        breadcrumbName: 'personalInfo',
      },
      {
        path: '*',
        render: () => <Redirect to="/personalInfo" />,
      },
    ],
  },
];

export default routes;
