import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../components/authService';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await register(username, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Sikeres regisztráció után átirányítunk a login oldalra
    } catch (err) {
      setError('Registration failed: Username or password is invalid');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registration successful! Redirecting...</p>}
    </div>
  );
};

export default Register;
