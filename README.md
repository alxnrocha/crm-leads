# LeadFlow CRM — Gestión Comercial y Pipeline de Ventas B2B

Plataforma full-stack de gestión comercial, prospección de clientes y seguimiento visual del ciclo de ventas. Desarrollada con React 19, Node.js 22 (Express 5), TypeScript y base de datos relacional MySQL 8.4 LTS.

---

## 🚀 Características Principales

- **Gestión de Leads:** Captura, calificación y categorización de prospectos con asignación de representante.
- **Pipeline Visual (Kanban):** Visualización del embudo de ventas por etapas con cálculo automático de valor total y transiciones dinámicas.
- **Historial de Actividades:** Registro cronológico de llamadas, reuniones comerciales, correos y notas de seguimiento.
- **Métricas y Conversión:** Indicadores clave de rendimiento (KPIs), tasas de conversión y volumen proyectado.
- **Autenticación Segura:** Sistema de autenticación mediante JWT y contraseñas hasheadas con bcrypt.
- **Documentación OpenAPI:** API REST interactiva documentada con Swagger UI en `/api/docs`.

---

## 🛠️ Stack Tecnológico

| Capa                  | Tecnologías                                                                            |
| :-------------------- | :------------------------------------------------------------------------------------- |
| **Frontend**          | React 19, TypeScript, Tailwind CSS v4, Zustand 5, React Hook Form 7, Zod 4, Recharts 3 |
| **Backend**           | Node.js 22 LTS, Express 5, TypeScript, Sequelize 6, JWT, Helmet, CORS                  |
| **Base de Datos**     | MySQL 8.4 LTS (Schema relacional con integridad referencial)                           |
| **Calidad & Testing** | Oxlint, Prettier, Husky, lint-staged, Supertest, Vitest                                |

---

## 📦 Instalación y Ejecución Local

### Prerrequisitos

- Node.js 22 LTS o superior
- MySQL 8.4 LTS (o compatible)

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/alxnrocha/crm-leads.git
cd 11-crm-leads
npm install
```

### 2. Variables de Entorno

Copiar los archivos de ejemplo en `client/` y `server/`:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Documentación Swagger: `http://localhost:5000/api/docs`

---

## 🏛️ Arquitectura del Proyecto

Para más detalles sobre la arquitectura y el roadmap, consulte:

- [BLUEPRINT.md](./BLUEPRINT.md) — Hoja de ruta de 18 issues y especificación funcional.
- [DECISIONS.md](./DECISIONS.md) — Registro de decisiones técnicas de ingeniería.
