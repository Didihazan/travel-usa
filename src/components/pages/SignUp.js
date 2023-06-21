import React from 'react';
import '../Signup.css'
import '../../App.css';

export default function SignUp() {
    return (
        <div className="signup-container">
            <form className="signup-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="signup-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="signup-input"
                />
                <button type="submit" className="signup-button">
                    Sign up
                </button>
            </form>
        </div>
    );
}
