import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import '../Services.css';
import {RiCalendarLine, RiHotelBedLine, RiMapPinLine, RiSearchLine, RiUserLine} from 'react-icons/ri';
import {FaPlane} from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from 'moment';


function RiAirplaneLine() {
    return null;
}

export default function Services(props) {
    const [cards,setCards]=useState(null)
    const [numPeople, setNumPeople] = useState(1);
    const [priceRange, setPriceRange] = useState({min: 0, max: 1000});
    const [locationFilter, setLocationFilter] = useState('');
    const [sleepingPlacesFilter, setSleepingPlacesFilter] = useState(false);
    // Add more filter states as needed
    const fetchData = async ()=>{
        const url = "http://localhost:3001/cards/getAll"
        const  response = await axios.get(url)
        const data = response.data;
        setCards(data.allCards)
        console.log(data.allCards[4].price)
    }
    useEffect(()=>{
        fetchData()
    },[])
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

    const handlePriceRangeChange = (event) => {
        const value = parseInt(event.target.value);
        const {min, max} = priceRange;
        if (event.target.id === 'priceMin' && value < max) {
            setPriceRange({min: value, max});
        } else if (event.target.id === 'priceMax' && value > min) {
            setPriceRange({min, max: value});
        }
    };

    const handleLocationFilterChange = (event) => {
        setLocationFilter(event.target.value);
    };

    const handleSleepingPlacesFilterChange = (event) => {
        setSleepingPlacesFilter(event.target.checked);
    };

    // Apply filtering logic based on the selected filter options
    const filterResults = () => {
        // Implement filtering logic based on the selected filters
        // Update the display of results accordingly
    };


    const [value, setValue] = useState(500); // Default value

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };


    return (
        <Layout>
            <div className="main-service">
                <div className="search-form">
                    <div className="form-group">
                        <label htmlFor="location" className="field-label">
                            <RiMapPinLine className="field-icon"/>
                            Location
                        </label>
                        <input className="input-form" type="text" id="location" placeholder="Enter a location"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="field-label">
                            <RiCalendarLine className="field-icon"/>
                            Date
                        </label>
                        <input className="input-form" type="date" id="date"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="guests" className="field-label">
                            <RiUserLine className="field-icon"/>
                            Guests
                        </label>
                        <div className="guests-input">
                            <button onClick={handleDecrement}>-</button>
                            <input
                                className="input-form"
                                type="number"
                                id="guests"
                                min="1"
                                value={numPeople}
                                onChange={handleNumPeopleChange}
                                placeholder="Number of guests"
                            />
                            <button onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                    <div className="search-button-service">
                        <button type="submit" id="search" className="search-button-service">
                            <RiSearchLine/>
                        </button>
                    </div>
                </div>
                <div className="service-page">
                    <div className="desktop-sidebar">
                        {/*<div className="property-name-search">*/}
                        {/*    <label htmlFor="property-name">Search by property name</label>*/}
                        {/*    <br></br> <input className="search-filter" type="text" id="property-name"*/}
                        {/*                     placeholder="e.g. Marriott"/>*/}
                        {/*</div>*/}

                        <h3 className="h3-filter">Filter by</h3>
                        <div className="category">
                            <div className="Popular-filters">
                                <h4 className="h4-filter">Popular filters</h4>
                                <div>
                                    <input type="checkbox" id="airport-shuttle"/>
                                    <label htmlFor="airport-shuttle">
                                        <span>Airport shuttle included</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="ohare"/>
                                    <label htmlFor="ohare">
                                        <span>O'Hare</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="breakfast-included"/>
                                    <label htmlFor="breakfast-included">
                                        <span>Breakfast included</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="parking"/>
                                    <label htmlFor="parking">
                                        <span>Parking</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="pool"/>
                                    <label htmlFor="pool">
                                        <span>Pool</span>
                                    </label>
                                </div>
                            </div>

                            <div className="filter-section">
                                <div className="range-slider">
                                    <h4 className="h4-filter">Price per night</h4>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={value}
                                        onChange={handleInputChange}
                                        className="range-slider__range"
                                    />
                                    <span className="range-slider__value">{value}</span>
                                </div>
                            </div>

                            <div className="guest-rating">
                                <h4 className="h4-filter">Guest rating</h4>
                                <legend>guestRating</legend>
                                <div>
                                    <input type="radio" id="any" name="guest-rating" checked/>
                                    <label htmlFor="any">
                                        <span>Any</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" id="wonderful" name="guest-rating"/>
                                    <label htmlFor="wonderful">
                                        <span>Wonderful 9+</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" id="very-good" name="guest-rating"/>
                                    <label htmlFor="very-good">
                                        <span>Very good 8+</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="radio" id="good" name="guest-rating"/>
                                    <label htmlFor="good">
                                        <span>Good 7+</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="category">
                            <div className="star-rating">
                                <h4 className="h4-filter">Star rating</h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="rating-1"/>
                                        <label htmlFor="rating-1">
                                            <span className="star-rating"/> 1 &#9733;
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="rating-2"/>
                                        <label htmlFor="rating-2">
                                            <span className="star-rating"/> 2 &#9733;
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="rating-3"/>
                                        <label htmlFor="rating-3">
                                            <span className="star-rating"/> 3 &#9733;
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="rating-4"/>
                                        <label htmlFor="rating-4">
                                            <span className="star-rating"/> 4 &#9733;
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="rating-5"/>
                                        <label htmlFor="rating-5">
                                            <span className="star-rating"/> 5 &#9733;
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="Facilities">
                            <h4 className="h4-filter">Facilities</h4>
                            <ul>
                                <li>
                                    <input type="checkbox" id="amenities-airport-shuttle"/>
                                    <label htmlFor="amenities-airport-shuttle">Airport shuttle included</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="amenities-parking"/>
                                    <label htmlFor="amenities-parking">Parking</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="amenities-pool"/>
                                    <label htmlFor="amenities-pool">Pool</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="amenities-pet-friendly"/>
                                    <label htmlFor="amenities-pet-friendly">Pet friendly</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="amenities-hot-tub"/>
                                    <label htmlFor="amenities-hot-tub">Hot tub</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="amenities-kitchen"/>
                                    <label htmlFor="amenities-kitchen">Kitchen</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="amenities-wifi-included"/>
                                    <label htmlFor="amenities-wifi-included">WiFi included</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="amenities-spa"/>
                                    <label htmlFor="amenities-spa">Spa</label>
                                </li>
                            </ul>
                        </div>

                        <div className="Room-Features">
                            <h4 className="h4-filter">Room Features</h4>
                            <ul>
                                <li>
                                    <input type="checkbox" id="room-cribs"/>
                                    <label htmlFor="room-cribs">Cribs</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="room-ocean-view"/>
                                    <label htmlFor="room-ocean-view">Ocean view</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="room-outdoor-space"/>
                                    <label htmlFor="room-outdoor-space">Outdoor space</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="room-restaurant"/>
                                    <label htmlFor="room-restaurant">Restaurant</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="room-electric-car-charging"/>
                                    <label htmlFor="room-electric-car-charging">Electric car charging station</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="room-air-conditioned"/>
                                    <label htmlFor="room-air-conditioned">Air conditioned</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="room-gym"/>
                                    <label htmlFor="room-gym">Gym</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="room-water-park"/>
                                    <label htmlFor="room-water-park">Water park</label>
                                </li>
                            </ul>


                            <div className="category">
                                <h4 className="h4-filter"><br></br>Accessibility</h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="accessibility-orbitz-rewards"/>
                                        <label htmlFor="accessibility-orbitz-rewards">Orbitz Rewards</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="accessibility-vip-access"/>
                                        <label htmlFor="accessibility-vip-access">VIP Access properties</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="accessibility-in-room-accessibility"/>
                                        <label htmlFor="accessibility-in-room-accessibility">In-room accessibility</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="accessibility-accessible-bathroom"/>
                                        <label htmlFor="accessibility-accessible-bathroom">Accessible bathroom</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="accessibility-elevator"/>
                                        <label htmlFor="accessibility-elevator">Elevator</label>
                                    </li>
                                </ul>
                            </div>

                            <div className="category">
                                <h4 className="h4-filter">Payment type</h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="payment-fully-refundable"/>
                                        <label htmlFor="payment-fully-refundable">Fully refundable</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="payment-reserve-now-pay-later"/>
                                        <label htmlFor="payment-reserve-now-pay-later">Reserve now, pay later</label>
                                    </li>
                                </ul>
                            </div>

                            <div className="category">
                                <h4 className="h4-filter">Property type</h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="property-motel"/>
                                        <label htmlFor="property-motel">Motel</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="property-hotel"/>
                                        <label htmlFor="property-hotel">Hotel</label>
                                    </li>

                                    <li>
                                        <input type="checkbox" id="property-resort"/>
                                        <label htmlFor="property-resort">Hotel resort</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="property-apart-hotel"/>
                                        <label htmlFor="property-apart-hotel">Apart-hotel</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="property-apartment"/>
                                        <label htmlFor="property-apartment">Apartment</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="property-condo"/>
                                        <label htmlFor="property-condo">Condo</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="property-cruise"/>
                                        <label htmlFor="property-cruise">Cruise</label>
                                    </li>
                                </ul>
                            </div>

                            <div className="category">
                                <h4 className="h4-filter">Neighborhood</h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="neighborhood-chicago-vicinity"/>
                                        <label htmlFor="neighborhood-chicago-vicinity">Chicago (and vicinity)</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="neighborhood-ohare"/>
                                        <label htmlFor="neighborhood-ohare">O'Hare</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="neighborhood-downtown-chicago"/>
                                        <label htmlFor="neighborhood-downtown-chicago">Downtown Chicago</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="neighborhood-rosemont"/>
                                        <label htmlFor="neighborhood-rosemont">Rosemont</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="neighborhood-union-station"/>
                                        <label htmlFor="neighborhood-union-station">Chicago Union Station</label>
                                    </li>
                                </ul>
                            </div>

                            <div className="category">
                                <h4 className="h4-filter">Popular locations</h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="location-university-chicago"/>
                                        <label htmlFor="location-university-chicago">University of Chicago</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="location-wrigley-field"/>
                                        <label htmlFor="location-wrigley-field">Wrigley Field</label>
                                    </li>

                                    <li>
                                        <input type="checkbox" id="location-united-center"/>
                                        <label htmlFor="location-united-center">United Center</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="location-soldier-field"/>
                                        <label htmlFor="location-soldier-field">Soldier Field</label>
                                    </li>
                                </ul>
                            </div>

                            <div className="category">
                                <h4 className="h4-filter">Meal plans available</h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="meal-breakfast-included"/>
                                        <label htmlFor="meal-breakfast-included">Breakfast included</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="meal-lunch-included"/>
                                        <label htmlFor="meal-lunch-included">Lunch included</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="meal-dinner-included"/>
                                        <label htmlFor="meal-dinner-included">Dinner included</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="meal-all-inclusive"/>
                                        <label htmlFor="meal-all-inclusive">All inclusive</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="cards">
                        {cards && cards.map(card => (
                            <Link to="/orders" className="card" key={card.id} onClick={()=>{props.setCheckVacation(card)}}>
                                <div className="picture">
                                    <img src={`http://localhost:3001/images/${card.imageSrc}`} alt="Destination Picture" />
                                </div>
                                <div className="content">
                                    <h2>{card.name_place}</h2>
                                    <div className="title">
                                        <span className="price">{card.price}</span>
                                        <span className="discount">{card.discount}</span>
                                    </div>
                                    <div className="hotel">
                                        <RiHotelBedLine />
                                       <span className="dates"> {moment(card.check_in).format('MMM DD')} - {moment(card.check_out).format('MMM DD, YYYY')}</span>
                                    </div>
                                    <div className="flight">
                                        <FaPlane />
                                        <span className="details">{card.Flight_Details}</span>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>

                </div>

            </div>
        </Layout>
    );

}
