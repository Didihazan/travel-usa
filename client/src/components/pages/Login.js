import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaFacebook, FaGoogle, FaMobileAlt} from "react-icons/fa";
import "../Login.css";
import "../../App.css";


export default function Login(prop) {
    let navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    const HandleLogin = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const pass = event.target[1].value;

        let url = "http://localhost:3001/users";
        fetch(url)
            .then((result) => result.json())
            .then((data) => {
                data.forEach((user) => {
                    if (user.password === pass && user.userName === name) {
                        prop.setIsAuthenticated(true);
                        prop.setUser(user);
                    }
                });
            });

        if (prop.user) {
            return navigate("/");
        }
    };

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (

        <div className="login-container">
            <form className="login-form" onSubmit={HandleLogin}>
                <input
                    type="email"
                    placeholder="Email.."
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password.."
                    className="login-input"
                />
                <div className="remember-me">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="login-button">
                    Log In
                </button>
            </form>
            <div className="login-options">
                <hr className="line"/>
                <span className="or-text">or use one of these options</span>
                <div className="login-icons">
                    <div className="icon-container">
                        <FaFacebook className="icon"/>
                    </div>
                    <div className="icon-container">
                        <FaGoogle className="icon"/>
                    </div>
                    <div className="icon-container">
                        <FaMobileAlt className="icon"/>
                    </div>
                </div>
            </div>
        </div>

    );
}
