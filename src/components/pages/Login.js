import React from 'react';
import '../Login.css'
import '../../App.css';

export default function Login() {
    return (
        <div className="login-container">
            <form className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                />
                <button type="submit" className="login-button">
                    Log In
                </button>
            </form>
        </div>
    );
}
//hshshs