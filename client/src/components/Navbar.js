import React, {useEffect, useState} from 'react';
import {Button} from './Button';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import './Navbar.css';

function Navbar(prop) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const navigate = useNavigate();
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        console.log('nav')

        showButton();
        fetchData()
    }, []);
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            prop.setIsAuthenticated(true)
            try {
                const response = await axios.get('http://localhost:3001/users/token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                prop.setuser(response.data.userId)
                // Handle the response as needed
            } catch (error) {
                prop.setIsAuthenticated(false)
                console.log('Token is not valid');
                return navigate('/log-in')
            }
        } else {
            console.log('Token does not exist');
            return navigate('/log-in')
        }
    };

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        TRVL-USA
                        <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/stays'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Stays
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/services'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Services
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/gallery'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/sign-up'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                    {button && !prop.isAuthenticated && (
                        <Button buttonStyle='btn--outline' path='/sign-up'>
                            SIGN UP
                        </Button>
                    )}
                    <li className='login-button-navbar'>
                        <Link
                            to='/log-in'
                            className='login-nav-links'
                            onClick={closeMobileMenu}
                        >
                            LOG IN
                        </Link>
                    </li>
                    <li className='shopping-cart'>
                        <Link
                            to='/orders'
                            className='nav-links-icon'
                            onClick={closeMobileMenu}
                        >
                            <i className='fas fa-shopping-cart'/>
                        </Link>
                    </li>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
