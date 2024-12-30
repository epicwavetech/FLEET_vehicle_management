import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Due.scss"
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SERVER_URL } from "../../store/store";
import toast from "react-hot-toast";
import { useStore } from '../../store/store.js';



const Due = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const { dues, setDue } = useStore();


    const getAllDue = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${SERVER_URL}/other/get-all-due`, { withCredentials: true })
            setDue(response.data.due)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Can't fetch due")
        }
    }


    const addEntry = async (e) => {
        e.preventDefault();
        try {

            setIsLoading(true)
            // Assume `taskDate` is a separate state for the date
            const response = await axios.post(
                `${SERVER_URL}/other/add-due`,
                {
                    name,
                    amount,
                    reason
                },
                {
                    withCredentials: true, // Include credentials (cookies, HTTP auth)
                }
            );

            if (response && response.data.success === true) {

                toast.success(`${response.data.message}`);
                getAllDue(); // Refresh tasks
                console.log(dues)
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false)
            toast.error(error.response.data.error);
        }
    };

    const markAsPaid = async (index) => {
        // console.log("hiii")
        try {
            setIsLoading(true)
            const response = await axios.put(`${SERVER_URL}/other/update-due/${index}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {

                toast.success(`${response.data.message}`)
                getAllDue()
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("Error updating due")
            console.log(error)
            setIsLoading(false)
        }
    };

    const handleDeleteDue = async (_id) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`${SERVER_URL}/other/delete-due/${_id}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                toast.success(`${response.data.message}`)
                getAllDue()
                setIsLoading(false)

            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Error deleting due")
        }

    }

    useEffect(() => {
        const fetchDue = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${SERVER_URL}/other/get-all-due`, { withCredentials: true })
                setDue(response.data.due)
                setIsLoading(false)

            } catch (error) {
                console.log(error)
                setIsLoading(false)
                toast.error("Can't fetch due")
            }
        }

        fetchDue()
    }, [setDue])


    return (
        <div className="dashboard-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <div className="due-component">
                    <div className="add-entry-form">
                        <h2>Add Entry</h2>
                        <div className="form-fields">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                name="amount"
                                value={amount}
                                placeholder="Amount"
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                name="reason"
                                value={reason}
                                placeholder="Reason"
                                onChange={(e) => setReason(e.target.value)}
                                required
                            />
                            <button onClick={addEntry} disabled={isLoading} >Add</button>
                        </div>
                    </div>

                    <div className="tables">
                        <div className="table-section">
                            <h2>Unpaid</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dues.map((due, index) =>
                                        due.status === "unpaid" && (
                                            <tr key={index}>
                                                <td>{due.name}</td>
                                                <td>{due.amount}</td>
                                                <td>{due.reason}</td>
                                                <td>
                                                    <button onClick={() => markAsPaid(due._id)} disabled={isLoading}>Mark as Paid</button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="table-section">
                            <h2>Paid</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Amount</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dues.map((due, index) => (
                                        due.status === "paid" && (
                                            <tr key={index}>
                                                <td>{due.name}</td>
                                                <td>{due.amount}</td>
                                                <td>{due.reason}</td>
                                                <td><button onClick={() => handleDeleteDue(due._id)} className="delete-btn" disabled={isLoading}>
                                                    <MdDelete size={20} />
                                                </button>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    );
};

export default Due;
