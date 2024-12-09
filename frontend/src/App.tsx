import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { Product } from './models/Product';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    { id: 1, name: 'Product 1', price: 19.99, description: 'This is Product 1.' },
    { id: 2, name: 'Product 2', price: 29.99, description: 'This is Product 2.' },
    { id: 3, name: 'Product 3', price: 39.99, description: 'This is Product 3.' },
  ];

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product: Product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products products={products} onAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
