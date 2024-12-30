// Home.js
import { useEffect, useState } from 'react';
import "./Home.scss"
import { useStore } from '../../store/store.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URL } from "../../store/store.js"
import { MdDelete } from "react-icons/md";
import DateTimeModal from '../DateTimeModal/DateTimeModal.jsx';
import { MdEditDocument } from "react-icons/md";


const Home = () => {
    const { tasks, setTasks, contacts, setContacts } = useStore();
    // const { setIsLogin } = useStore();


    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    // const [taskTime, setTaskTime] = useState('');
    const [taskHours, setTaskHours] = useState("");
    const [taskMinutes, setTaskMinutes] = useState("");
    const [taskPeriod, setTaskPeriod] = useState("AM");
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [isAddTaskLoading, setAddTaskIsLoading] = useState(false)
    const [isAddContactLoading, setAddContactIsLoading] = useState(false)
    const [isEditTaskModal, setIsEditTaskModal] = useState(false)
    const [taskId, setTaskId] = useState(false)
    const [editBtnLoading, setEditBtnLoading] = useState(false)

    const fetchTasksOutside = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/other/get-all-task`, { withCredentials: true })
            setTasks(response.data.tasks)
        } catch (error) {
            console.log(error)
            toast.error("Can't fetch tasks")
        }
    }

    const fetchContactsOutside = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/other/get-all-contact`, { withCredentials: true })
            setContacts(response.data.contacts)
        } catch (error) {
            console.log(error)
            toast.error("Can't fetch contacts")
        }
    }






    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            setAddTaskIsLoading(true);

            // Assume `taskDate` is a separate state for the date
            const response = await axios.post(
                `${SERVER_URL}/other/create-task`,
                {
                    task,
                    date: taskDate,
                    hours: taskHours, minutes: taskMinutes, period: taskPeriod
                },
                {
                    withCredentials: true, // Include credentials (cookies, HTTP auth)
                }
            );

            if (response && response.data.success === true) {
                setAddTaskIsLoading(false);
                setTask("");
                setTaskHours("");
                setTaskMinutes("");
                setTaskPeriod("AM");
                toast.success(`${response.data.message}`);
                fetchTasksOutside(); // Refresh tasks
            }
        } catch (error) {
            console.error(error);
            setAddTaskIsLoading(false);
            setTask("");
            setTaskHours("");
            setTaskMinutes("");
            setTaskPeriod("AM");
            toast.error("Error adding task");
        }
    };


    const handleDeleteTask = async (_id) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/other/delete-task/${_id}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                toast.success(`${response.data.message}`)
                fetchTasksOutside()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error deleting task")
        }
    };

    const handleEditTask = (_id) => {
        setTaskId(_id); // Set task ID first
        setIsEditTaskModal(true); // Then open the modal
        console.log(isEditTaskModal)
    }

    const handleDateTimeModalClose = () => {
        setIsEditTaskModal(false)
        setTaskId("")
    }
    const handleDateTimeModalSubmit = async ({ date, tHours, tMinutes, tPeriod, Task }) => {
        try {
            setEditBtnLoading(true)
            setIsEditTaskModal(false)
            const response = await axios.put(`${SERVER_URL}/other/update-task/${taskId}`, { date: date, hours: tHours, minutes: tMinutes, period: tPeriod, task: Task }, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {

                toast.success(`${response.data.message}`)
                setEditBtnLoading(false)
                setTaskId("")
                fetchTasksOutside()
            }
        } catch (error) {
            toast.error(error.response.data.error)
            setEditBtnLoading(false)
            setTaskId("")
            fetchTasksOutside()
        }

    }

    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            setAddContactIsLoading(true)
            const response = await axios.post(`${SERVER_URL}/other/add-contact`, { name, contactNumber }, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setAddContactIsLoading(false)
                setContactNumber("")
                setName("")
                toast.success(`${response.data.message}`)
                fetchContactsOutside()
            }
        } catch (error) {
            setAddContactIsLoading(false)
            setContactNumber("")
            setName("")
            console.log(error.response)
            toast.error("Phone No must be 10 digit number")
        }
    };

    const handleDeleteContact = async (_id) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/other/delete-contact/${_id}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                toast.success(`${response.data.message}`)
                fetchContactsOutside()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error deleting contact")
        }
    };

    function formatDate(isoString) {
        // Parse the ISO string to a Date object
        const date = new Date(isoString);

        // Extract day, month, and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        // Return in dd-mm-yyyy format
        return `${day}-${month}-${year}`;
    }





    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/other/get-all-task`, { withCredentials: true })
                setTasks(response.data.tasks)
            } catch (error) {
                console.log(error)
                toast.error("Can't fetch tasks")
            }
        }

        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/other/get-all-contact`, { withCredentials: true })
                setContacts(response.data.contacts)
            } catch (error) {
                console.log(error)
                toast.error("Can't fetch contacts")
            }
        }
        fetchContacts();
        fetchTasks();
    }, [setTasks, setContacts])

    return (

        <div className="home">
            <div className="todo-list">
                <form action="" onSubmit={handleAddTask}>
                    <h3>To-Do List</h3>
                    <input
                        type="text"
                        placeholder="New task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="new-task-input"
                        required
                    />

                    {/* Input for date */}
                    <input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        className="task-date-input"
                    />

                    {/* Input for time */}
                    <input
                        type="number"
                        name="hours"
                        placeholder="HH"
                        value={taskHours}
                        onChange={(e) => setTaskHours(e.target.value)}
                        min="1"
                        max="12"
                        className="time-input-field"
                    />
                    :
                    <input
                        type="number"
                        name="minutes"
                        placeholder="MM"
                        value={taskMinutes}
                        onChange={(e) => setTaskMinutes(e.target.value)}
                        min="0"
                        max="59"
                        className="time-input-field"
                    />
                    <select
                        name="period"
                        value={taskPeriod}
                        onChange={(e) => setTaskPeriod(e.target.value)}
                        className="time-period-dropdown"
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                    <button type="submit" disabled={isAddTaskLoading} className="add-task-btn">
                        {isAddTaskLoading ? <div className="task-spinner"></div> : "Add Task"}
                    </button>
                </form>
                <ul>
                    {tasks && tasks.map((task) => (
                        <li key={task._id} className="task-item">
                            <div className='tasks-list'>
                                <p><strong>Task:</strong> {task.task}</p>
                                <p><strong>Date:</strong> {formatDate(task.date)}</p>
                                <p><strong>Time:</strong> {task.time}</p>
                            </div>

                            <button onClick={() => handleEditTask(task._id)} disabled={editBtnLoading} className="edit-btn">
                                <MdEditDocument size={20} />
                            </button>
                            <button onClick={() => handleDeleteTask(task._id)} className="delete-btn">
                                <MdDelete size={20} />
                            </button>

                        </li>
                    ))}
                </ul>
            </div>

            <div className="contacts-list">
                <form action="" onSubmit={handleAddContact}>
                    <h3>Important Contacts</h3>
                    <input
                        type="text"
                        placeholder="Contact name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="new-contact-name-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="new-contact-phone-input"
                        required
                    />
                    <button type="submit" disabled={isAddContactLoading} className="add-contact-btn">
                        {isAddContactLoading ? <div className="contact-spinner"></div> : "Add Contact"}
                    </button>
                </form>

                <ul>
                    {contacts && contacts.map((contact) => (
                        <li key={contact._id} className="contact-item">
                            <strong>{contact.name}</strong>: {contact.contactNumber}
                            <button onClick={() => handleDeleteContact(contact._id)} className="delete-btn"><MdDelete size={20} /></button>
                        </li>
                    ))}
                </ul>
            </div>
            {isEditTaskModal && (
                <DateTimeModal
                    onClose={handleDateTimeModalClose}
                    onSave={handleDateTimeModalSubmit}
                    isOpen={isEditTaskModal}
                />
            )}
        </div>


    );
};

export default Home;
