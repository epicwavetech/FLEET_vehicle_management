import { useState } from 'react';
import './ExpiryModal.scss';
import PropTypes from 'prop-types';

const ExpiryModal = ({ isOpen, onClose, onSave, fdocType }) => {
    const [renewDate, setRenewDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [pdfFile, setPdfFile] = useState(null)
    const formData = new FormData();



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 150000) {
            setPdfFile(file);
        } else {
            alert("File size should be less than 150KB");
        }
    };

    const handleSubmit = () => {
        console.log(renewDate, expiryDate)
        let dynamicPdfFileName = `${fdocType}PdfFile`
        formData.append('renewDate', renewDate);
        formData.append('expiryDate', expiryDate);
        formData.append(dynamicPdfFileName, pdfFile);
        onSave(formData)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2>{fdocType} update</h2>
                <div className="modal-body">
                    <div className="renewDate">
                        <label htmlFor="renewDate">Renew Date:</label>
                        <input
                            type="date"
                            id="renewDate"
                            name="renewDate"
                            value={renewDate}
                            onChange={(e) => setRenewDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="expiryDate">
                        <label htmlFor="expiryDate">Expiry Date:</label>
                        <input
                            type="date"
                            id="expiryDate"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pdfFile">
                        <label htmlFor="pdfFile">Attach PDF (max 150KB):</label>
                        <input
                            type="file"
                            id="pdfFile"
                            name="pdfFile"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
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

ExpiryModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    fdocType: PropTypes.string.isRequired
};

export default ExpiryModal;
