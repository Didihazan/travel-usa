import React, {useState} from 'react';
import Layout from '../Layout';
import '../Services.css';
import {RiCalendarLine, RiHotelBedLine, RiMapPinLine, RiSearchLine, RiUserLine} from 'react-icons/ri';

function RiAirplaneLine() {
    return null;
}

export default function Services() {
    const [numPeople, setNumPeople] = useState(1);

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

    return (
        <Layout>
            <div className="service-page">
                <div className="search-card">
                    <div className="search-form">
                        <div className="form-group">
                            <input className="input-form" type="text" id="location" placeholder="Location"/>
                            <label htmlFor="location">
                                <RiMapPinLine/>
                            </label>
                        </div>
                        <div className="form-group">
                            <input className="input-form" type="date" id="date"/>
                            <label htmlFor="date">
                                <RiCalendarLine/>
                            </label>
                        </div>
                        <div className="form-group">
                            <div className="guests-input">
                                <button onClick={handleDecrement}>-</button>
                                <input
                                    className="input-form"
                                    type="number"
                                    id="guests"
                                    min="1"
                                    value={numPeople}
                                    onChange={handleNumPeopleChange}
                                    placeholder="Guests"
                                />
                                <label htmlFor="guests">
                                    <RiUserLine/>
                                </label>
                                <button onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                        <div className="search-button-service">
                                <label htmlFor="search">
                                    <RiSearchLine/>
                                </label>

                        </div>
                    </div>

                    <div className="cards">
                        <a href="/orders" className="card">
                            <div className="picture">
                                <img src="../images/login.jpg" alt="Destination Picture"/>
                            </div>
                            <div className="content">
                                <h2>Name of the Place</h2>
                                <div className="title">
                                    <span className="price">$500</span>
                                    <span className="discount">$700</span>
                                </div>
                                <div className="hotel">
                                    <RiHotelBedLine/>
                                    <span className="dates">Vacation Dates</span>
                                </div>
                                <div className="flight">
                                    <RiAirplaneLine/>
                                    <span className="details">Flight Details</span>
                                </div>
                            </div>
                        </a>
                        <a href="/orders" className="card">
                            <div className="picture">
                                <img src="../images/login.jpg" alt="Destination Picture"/>
                            </div>
                            <div className="content">
                                <h2>Name of the Place</h2>
                                <div className="title">
                                    <span className="price">$600</span>
                                    <span className="discount">$2500</span>
                                </div>
                                <div className="hotel">
                                    <RiHotelBedLine/>
                                    <span className="dates">Vacation Dates</span>
                                </div>
                                <div className="flight">
                                    <RiAirplaneLine/>
                                    <span className="details">Flight Details</span>
                                </div>
                            </div>
                        </a>
                        <a href="/orders" className="card">
                            <div className="picture">
                                <img src="../images/login.jpg" alt="Destination Picture"/>
                            </div>
                            <div className="content">
                                <h2>Name of the Place</h2>
                                <div className="title">
                                    <span className="price">$800</span>
                                    <span className="discount">$760</span>
                                </div>
                                <div className="hotel">
                                    <RiHotelBedLine/>
                                    <span className="dates">Vacation Dates</span>
                                </div>
                                <div className="flight">
                                    <RiAirplaneLine/>
                                    <span className="details">Flight Details</span>
                                </div>
                            </div>
                        </a>
                        <a href="/orders" className="card">
                            <div className="picture">
                                <img src="../images/login.jpg" alt="Destination Picture"/>
                            </div>
                            <div className="content">
                                <h2>Name of the Place</h2>
                                <div className="title">
                                    <span className="price">$300</span>
                                    <span className="discount">$900</span>
                                </div>
                                <div className="hotel">
                                    <RiHotelBedLine/>
                                    <span className="dates">Vacation Dates</span>
                                </div>
                                <div className="flight">
                                    <RiAirplaneLine/>
                                    <span className="details">Flight Details</span>
                                </div>
                            </div>
                        </a>
                        <a href="/orders" className="card">
                            <div className="picture">
                                <img src="../images/login.jpg" alt="Destination Picture"/>
                            </div>
                            <div className="content">
                                <h2>Name of the Place</h2>
                                <div className="title">
                                    <span className="price">$300</span>
                                    <span className="discount">$500</span>
                                </div>
                                <div className="hotel">
                                    <RiHotelBedLine/>
                                    <span className="dates">Vacation Dates</span>
                                </div>
                                <div className="flight">
                                    <RiAirplaneLine/>
                                    <span className="details">Flight Details</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
