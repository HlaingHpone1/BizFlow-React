import { userStore } from '../store/userStore'

import LogIn from '../pages/auth/LogIn';
import Register from '../pages/auth/Register';
import NotFound from '../pages/auth/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Network from '../pages/Network';
import MainLayout from '../layouts/MainLayout';
import ForgotPasswordWithOTP from '../pages/auth/ForgotPasswordWithOTP';


const Router = () => {
  const { userData, logInUser } = userStore();

  const authRouteList = [
    {
      path: "/login",
      element: LogIn
    },
    {
      path: "/register",
      element: Register
    },
    {
      path: "/forgot-password",
      element: ForgotPasswordWithOTP,
    }

  ];

  const routeList = [
    {
      path: "/",
      element: MainLayout,
      children: [
        {
          path: "/",
          element: Home,
          role: ["Admin", "User",]
        },
        {
          path: "/network",
          element: Network,
          role: ["Admin", "User",]
        },
        {
          path: "/message",
          element: Network,
          role: ["Admin", "User",]
        },
        {
          path: "/notification",
          element: Network,
          role: ["Admin", "User",]
        },
        {
          path: "/job",
          element: Network,
          role: ["Admin", "User",]
        },
        {
          path: "/profile",
          element: Network,
          role: ["Admin", "User",]
        },
        {
          path: "/settings",
          element: Network,
          role: ["Admin", "User",]
        },
      ]
    },
    {
      name: "Not Found",
      path: "*",
      element: NotFound
    },
  ];

  return (
    <>
      {
        logInUser ? (
          <Routes>
            {
              routeList.map((route, i) => (
                <Route key={i} path={route.path} element={<route.element />} >
                  {
                    route.children?.map((subRoute, j) => (
                      userData && subRoute.role.includes(userData.role) ? (
                        <Route key={j} path={subRoute?.path} element={<subRoute.element />} />
                      ) : null
                    ))
                  }
                </Route>
              ))
            }
          </Routes>

        ) : (
          <Routes>
            {
              authRouteList.map((route, i) => (
                <Route key={i} path={route.path} element={<route.element />} />
              ))
            }
            <Route path='*' element={<Navigate to="/login" replace />} />
          </Routes>
        )
      }
    </>
  )
}

export default Router
