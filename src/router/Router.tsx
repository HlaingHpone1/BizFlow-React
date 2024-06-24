import { userStore } from '../store/userStore'

import LogIn from '../pages/auth/LogIn';
import Register from '../pages/auth/Register';
import NotFound from '../pages/auth/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Network from '../pages/Network';


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

  ];

  const routeList = [
    {
      path: "/",
      element: Home,
      children: [
        {
          path: "network",
          element: Network,
          role: ["Admin", "User",]
        }
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
                    route.children?.map((subRoute, i) => (
                      userData && subRoute.role.includes(userData.role) ? (
                        <Route key={i} path={subRoute?.path} element={<subRoute.element />} />
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
