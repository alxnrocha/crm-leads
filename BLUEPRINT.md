# BLUEPRINT: CRM de Leads B2B y Pipeline Comercial

## 1. Visión General y Propósito

**LeadFlow CRM** es una solución Full Stack diseñada para equipos comerciales y directores de ventas B2B. Permite gestionar oportunidades comerciales a lo largo de un pipeline visual interactivo (Kanban), consultar un directorio de leads con filtros avanzados y paginación, registrar actividades cronológicas (llamadas, reuniones, notas), inspeccionar métricas clave de conversión y documentar la API bajo el estándar OpenAPI 3.0.

---

## 2. Decisiones Técnicas y Diferenciales

1. **Frontend:** React 19 + TypeScript + Vite 8 + Tailwind CSS v4 (`@theme` tokens y Dark Mode).
2. **Backend:** Node.js 22 LTS + Express 5 + Sequelize ORM + Zod validation middlewares.
3. **Base de Datos:** MySQL 8.4 LTS relacional con DDL optimizado, claves foráneas e índices compuestos.
4. **Documentación:** OpenAPI 3.0.3 con Swagger UI en `/api/docs`.
5. **Calidad:** Oxlint, Prettier, Husky, Supertest, Vitest y GitHub Actions CI.

---

## 3. Milestones y Desglose de Issues (18/18 Concluidas)

### 🏗️ Milestone 1 — Project Foundation & Architecture (4/4)

- [x] **Issue #1:** `Initialize Monorepo structure, tooling (Oxlint, Prettier, Husky) and base configs`
- [x] **Issue #2:** `Configure design system, CSS tokens and dark/light theme switching`
- [x] **Issue #3:** `Build core accessible UI primitives (Button, Input, Select, Card, Badge, Modal)`
- [x] **Issue #4:** `Design relational database schema (MySQL 8.4 DDL), indexes and seed data`

### ⚙️ Milestone 2 — Backend API & Data Layer (7/7)

- [x] **Issue #5:** `Set up Sequelize connection pool, typed models and migrations/seeds`
- [x] **Issue #6:** `Implement JWT authentication, password hashing and auth middleware`
- [x] **Issue #7:** `Implement Pipeline Stages CRUD endpoints and reordering logic`
- [x] **Issue #8:** `Implement Leads CRUD, search and filtering endpoints with stage transitions`
- [x] **Issue #9:** `Implement Activity logging and interaction tracking endpoints`
- [x] **Issue #10:** `Implement Analytics and metrics aggregation endpoints (pipeline volume, win rate)`
- [x] **Issue #11:** `Configure OpenAPI 3.0 Swagger documentation and Swagger UI endpoint`

### 🎨 Milestone 3 — Frontend Integration & Core Experience (5/5)

- [x] **Issue #12:** `Implement client authentication state, route guards and login/register views`
- [x] **Issue #13:** `Implement dashboard layout, navigation sidebar and metrics cards`
- [x] **Issue #14:** `Implement interactive Kanban board for visual sales pipeline with stage transitions`
- [x] **Issue #15:** `Implement Leads table view with pagination, filters and create/edit modal (RHF + Zod)`
- [x] **Issue #16:** `Implement Lead details drawer with activity timeline and quick actions`

### 🚀 Milestone 4 — Quality, Testing & Release (2/2)

- [x] **Issue #17:** `Configure automated tests (Supertest for API & Vitest for client) and CI pipeline`
- [x] **Issue #18:** `Generate project screenshots, complete documentation and prepare production deployment`
