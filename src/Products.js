import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css'; // ใช้ไฟล์ CSS สำหรับตกแต่ง

const Products = ({ addToCart }) => {
  const navigate = useNavigate(); // ใช้ hook สำหรับการนำทาง
  const products = [
    {
      id: 1,
      name: 'EZVIZ C6CN 2MP Wi-Fi',
      price: 1050,
      description: 'สินค้ารับประกัน 2 ปี',
      image: '/assets/C6CN.jpg', // ใช้ URL ของภาพสินค้าจริง
    },
    {
      id: 2,
      name: 'EZVIZ รุ่น 4.0',
      price: 1290,
      description: 'ขนาดเลนส์ 4.0 มม. มุมมอง 75 องศา พร้อมเมม 128 GB',
      image: '/assets/ezviz4.0.jpg', // ใช้ URL ของภาพสินค้าจริง
    },
    {
      id: 3,
      name: 'EZVIZ C8W Pro 3K',
      price: 2090,
      description: 'พร้อม Adapter สินค้ารับประกัน 2 ปี',
      image: '/assets/c8wpro.jpg', // ใช้ URL ของภาพสินค้าจริง
    },
  ];

  const handleBuyNow = (product) => {
    addToCart(product); // เพิ่มสินค้าลงตะกร้า
    navigate('/checkout', { state: { product } }); // นำทางไปหน้า checkout พร้อมส่งข้อมูลสินค้าไป
  };

  return (
    <div className="product-container">
      <h2>Our Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: {product.price} บาท</p>
            <p>{product.description}</p>
            <button className="buy-button" onClick={() => handleBuyNow(product)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
