import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import registerImg from './register.webp';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('donar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerName, setCutomerName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Registered', { role, email, password });
      setLoading(false);
    }, 1000);
    navigate('/login');
  };

  return (
    <div style={{
      backgroundImage: `url(${registerImg})`,
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
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#fff' }}>Register</h2>
          <hr style={{ marginBottom: '1.5rem', borderColor: '#fff' }} />

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            {['Vendor', 'Customer'].map((r) => (
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

          {role === 'Vendor' && (
            <InputField label="Vendor Name" value={vendorName} onChange={setVendorName} />
          )}
          {role === 'Customer' && (
            <InputField label="Customer Name" value={customerName} onChange={setCutomerName} />
          )}
          
          <InputField label="Email" type="email" value={email} onChange={setEmail} />
          <InputField label="Password" type="password" value={password} onChange={setPassword} />
          <InputField label="Address" value={address} onChange={setAddress} />
          <InputField label="Phone" value={phone} onChange={setPhone} />

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
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p style={{ marginTop: '1rem', textAlign: 'center', color: '#fff' }}>
            Already have an account? <Link to="/login" style={{ color: '#00f', textDecoration: 'none' }}>Login</Link>
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

export default Register;