import { useEffect, useState } from 'react';
import api from '../api/client';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Cargando métricas...</p>;

  return (
    <section>
      <h2>Dashboard</h2>
      <div className="grid">
        <article className="card metric"><h3>Conversaciones activas</h3><strong>{data.conversations}</strong></article>
        <article className="card metric"><h3>Mensajes del día</h3><strong>{data.todaysMessages}</strong></article>
      </div>
      <div className="grid two">
        <article className="card">
          <h3>Métricas por agente</h3>
          {data.byAgent.map((agent) => (
            <p key={agent.id}>{agent.name}: {agent._count.assignedChats} chats / {agent._count.activityLogs} actividades</p>
          ))}
        </article>
        <article className="card">
          <h3>Métricas por número</h3>
          {data.byNumber.map((n) => (
            <p key={n.id}>{n.name} ({n.status}) - {n._count.chats} chats</p>
          ))}
        </article>
      </div>
    </section>
  );
}
