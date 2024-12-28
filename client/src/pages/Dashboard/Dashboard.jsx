// import React from 'react';
import './Dashboard.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import { SERVER_URL, useStore } from '../../store/store';
import Home from '../../components/Home/Home';
// import AddNewClient from '../../components/AddNewClient/AddNewClient';
// import Clients from '../../components/Clients/Clients';
// import AddVahicle from '../../components/AddVahicle/AddVahicle';
import { IoIosNotifications } from "react-icons/io";
// import Notification from '../../components/Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast"


const Dashboard = () => {
    const navigateTo = useNavigate();
    const { setActiveMenuItem, setExpiringDocs, expiringDocs } = useStore();




    useEffect(() => {
        const notifications = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/vehicle/check-expiry-date`, { withCredentials: true })
                setExpiringDocs(response.data.expiringDocs)
            } catch (error) {
                console.log(error)
                toast.error("Can't fetch expiring documents")
            }

        }

        notifications()
    }, [setExpiringDocs])

    return (
        <div className="dashboard-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="dashboard-content">
                {/* {renderContent()} */}
                <Home />
            </div>
            <div className="notification">
                <IoIosNotifications size={40} onClick={() => { setActiveMenuItem("notification"); navigateTo("/dashboard/notification") }} />
            </div>
            <div className="notification-count" onClick={() => { setActiveMenuItem("notification"); navigateTo("/dashboard/notification") }} >
                {expiringDocs.length}
            </div>
        </div>
    );
};

export default Dashboard;
