import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../api/client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000');

export default function NumbersPage() {
  const [numbers, setNumbers] = useState([]);
  const [form, setForm] = useState({ name: '', phoneNumber: '' });

  const load = () => api.get('/whatsapp').then((res) => setNumbers(res.data));

  useEffect(() => {
    load();
    socket.emit('join:dashboard');
    socket.on('whatsapp:status', load);
    return () => socket.off('whatsapp:status', load);
  }, []);

  const createNumber = async (e) => {
    e.preventDefault();
    await api.post('/whatsapp', form);
    setForm({ name: '', phoneNumber: '' });
    load();
  };

  return (
    <section>
      <h2>Panel multi número</h2>
      <form className="card inline" onSubmit={createNumber}>
        <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="+521..." value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
        <button>Agregar</button>
      </form>
      <div className="grid two">
        {numbers.map((n) => (
          <article className="card" key={n.id}>
            <h3>{n.name}</h3>
            <p>{n.phoneNumber}</p>
            <span className={`badge ${n.status.toLowerCase()}`}>{n.status}</span>
            <button onClick={() => api.post(`/whatsapp/${n.id}/connect`)}>Conectar por QR</button>
          </article>
        ))}
      </div>
    </section>
  );
}
