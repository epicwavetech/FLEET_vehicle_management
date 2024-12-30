import { useState } from "react";
import PropTypes from 'prop-types';



const SnoozeDate = ({ isOpen, onClose, onSave }) => {
    const [date, setDate] = useState("");


    if (!isOpen) return null;


    const handleSave = () => {
        onSave({ date }); // Pass combined date and time to parent
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-contentf">
                <h2>Snooze custom Date</h2>
                <div className="modal-inputs">
                    {/* Date Picker */}
                    <label>
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                </div>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

SnoozeDate.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default SnoozeDate