# Blueprint: LeadFlow CRM (Proyecto 11)

## 📌 Resumen del Proyecto

Plataforma CRM profesional full-stack diseñada para equipos comerciales y de ventas B2B. Proporciona captura y calificación de prospectos (leads), seguimiento de pipeline visual por etapas (Kanban), registro de actividades comerciales (llamadas, reuniones, correos, notas), cálculo analítico de conversión de ventas y autenticación robusta mediante JWT con base de datos relacional MySQL 8.4 LTS.

---

## 🛠️ Stack Tecnológico

### Frontend (`client/`)

- **Core:** React 19.2, TypeScript 5.8+, Vite 8
- **Estilos:** Tailwind CSS v4 (CSS-first `@theme`), Lucide React
- **Formularios & Validación:** React Hook Form 7, Zod 4 (`zodResolver`)
- **Estado Global:** Zustand 5
- **Métricas & Gráficos:** Recharts 3
- **Utilidades:** `clsx`, `tailwind-merge`, `date-fns` 4

### Backend (`server/`)

- **Core:** Node.js 22 LTS, Express 5, TypeScript
- **Base de Datos & ORM:** MySQL 8.4 LTS, Sequelize 6
- **Autenticación & Seguridad:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `helmet`, `cors`, `express-rate-limit`
- **Validación de Requests:** Zod 3 / 4
- **Documentación de API:** OpenAPI 3.0, Swagger UI (`/api/docs`)

### Tooling & Calidad

- **Linters & Formatters:** Oxlint, Prettier, Husky, lint-staged
- **Testing:** Supertest (API), Vitest + React Testing Library (Client)
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 🗺️ Roadmap y Milestones (18 Issues)

### Milestone 1 — Project Foundation & Architecture

- **#1** `Set up initial project structure, monorepo tooling and core dependencies`
- **#2** `Configure frontend styling, design tokens and dark/light mode`
- **#3** `Build reusable UI primitives (Button, Input, Card, Badge, Modal, Select)`
- **#4** `Design relational database schema and documentation for MySQL 8.4 LTS`

### Milestone 2 — Backend API & Data Layer

- **#5** `Implement database connection, ORM models and seed data script`
- **#6** `Implement authentication system (JWT, bcrypt, register, login, me endpoint)`
- **#7** `Implement CRUD endpoints for stages and sales pipeline management`
- **#8** `Implement CRUD endpoints and search/filters for leads`
- **#9** `Implement activities and interactions logging endpoints`
- **#10** `Implement metrics aggregation endpoints for pipeline conversion and sales volume`
- **#11** `Configure OpenAPI / Swagger documentation for backend endpoints`

### Milestone 3 — Frontend Integration & Core Experience

- **#12** `Implement client authentication state, route guards and login/register views`
- **#13** `Implement dashboard layout, navigation sidebar and metrics cards`
- **#14** `Implement interactive Kanban board for visual sales pipeline with stage transitions`
- **#15** `Implement Leads table view with pagination, filters and create/edit modal (RHF + Zod)`
- **#16** `Implement Lead details drawer with activity timeline and quick actions`

### Milestone 4 — Quality, Testing & Release

- **#17** `Configure automated tests (Supertest for API & Vitest for client) and CI pipeline`
- **#18** `Generate project screenshots, complete documentation and prepare production deployment`

---

## 🎨 Dominio y Modelo de Datos

1. **Users (`users`):** Representantes comerciales y administradores del CRM.
2. **Stages (`stages`):** Fases del pipeline de ventas (`Nuevo`, `En Contacto`, `Calificado`, `Propuesta`, `Ganado`, `Perdido`).
3. **Sources (`lead_sources`):** Origen de captación del prospecto (`Website`, `Meta Ads`, `Google Ads`, `Referencia`, `Evento`).
4. **Leads (`leads`):** Prospecto comercial con valor estimado en euros, contacto, empresa y prioridad (`low`, `medium`, `high`).
5. **Activities (`activities`):** Historial cronológico de interacciones (`call`, `meeting`, `email`, `note`).
