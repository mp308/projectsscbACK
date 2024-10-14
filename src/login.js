import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ใช้สำหรับนำทางไปยังหน้าหลังจากล็อกอินสำเร็จ

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { // เปลี่ยน URL ให้ถูกต้องตาม API ของคุณ
        email,
        password
      });
      console.log(response.data);
      // สมมติว่าการล็อกอินสำเร็จแล้ว คุณสามารถนำไปยังหน้าหลักได้
      navigate('/dashboard'); // นำไปยังหน้าหลักหลังจากล็อกอินสำเร็จ
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email or Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="register-link">
            <span>Don't have an account?</span> <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
