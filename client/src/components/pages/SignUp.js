import '../Signup.css';
import '../../App.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useState} from "react";

export default function SignUp() {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        prefix:'050',
        phone: '',
        password: ''
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'phone') {
            const inputValue = value
            const numericValue = inputValue.replace(/\D/g, '').slice(0, 7);
            if (inputValue !== numericValue) {
                if (inputValue.length >= 7) {
                    event.target.value = numericValue;
                } else {
                    event.target.setCustomValidity('Numbers only');
                    event.target.reportValidity();
                    event.target.value = numericValue
                }
            } else {
                event.target.setCustomValidity('');
            }
        }
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    const validateEmailAndPassword = (email, password,phone) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/;
        const isValidEmail = emailRegex.test(email);
        const isValidPassword = passwordRegex.test(password);
        const isValidPhone= phone.length ===7
        return {
            isValidEmail,
            isValidPassword,
            isValidPhone
        };
    };


    const HandleSinUp =  async (event) => {
        event.preventDefault();
        const { email, password,phone } = formData;
        const { isValidEmail, isValidPassword,isValidPhone } = validateEmailAndPassword(email, password,phone);
        if(!isValidEmail){
            const emailInput = event.target[2];
            emailInput.setCustomValidity('Invalid email format. Please enter a valid email address.');
            emailInput.addEventListener('input',()=>{
                emailInput.setCustomValidity('');
            })
            return emailInput.reportValidity();
        }

        if(!isValidPhone){
            const phoneInput = event.target[4]
            phoneInput.setCustomValidity('Must have 7 characters for phone number')
            phoneInput.addEventListener('input',()=>{
                phoneInput.setCustomValidity('');
            })
            return phoneInput.reportValidity();
        }

        if(!isValidPassword){
            const passwordInput = event.target[5];
            passwordInput.setCustomValidity('The password must contain at least one uppercase letter, one lowercase letter, and one number')
            passwordInput.addEventListener('input', () => {
                passwordInput.setCustomValidity('');
            });
            return passwordInput.reportValidity();
        }

        console.log(formData.password)
        const url = 'http://localhost:3001/users/signup'; // Replace with your API endpoint URL

        const Data = {
            name:formData.name,
            lastName: formData.lastName,
            email: formData.email,
            phone:formData.prefix+formData.phone,
            password: formData.password
        };

        try {
            await axios.post(url, Data);
            return navigate('/log-in')
        } catch (error) {
            const { response } = error;
            if (response && response.status === 400) {
                const { message } = response.data;
                if (message === 'This email exists in the system') {
                    const emailInput = event.target[2];
                    emailInput.setCustomValidity('Email already exists. Please enter a different email address.');
                    emailInput.addEventListener('input', () => {
                        emailInput.setCustomValidity('');
                    });
                    return emailInput.reportValidity();
                }
                if (message === 'This phone exists in the system') {
                    const phoneInput = event.target[4];
                    phoneInput.setCustomValidity('Phone number already exists. Please enter a different phone number.');
                    phoneInput.addEventListener('input', () => {
                        phoneInput.setCustomValidity('');
                    });
                    return phoneInput.reportValidity();
                }
            }
            console.error(error); // Handle any other errors here
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
                        value={formData.prefix}
                        onChange={handleChange}
                    >
                        <option value="050">050-</option>
                        <option value="052">052-</option>
                        <option value="053">053-</option>
                        <option value="054">054-</option>
                        <option value="055">055-</option>
                        <option value="058">058-</option>
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
