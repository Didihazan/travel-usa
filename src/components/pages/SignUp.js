import React from 'react';
import '../Signup.css'
import '../../App.css';
import Layout from "../Layout";

export default function SignUp() {
    const handlePhoneNumberChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, '').slice(0, 10);
        if (inputValue !== numericValue) {
            event.target.value = numericValue;
            event.target.setCustomValidity('Numbers only');
        } else {
            event.target.setCustomValidity('');
        }
    };

    return (
        <Layout>
        <div className="signup-container">
            <form className="signup-form">
                <input
                    type="text"
                    placeholder="Name.."
                    className="signup-input"
                />
                <input
                    type="text"
                    placeholder="Last Name.."
                    className="signup-input"
                />
                <input
                    type="email"
                    placeholder="Email.."
                    className="signup-input"
                />
                <input
                    type="tel"
                    placeholder="Phone Number.."
                    className="signup-input"
                    onChange={handlePhoneNumberChange}
                />
                <input
                    type="password"
                    placeholder="Password.."
                    className="signup-input"
                />
                <button type="submit" className="signup-button">
                    Sign up
                </button>
            </form>
        </div>
        </Layout>
    );
}

