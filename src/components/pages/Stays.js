import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Stays.css';
import '../../App.css';

export default function BookingForm() {
    const [area, setArea] = useState('');
    const [dates, setDates] = useState(null);
    const [numPeople, setNumPeople] = useState(1);

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };

    const handleDatesChange = (date) => {
        setDates(date);
    };

    const handleNumPeopleChange = (event) => {
        const value = event.target.value;
        setNumPeople(value >= 1 ? value : 1);
    };

    const handleIncrement = () => {
        setNumPeople((prevNum) => prevNum + 1);
    };

    const handleDecrement = () => {
        setNumPeople((prevNum) => (prevNum > 1 ? prevNum - 1 : 1));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform search or other actions here
    };

    return (
        <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Location:</label>
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={area}
                        onChange={handleAreaChange}
                    />
                </div>

                <div className="form-field">
                    <label>Dates:</label>
                    <DatePicker
                        selected={dates}
                        onChange={handleDatesChange}
                        placeholderText="Select dates"
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        showPopperArrow={false}
                    />
                </div>

                <div className="form-field">
                    <label>Number of People:</label>
                    <div className="number-input">
                        <button type="button" onClick={handleDecrement}>
                            -
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={numPeople}
                            onChange={handleNumPeopleChange}
                        />
                        <button type="button" onClick={handleIncrement}>
                            +
                        </button>
                    </div>
                </div>

                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
        </div>
    );
}
