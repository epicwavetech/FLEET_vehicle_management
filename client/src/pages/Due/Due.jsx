import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Due.scss"

const Due = () => {
    const [unpaidEntries, setUnpaidEntries] = useState([]);
    const [paidEntries, setPaidEntries] = useState([]);
    const [formData, setFormData] = useState({ name: "", amount: "", reason: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addEntry = () => {
        if (!formData.name || !formData.amount || !formData.reason) {
            alert("All fields are required!");
            return;
        }

        setUnpaidEntries([...unpaidEntries, formData]);
        setFormData({ name: "", amount: "", reason: "" });
    };

    const markAsPaid = (index) => {
        const entryToMove = unpaidEntries[index];
        setUnpaidEntries(unpaidEntries.filter((_, i) => i !== index));
        setPaidEntries([...paidEntries, entryToMove]);
    };



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
                                value={formData.name}
                                placeholder="Name"
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                placeholder="Amount"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="reason"
                                value={formData.reason}
                                placeholder="Reason"
                                onChange={handleInputChange}
                            />
                            <button onClick={addEntry}>Add</button>
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
                                    {unpaidEntries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.name}</td>
                                            <td>{entry.amount}</td>
                                            <td>{entry.reason}</td>
                                            <td>
                                                <button onClick={() => markAsPaid(index)}>Mark as Paid</button>
                                            </td>
                                        </tr>
                                    ))}
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {paidEntries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.name}</td>
                                            <td>{entry.amount}</td>
                                            <td>{entry.reason}</td>
                                        </tr>
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
