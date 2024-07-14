import React, { FC, useState } from 'react';
import './AdminLogin.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection after login

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: FC<AdminLoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting naturally
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // Navigate to admin page on successful login
    } catch (err: any) {
      setError(err.message); // Set error message from Firebase authentication error
    }
  };

  return (
    <div className="AdminLogin">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button btn-container-action">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
