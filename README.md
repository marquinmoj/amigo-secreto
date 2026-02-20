# WhatsApp CRM Profesional (Interno + SaaS Ready)

CRM completo para WhatsApp con arquitectura limpia, multinumero, multiagente y panel moderno responsive.

## Stack

- **Backend:** Node.js + Express + Socket.io + Prisma + PostgreSQL + Baileys
- **Frontend:** React + Vite
- **Auth:** JWT + roles (Admin / Agente)

## Arquitectura

```txt
backend/
  src/
    controllers/
    services/
    routes/
    middlewares/
    config/
frontend/
  src/
    pages/
    components/
    context/
    api/
```

### Funcionalidades implementadas

1. **Sistema multi número**
   - Alta de número
   - Conexión por QR con Baileys
   - Persistencia de sesión (`backend/sessions/...`)
   - Reconexión automática
   - Estado en tiempo real por Socket.io

2. **Sistema multiagente**
   - Login JWT
   - Roles Admin y Agente
   - Asignación manual y automática de chats
   - Registro de actividad

3. **Gestión de contactos**
   - Upsert automático por teléfono
   - Estados de cliente y etiquetas
   - Historial de mensajes por chat

4. **Embudo visual**
   - Kanban drag & drop
   - Etapas configurables
   - Valor estimado por oportunidad

5. **Bot básico**
   - Mensaje de bienvenida
   - Respuestas por palabra clave
   - Mensaje fuera de horario
   - Configurable desde panel

6. **Dashboard**
   - Métricas por agente
   - Métricas por número
   - Conversaciones activas
   - Mensajes del día

## Variables de entorno

Crear `backend/.env` a partir de `backend/.env.example`:

```bash
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/whatsapp_crm
JWT_SECRET=supersecret
CLIENT_URL=http://localhost:5173
```

Opcional en frontend (`frontend/.env`):

```bash
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

## Instalación

```bash
npm install
npm run prisma:generate --workspace backend
npm run prisma:migrate --workspace backend
npm run dev
```

## Endpoints base

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/POST /api/whatsapp`
- `POST /api/whatsapp/:numberId/connect`
- `GET/POST /api/contacts`
- `GET /api/dashboard`
- `GET/POST/PATCH /api/pipeline`
- `GET/PUT /api/bot`

## Seguridad aplicada

- Middleware JWT
- Middleware de roles
- Validación con Joi
- Manejo centralizado de errores
- Variables de entorno para secretos

## Escalabilidad sugerida

- Migrar Socket.io a Redis adapter para horizontal scaling
- Extraer workers de Baileys por número
- Añadir colas (BullMQ) para automatizaciones
- Multi-tenant por organización para modelo SaaS completo
