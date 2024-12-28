
import "./App.css"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AddNewClient from "./pages/AddNewClient/AddNewClient";
import Clients from "./pages/Clients/Clients";
import Notification from "./pages/Notification/Notification";
import { useEffect } from "react";
import axios from "axios";
import { useStore } from "./store/store.js";
import { SERVER_URL } from "./store/store.js";

const App = () => {
  const { isLogin, setIsLogin } = useStore();



  // Check for login admin or not on page load
  useEffect(() => {
    if (isLogin === null) {
      const checkLogin = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/auth/login-check`, { withCredentials: true })
          if (response.data.success === true) {
            setIsLogin(true)
          }
        } catch (error) {
          console.log(error)
          setIsLogin(false)
        }
      }
      checkLogin()
    } else {
      return
    }
  }, [setIsLogin, isLogin]);
  const router = createBrowserRouter([
    { path: "/", element: isLogin ? <Navigate to="/dashboard" /> : <Login /> },
    { path: "/dashboard", element: isLogin ? <Dashboard /> : <Navigate to="/" /> },
    { path: "/dashboard/add-client", element: isLogin ? <AddNewClient /> : <Navigate to="/" /> },
    { path: "/dashboard/all-clients", element: isLogin ? <Clients /> : <Navigate to="/" /> },
    { path: "/dashboard/notification", element: isLogin ? <Notification /> : <Navigate to="/" /> },

  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-center' />
    </>
  )
}

export default App