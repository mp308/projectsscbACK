import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Navbar.css';
import './Solarcell.css';
import './Checkout.css';
import React, { useState } from 'react';  // ตรวจสอบให้แน่ใจว่า React และ useState ถูก import ในระดับ top level
import Navbar from './Navbar';
import Home from './Home';
import Solarcell from './Solarcell';
import Login from './login';
import Register from './Register';
import Products from './Products';
import Cart from './Cart';
import Checkout from './Checkout';
import Admin from './Admin';

// ไม่มีฟังก์ชัน App ซ้อนกันในไฟล์ ต้องเขียนฟังก์ชัน App เดียวเท่านั้น
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setTotalPrice(totalPrice + product.price);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solarcell" element={<Solarcell />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Products" element={<Products addToCart={addToCart} />} />
          <Route path="/Cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/Checkout" element={<Checkout totalPrice={totalPrice} />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
