import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import {BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom';
import Services from './components/pages/Services';
import BookingForm from "./components/pages/Stays";
import Gallery from "./components/pages/Gallery";
import SignUp from './components/pages/SignUp';
import Login from "./components/pages/Login";
import MobileLogin from "./components/pages/MobileLogin";
import Orders from "./components/pages/Orders";
import './App.css';
import LogOut from "./components/pages/LogOut";



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({})
    return (
        <>
            <Router>
                <Navbar isAuthenticated={isAuthenticated}
                        setIsAuthenticated={setIsAuthenticated}
                        setuser={setUser}/>
                <Switch>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/services' element={isAuthenticated?<Services/>:<Login/>}/>
                    <Route path='/stays' element={isAuthenticated?<BookingForm/>:<Login/>}/>
                    <Route path='/gallery' element={isAuthenticated?<Gallery/>:<Login/>}/>
                    <Route path='/sign-up' element={<SignUp/>}/>
                    <Route path='/log-in'
                           element={<Login setIsAuthenticated={setIsAuthenticated} setuser={setUser}/>}/>
                    <Route path='/orders' element={isAuthenticated?<Orders/>:<Login/>}/>
                    <Route path='/mobile-login' element={<MobileLogin/>}/>
                    <Route path='/Log-out' element={isAuthenticated?<LogOut/>:<Home/>}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
