import { useEffect, useState } from 'react';
import './Notification.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SERVER_URL, useStore } from '../../store/store';
import { FaBell } from "react-icons/fa6";
import SnoozeDate from '../../components/SnoozeDate/SnoozeDate';

const Notification = () => {
    const { setExpiringDocs, expiringDocs } = useStore();
    const [isLoading, setIsLoading] = useState(false)
    const [selectedID, setSelectedID] = useState("")
    const [documentType, setDocumentType] = useState("")
    const [isSnoozeModal, setIsSnoozeModal] = useState(false)

    const notifications = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/vehicle/check-expiry-date`, { withCredentials: true })
            setExpiringDocs(response.data.expiringDocs)
        } catch (error) {
            console.log(error)
            toast.error("Can't fetch expiring documents")
        }

    }

    const handleSnoozeModalClose = () => {
        setIsSnoozeModal(false)
    }

    const handleSnoozeModalOpen = (_id, docType) => {
        setIsSnoozeModal(true)
        setDocumentType(docType)
        setSelectedID(_id)
    }

    const handleSnoozeModalSubmit = async ({ date }) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`${SERVER_URL}/vehicle/snooze-notification?vehicleId=${selectedID}&docType=${documentType}&snoozeUntil=${date}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoading(false)
                toast.success(`${response.data.message}`)
                notifications()
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Error snooze")
        }
    }


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
                <div className="notifications-container">
                    <h2>Notifications</h2>
                    <table className="notifications-table">
                        <thead>
                            <tr>
                                <th>Vehicle No</th>
                                <th>Document Type</th>
                                <th>Expiry Date</th>
                                <th>Owner</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {expiringDocs.map((notification, index) => (
                                <tr key={index}>
                                    <td>{notification.vehicleNumber}</td>
                                    <td>{notification.docType}</td>
                                    <td>{notification.expiryDate}</td>
                                    <td>{notification.firstName}</td>
                                    <td>{notification.email}</td>
                                    <td>{notification.contactNumber}</td>
                                    <td>
                                        <button className="snooze-btn" disabled={isLoading} onClick={() => handleSnoozeModalOpen(notification._id, notification.docType)}>
                                            {<FaBell />} Snooze
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                isSnoozeModal && (
                    <SnoozeDate
                        onClose={handleSnoozeModalClose}
                        onSave={handleSnoozeModalSubmit}
                        isOpen={isSnoozeModal}
                    />
                )
            }
        </div>


    );
};

export default Notification;
