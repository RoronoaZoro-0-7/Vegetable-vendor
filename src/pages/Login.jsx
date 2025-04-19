import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from './register.webp';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Login', { role, email, password });
      setLoading(false);
      if (role === 'Admin') {
        navigate('/admin');
      }
      else {
        navigate('/customer');
      }
    }, 1000);
  };

  return (
    <div style={{
      backgroundImage: `url(${loginImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '2.5rem',
        borderRadius: '16px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#fff' }}>Login</h2>
          <hr style={{ marginBottom: '1.5rem', borderColor: '#fff' }} />

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            {['Admin', 'Customer/Vendor'].map((r) => (
              <label key={r} style={{ fontSize: '0.95rem', textTransform: 'capitalize', color: '#fff' }}>
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: '0.4rem' }}
                />
                {r}
              </label>
            ))}
          </div>

          <InputField label="Email" type="email" value={email} onChange={setEmail} />
          <InputField label="Password" type="password" value={password} onChange={setPassword} />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p style={{ marginTop: '1rem', textAlign: 'center', color: '#fff' }}>
            Don't have an account? <Link to="/register" style={{ color: '#00f', textDecoration: 'none' }}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, type = 'text', value, onChange }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '0.65rem',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '6px',
        fontSize: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        color: '#000',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        boxSizing: 'border-box'
      }}
    />
  </div>
);

export default Login;