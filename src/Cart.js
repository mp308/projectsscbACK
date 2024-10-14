import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ฟังก์ชันสำหรับอัพเดทจำนวนสินค้า
  const updateQuantity = (productId, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: quantity } : item
    ));
  };

  // ฟังก์ชันสำหรับลบสินค้าจากตะกร้า
  const removeFromCart = (productId) => {
    const removedItem = cartItems.find(item => item.id === productId);
    setCartItems(cartItems.filter(item => item.id !== productId));
    if (removedItem) {
      setTotalPrice(totalPrice - (removedItem.quantity * removedItem.price));
    }
  };

  // ใช้ useEffect เพื่อคำนวณยอดรวมใหม่ทุกครั้งที่ cartItems เปลี่ยนแปลง
  useEffect(() => {
    const newTotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    setTotalPrice(newTotal);
  }, [cartItems]);

  const checkout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <span>{item.name}</span> 
                <span>Price: ${item.price.toFixed(2)}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <button onClick={checkout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
