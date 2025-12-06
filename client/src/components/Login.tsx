import { useState } from 'react';

interface LoginProps {
  onLogin: (role: string, name: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!res.ok) throw new Error('Invalid credentials');
      
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      onLogin(data.role, data.name);
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Hospital Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '0.5rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Login</button>
      </form>
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <p>Default Credentials:</p>
        <p>Doctor: doctor1 / doctor123</p>
        <p>Nurse: nurse1 / nurse123</p>
      </div>
    </div>
  );
};

export default Login;
