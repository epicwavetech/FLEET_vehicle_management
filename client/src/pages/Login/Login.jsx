import axios from "axios"
import { useState } from 'react';
import { toast } from "react-hot-toast"
import './Login.scss';
import { SERVER_URL, useStore } from "../../store/store.js"
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';


const Login = () => {
    // const navigateTo = useNavigate();
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    const { darkMode, toggleDarkMode } = useStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (name && password) {
                setIsLoading(true)
                const response = await axios.post(`${SERVER_URL}/auth/login`, { name, password }, {
                    withCredentials: true,  // Include credentials (cookies, HTTP auth)
                })

                if (response && response.data.success === true) {
                    setIsLoading(false)
                    toast.success(`Welcome ${response.data.admin.name}`)
                    setName("")
                    setPassword("")
                    // navigateTo("/dashboard")
                    window.location.reload();
                }

            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error)
            } else {
                toast.error("Server Error!")
            }

            setName("")
            setPassword("")
            setIsLoading(false)
        }

    };

    return (
        <div className={`login-container ${darkMode ? 'dark' : ''}`}>

            <div className={`toggle-theme ${darkMode ? 'dark' : ''}`} onClick={toggleDarkMode}>
                {darkMode ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
            </div>
            <form className={`login-form ${darkMode ? 'dark' : ''}`} onSubmit={handleLogin}>
                <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label htmlFor="name">USER ID</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? <div className="login-spinner"></div> : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
