import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(prop) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

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
    }, []);

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

                        <li>
                            <Link
                                to='/log-in'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                Log in
                            </Link>
                        </li>
                    </ul>
                    {button && !prop.isAuthenticated && <Button buttonStyle='btn--outline' path='/sign-up'>SIGN UP</Button>}
                    {button && !prop.isAuthenticated &&<Button buttonStyle='btn--outline' path='/log-in'>LOG IN</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;