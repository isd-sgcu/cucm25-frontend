
import { createBrowserRouter, Outlet } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import JuniorSeniorLanding from './page/juniorsenior/Landing'
import JuniorSeniorLeaderboard from './page/juniorsenior/Leaderboard'
import JuniorSeniorSendingGift from './page/juniorsenior/SendingGift'
import JuniorSeniorHistory from './page/juniorsenior/History'
import ModeratorLanding from './page/moderator/Landing'
import ModeratorCreateActivity from './page/moderator/ModeratorCreateActivity'
import AuthLanding from './page/auth/Landing'
import SystemClosed from './page/auth/SystemClosed'
import AuthLayout from './layout/AuthLayout'
import SuperAdminLanding from './page/superadmin/Landing'
import SuperAdminCreateActivity from './page/superadmin/SuperAdminCreateActivity'
import SuperAdminExportTicket from './page/superadmin/SuperAdminExportTicket'
import VerifyInformation from './page/auth/VerifyInformation'
import ErrorPage from './page/Error'
import RootLayout from './layout/RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/auth',
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: 'login', element: <AuthLanding /> },
          { path: 'system-closed', element: <SystemClosed /> },
        ],
      },

      {
        element: <AuthLayout allowedRoles={['PARTICIPANT', 'STAFF', 'MODERATOR', 'ADMIN']} />,
        children: [
          {
            path: '/auth',
            element: (
              <MainLayout>
                <Outlet />
              </MainLayout>
            ),
            children: [{ path: 'verify-information', element: <VerifyInformation /> }],
          },
        ],
      },

      {
        element: <AuthLayout allowedRoles={['PARTICIPANT', 'STAFF']} />,
        children: [
          {
            path: '/',
            element: (
              <MainLayout>
                <Outlet />
              </MainLayout>
            ),
            children: [
              { path: '', element: <JuniorSeniorLanding /> },
              { path: 'leaderboard', element: <JuniorSeniorLeaderboard /> },
              { path: 'questions', element: <JuniorSeniorSendingGift /> },
              { path: 'history', element: <JuniorSeniorHistory /> },
            ],
          },
        ],
      },

      {
        element: <AuthLayout allowedRoles={['MODERATOR']} />,
        children: [
          {
            path: '/moderator',
            element: (
              <MainLayout>
                <Outlet />
              </MainLayout>
            ),
            children: [
              { path: '', element: <ModeratorLanding /> },
              { path: 'create-activity', element: <ModeratorCreateActivity /> },
            ],
          },
        ],
      },

      {
        element: <AuthLayout allowedRoles={['ADMIN']} />,
        children: [
          {
            path: '/superadmin',
            element: (
              <MainLayout>
                <Outlet />
              </MainLayout>
            ),
            children: [
              { path: '', element: <SuperAdminLanding /> },
              { path: 'create-activity', element: <SuperAdminCreateActivity /> },
              { path: 'export-ticket', element: <SuperAdminExportTicket /> },
            ],
          },
        ],
      },

      {
        path: '*',
        element: (
          <MainLayout>
            <ErrorPage />
          </MainLayout>
        ),
      },
    ],
  },
])
