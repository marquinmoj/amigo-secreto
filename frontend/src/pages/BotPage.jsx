import { useEffect, useState } from 'react';
import api from '../api/client';

const initial = {
  welcomeMessage: '',
  outOfOfficeMessage: '',
  keywordResponses: '{"precio":"Nuestro catálogo..."}',
  businessHoursStart: '09:00',
  businessHoursEnd: '18:00',
  timezone: 'America/Mexico_City'
};

export default function BotPage() {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    api.get('/bot').then((res) => {
      if (res.data) {
        setForm({ ...res.data, keywordResponses: JSON.stringify(res.data.keywordResponses, null, 2) });
      }
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.put('/bot', { ...form, keywordResponses: JSON.parse(form.keywordResponses) });
    alert('Bot actualizado');
  };

  return (
    <section>
      <h2>Bot básico configurable</h2>
      <form className="card" onSubmit={submit}>
        <label>Mensaje de bienvenida</label>
        <textarea value={form.welcomeMessage} onChange={(e) => setForm({ ...form, welcomeMessage: e.target.value })} />
        <label>Mensaje fuera de horario</label>
        <textarea value={form.outOfOfficeMessage} onChange={(e) => setForm({ ...form, outOfOfficeMessage: e.target.value })} />
        <label>Respuestas por palabra clave (JSON)</label>
        <textarea rows="6" value={form.keywordResponses} onChange={(e) => setForm({ ...form, keywordResponses: e.target.value })} />
        <div className="inline">
          <input value={form.businessHoursStart} onChange={(e) => setForm({ ...form, businessHoursStart: e.target.value })} />
          <input value={form.businessHoursEnd} onChange={(e) => setForm({ ...form, businessHoursEnd: e.target.value })} />
          <input value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} />
        </div>
        <button>Guardar configuración</button>
      </form>
    </section>
  );
}
