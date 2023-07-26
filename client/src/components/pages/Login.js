import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaMobileAlt } from "react-icons/fa";
import "../Login.css";
import "../../App.css";
import axios from "axios";

export default function Login(prop) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        rememberMe:false,
        password: ''
    });

    const HandleLogin = async (event) => {
        event.preventDefault();
        const url = "http://localhost:3001/users/login";
        const Data = {
            email: formData.email,
            rememberMe:formData.rememberMe,
            password: formData.password
        }
        try {
            const res= await axios.post(url, Data);
            const token = res.data.token;
            prop.setIsAuthenticated(true)
            prop.setuser(res.data.userId)
            localStorage.setItem('token', token);
            return navigate("/")
        }catch (error){
            console.error(error);
        }
    };
    const handleChange = event => {
        const { name, value, checked, type } = event.target;
        const newValue = type === 'checkbox' ? checked : value; // Use checked for checkboxes

        setFormData({
            ...formData,
            [name]: newValue
        });

    };


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={HandleLogin}>
                <div className="log-in-label">Log in<br></br></div>
                <div className="sign-up-link"><br></br>
                        Need an account? <a href="/sign-up" className="signup-href">Sign up</a>
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="Email.."
                    defaultValue={formData.email}
                    onChange={handleChange}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password.."
                    className="login-input"
                    name="password"
                    onChange={handleChange}
                    defaultValue={formData.password}
                />
                <div className="remember-me">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="login-button">
                    Log In
                </button>
            </form>

            <div className="login-options">
                <hr className="line" />
                <span className="or-text">or use one of these options</span>
                <div className="login-icons">
                    <Link to="https://www.facebook.com/" target="_blank" className="icon-container">
                        <FaFacebook className="icon-facebook" />
                    </Link>
                    <Link to="https://www.google.com/" target="_blank" className="icon-container">
                        <FaGoogle className="icon-google" />
                    </Link>
                    <Link to="/mobile-login" target="_blank" className="icon-container">
                        <FaMobileAlt className="icon" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
