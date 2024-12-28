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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    const { darkMode, toggleDarkMode } = useStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                setIsLoading(true)
                const response = await axios.post(`${SERVER_URL}/auth/login`, { email, password }, {
                    withCredentials: true,  // Include credentials (cookies, HTTP auth)
                })

                if (response && response.data.success === true) {
                    setIsLoading(false)
                    toast.success(`Welcome ${response.data.admin.name}`)
                    setEmail("")
                    setPassword("")
                    // navigateTo("/dashboard")
                    window.location.reload();
                }

            }
        } catch (error) {
            toast.error(error.response.data.error)
            setEmail("")
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="login-button" disabled={isLoading}>Login</button>
            </form>
        </div>
    );
};

export default Login;
