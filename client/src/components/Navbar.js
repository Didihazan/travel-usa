import React, {useEffect, useState} from 'react';
import {Button} from './Button';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import './Navbar.css';
import LogOut from "./pages/LogOut";

function Navbar(prop) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const navigate = useNavigate();
    const [test,setTest]=useState(false)
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
        showButton();
        fetchData()
    }, []);
    useEffect(() => {
        if(prop.user.length >0)getOrders()
    }, [prop.updateOrders, prop.checkVacation, prop.user]);

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

    const getOrders = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/order/${prop.user}`);
            const data = res.data.orders;
            prop.setCartItemsCount(data.length)
            if(prop.checkVacation) {
                const vacationExists = data.some(order => order.cardId._id === prop.checkVacation._id);
                if (vacationExists) {
                    // Remove the vacation from the list (if it exists) and move it to the top
                    const filteredOrder = data.filter(order => order.cardId._id === prop.checkVacation._id);
                    const filteredOrders = data.filter(order => order.cardId._id !== prop.checkVacation._id);
                    return prop.setAllOrders([...filteredOrder, ...filteredOrders]);
                } else
                    return prop.setAllOrders([prop.checkVacation, ...data]);
            }
            return  prop.setAllOrders([...data])
        } catch (error) {
            console.error(error);
        }
    };





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

                    {prop.isAuthenticated&&<li className='shopping-cart'>
                        <Link
                            to={prop.isAuthenticated?'/orders':''}
                            className='nav-links-icon'
                            onClick={closeMobileMenu}
                        >
                            <i className='fas fa-shopping-cart'/>
                            <span className='cartItemCount'>{prop.cartItemsCount ? prop.cartItemsCount : ''}</span>
                        </Link>
                    </li>}

                    <li className='login-button-navbar'>
                        <Link
                            to={prop.isAuthenticated?'/Log-out':'/log-in'}
                            className='login-nav-links'
                            onClick={closeMobileMenu}
                        >
                            {prop.isAuthenticated?<LogOut/>:'LOG IN'}
                        </Link>
                    </li>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
