import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaFacebook, FaGoogle, FaEnvelope } from 'react-icons/fa';
import '../MobileLogin.css'; // Create a separate CSS file for styling

function MobileLogin() {
    const location = useLocation();
    const [phoneNumberPrefix, setPhoneNumberPrefix] = useState('+972');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberPrefixChange = (event) => {
        setPhoneNumberPrefix(event.target.value);
        setIsDropdownOpen(false); // Close the dropdown after selecting a prefix
        setPhoneNumber(event.target.value); // Automatically set the phone number as the selected prefix
    };

    const handlePhoneNumberChange = (event) => {
        // Only allow numbers and limit input to 10 digits
        const phoneRegex = /^[0-9]{0,10}$/;
        const value = event.target.value;
        if (phoneRegex.test(value)) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission with phone number
        console.log(phoneNumberPrefix + phoneNumber);
    };

    const { state } = location;
    const signInWithPhone = state?.signInWithPhone;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="login-container-phone">
            <div className="form-container">
                <form className="login-form-phone" onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <h2>Sign in with your phone</h2>
                    <div className="form-field">
                        <label>Phone number:</label>
                        <div className={`prefix-select ${isDropdownOpen ? 'open' : ''}`}>
                            <div className="prefix-select-header" onClick={handleDropdownToggle}>
                                <span>{phoneNumberPrefix}</span>
                                <FaChevronDown className={`prefix-icon ${isDropdownOpen ? 'open' : ''}`} />
                            </div>
                            {isDropdownOpen && (
                                <div className="prefix-options">
                                    <span onClick={() => handlePhoneNumberPrefixChange({ target: { value: '+972' } })}>Israel (+972)</span>
                                    <span onClick={() => handlePhoneNumberPrefixChange({ target: { value: '+1' } })}>USA (+1)</span>
                                    <span onClick={() => handlePhoneNumberPrefixChange({ target: { value: '+44' } })}>UK (+44)</span>
                                    {/* Add other prefix options here */}
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            style={{ borderColor: phoneNumberPrefix ? '#4CAF50' : '#ccc' }} // Turn the field green if a prefix is selected
                        />
                    </div>
                    {/* Always render the button */}
                    <button type="submit" className="login-button-phone">
                        Continue with phone
                    </button>
                </form>
            </div>


            {/* Icons and line */}
            <div className="login-options-phone">
                <hr className="line-phone" />
                <span className="or-text-phone">or use one of these options</span>
                <div className="login-icons-phone">
                    <Link to="https://www.facebook.com/" target="_blank" className="icon-container-phone">
                        <FaFacebook className="icon-phone-facebook" />
                    </Link>
                    <Link to="https://www.google.com/" target="_blank" className="icon-container-phone">
                        <FaGoogle className="icon-phone-google" />
                    </Link>
                    <Link to="/log-in" target="_blank" className="icon-container-phone">
                        <FaEnvelope className="icon-phone" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MobileLogin;
