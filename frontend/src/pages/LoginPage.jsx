import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@crm.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="loginWrap">
      <form onSubmit={submit} className="card">
        <h2>WhatsApp CRM</h2>
        <p>Gestión interna escalable a SaaS</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        {error && <span className="error">{error}</span>}
        <button>Ingresar</button>
      </form>
    </div>
  );
}
