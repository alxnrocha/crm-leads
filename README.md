# LeadFlow CRM — Gestión de Leads B2B y Pipeline Comercial

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=flat-square&logo=github&logoColor=white)](https://alxnrocha.github.io/crm-leads/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express 5](https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL 8.4 LTS](https://img.shields.io/badge/MySQL-8.4_LTS-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![SQL DDL](https://img.shields.io/badge/SQL-DDL_&_Relational_Schema-00758F?style=flat-square&logo=sqlite&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Proyecto 11 del Portafolio Profesional** — Plataforma web empresarial Full Stack de gestión de leads B2B, pipeline comercial interactivo y analíticas de ventas.  
> 🔗 **Demo en Vivo en GitHub Pages:** [https://alxnrocha.github.io/crm-leads/](https://alxnrocha.github.io/crm-leads/)

---

## ✨ Características Principales

### 🚀 Frontend (React 19 + TypeScript + Tailwind CSS v4)

- **Tablero Kanban de Ventas:** Visualización interactiva de las 6 fases del embudo (`Nuevo`, `En Contacto`, `Calificado`, `Propuesta`, `Ganado`, `Perdido`) con soporte nativo de arrastrar y soltar (Drag and Drop) y sumas monetarias acumuladas en Euros (€).
- **Directorio de Leads y Filtros:** Tabla de alta densidad con ordenamiento, paginación, búsqueda instantánea por empresa/contacto/email y filtrado combinado por etapas y prioridades.
- **Modal de Creación y Edición:** Formularios con validación en tiempo real utilizando `React Hook Form` y esquemas estrictos de `Zod`.
- **Panel Lateral Deslizable (_Slide-Over Drawer_):** Vista detallada del prospecto con:
  - Stepper interactivo de progreso de etapas comerciales.
  - Botones de acción rápida para llamadas, correos y reuniones.
  - Ficha corporativa (industria, tamaño de empresa, ubicación y enlace web).
  - Timeline cronológico de interacciones con formulario de registro de llamadas, reuniones y notas.
- **Métricas y KPIs en Tiempo Real:** Tarjetas analíticas de valor total del pipeline (€345k), tasa de conversión (42%), ingresos ganados (€120k) y volumen de prospectos activos.
- **Tema Dark-Slate y Tokens `@theme`:** Interfaz moderna con estética dark navy/slate (`#0b0f17`), acentos Índigo/Violeta (`#6366f1`), paleta semántica por etapa y alternancia fluido de tema claro/oscuro.

### 🛡️ Backend & Datos (Node.js 22 + Express 5 + Sequelize + MySQL 8.4 LTS)

- **Autenticación JWT & BCrypt:** Endpoints seguros de registro, inicio de sesión y validación de perfil (`/api/v1/auth/me`) con control de roles (`admin`, `sales`).
- **Arquitectura RESTful Modular:** Controladores, middlewares de validación Zod (`validateBody`, `validateQuery`) y rutas independientes para `/auth`, `/stages`, `/leads`, `/activities` y `/metrics`.
- **Migrations Versionadas:** Esquema gestionado con migraciones SQL numeradas (`server/migrations/*.sql`) y un runner que registra cada migración en la tabla `schema_migrations` (`npm run db:migrate` / `npm run db:rollback`).
- **Filtros, Ordenación y Paginación Server-Side:** Listados de leads y actividades validados en el `query` con esquemas de Zod, ordenación por columnas autorizadas y paginación con metadatos (`page`, `limit`, `total`, `totalPages`).
- **Reordenamiento Transaccional:** Endpoint transaccional (`POST /stages/reorder`) respaldado por `sequelize.transaction` para sincronizar el orden del Kanban.
- **Documentación OpenAPI 3.0.3 & Swagger UI:** Interfaz interactiva de documentación y pruebas disponible en `/api/docs` y `/api/docs.json`.
- **Modelo Relacional Robusto:** DDL relacional con claves foráneas (`ON DELETE CASCADE / SET NULL`), índices de optimización y script de seed (`npm run seed`) que aplica las migrations y puebla datos de demostración.
- **Tests de Integración con MySQL:** Suite de CRUD end-to-end (registro → JWT → stages → leads → actividades → métricas) que se omite automáticamente si la base de datos no está disponible.

---

## 🏛️ Estructura del Monorepo

```text
11-crm-leads/
├── .github/workflows/ci.yml       # Pipeline CI (Lint, Test, Build)
├── client/                        # Frontend (Vite 8 + React 19 + Tailwind v4)
│   ├── src/
│   │   ├── __tests__/             # Pruebas unitarias de componentes con Vitest
│   │   ├── components/
│   │   │   ├── dashboard/         # Tarjetas de métricas (MetricCards)
│   │   │   ├── layout/            # Sidebar vertical, Header y DashboardLayout
│   │   │   ├── leads/             # LeadsTable, LeadFormModal y LeadDetailsDrawer
│   │   │   ├── pipeline/          # KanbanBoard, KanbanColumn y KanbanCard
│   │   │   └── ui/                # Primitivas accesibles (Button, Input, Card, Badge, Modal, Select)
│   │   ├── contexts/              # AuthContext y manejo de sesión
│   │   ├── hooks/                 # useAuth y useTheme
│   │   ├── services/              # api.ts (cliente HTTP) y pipeline.service.ts
│   │   ├── types/                 # auth.types.ts y pipeline.types.ts
│   │   ├── views/                 # LoginView, RegisterView y LeadsView
│   │   ├── App.tsx                # Shell de aplicación y route switcher
│   │   └── index.css              # Tokens @theme de Tailwind v4
│   └── vitest.config.ts
├── database/                      # Modelo de base de datos MySQL 8.4 LTS
│   ├── README.md                  # Diagrama DER (Mermaid) y diccionario de datos
│   ├── schema.sql                 # DDL de creación de tablas e índices
│   └── seed.sql                   # Datos de demostración en SQL
├── server/                        # Backend (Node.js 22 + Express 5 + Sequelize)
│   ├── src/
│   │   ├── __tests__/             # Pruebas de integración con Supertest (+ MySQL)
│   │   ├── config/                # env.ts (validación Zod) y database.ts (Sequelize)
│   │   ├── controllers/           # auth, stage, lead, activity, metrics controllers
│   │   ├── docs/swagger.yaml      # Especificación OpenAPI 3.0.3
│   │   ├── middlewares/           # auth.middleware.ts, validate.middleware.ts (body & query)
│   │   ├── models/                # User, Stage, LeadSource, Lead, Activity
│   │   ├── routes/                # auth, stage, lead, activity, metrics routes
│   │   ├── schemas/               # Zod validation schemas
│   │   ├── scripts/               # migrate.ts (runner) y seed.ts (población ORM)
│   │   └── server.ts              # Servidor Express y montaje de Swagger
│   ├── migrations/                # Migraciones SQL versionadas (up/down)
│   └── tsconfig.json
└── package.json                   # Monorepo Workspaces y scripts globales
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar e Instalar Dependencias

```bash
git clone https://github.com/alxnrocha/crm-leads.git
cd crm-leads
npm install
```

### 2. Configurar Variables de Entorno

Cree un archivo `.env` en `server/`:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=crm_leads_db
JWT_SECRET=leadflow_enterprise_jwt_secret_key_2026_super_secure!
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Aplicar Migraciones y Poblar Datos de Demostración

```bash
# Crea la base de datos y aplica las migraciones versionadas (registradas en schema_migrations)
npm run db:migrate

# Rellena tablas con datos de demostración (aplica migraciones si hace falta)
npm run seed
```

> **Nota:** `npm run seed` aplica las migraciones pendientes y vacía las tablas antes de insertar los datos de demostración. Para revertir la última migración use `npm run db:rollback`.

### 4. Iniciar en Modo Desarrollo

```bash
# Inicia tanto el backend (puerto 5000) como el frontend (puerto 5173) en paralelo
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **API Backend:** [http://localhost:5000/api/v1](http://localhost:5000/api/v1)
- **Documentación Swagger UI:** [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 🔑 Credenciales de Demostración

| Usuario          | Rol                 | Correo Electrónico         | Contraseña     |
| :--------------- | :------------------ | :------------------------- | :------------- |
| **Alex Morgan**  | Comercial (`sales`) | `alex.morgan@leadflow.io`  | `Password123!` |
| **Carlos Gómez** | Director (`admin`)  | `carlos.gomez@leadflow.io` | `Password123!` |

_(La aplicación incluye botones de acceso directo de 1 clic en la pantalla de inicio de sesión)._

---

## 🧪 Calidad de Código y Pruebas

```bash
# Ejecuta pruebas unitarias de validación/protección y, si hay MySQL disponible, las de integración
npm test

# Ejecutar el linter Oxlint
npm run lint

# Formatear el código con Prettier
npm run format

# Compilar para producción (TypeScript + Vite)
npm run build
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.

**Autor:** [Alexandre Rocha](https://github.com/alxnrocha)
