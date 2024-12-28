// Home.js
import { useEffect, useState } from 'react';
import "./Home.scss"
import { useStore } from '../../store/store.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URL } from "../../store/store.js"


const Home = () => {
    const { tasks, setTasks, contacts, setContacts } = useStore();
    // const { setIsLogin } = useStore();


    const [task, setTask] = useState('');
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false)

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
            setIsLoading(true)
            const response = await axios.post(`${SERVER_URL}/other/create-task`, { task }, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoading(false)
                setTask("")
                toast.success(`${response.data.message}`)
                fetchTasksOutside()
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setTask("")
            toast.error("Error adding task")
        }
    };

    const handleDeleteTask = async (_id) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/other/delete-task/${_id}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoading(false)
                toast.success(`${response.data.message}`)
                fetchTasksOutside()
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Error deleting task")
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.post(`${SERVER_URL}/other/add-contact`, { name, contactNumber }, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoading(false)
                setContactNumber("")
                setName("")
                toast.success(`${response.data.message}`)
                fetchContactsOutside()
            }
        } catch (error) {
            setIsLoading(false)
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
                setIsLoading(false)
                toast.success(`${response.data.message}`)
                fetchContactsOutside()
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Error deleting contact")
        }
    };



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
                    <button type="submit" disabled={isLoading} className="add-task-btn">Add Task</button>
                </form>
                <ul>
                    {tasks && tasks.map((task) => (
                        <li key={task._id} className="task-item">
                            {task.task}
                            <button onClick={() => handleDeleteTask(task._id)} className="delete-btn">Delete</button>
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
                    <button type="submit" disabled={isLoading} className="add-contact-btn">Add Contact</button>
                </form>

                <ul>
                    {contacts && contacts.map((contact) => (
                        <li key={contact._id} className="contact-item">
                            <strong>{contact.name}</strong>: {contact.contactNumber}
                            <button onClick={() => handleDeleteContact(contact._id)} className="delete-btn">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
