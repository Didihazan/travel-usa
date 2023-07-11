import React, {useState} from 'react';
import '../Signup.css'
import '../../App.css';
import Layout from "../Layout";
import axios, {request} from 'axios';
import {useNavigate} from "react-router-dom";
import tr from "react-datepicker";

export default function SignUp(setIsAuthenticated) {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'phone') {
            const inputValue = value
            const numericValue = inputValue.replace(/\D/g, '').slice(0, 10);
            if (inputValue !== numericValue) {
                event.target.setCustomValidity('Numbers only');
                event.target.reportValidity();
                event.target.value = numericValue
            }
            else if(!/^(050|052|053|054|055|058)/.test(value)){
                event.target.setCustomValidity("'Invalid phone number. The number can only start with  050, 052, 053, 054, 055, or 058.'")

            } else {
                event.target.setCustomValidity('');
            }
        }

         if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                event.target.setCustomValidity('Invalid email format');
                event.target.reportValidity();
            } else {
                event.target.setCustomValidity('');
            }
        }

        setFormData({
            ...formData,
            [event.target.name]: event.target.value

        });

    };
    // Checking the correctness of a phone number end amail
    const validateForm = (phoneNumber, email) => {
        const phoneNumberRegex = /^(050|052|053|054|055|058)\d{7}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const errors = {};

        if (!phoneNumberRegex.test(phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number. Please enter a 10-digit number starting with 050, 052, 053, 054, 055, or 058.';
        }

        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format. Please enter a valid email address.';
        }

        return errors;
    };

    const HandleSinUp =  async (event) => {
        event.preventDefault();
        const check = validateForm(event.target[3].value,event.target[2].value)
        console.log(Object.keys(check).length ===2,check.email)
        // if(Object.keys(check).length ===2){
        //     event.target[2].setCustomValidity(check.email.value);
        //     event.target[2].reportValidity();
        //     event.target[3].setCustomValidity(check.phoneNumber.value);
        //     return event.target[3].reportValidity();
        // }
        console.log(Object.keys(check)[0],Object.keys(check).length)
        // event.target.forEach(e =>{
        //     console.log(e.value)
        // })
        console.log(event.target)
        event.target[3].setCustomValidity('Invalid email format');
        return event.target[3].reportValidity();

        const url = "http://localhost:3001/users/signup"; // Replace with your API endpoint URL

        const Data = {
            name:formData.name,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        };

        try {
            const response = await axios.post(url, Data);
            console.log(response.data); // Handle the response data here
            // setIsAuthenticated(true)
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
                <select name="select" id="">

                </select>
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

