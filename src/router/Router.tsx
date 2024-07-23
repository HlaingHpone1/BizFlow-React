import { userStore } from '../store/userStore'

import LogIn from '../pages/auth/LogIn';
import Register from '../pages/auth/Register';
import NotFound from '../pages/auth/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Network from '../pages/Network';
import MainLayout from '../layouts/MainLayout';
import ForgotPasswordWithOTP from '../pages/auth/ForgotPasswordWithOTP';
import Settings from '../pages/Settings';
import Support from '../pages/Support';
import Security from '../pages/Security';
import Theme from '../pages/Theme';
import SettingLayout from '../layouts/SettingLayout';
import ResetPasswordWithOldPassword from '../pages/auth/ResetPasswordWithOldPassword';
import PersonalInfo from '../pages/PersonalInfo';


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
          element: SettingLayout,
          role: ["Admin", "User",],
          children: [
            {
              path: "/settings",
              element: Settings,
              role: ["Admin", "User",]
            },
            {
              path: "/settings/personal-info",
              element: PersonalInfo,
              role: ["Admin", "User",]
            },
            {
              path: "/settings/theme",
              element: Theme,
              role: ["Admin", "User",]
            },
            {
              path: "/settings/security",
              element: Security,
              role: ["Admin", "User",]
            },
            {
              path: "/settings/security/change-password",
              element: ResetPasswordWithOldPassword,
              role: ["Admin", "User",]
            },
            {
              path: "/settings/support",
              element: Support,
              role: ["Admin", "User",]
            },
          ]
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
                        <Route key={j} path={subRoute?.path} element={<subRoute.element />} >
                          {
                            subRoute.children?.map((childRoute, k) => (
                              userData && childRoute.role.includes(userData.role) ? (
                                <Route key={k} path={childRoute?.path} element={<childRoute.element />} />
                              ) : null
                            ))
                          }
                        </Route>
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
