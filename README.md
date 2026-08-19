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

## 🌟 Visión General & Propuesta de Valor

**LeadFlow CRM** es una solución Full Stack orientada a directores y equipos comerciales B2B.

Centraliza el seguimiento del embudo de ventas mediante un tablero Kanban interactivo de arrastrar y soltar, directorio denso de prospectos, panel lateral de actividades comerciales con timeline cronológico y analíticas de conversión respaldadas por una API REST en Node.js y MySQL 8.4.

---

## ✨ Características Principales

### 🚀 Frontend (React 19 + TypeScript + Tailwind CSS v4)

- **Tablero Kanban de Ventas:** Visualización de las 6 fases del embudo con Drag and Drop y sumas monetarias en tiempo real (€).
- **Directorio de Leads y Filtros:** Tabla densa con paginación, búsqueda instantánea y filtros combinados.
- **Panel Lateral Slide-Over:** Stepper de avance de fase comercial, acciones rápidas (llamadas, email) y timeline cronológico.
- **Métricas y KPIs en Tiempo Real:** Total del pipeline (€345k), tasa de conversión (42%) e ingresos cerrados.

### 🛡️ Backend & Datos (Node.js 22 + Express 5 + Sequelize + MySQL 8.4 LTS)

- **Autenticación JWT & BCrypt:** Endpoints seguros con control de roles (`admin`, `sales`).
- **Arquitectura RESTful Modular:** Controladores y middlewares con validación Zod.
- **Migraciones SQL Versionadas:** Runner que registra migraciones en `schema_migrations`.
- **OpenAPI 3.0.3 & Swagger UI:** Documentación interactiva en `/api/docs`.

---

## 🏛️ Arquitectura del Proyecto

```text
11-crm-leads/
├── server/                        # Backend (Node.js 22 + Express 5 + Sequelize + MySQL)
│   ├── migrations/                # Migraciones SQL versionadas
│   ├── src/                       # Controladores, modelos, rutas, schemas
│   ├── .env.example
│   └── package.json
├── client/                        # Frontend (Vite + React 19 + Tailwind v4)
│   ├── src/                       # Componentes, vistas, stores, hooks
│   └── package.json
├── compose.yaml                   # Contenedor MySQL 8.4 LTS
├── LICENSE
└── package.json                   # Scripts monorepo
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos

- Node.js `>= 20.0.0`
- npm `>= 10.0.0`
- Docker Compose o MySQL 8.4 local

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/alxnrocha/crm-leads.git
   cd crm-leads
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar contenedor de base de datos MySQL (opcional):**

   ```bash
   docker compose up -d
   ```

4. **Aplicar migraciones y seed:**

   ```bash
   npm run db:migrate
   npm run seed
   ```

5. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre el frontend en `http://localhost:5173` y la API en `http://localhost:5000`.

---

## 🔑 Credenciales de Demostración

| Rol               | Correo Electrónico            | Contraseña   |
| :---------------- | :---------------------------- | :----------- |
| **Administrador** | `admin@leadflow.com`          | `Admin1234!` |
| **Comercial**     | `carlos.mendoza@leadflow.com` | `Sales1234!` |

---

## 🛡️ Calidad de Código & Testing

- **Linter & Typecheck:** Oxlint y TypeScript en modo estricto en frontend y backend.
- **Tests Automatizados:** Pruebas unitarias e integración con Supertest y MySQL.

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
