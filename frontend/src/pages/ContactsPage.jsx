import { useEffect, useState } from 'react';
import api from '../api/client';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get('/contacts').then((res) => setContacts(res.data));
  }, []);

  return (
    <section>
      <h2>Contactos</h2>
      <div className="grid two">
        {contacts.map((contact) => (
          <article key={contact.id} className="card">
            <h3>{contact.name || contact.phoneNumber}</h3>
            <p>Estado: {contact.state}</p>
            <p>Etiquetas: {contact.tags.join(', ') || 'Sin etiquetas'}</p>
            <p>Historial: {contact.chats.flatMap((chat) => chat.messages).length} mensajes</p>
          </article>
        ))}
      </div>
    </section>
  );
}
