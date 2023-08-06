import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Cookies from 'js-cookie';
import Logout from 'pages/authentication/Logout';
// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// ==============================|| AUTH ROUTING ||============================== //

const authRedirect = () => {
  console.log("cookies", Cookies.get("cookies"))
  if (Cookies.get("cookies")) {
    console.log("aids");
    return redirect("/profile");
  }
  return null;
};

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />,
      loader: () => {
        const auth = authRedirect();
        if (auth) {
          return auth;
        }
        return null;
      },

    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'logout',
      element: <Logout />
    }
  ]
};

export default LoginRoutes;
