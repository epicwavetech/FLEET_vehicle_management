import { useState } from 'react';
import './AddModal.scss';
import PropTypes from 'prop-types';

const AddModal = ({ isOpen, onClose, onSave }) => {

    const [vehicleNumber, setVehicleNumber] = useState("")
    const [taxRenewDate, setTaxRenewDate] = useState("")
    const [taxExpiryDate, setTaxExpiryDate] = useState("")
    const [taxPdfFile, setTaxPdfFile] = useState(null)
    const [puccRenewDate, setPuccRenewDate] = useState("")
    const [puccExpiryDate, setPuccExpiryDate] = useState("")
    const [puccPdfFile, setPuccPdfFile] = useState(null)
    const [rcRenewDate, setRcRenewDate] = useState("")
    const [rcExpiryDate, setRcExpiryDate] = useState("")
    const [rcPdfFile, setRcPdfFile] = useState(null)
    const [permitRenewDate, setPermitRenewDate] = useState("")
    const [permitExpiryDate, setPermitExpiryDate] = useState("")
    const [permitPdfFile, setPermitPdfFile] = useState(null)
    const [insuranceRenewDate, setInsuranceRenewDate] = useState("")
    const [insuranceExpiryDate, setInsuranceExpiryDate] = useState("")
    const [insurancePdfFile, setInsurancePdfFile] = useState(null)
    const [fitnessRenewDate, setFitnessRenewDate] = useState("")
    const [fitnessExpiryDate, setFitnessExpiryDate] = useState("")
    const [fitnessPdfFile, setFitnessPdfFile] = useState(null)

    const formData = new FormData();

    //<============================================HANDLE FIELS==============================================>
    const handleTaxFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 300000) {
            setTaxPdfFile(file);
        } else {
            alert("File size should be less than 300KB");
        }
    };
    const handlePuccFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 300000) {
            setPuccPdfFile(file);
        } else {
            alert("File size should be less than 300KB");
        }
    };
    const handleRcFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 300000) {
            setRcPdfFile(file);
        } else {
            alert("File size should be less than 300KB");
        }
    };
    const handlePermitFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 300000) {
            setPermitPdfFile(file);
        } else {
            alert("File size should be less than 300KB");
        }
    };
    const handleInsuranceFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 300000) {
            setInsurancePdfFile(file);
        } else {
            alert("File size should be less than 300KB");
        }
    };
    const handleFitnessFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 300000) {
            setFitnessPdfFile(file);
        } else {
            alert("File size should be less than 300KB");
        }
    };

    const handleSubmit = () => {
        // console.log(formData.taxPdfFile)
        formData.append('vehicleNumber', vehicleNumber);

        formData.append('taxRenewDate', taxRenewDate);
        formData.append('taxExpiryDate', taxExpiryDate);
        formData.append('taxPdfFile', taxPdfFile);

        formData.append('puccRenewDate', puccRenewDate);
        formData.append('puccExpiryDate', puccExpiryDate);
        formData.append('puccPdfFile', puccPdfFile);

        formData.append('rcRenewDate', rcRenewDate);
        formData.append('rcExpiryDate', rcExpiryDate);
        formData.append('rcPdfFile', rcPdfFile);

        formData.append('permitRenewDate', permitRenewDate);
        formData.append('permitExpiryDate', permitExpiryDate);
        formData.append('permitPdfFile', permitPdfFile);

        formData.append('insuranceRenewDate', insuranceRenewDate);
        formData.append('insuranceExpiryDate', insuranceExpiryDate);
        formData.append('insurancePdfFile', insurancePdfFile);

        formData.append('fitnessRenewDate', fitnessRenewDate);
        formData.append('fitnessExpiryDate', fitnessExpiryDate);
        formData.append('fitnessPdfFile', fitnessPdfFile);
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-body">
                    <div className="vehicleNumber">
                        <h3 className='vehicleNo'>Vehicle Number: Format `MH12A1234` or `KA01AB5678`</h3>
                        <input
                            type="text"
                            id="vehicleNumber"
                            name="vehicleNumber"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            placeholder="Enter vehicle number"
                        />
                    </div>
                    <form>
                        <div className="RC">

                            <label htmlFor="rcRenewDate">RC Renewal Date:</label>
                            <input
                                type="date"
                                id="rcRenewDate"
                                name="rcRenewDate"
                                value={rcRenewDate}
                                onChange={(e) => setRcRenewDate(e.target.value)}
                            />

                            <label htmlFor="rcExpiryDate">Date of Expiry:</label>
                            <input
                                type="date"
                                id="rcExpiryDate"
                                name="rcExpiryDate"
                                value={rcExpiryDate}
                                onChange={(e) => setRcExpiryDate(e.target.value)}
                            />

                            <label htmlFor="rcPdfFile">Attach PDF:</label>
                            <input
                                type="file"
                                id="rcPdfFile"
                                name="rcPdfFile"

                                onChange={handleRcFileChange}
                            />
                        </div>
                        <div className="permit">

                            <label htmlFor="permitRenewDate">Permit Renewal Date:</label>
                            <input
                                type="date"
                                id="permitRenewDate"
                                name="permitRenewDate"
                                value={permitRenewDate}
                                onChange={(e) => setPermitRenewDate(e.target.value)}
                            />

                            <label htmlFor="permitExpiryDate">Date of Expiry:</label>
                            <input
                                type="date"
                                id="permitExpiryDate"
                                name="permitExpiryDate"
                                value={permitExpiryDate}
                                onChange={(e) => setPermitExpiryDate(e.target.value)}
                            />

                            <label htmlFor="permitPdfFile">Attach PDF:</label>
                            <input
                                type="file"
                                id="permitPdfFile"
                                name="permitPdfFile"

                                onChange={handlePermitFileChange}
                            />
                        </div>
                        <div className="insurance">

                            <label htmlFor="insuranceRenewDate">Insurance Renewal Date:</label>
                            <input
                                type="date"
                                id="insuranceRenewDate"
                                name="insuranceRenewDate"
                                value={insuranceRenewDate}
                                onChange={(e) => setInsuranceRenewDate(e.target.value)}
                            />

                            <label htmlFor="insuranceExpiryDate">Date of Expiry:</label>
                            <input
                                type="date"
                                id="insuranceExpiryDate"
                                name="insuranceExpiryDate"
                                value={insuranceExpiryDate}
                                onChange={(e) => setInsuranceExpiryDate(e.target.value)}
                            />

                            <label htmlFor="insurancePdfFile">Attach PDF:</label>
                            <input
                                type="file"
                                id="insurancePdfFile"
                                name="insurancePdfFile"

                                onChange={handleInsuranceFileChange}
                            />
                        </div>
                        <div className="fitness">

                            <label htmlFor="fitnessRenewDate">Fitness Renewal Date:</label>
                            <input
                                type="date"
                                id="fitnessRenewDate"
                                name="fitnessRenewDate"
                                value={fitnessRenewDate}
                                onChange={(e) => setFitnessRenewDate(e.target.value)}
                            />

                            <label htmlFor="fitnessExpiryDate">Date of Expiry:</label>
                            <input
                                type="date"
                                id="fitnessExpiryDate"
                                name="fitnessExpiryDate"
                                value={fitnessExpiryDate}
                                onChange={(e) => setFitnessExpiryDate(e.target.value)}
                            />

                            <label htmlFor="fitnessPdfFile">Attach PDF:</label>
                            <input
                                type="file"
                                id="fitnessPdfFile"
                                name="fitnessPdfFile"

                                onChange={handleFitnessFileChange}
                            />
                        </div>
                        <div className="tax">

                            <label htmlFor="taxRenewDate">Tax Renewal Date:</label>
                            <input
                                type="date"
                                id="taxRenewDate"
                                name="taxRenewDate"
                                value={taxRenewDate}
                                onChange={(e) => setTaxRenewDate(e.target.value)}
                            />

                            <label htmlFor="taxExpiryDate">Date of Expiry:</label>
                            <input
                                type="date"
                                id="taxExpiryDate"
                                name="taxExpiryDate"
                                value={taxExpiryDate}
                                onChange={(e) => setTaxExpiryDate(e.target.value)}
                            />

                            <label htmlFor="taxPdfFile">Attach PDF:</label>
                            <input
                                type="file"
                                id="taxPdfFile"
                                name="taxPdfFile"

                                onChange={handleTaxFileChange}
                            />
                        </div>
                        <div className="pucc">

                            <label htmlFor="puccRenewDate">PUCC Renewal Date:</label>
                            <input
                                type="date"
                                id="puccRenewDate"
                                name="puccRenewDate"
                                value={puccRenewDate}
                                onChange={(e) => setPuccRenewDate(e.target.value)}
                            />

                            <label htmlFor="puccExpiryDate">Date of Expiry:</label>
                            <input
                                type="date"
                                id="puccExpiryDate"
                                name="puccExpiryDate"
                                value={puccExpiryDate}
                                onChange={(e) => setPuccExpiryDate(e.target.value)}
                            />

                            <label htmlFor="puccPdfFile">Attach PDF:</label>
                            <input
                                type="file"
                                id="puccPdfFile"
                                name="puccPdfFile"

                                onChange={handlePuccFileChange}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


AddModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AddModal;
