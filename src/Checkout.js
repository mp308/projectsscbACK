import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate(); // ใช้สำหรับการย้อนกลับไปหน้า Products

  const [quantity, setQuantity] = useState(1); // จำนวนเริ่มต้น
  const [totalPrice, setTotalPrice] = useState(product.price); // ราคาเริ่มต้น

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    setTotalPrice((quantity + 1) * product.price);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice((quantity - 1) * product.price);
    }
  };

  const handleCheckout = () => {
    alert(`คุณได้สั่งซื้อสินค้า: ${product.name} จำนวน ${quantity} ชิ้น รวมราคา ${totalPrice} บาท`);
  };

  // ฟังก์ชันสำหรับการย้อนกลับไปหน้า Products
  const handleBackToProducts = () => {
    navigate('/products'); // นำทางไปยังหน้า Products
  };

  return (
    <div className="checkout-container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>Price: {product.price} Bath</h3>

      <div className="quantity-control">
        <button onClick={handleDecrease} disabled={quantity === 1}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>

      <h3>TotalPrice: {totalPrice} Bath</h3>

      <button className="checkout-button" onClick={handleCheckout}>
        สั่งซื้อ
      </button>

      {/* ปุ่มย้อนกลับไปหน้า Products */}
      <button className="back-button" onClick={handleBackToProducts}>
        ย้อนกลับไปหน้าสินค้า
      </button>
    </div>
  );
};

export default Checkout;
