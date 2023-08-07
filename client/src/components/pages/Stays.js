import React, { useEffect, useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Stays.css';
import '../../App.css';
import Layout from "../Layout";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
});

export default  function BookingForm() {
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numPeople, setNumPeople] = useState(1);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
   const [countries,setCountries]=useState([])
    const [cities,setCities]=useState([])
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [destinationsData,setDestinationsData]=useState(null)
    const [selectedCountry, setSelectedCountry] =useState(false)

    const fetchCountries = useCallback(async () => {
        const response = await instance.get("/cities/state");
        const countries = response.data;
        setCountries(countries);
    },[]);

   useEffect(()=>{
       fetchCountries()
       fetchData()

   },[])
    const fetchData = async ()=>{
        const url = "http://localhost:3001/cards/stayingCards"
        const  response = await axios.get(url)
        const data = response.data;
        setDestinationsData(data.stayingCards)
    }
    const getCities = async country =>{
        const response = await axios.get(`http://localhost:3001/cities/${country}`)
        const data =  response.data;
        setCities(data)
    }
    const handleCityChange = useCallback((event) => {
        setCity(event.target.value)
        const word = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        const filteredCities = [];
        for (const city of cities) {
            if (event.target.value.length >0 && city.startsWith(word)) {
                filteredCities.push(city);
            }
        }
        setFilteredCities(filteredCities);
    },[cities])
    const handleAreaChange = (event) => {
        setArea(event.target.value);
        setSelectedCountry(false)
        setCity('')
        const word = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        if(countries.includes(word)) {
            setArea(word)
            setSelectedCountry(true)
            return getCities(word)
        }
        const filteredCountries = [];
        for (const country of countries) {
            if (event.target.value.length >0 && country.startsWith(word)) {
                filteredCountries.push(country);
            }
        }
        setFilteredCountries(filteredCountries);
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

        const formData = new FormData(event.target);
        const formDataObject = {};

        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        const day = checkInDate.getDate();
        const month = checkInDate.getMonth() + 1; // Months are zero-based, so adding 1
        const year = checkInDate.getFullYear();

        console.log("Day:", day);
        console.log("Month:", month);
        console.log("Year:", year);
        if(!formDataObject.city){
            const countryInput = event.target[0];
            countryInput.setCustomValidity('country not found');
            countryInput.addEventListener('input', () => {
                countryInput.setCustomValidity('');
            });
            return countryInput.reportValidity();
        }
        console.log(event.target[0].value);
        // Perform search or other actions here
    };



    const currentDate = new Date(); // תאריך היום הנוכחי

    const openPopup = (destination) => {
        setSelectedDestination(destination);
    };

    const closePopup = () => {
        setSelectedDestination(null);
    };
    const addDays = useCallback((date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
        },[])

    return (
        <Layout>
            <div className="main-stays">
                <div className="h2">
                    <h2>Resorts</h2>
                </div>
                <div className="h3">
                    <h3>Treat yourself! Your dream resort stay is just a few clicks away.</h3>
                </div>
                {/*Form*/}
                <div className="booking-form-container">
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label>Country:</label>
                            {countries.length >0 &&(<input
                                type="text"
                                name="country"
                                placeholder="Enter country"
                                value={area}
                                onChange={handleAreaChange}
                                required
                            />
                            )}
                        </div>
                        {(selectedCountry || cities.length <1) &&(
                        <div className="form-field">
                            <label>City:</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                value={city}
                                onChange={handleCityChange}
                                required
                            />
                        </div>
                        )}
                        <div className="form-field">
                            <label>Check-in Date:</label>
                            <DatePicker
                                selected={checkInDate}
                                name="check-in"
                                onChange={handleCheckInDateChange}
                                placeholderText="Check-in date"
                                dateFormat="dd/MM/yyyy"
                                minDate={currentDate}
                                isClearable
                                showPopperArrow={false}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label>Check-out Date:</label>
                            <DatePicker
                                selected={checkOutDate}
                                name="check-out"
                                onChange={handleCheckOutDateChange}
                                placeholderText="Check-out date"
                                dateFormat="dd/MM/yyyy"
                                minDate={checkInDate ? addDays(checkInDate, 1) : currentDate}
                                isClearable
                                showPopperArrow={false}
                                required
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
                                    name="people"
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
            </div>

            {/*Cards*/}
            <div className="featured-destinations">
                {destinationsData && destinationsData.map((destination) => (
                    <div className="destination-card" key={destination.id}>
                        <img
                            src={`${instance.defaults.baseURL}/images/${destination.imageSrc}`}
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

            <div className="pSentence">
                <p>“We travel not to escape life, but for life not to escape us”</p>
            </div>
        </Layout>
    );
}
