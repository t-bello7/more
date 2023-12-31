import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import ErrorPage from './pages/error-page'
import SignIn from './pages/signIn.jsx'
import HomeLayout from './layouts/HomeLayout.jsx'
import Overview from './pages/Overview.jsx'
import Scan from './pages/Scan.jsx'
import Activity from './pages/Activity.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "",
      //   element: <Overview />
      // },
      {
        path: "",
        element: <Scan />
      },
      // {
      //   path: "activity",
      //   element: <Activity />
      // }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
