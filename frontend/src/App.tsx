import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { Product } from './models/Product';
import ProtectedRoute from './components/ProtectedRoute';
import { fetchProducts } from './api';

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async (page: number) => {
    try {
      const data = await fetchProducts(page, limit);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product: Product) => {
    let index = cart.indexOf(product, 0);
    cart.splice(index,1);
    setCart([...cart]);
    if(cart.length === 0){
      setCart([]);
    }
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
                <Products onAddToCart={handleAddToCart} />
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
