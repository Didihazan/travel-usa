import React, {useState} from 'react';
import '../Signup.css'
import '../../App.css';

import axios, {request} from 'axios';
import {useNavigate} from "react-router-dom";
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
    // Checking the correctness of a phone number end amail
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const HandleSinUp =  async (event) => {
        event.preventDefault();
        const check = validateEmail(event.target[2].value)
        console.log(Object.keys(check).length ===2,check.email)
        if(!check){
            event.target[2].setCustomValidity('Invalid email format. Please enter a valid email address.');
            return event.target[2].reportValidity();
        }
        const url = "http://localhost:3001/users/signup"; // Replace with your API endpoint URL

        const Data = {
            name:formData.name,
            lastName: formData.lastName,
            email: formData.email,
            phone:formData.areaCode+formData.phone,
            password: formData.password
        };

        try {
            const response = await axios.post(url, Data);
            return navigate('/log-in')
        } catch (error) {
            console.error(error); // Handle any errors here
        }
    };


    return (

        <div className="signup-container">
            <form className="signup-form" onSubmit={HandleSinUp}>
                <input
                    type="text"
                    name= "name"
                    placeholder="Name.."
                    className="signup-input"
                    onChange={handleChange}
                    value={formData.name}
                    // required
                />
                <input
                    type="text"
                    name= "lastName"
                    placeholder="Last Name.."
                    className="signup-input"
                    onChange={handleChange}
                    value={formData.lastName}
                    required
                />
                <input
                    type="email"
                    name= "email"
                    placeholder="Email.."
                    className="signup-input"
                    value={formData.email}
                    onChange={handleChange}
                    required

                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number.."
                    className="signup-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name= "password"
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

