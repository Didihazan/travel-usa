import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import {BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
import Services from './components/pages/Services';
import BookingForm from "./components/pages/Stays";
import Gallery from "./components/pages/Gallery";
import SignUp from './components/pages/SignUp';
import Login from "./components/pages/Login";
import './App.css';



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
                    <Route path='/sign-up' element={<SignUp />}/>
                    <Route path='/log-in'
                           element={<Login setIsAuthenticated={setIsAuthenticated}  setuser={setUser}/>}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;