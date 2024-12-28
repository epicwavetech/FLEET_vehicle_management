import { useRef, useState } from 'react';
import './AddNewClient.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SERVER_URL } from '../../store/store.js';

const AddNewClient = () => {
    const formRef = useRef(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [adharCard, setAdharCard] = useState(null);
    const [panCard, setPanCard] = useState(null);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const formData = new FormData();


    const validateFile = (file) => {
        if (file && file.type !== 'application/pdf') {
            return 'Only PDF files are allowed.';
        }
        if (file && file.size > 150 * 1024) {
            return 'File size must be less than 150KB.';
        }
        return '';
    };

    const validateContactNo = (number) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(number) ? '' : 'Contact number must be 10 digits.';
    };

    const handleAadhaarUpload = (e) => {
        const file = e.target.files[0];
        const validationError = validateFile(file);
        if (validationError) {
            setAdharCard(null);
            toast.error(validationError);
            e.target.value = ""; // Clear only the Aadhaar file input

        } else {
            setAdharCard(file);
        }
    };

    const handlePanUpload = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        const validationError = validateFile(file);
        if (validationError) {
            setPanCard(null);
            toast.error(validationError);
            e.target.value = ""; // Clear only the PAN file input

        } else {
            setPanCard(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactError = validateContactNo(contactNo);
        if (contactError) {
            toast.error(contactError);
            return;
        }
        if (!firstName || !lastName || !gender || !dob || !email || !contactNo || !address || !adharCard || !panCard) {
            toast.error('All fields are required.');
            return;
        }
        // Add further submission logic here
        try {
            setIsSubmitLoading(true)
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('gender', gender);
            formData.append('dob', dob);
            formData.append('email', email);
            formData.append('contactNo', contactNo);
            formData.append('address', address);
            formData.append('adharCard', adharCard); // Append the Aadhaar PDF
            formData.append('panCard', panCard); // Append the PAN PDF
            const response = await axios.post(`${SERVER_URL}/client/add-client`, formData, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsSubmitLoading(false)
                toast.success(`${response.data.message}`)
                setEmail("")

                setFirstName("")
                setLastName("")
                setGender("")
                setDob("")
                setContactNo("")
                setEmail("")
                setAddress("")
                setAdharCard(null)
                setPanCard(null)
                document.getElementById("adharCard").value = ""; // Reset Aadhaar file input
                document.getElementById("panCard").value = ""; // Reset PAN file input

            }

        } catch (error) {
            console.log(error)
            setIsSubmitLoading(false)
            toast.error(error.response.data.error)
            setFirstName("")
            setLastName("")
            setGender("")
            setDob("")
            setContactNo("")
            setEmail("")
            setAddress("")
            setAdharCard(null)
            setPanCard(null)
            document.getElementById("adharCard").value = ""; // Reset Aadhaar file input
            document.getElementById("panCard").value = ""; // Reset PAN file input
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <div className="add-client-container">
                    <form className="add-client-form" onSubmit={handleSubmit} ref={formRef}>
                        <h2>Add New Client</h2>

                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </div>

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
                            <label htmlFor="contactNo">Contact Number</label>
                            <input
                                type="tel"
                                id="contactNo"
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="adharCard">Aadhaar Card</label>
                            <input
                                type="file"
                                id="adharCard"
                                accept="application/pdf"
                                onChange={handleAadhaarUpload}
                                required

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="panCard">PAN Card</label>
                            <input
                                type="file"
                                id="panCard"
                                accept="application/pdf"
                                onChange={handlePanUpload}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button" disabled={isSubmitLoading} >
                            {isSubmitLoading ? <div className="submit-spinner"></div> : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewClient;
