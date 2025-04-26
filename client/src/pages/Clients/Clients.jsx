import React, { useEffect, useState } from 'react';
import './Clients.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddModal from '../../components/AddModal/AddModal';
import ExpiryModal from '../../components/ExpiryModal/ExpiryModal';
import { SERVER_URL, useStore } from '../../store/store.js';
import axios from 'axios';
import { toast } from "react-hot-toast"
import Navbar from '../../components/Navbar/Navbar.jsx';
import { IoIosEye } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
import { downloadAllClientsData } from '../../utils/downloadXlsx.js';
import { MdDelete } from "react-icons/md";






const Clients = () => {
    const { clients, setClients } = useStore();

    const { singleClientVehicle, setSingleClientVehicle } = useStore();

    const [expandedRows, setExpandedRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [expiryModal, setExpiryModal] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isAddLoading, setIsAddLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [isSearchBtnLoading, setIsSearchBtnLoading] = useState(false)
    const [isFetchLoading, setIsFetchLoading] = useState(false)
    const [isLoadingCursor, setIsLoadingCursor] = useState(false)
    const [fvehicleId, setVehicleId] = useState("")
    const [fdocType, setDocType] = useState("")
    const [fpublic_id, setPublic_id] = useState("")
    const [downloadData, setDownloadData] = useState(false)

    const handleDownloadData = () => {
        setDownloadData(true)
    };

    useEffect(() => {
        if (downloadData === true) {
            downloadAllClientsData(clients)
            setDownloadData(false)
        }
    }, [clients, setDownloadData, downloadData])






    const fetchSingleClientVehicles = async (_id) => {

        try {
            setIsLoading(true)
            setIsFetchLoading(true)
            // Fetch and expand the row for the clicked client
            const response = await axios.get(`${SERVER_URL}/vehicle/single-client?clientId=${_id}`, { withCredentials: true });

            if (response && response.data.success === true) {
                setSingleClientVehicle(response.data.vehicles);
                // console.log(response.data.vehicles)
                setIsLoading(false)
                setIsFetchLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setIsFetchLoading(false)
            toast.error(error.response.data.error || "Error fetching vehicles")
        }
    }



    //<============================================ROW EXOANSION=======================================================>
    const toggleRowExpansion = async (_id) => {
        try {
            if (expandedRows.includes(_id)) {
                // Collapse the row if it is already expanded
                setExpandedRows([]);
                setSingleClientVehicle([])
            } else {
                setIsLoading(true)
                // Fetch and expand the row for the clicked client
                const response = await axios.get(`${SERVER_URL}/vehicle/single-client?clientId=${_id}`, { withCredentials: true });

                if (response && response.data.success === true) {
                    setSingleClientVehicle(response.data.vehicles);
                    console.log(response.data.vehicles)
                    setExpandedRows([_id]);

                    setIsLoading(false)
                }
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            setSingleClientVehicle([])
            toast.error("Error fetching client's vehicle details");
        }
    };

    const fetchAllClients = async () => {

        try {
            setIsLoadingCursor(true)
            setIsFetchLoading(true)
            const response = await axios.get(`${SERVER_URL}/client/get-all-clients`, { withCredentials: true })
            setClients(response.data.clients)

            if (response && response.data.success === true) {
                // toast.success(`${response.data.message}`)
                setIsFetchLoading(false)
                setIsLoadingCursor(false)

            }
        } catch (error) {
            console.log(error)
            setIsFetchLoading(false)
            setIsLoadingCursor(false)
            toast.error("Can't fetch expiring clients")
        }


    }




    const handleDeleteClient = async (clientId) => {
        try {
            setIsLoadingCursor(true)
            setIsDeleteLoading(true)
            const response = await axios.delete(`${SERVER_URL}/client/delete-client?clientId=${clientId}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoadingCursor(false)
                setIsDeleteLoading(false)
                toast.success(`${response.data.message}`)
                fetchAllClients()
            }
        } catch (error) {
            console.log(error)
            setIsLoadingCursor(false)
            setIsDeleteLoading(false)
            toast.error("Error deleting client")
        }
    };


    //<===========================================================ADD VEHICLE TO CLIENT=====================================>
    const handleAddVehicle = (_id) => {
        setSelectedClientId(_id);
        setShowModal(true);
    };

    const handleAddVehicleModalClose = () => {
        setShowModal(false);
        setSelectedClientId(null);
    };

    const handleAddVehicleModal = async (formData) => {
        try {
            setIsLoadingCursor(true)
            setIsAddLoading(true)
            const response = await axios.post(`${SERVER_URL}/vehicle/add-vehicle?id=${selectedClientId}`, formData, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {

                toast.success(`${response.data.message}`)
                setIsLoadingCursor(false)
                setSelectedClientId("")
                setIsAddLoading(false)
                fetchSingleClientVehicles(selectedClientId)
            }
        } catch (error) {
            toast.error(error.response.data.error)
            setIsLoadingCursor(false)
            setSelectedClientId("")
            setIsAddLoading(false)
        }

    };

        //<================================================DELETE VEHICLE====================================================>
    const deleteVehicle = async (_id) => {
        try {
            setIsLoadingCursor(true)
            setIsDeleteLoading(true)
            const response = await axios.delete(`${SERVER_URL}/vehicle/delete-vehicle/${_id}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoadingCursor(false)
                setIsDeleteLoading(false)
                toast.success(`${response.data.message}`)
                fetchSingleClientVehicles(expandedRows[0])
            }
        } catch (error) {
            setIsLoadingCursor(false)
            setIsDeleteLoading(false)
            console.log(error)
            toast.error("Error! Try again later")
        }
    }

    //<========================================UPDATE EXPIRING DOCUMENTS==============================================>
    const handleExpiryModal = (vehicleId, docType, public_id) => {
        setVehicleId(vehicleId)
        setDocType(docType)
        setPublic_id(public_id)
        console.log(vehicleId)
        setExpiryModal(true)

    }
    const handleExpiryModalClose = async () => {
        setExpiryModal(false)
    }

    const handleExpiryModalSubmit = async (formData) => {

        try {
            setIsLoadingCursor(true)
            const response = await axios.put(`${SERVER_URL}/vehicle/update-document?vehicleId=${fvehicleId}&docType=${fdocType}&public_id=${fpublic_id}`, formData, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoadingCursor(false)
                toast.success(`${response.data.message}`)
                fetchSingleClientVehicles(expandedRows[0])
            }
        } catch (error) {
            setIsLoadingCursor(false)
            toast.error(error.response.data.error)
            setDocType("")
            setVehicleId("")
            setPublic_id("")
        }



    }

    //<=============================================SEARCH CLIENT==========================================================>
    const searchClient = async (query) => {
        try {
            setIsLoadingCursor(true)
            setIsSearchBtnLoading(true)
            const response = await axios.get(`${SERVER_URL}/client/search-client?query=${query}`, {
                withCredentials: true,  // Include credentials (cookies, HTTP auth)
            })

            if (response && response.data.success === true) {
                setIsLoadingCursor(false)
                setIsSearchBtnLoading(false)
                setClients(response.data.clients)
                toast.success(`${query} found`)
            }
        } catch (error) {
            toast.error("Client Not found")
            console.log(error)
            setIsSearchBtnLoading(false)
            setIsLoadingCursor(false)
        }
    }

    const reverseDateFormat = (dateString) => {
        if (!dateString) return null; // Handle empty or invalid input
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const clientsFetch = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/client/get-all-clients`, { withCredentials: true })
                setClients(response.data.clients)

                if (response && response.data.success === true) {
                    // toast.success(`${response.data.message}`)
                }
            } catch (error) {
                console.log(error)
                toast.error("Can't fetch expiring clients")
            }

        }

        clientsFetch()
    }, [setClients])


    return (
        <div className={`dashboard-container ${isLoadingCursor ? 'loading-overlay' : ''} `}>
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <div className="navbar-container">
                    <Navbar onSearch={searchClient} onFetchAll={fetchAllClients} isFetchLoading={isFetchLoading} isSearchBtnLoading={isSearchBtnLoading} handleDownloadXlsx={() => { handleDownloadData() }} />
                </div>
                <div className="clients-container">
                    <table className="clients-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Aadhaar Card</th>
                                <th>PAN Card</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients && clients.map((client) => (
                                <React.Fragment key={client.contactNo}>
                                    <tr>
                                        <td>{client.firstName}</td>
                                        <td>{client.contactNo}</td>
                                        <td><a target="_blank" href={client.adharCard.url}>View</a></td>
                                        <td><a target="_blank" href={client.panCard.url}>View</a></td>
                                        <td className='btns'>
                                            <button className="add-btn" disabled={isAddLoading} onClick={() => handleAddVehicle(client._id)}>
                                                Add
                                            </button>
                                            <button disabled={isDeleteLoading} className="delete-btn" onClick={() => handleDeleteClient(client._id)}>
                                                Delete
                                            </button>
                                            <button
                                                className="dropdown-btn"
                                                onClick={() => toggleRowExpansion(client._id)}
                                                disabled={isLoading}
                                            >
                                                {expandedRows.includes(client._id) ? 'Hide Vehicles' : 'Show Vehicles'}
                                            </button>
                                        </td>
                                    </tr>
                                    {!isLoading && expandedRows.includes(client._id) && (
                                        <tr className="vehicle-row">
                                            <td colSpan="5">
                                                <table className="vehicle-details-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Vehicle No</th>
                                                            <th>PUCC</th>
                                                            <th>Insurance</th>
                                                            <th>Tax</th>
                                                            <th>RC</th>
                                                            <th>Fitness</th>
                                                            <th>Permit</th>
                                                            <th className='delete-vehicle-header'>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {singleClientVehicle.map((vehicle, index) => (
                                                            <tr key={index}>
                                                                <td >{vehicle.vehicleNumber}</td>
                                                                <td >{vehicle.pucc ? reverseDateFormat(vehicle.pucc.expiryDate) : ""}{vehicle.pucc ? (<><a target='_blank' href={vehicle.pucc.pdf.url}><IoIosEye size={20} /></a><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "pucc", vehicle.pucc.pdf.public_id) }} /></>) : (<><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "pucc") }} /></>)} </td>

                                                                <td >{vehicle.insurance ? reverseDateFormat(vehicle.insurance.expiryDate) : ""}{vehicle.insurance ? (<><a target='_blank' href={vehicle.insurance.pdf.url}><IoIosEye size={20} /></a><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "insurance", vehicle.insurance.pdf.public_id) }} /></>) : (<><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "insurance") }} /></>)}  </td>

                                                                <td>{vehicle.tax ? reverseDateFormat(vehicle.tax.expiryDate) : ""}{vehicle.tax ? (<><a target='_blank' href={vehicle.tax.pdf.url}><IoIosEye size={20} /></a><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "tax", vehicle.tax.pdf.public_id) }} /></>) : (<><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "tax") }} /></>)} </td>

                                                                <td>{vehicle.rc ? reverseDateFormat(vehicle.rc.expiryDate) : ""}{vehicle.rc ? (<><a target='_blank' href={vehicle.rc.pdf.url}><IoIosEye size={20} /></a><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "rc", vehicle.rc.pdf.public_id) }} /></>) : (<><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "rc") }} /></>)} </td>

                                                                <td>{vehicle.fitness ? reverseDateFormat(vehicle.fitness.expiryDate) : ""}{vehicle.fitness ? (<><a target='_blank' href={vehicle.fitness.pdf.url}><IoIosEye size={20} /></a><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "fitness", vehicle.fitness.pdf.public_id) }} /></>) : (<><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "fitness") }} /></>)}</td>

                                                                <td>{vehicle.permit ? reverseDateFormat(vehicle.permit.expiryDate) : ""}{vehicle.permit ? (<><a target='_blank' href={vehicle.permit.pdf.url}><IoIosEye size={20} /></a><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "permit", vehicle.permit.pdf.public_id) }} /></>) : (<><MdEditDocument size={20} onClick={() => { handleExpiryModal(vehicle._id, "permit") }} /></>)} </td>
                                                                <td onClick={() => { deleteVehicle(vehicle._id) }} className={isDeleteLoading ? `delete-vehicle-loading` : `delete-vehicle`}><MdDelete /></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {showModal && (
                <AddModal
                    onClose={handleAddVehicleModalClose}
                    onSave={handleAddVehicleModal}
                    isOpen={showModal}
                />
            )}
            {expiryModal && (
                <ExpiryModal
                    onClose={handleExpiryModalClose}
                    onSave={handleExpiryModalSubmit}
                    isOpen={expiryModal}
                    fdocType={fdocType}
                />
            )}


        </div>
    );
}

export default Clients;
