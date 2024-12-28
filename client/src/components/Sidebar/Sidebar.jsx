
import { useStore } from '../../store/store.js';
import "./Sidebar.scss"
import { toast } from "react-hot-toast"
import { MdDashboard } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import Cookies from 'js-cookie';

const Sidebar = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const url = location.pathname;
    // console.log(url)

    const { activeMenuItem, setActiveMenuItem } = useStore();

    const handleLogout = () => {

        toast.success('Logging out...');
        // navigateTo("/")
        setTimeout(() => {
            window.location.reload();
        }, 1000)
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
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};


export default Sidebar