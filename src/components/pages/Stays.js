import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Stays.css';
import '../../App.css';
import Layout from "../Layout";

export default function BookingForm() {
    const [area, setArea] = useState('');
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numPeople, setNumPeople] = useState(1);

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };

    const handleCheckInDateChange = (date) => {
        setCheckInDate(date);
    };

    const handleCheckOutDateChange = (date) => {
        setCheckOutDate(date);
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

    const currentDate = new Date(); // תאריך היום הנוכחי

    const destinations = [
        {
            id: 1,
            title: 'Destination 1',
            caption: 'Description of destination 1',
            imageSrc: '/images/img-6.jpg',
            fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed nulla nec eleifend. Fusce eu vehicula magna. Ut sit amet orci ac nunc sodales faucibus porttitor nec metus. Praesent et lacus ac dolor interdum viverra. Donec luctus nulla ac sollicitudin vulputate. Sed efficitur vel nunc at pulvinar. Etiam sed vestibulum elidndisse feugiat est in cursus convallis.\n' +
                '\n' +
                'Ut purus urna, posuere sed sagittis eget, posuere quis augue. Ut laoreet nibh et tortor rhoncus, aliquam tempus dui fermentum. Vivamus ultricies erat enim, nec pharetra dui aliquam et. Donec cursus pulvinar iaculis. Curabitur fermentum mi nunc, ut finibus augue aliquam commodo. Donec scelerisque tellus nec mauris vestibulum euismod. Proin dolor vobortis.  id condimentum sed, ultrices vitae ligula. Quisque bibendum fermentum ligula eget iaculis. Donec dui purus, commodo eu turpis at, tempor interdum sem. Sed porttitor pulvinar sapien, eu consectetur turpis sodales non. Maecenas interdum iaculis odio at fringilla. Ut efficitur nibh vel velit molestie, vestibulum hendrerit quam euismod.',
        },
        {
            id: 2,
            title: 'Destination 2',
            caption: 'Description of destination 2',
            imageSrc: '/images/img-5.jpg',
            fullDescription: 'efficitur vel nunc at pulvinar. Etiam sed vestibulum elit, ut venenatis urna. Aenean laoreet sapien est. Vivamus tempor quam quis nunc euismod viverra. Nam magna nisl, vehicula ac lobortis sit amet, euismod ut felis. Proin hendrerit tincidunt interdum. Suspendisse feugiat est in cursus convallis.\n' +
                '\n' +
                'Ut purus urna, posuere sed sagittis eget, posuere quis augue. Ut laoreet nibh et tortor rhoncus, aliquam tempus dui fermentum. Vivamus ultricies erat enim, nec pharetra dui aliquam et. Donec cursus pulvinar iaculis. Curabitur fermentum mi nunc, ut finibus augue aliquam',
        },
        {
            id: 3,
            title: 'Destination 3',
            caption: 'Description of destination 2',
            imageSrc: '/images/img-3.jpg',
            fullDescription: 'efficitur vel nunc at pulvinar. Etiam sed vestibulum elit, ut venenatis urna. Aenean laoreet sapien est. Vivamus tempor quam quis nunc euismod viverra. Nam magna nisl, vehicula ac lobortis sit amet, euismod ut felis. Proin hendrerit tincidunt interdum. Suspendisse feugiat est in cursus convallis.\n' +
                '\n' +
                'Ut purus urna, posuere sed sagittis eget, posuere quis augue. Ut laoreet nibh et tortor rhoncus, aliquam tempus dui fermentum. Vivamus ultricies erat enim, nec pharetra dui aliquam et. Donec cursus pulvinar iaculis. Curabitur fermentum mi nunc, ut finibus augue aliquam',
        },
        {
            id: 4,
            title: 'Destination 4',
            caption: 'Description of destination 2',
            imageSrc: '/images/img-4.jpg',
            fullDescription: 'efficitur vel nunc at pulvinar. Etiam sed vestibulum elit, ut venenatis urna. Aenean laoreet sapien est. Vivamus tempor quam quis nunc euismod viverra. Nam magna nisl, vehicula ac lobortis sit amet, euismod ut felis. Proin hendrerit tincidunt interdum. Suspendisse feugiat est in cursus convallis.\n' +
                '\n' +
                'Ut purus urna, posuere sed sagittis eget, posuere quis augue. Ut laoreet nibh et tortor rhoncus, aliquam tempus dui fermentum. Vivamus ultricies erat enim, nec pharetra dui aliquam et. Donec cursus pulvinar iaculis. Curabitur fermentum mi nunc, ut finibus augue aliquam',
        },
    ];

    const [selectedDestination, setSelectedDestination] = useState(null);

    const openPopup = (destination) => {
        setSelectedDestination(destination);
    };

    const closePopup = () => {
        setSelectedDestination(null);
    };

    return (
        <Layout>
            <div className="container">
                <div>
                    <h2>Resorts</h2>
                    <h3>Treat yourself! Your dream resort stay is just a few clicks away.</h3>
                </div>
              {/*Form*/}
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
                    <label>Check-in Date:</label>
                    <DatePicker
                        selected={checkInDate}
                        onChange={handleCheckInDateChange}
                        placeholderText="Select check-in date"
                        dateFormat="dd/MM/yyyy"
                        minDate={currentDate}
                        isClearable
                        showPopperArrow={false}
                    />
                </div>

                <div className="form-field">
                    <label>Check-out Date:</label>
                    <DatePicker
                        selected={checkOutDate}
                        onChange={handleCheckOutDateChange}
                        placeholderText="Select check-out date"
                        dateFormat="dd/MM/yyyy"
                        minDate={checkInDate || currentDate}
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
                {/*Cards*/}
            <div className="featured-destinations">
                {destinations.map((destination) => (
                    <div className="destination-card" key={destination.id}>
                        <img
                            src={destination.imageSrc}
                            alt={destination.title}
                            onClick={() => openPopup(destination)}
                        />
                        <h3>{destination.title}</h3>
                        <p>{destination.caption}</p>
                    </div>
                ))}
            </div>

            {selectedDestination && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{selectedDestination.title}</h2>
                        <p>{selectedDestination.fullDescription}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
            </div>

        </Layout>
    );
}
