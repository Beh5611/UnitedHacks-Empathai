import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const ChatBot = Loadable(lazy(() => import('pages/Chat')));
const Meditate = Loadable(lazy(() => import('pages/Meditation')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'chat',
      element: <ChatBot />
    },
    {
      path: 'meditate',
      element: <Meditate />
    }
  ]
};

export default MainRoutes;
