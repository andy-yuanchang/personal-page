import { Redirect } from 'react-router-dom';
import App from './App';

const routes = [
  {
    path: '/',
    component: App,
    breadcrumbName: 'home',
    routes: [
      // {
      //   path: '/settings',
      //   component: Setting,
      //   breadcrumbName: 'settings'
      // },
      // {
      //   path: '*',
      //   render: () => {
      //     return <Redirect to="/"></Redirect>
      //   }
      // }
    ],
  },
];

export default routes;
