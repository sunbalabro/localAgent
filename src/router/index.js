import { Outlet, useRoutes } from "react-router-dom";
import { LoginPage } from "../screens/auth/Login";
import NonRequireAuth from "../screens/auth/NonRequireAuth";
import { SignUpPage } from "../screens/auth/Signup";
import { HomeScreen } from "../screens/home";
import { AuthLayout } from "../common/authLayout";
import { AppLayout } from "../common/layout";
import { LocalAgentSignUp } from "../screens/auth/Signup/components/LocalAgentSignup";
import { ClientSignup } from "../screens/auth/Signup/components/ClientSignup";
import { VerificationCompleted } from "../screens/auth/VerificationCompleted";
import { Profile } from "../screens/auth/Profile";
import RequireAuth from "../screens/auth/RequireAuth";
import { Verify } from "../screens/auth/Signup/components/Verify";

const Routes = () => {
    const routes = [
      // {
      //   path: "/",
      //   element: <AppLayout children={<Outlet />} />,
      //   children: [{ index: true, element: <HomeScreen /> }],
      // },
      {
        path: "/",
        element: <AuthLayout children={<Outlet />} />,
        children: [
          {
            index: true,
            element: (
              <NonRequireAuth>
                <LoginPage />
              </NonRequireAuth>
            ),
          },
        ],
      },
      {
        path: "/signup",
        element: <AuthLayout children={<Outlet />} />,
        children: [
          {
            index: true,
            element: (
              <NonRequireAuth>
                <SignUpPage />
              </NonRequireAuth>
            ),
          },
        ],
      },
      {
        path: "/signup/localagent",
        element: <AuthLayout children={<Outlet />} />,
        children: [
          {
            index: true,
            element: (
            <NonRequireAuth>
                 <LocalAgentSignUp />
            </NonRequireAuth>
            )
          }
        ]
      },
      {
        path: "/signup/client",
        element: <AuthLayout children={<Outlet />} />,
        children: [
          {
            index: true,
            element: (
              <NonRequireAuth>
                  <ClientSignup />
              </NonRequireAuth>
            )
          }
        ]
      },
      {
        path: '/verification/:id',
        element: <AuthLayout children={<Outlet />} />,
        children: [
          {
            index: true,
            element: (
              <NonRequireAuth>
                  <VerificationCompleted />
              </NonRequireAuth>
            )
          }
        ]
      },
      {
        path: '/verify',
        element: <AuthLayout children={<Outlet />} />,
        children: [
          {
            index: true,
            element: (
              <NonRequireAuth>
                  <Verify />
              </NonRequireAuth>
            )
          }
        ]
      },
      {
        path: '/profile',
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                  <Profile />
              </RequireAuth>
            )
          }
        ]
      },

    ];
    return useRoutes(routes);
  };
  export default Routes;  