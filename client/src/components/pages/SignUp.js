import React, {useState} from 'react';
import '../Signup.css';
import '../../App.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function SignUp(setIsAuthenticated) {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        areaCode:'',
        phone: '',
        password: ''
    });
    const [prefix, setPrefix] = useState('050'); // State for prefix selection

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'phone') {
            const inputValue = value
            const numericValue = inputValue.replace(/\D/g, '').slice(0, 7);
            if (inputValue !== numericValue) {
                event.target.setCustomValidity('Numbers only');
                event.target.reportValidity();
                event.target.value = numericValue
            }
        } else {
            event.target.setCustomValidity('');
        }
        setFormData({
            ...formData,
            [event.target.name]: event.target.value

        });

    };

    const handlePrefixChange = (event) => {
        setPrefix(event.target.value);
    };
    const validateEmailAndPassword = (email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/;
        const isValidEmail = emailRegex.test(email);
        const isValidPassword = passwordRegex.test(password);
        return {
            isValidEmail,
            isValidPassword
        };
    };
    const validateForm = (phoneNumber, email) => {
        const phoneNumberRegex = /^(050-|052-|053-|054-|055-|058-)-?\d{7}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const errors = {};

        if (!phoneNumberRegex.test(phoneNumber)) {
            errors.phoneNumber =
                'Invalid phone number.';
        }

        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format. Please enter a valid email address.';
        }

        return errors;
    };

    const HandleSinUp =  async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        const { isValidEmail, isValidPassword } = validateEmailAndPassword(email, password);
        if(!isValidEmail){
            event.target[2].setCustomValidity('Invalid email format. Please enter a valid email address.');
            return event.target[2].reportValidity();
        }
        if(!isValidPassword){
            event.target[4].setCustomValidity('The password must contain at least one uppercase letter, one lowercase letter, and one number')
            return event.target[4].reportValidity();
        }

        const url = 'http://localhost:3001/users/signup'; // Replace with your API endpoint URL

        const Data = {
            name:formData.name,
            lastName: formData.lastName,
            email: formData.email,
            // phone:"0503543823",
            phone:formData.areaCode+formData.phone,
            password: formData.password
        };

        try {
            const response = await axios.post(url, Data);
            return navigate('/log-in')
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === 'This email exists in the system') {
                event.target[2].setCustomValidity('Email already exists. Please enter a different email address.');
                return event.target[2].reportValidity();
            }
            console.error(error); // Handle any errors here
        }
    };


    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={HandleSinUp}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name.."
                    className="signup-input"
                    onChange={handleChange}
                    value={formData.name}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name.."
                    className="signup-input"
                    onChange={handleChange}
                    value={formData.lastName}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email.."
                    className="signup-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className="phone-input-group">
                    <select
                        name="prefix"
                        className="phone-prefix"
                        onChange={handlePrefixChange}
                        value={prefix}
                    >
                        <option value="050-">050-</option>
                        <option value="052-">052-</option>
                        <option value="053-">053-</option>
                        <option value="054-">054-</option>
                        <option value="055-">055-</option>
                        <option value="058-">058-</option>
                    </select>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number.."
                        className="phone-number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password.."
                    className="signup-input"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                <button type="submit" className="signup-button">
                    Sign up
                </button>
            </form>
        </div>

    );
}
