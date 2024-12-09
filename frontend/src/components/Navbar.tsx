import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, getSession } from '../components/authService';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const session = getSession();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <Link to="/products" style={{ marginRight: '10px' }}>Products</Link>
      <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
      {isLoggedIn() ? (
        <>
          <span style={{ marginLeft: '10px' }}>Hello, {session?.username}!</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/" style={{ marginLeft: '10px' }}>Login</Link>
          <Link to="/register" style={{ marginLeft: '10px' }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
