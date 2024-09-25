import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Products from './components/Products'; // Import Products component
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard component
import Home from'./components/Home';
import ManagePlayers from './components/ManagePlayers';
import Payment from './components/Payment'; // Adjust the path if necessary

import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/products" element={<Products />} /> {/* Route for Products */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Route for Admin Dashboard */}
                    <Route path="/home" element={<Home />} /> {/* Route for Products */}
                    <Route path="/manage-players" element={<ManagePlayers />} />
                    <Route path="/payment" element={<Payment />} /> {/* Add payment route */}

                    {/* <Route path="*" element={<NotFound />} /> Route for 404 errors */}

                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
