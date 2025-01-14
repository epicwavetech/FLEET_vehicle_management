import React, { Suspense, useState } from "react";
import "./App.scss"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useStore, SERVER_URL } from "./store/store.js";

import Login from './pages/Login/Login';
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"))
// import Dashboard from './pages/Dashboard/Dashboard';
const AddNewClient = React.lazy(() => import("./pages/AddNewClient/AddNewClient"))
// import AddNewClient from "./pages/AddNewClient/AddNewClient";

const Clients = React.lazy(() => import("./pages/Clients/Clients"))
// import Clients from "./pages/Clients/Clients";

const Notification = React.lazy(() => import("./pages/Notification/Notification"))
// import Notification from "./pages/Notification/Notification";


const Due = React.lazy(() => import("./pages/Due/Due.jsx"))
// import Due from "./pages/Due/Due.jsx";

const App = () => {
  const { isLogin, setIsLogin } = useStore();
  const [isLoading, setIsLoading] = useState(false)



  Check for login admin or not on page load
  useEffect(() => {
    if (isLogin === null) {
      setIsLoading(true)
      const checkLogin = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/auth/login-check`, { withCredentials: true })
          if (response.data.success === true) {
            setIsLogin(true)
            setIsLoading(false)
          }
        } catch (error) {
          console.log(error)
          setIsLogin(false)
          setIsLoading(false)
        }
      }
      checkLogin()
    } else {
      return
    }
  }, [setIsLogin, isLogin]);
  const router = createBrowserRouter([
    { path: "/", element: isLogin ? <Navigate to="/dashboard" /> : <Login /> },
    {
      path: "/dashboard", element: isLogin ? <Suspense fallback={<div className="lazy-div"><p className='lazy-loading'></p></div>}><Dashboard /></Suspense> : <Navigate to="/" />
    },
    { path: "/dashboard/add-client", element: isLogin ? <Suspense fallback={<div className="lazy-div"><p className='lazy-loading'></p></div>}><AddNewClient /> </Suspense> : <Navigate to="/" /> },
    { path: "/dashboard/all-clients", element: isLogin ? <Suspense fallback={<div className="lazy-div"><p className='lazy-loading'></p></div>}><Clients /></Suspense> : <Navigate to="/" /> },
    {
      path: "/dashboard/notification", element: isLogin ? <Suspense fallback={<div className="lazy-div"><p className='lazy-loading'></p></div>}><Notification /> </Suspense> : <Navigate to="/" />
    },
    { path: "/dashboard/due", element: isLogin ? <Suspense fallback={<div className="lazy-div"><p className='lazy-loading'></p></div>}><Due /> </Suspense> : <Navigate to="/" /> },

  ])
  return (
    <>
      {isLoading && (
        <div className="lazy-div">
{/*           <h3>This website is temporarily unavailable.<br/>
          Kindly reach out the developer to restore access.(Contact No: 7002022342)<br/>
          Thank you for your understanding.</h3> */}
          <p className='lazy-loading'></p>
        </div>
      )}
       
     // <RouterProvider router={router} />
     // <Toaster position='top-center' /> 
    </>
  )
}

export default App
