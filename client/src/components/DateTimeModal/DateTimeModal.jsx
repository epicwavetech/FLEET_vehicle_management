
import { useState } from "react";
import ReactDOM from "react-dom";
import "./DateTimeModal.scss";
import PropTypes from 'prop-types';


const DateTimeModal = ({ isOpen, onClose, onSave }) => {
    const [date, setDate] = useState("");
    const [tHours, setTaskHours] = useState("");
    const [tMinutes, setTaskMinutes] = useState("");
    const [tPeriod, setTaskPeriod] = useState("AM");



    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ date, tHours, tMinutes, tPeriod }); // Pass combined date and time to parent
        onClose();
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-contentf">
                <h2>Update Date and Time</h2>
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
                    {/* Custom Time Picker */}
                    <label>
                        Time:
                        <div className="custom-time-inputs">
                            <input
                                type="number"
                                name="hours"
                                placeholder="HH"
                                value={tHours}
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
                                value={tMinutes}
                                onChange={(e) => setTaskMinutes(e.target.value)}
                                min="0"
                                max="59"
                                className="time-input-field"
                            />
                            <select
                                name="period"
                                value={tPeriod}
                                onChange={(e) => setTaskPeriod(e.target.value)}
                                className="time-period-dropdown"
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </label>
                </div>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>,
        document.body
    );
};


DateTimeModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default DateTimeModal;
