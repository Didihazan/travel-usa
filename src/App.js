import React, { useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Login from "./components/pages/Login";
import './App.css';

function App() {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
  return (
      <>
        <Router>
          <Navbar isAuthenticated = {isAuthenticated} />
          <Switch>
            <Route path='/'  element={<Home/>} />
            <Route path='/services' element={<Services/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/log-in' element={<Login setIsAuthenticated = {setIsAuthenticated}/>} />
          </Switch>
        </Router>
      </>
  );
}

export default App;