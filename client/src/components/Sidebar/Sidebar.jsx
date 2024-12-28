
import { SERVER_URL, useStore } from '../../store/store.js';
import "./Sidebar.scss"
import { toast } from "react-hot-toast"
import { MdDashboard } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';

const Sidebar = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const url = location.pathname;
    const [isLogoutLoading, setIsLogoutLoading] = useState(false)
    // console.log(url)

    const { activeMenuItem, setActiveMenuItem } = useStore();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            setIsLogoutLoading(true)
            toast.success('Logging out...');
            const response = await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true })

            if (response && response.data.success === true) {
                setIsLogoutLoading(false)
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        } catch (error) {
            setIsLogoutLoading(false)
            console.log(error)
            toast.error("Server Error")
        }
    };

    useEffect(() => {
        if (url == "/dashboard/add-client") {
            setActiveMenuItem("Add client")
        }
        if (url == "/dashboard/all-clients") {
            setActiveMenuItem("All clients")
        }
        if (url == "/dashboard") {
            setActiveMenuItem("Home")
        }
    }, [url, setActiveMenuItem])

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Admin Dashboard</h2>
            <ul className="sidebar-menu">
                <li className={`menu-item ${activeMenuItem === "Home" ? 'active' : ''}`} onClick={() => { setActiveMenuItem("Home"); navigateTo("/dashboard") }}><MdDashboard />  Home</li>
                <li className={`menu-item ${activeMenuItem === "Add client" ? 'active' : ''}`} onClick={() => { setActiveMenuItem("Add client"); navigateTo("/dashboard/add-client") }}><IoMdPersonAdd />  Add client</li>
                <li className={`menu-item ${activeMenuItem === "All clients" ? 'active' : ''}`} onClick={() => { setActiveMenuItem("All clients"); navigateTo("/dashboard/all-clients") }}><MdGroups />  All clients</li>



            </ul>
            <button className="logout-btn" onClick={handleLogout} disabled={isLogoutLoading}>
                {isLogoutLoading ? <div className="logout-spinner"></div> : "Logout"}
            </button>
        </div>
    );
};


export default Sidebar