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
    const [checkVacation , setCheckVacation] = useState(null)
    const [allOrders,setAllOrders]= useState(null)
    const [updateOrders,setUpdateOrders]=useState(false)
    const [cartItemsCount, setCartItemsCount] = useState(undefined);
    return (
        <>
            <Router>
                <Navbar isAuthenticated={isAuthenticated}
                        setIsAuthenticated={setIsAuthenticated}
                        setuser={setUser}
                        allOrders={allOrders}
                        setAllOrders={setAllOrders}
                        checkVacation={checkVacation}
                        updateOrders={updateOrders}
                        cartItemsCount={cartItemsCount}
                        setCartItemsCount={setCartItemsCount}
                        user={user}
                />
                <Switch>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/services' element={isAuthenticated?<Services setCheckVacation={setCheckVacation} />:<Login/>}/>
                    <Route path='/stays' element={isAuthenticated?<BookingForm/>:<Login/>}/>
                    <Route path='/gallery' element={isAuthenticated?<Gallery/>:<Login/>}/>
                    <Route path='/sign-up' element={<SignUp/>}/>
                    <Route path='/log-in'
                           element={<Login setIsAuthenticated={setIsAuthenticated} setuser={setUser}/>}/>
                    <Route path='/orders' element={isAuthenticated?<Orders checkVacation={checkVacation}
                                                                           user={user}
                                                                           updateOrders={updateOrders}
                                                                           setUpdateOrders={setUpdateOrders}
                                                                           allOrders={allOrders}
                                                                           setAllOrders={setAllOrders}
                    />:<Login/>}/>
                    <Route path='/mobile-login' element={<MobileLogin/>}/>
                    <Route path='/Log-out' element={isAuthenticated?<LogOut/>:<Home/>}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
